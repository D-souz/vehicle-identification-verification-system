import React, {  useMemo, useEffect, useRef } from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import GlobalFilter from "../../table/react-tables/GlobalFilter";
import { Link, useNavigate} from "react-router-dom";
import Modal from "@/components/ui/Modal";
import MultiValidation from "../../forms/form-validation/multiple-rules";
import { useDispatch, useSelector } from "react-redux";
import { getEnrollees, deleteEnrollee } from "./enrolleeStore";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import Loading from "@/components/Loading";
import { EditEnrollee } from "./editEnrollee";
import { toast } from "react-toastify";

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input
          type="checkbox"
          ref={resolvedRef}
          {...rest}
          className="table-checkbox"
        />
      </>
    );
  }
);

export const EnrolleesTable = ({ title = "Enrollees"}) => {
  const { agent } = useSelector((state) => state.auth);

  // handle delete enrollee
  const handleEnrolleeDel = (id) => {
    if (agent.userType == "admin") {

      dispatch(deleteEnrollee(id))
  
      toast.success("Enrollee successfully deleted!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("Not authorized to perform action", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const COLUMNS = [
    {
      Header: "vin",
      accessor: "vin",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "name",
      accessor: "name",
      Cell: (row) => {
        return (
          // <div>
          //   <span className="inline-flex items-center">
          //     <span className="w-7 h-7 rounded-full ltr:mr-3 rtl:ml-3 flex-none bg-slate-600">
          //       <img
          //         src={row?.cell?.value.image}
          //         alt=""
          //         className="object-cover w-full h-full rounded-full"
          //         />
          //     </span>
          //     <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
          //       {row?.cell?.value}
          //     </span>
          //   </span>
          // </div>
          <span>{row?.cell?.value}</span>
        );
      },
    },
    {
      Header: "contact",
      accessor: "telephone",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "registration date",
      accessor: "createdAt",
      Cell: (row) => {
        return <span>{new Date(row?.cell?.value).toLocaleString("en-Us")}</span>;
      },
    },
    {
      Header: "email",
      accessor: "email",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "location",
      accessor: "address",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "gender",
      accessor: "gender",
      Cell: (row) => {
        return (
          <span className="block w-full">
            <span>
              {row?.cell?.value}
            </span>
          </span>
        );
      },
    },
    {
      Header: "age",
      accessor: "age",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "action",
      accessor: "_id",
      Cell: (row) => {
        return (
          <div className="flex space-x-3 rtl:space-x-reverse">
              <Tooltip content="View" placement="top" arrow animation="shift-away">
                <button 
                  className="action-btn"
                  type="button"
                  onClick={() => handleClick(row?.cell?.value)}
                >
                  <Icon icon="heroicons:eye" />
                </button>
              </Tooltip>
              {/* <Tooltip content="Edit" placement="top" arrow animation="shift-away">
                <button 
                  className="action-btn" 
                  type="button"
                  onClick={() => handleEdit(row?.cell?.value)}
                >
                  <Icon icon="heroicons:pencil-square" />
                </button>
              </Tooltip> */}
            <Tooltip
              content="Delete"
              placement="top"
              arrow
              animation="shift-away"
              theme="danger"
            >
              <button 
                className="action-btn" 
                type="button"
                onClick={() => handleEnrolleeDel(row?.cell?.value)}
                >
                <Icon icon="heroicons:trash" />
              </button>
            </Tooltip>
          </div>
        );
      },
    },
  ];
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/enrollee-details/${id}`)
  }

  const handleEdit = (id) =>{
    return <EditEnrollee />
  }

  const columns = useMemo(() => COLUMNS, []);
  const dispatch = useDispatch();
  const { isLoading, message } = useSelector((state) => state.enrollees);
  const data = useSelector((state) => state.enrollees.enrollees);
  const tableRef = useRef(null);


  // dispatching the fetching action
  useEffect(() => {
    dispatch(getEnrollees());
    // console.log(getEnrollees);
  }, [dispatch])

  const tableInstance = useTable(
    {
      columns,
      data,
    },

    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,

    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter,
    prepareRow,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;

  const handleDownload = () => {
  const doc = new jsPDF();

  const tableData = [];

  // Generate table header
  const header = columns.map((column) => column.Header);
  tableData.push(header);

  // Generate table body
  page.forEach((row) => {
    const rowData = row.cells.map((cell) => cell.value);
    tableData.push(rowData);

    // const rowData = row.cells
    // .slice(0, -1) // Exclude the last column
    // .map((cell) => cell.value);
    // tableData.push(rowData);
  });

  // Set table column widths
  const columnWidths = columns.map(() => 'auto');
  // const columnWidths = columns.slice(0, -1).map(() => 'auto'); // Exclude the last column

   // Define column styles
   const columnStyles = {
    // Increase horizontal padding within the columns
    cellPadding: { left: 10, right: 2 },
  };

  // Add the table to the PDF document
  doc.autoTable({
    head: [tableData[0]],
    body: tableData.slice(1),
    columns: columnWidths,
    startY: 10, // Adjust the starting Y position as needed
    columnStyles: columnStyles,
  });

  // Download the PDF
  doc.save('enrollees.pdf');
};
if (isLoading) {
  <Loading />
}
  return (
    <>
      <Card>
        <div className="md:flex justify-between items-center mb-6">
          <h4 className="card-title">{title}</h4>
          <div className="row">
            <div className="col-6">
              <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            </div>
            <div className="col-6">
              <div className="d-flex flex-row  justify-content-around">
                <div>
                  <Modal
                    title="Enrollee registration form"
                    label="Add enrollee"
                    labelClass="btn btn-primary p-2"  
                    uncontrol
                  >
                    <MultiValidation />
                  </Modal>
                </div>
                {/* downloading button */}
                <div>
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary p-2" 
                    style={{color:"#94a3b8"}} 
                    onClick={handleDownload}>
                      Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table
                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                {...getTableProps}
                ref={tableRef}
              >
                <thead className="bg-slate-200 dark:bg-slate-700">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          scope="col"
                          className=" table-th "
                        >
                          {column.render("Header")}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " 🔽"
                                : " 🔼"
                              : ""}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                  {...getTableBodyProps}
                >
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td {...cell.getCellProps()} className="table-td">
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
          <div className=" flex items-center space-x-3 rtl:space-x-reverse">
            <select
              className="form-control py-2 w-max"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[10, 25, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Page{" "}
              <span>
                {pageIndex + 1} of {pageOptions.length}
              </span>
            </span>
          </div>
          <ul className="flex items-center  space-x-3  rtl:space-x-reverse">
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${
                  !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <Icon icon="heroicons:chevron-double-left-solid" />
              </button>
            </li>
            <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${
                  !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                Prev
              </button>
            </li>
            {pageOptions.map((page, pageIdx) => (
              <li key={pageIdx}>
                <button
                  href="#"
                  aria-current="page"
                  className={` ${
                    pageIdx === pageIndex
                      ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
                      : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal  "
                  }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                  onClick={() => gotoPage(pageIdx)}
                >
                  {page + 1}
                </button>
              </li>
            ))}
            <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${
                  !canNextPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                Next
              </button>
            </li>
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
                className={` ${
                  !canNextPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <Icon icon="heroicons:chevron-double-right-solid" />
              </button>
            </li>
          </ul>
        </div>
        {/*end*/}
      </Card>
    </>
  );
};

// export default EnrolleesTable;
