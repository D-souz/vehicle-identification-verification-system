import React, { useEffect, useMemo } from "react";
// import { advancedTable } from "../../../constant/table-data";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Dropdown from "@/components/ui/Dropdown";
import { Menu } from "@headlessui/react";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import GlobalFilter from "./GlobalFilter";
// import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
// import Textinput from "@/components/ui/Textinput";
import MultiValidation from "../../forms/form-validation/multiple-rules";
import { Link, Navigate, useNavigate } from "react-router-dom";
// import Loading from "@/components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getEnrollees } from "../../app/enrollees/enrolleeStore";


const COLUMNS = [
  {
    Header: "vin",
    accessor: "vin",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "number plate",
    accessor: "numberPlate",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "owner",
    accessor: "name",
    Cell: (row) => {
      return (
        // <div>
        //   {/* <span className="inline-flex items-center"> */}
        //     {/* <span className="w-7 h-7 rounded-full ltr:mr-3 rtl:ml-3 flex-none bg-slate-600">
        //       <img
        //         src={row?.cell?.value.image}
        //         alt=""
        //         className="object-cover w-full h-full rounded-full"
        //         />
        //     </span> */}
        //     <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
        //       {/* {row?.cell?.value} */}
        //     </span>
        //   {/* </span> */}
        // </div>
        <span>{row?.cell?.value}</span>
      );
    },
  },
  {
    Header: "date of registration",
    accessor: "createdAt",
    Cell: (row) => {
      return <span>{new Date(row?.cell?.value).toLocaleString("en-Us")}</span>;
    },
  },
  {
    Header: "model",
    accessor: "model",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  // {
  //   Header: "amount",
  //   accessor: "amount",
  //   Cell: (row) => {
  //     return <span>{row?.cell?.value}</span>;
  //   },
  // },
  {
    Header: "status",
    accessor: "status",
    Cell: (row) => {
      return (
        <span className="block w-full">
          active
          {/* <span
            className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${
              row?.cell?.value === "paid"
                ? "text-success-500 bg-success-500"
                : ""
            } 
            ${
              row?.cell?.value === "due"
                ? "text-warning-500 bg-warning-500"
                : ""
            }
            ${
              row?.cell?.value === "cancled"
                ? "text-danger-500 bg-danger-500"
                : ""
            }
            
             `}
          >
            {row?.cell?.value}
          </span> */}
        </span>
      );
    },
  },
  {
    Header: "action",
    accessor: "action",
    // link: "/enrollee-details",
    Cell: (row) => {
      return (
        <div>
          <Dropdown
            classMenuItems="right-0 w-[140px] top-[110%] "
            label={
              <span className="text-xl text-center block w-full">
                <Icon icon="heroicons-outline:dots-vertical" />
              </span>
            }
          >
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {actions.map((item, i) => (
                  <Menu.Item key={i}>
                    <div
                      className={`
                  
                    ${
                      item.name === "delete"
                        ? "bg-danger-500 text-danger-500 bg-opacity-30   hover:bg-opacity-100 hover:text-white"
                        : "hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50"
                    }
                    w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer 
                    first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse `}
                    >
                    
                      <span className="text-base">
                        <Icon icon={item.icon} />
                      </span>
                      <span>
                        {item.name}
                        {/* {item.name = "view" ? <Link to="/enrollee-details">view</Link> : item.name = "edit" ? <Link to="/enrollee-details">edit</Link> : item.name = "delete"} */}
                        {/* {item.name = "edit" ? <Navigate to="/enrollee-details" /> : item.name}  */}
                      </span>
                     </div>
                  </Menu.Item>
                ))}
              </div>
          </Dropdown>
        </div>
      );
    },
  },
];

const actions = [
  {
    name: "view",
    icon: "heroicons-outline:eye",
    // link: "/enrollee-details"
  },
  {
    name: "edit",
    icon: "heroicons:pencil-square",
    // link: "/enrollee-details"
  },
  {
    name: "delete",
    icon: "heroicons-outline:trash",
  },
];

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

const ExamapleOne = () => {
  const columns = useMemo(() => COLUMNS, []);
  // const data = useMemo(() => advancedTable, []);
  const dispatch = useDispatch();
  const { isLoading, message } = useSelector((state) => state.enrollees);
  const data = useSelector((state) => state.enrollees.enrollees);
  // const navigate = useNavigate();

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
  return (
    
    <>
      <Card noborder>
        <div className="md:flex justify-between items-center mb-6">
          <h4 className="card-title">Vehicles Registrated</h4>
          <div className="row">
            <div className="col-8">
              <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            </div>
            <div className="col-4">
               <Modal
                  title="Enrollee registration form"
                  label="Register"
                  labelClass="btn btn-primary py-2"
                  uncontrol
                  >
                  <MultiValidation />
                </Modal>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table
                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                {...getTableProps}
              >
                <thead className=" border-t border-slate-100 dark:border-slate-800">
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
            <span className=" flex space-x-2  rtl:space-x-reverse items-center">
              <span className=" text-sm font-medium text-slate-600 dark:text-slate-300">
                Go
              </span>
              <span>
                <input
                  type="number"
                  className=" form-control py-2 px-2"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const pageNumber = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(pageNumber);
                  }}
                  style={{ width: "50px" }}
                />
              </span>
            </span>
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
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <Icon icon="heroicons-outline:chevron-left" />
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
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${
                  !canNextPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <Icon icon="heroicons-outline:chevron-right" />
              </button>
            </li>
          </ul>
        </div>
      </Card>
    </>
  );
};

export default ExamapleOne;
