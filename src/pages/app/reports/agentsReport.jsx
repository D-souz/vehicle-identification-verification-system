import React, { useState, useMemo } from "react";
import { advancedTable } from "@/constant/table-data";
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
import GlobalFilter from "../../table/react-tables/GlobalFilter";
import Button from "@/components/ui/Button";

const COLUMNS = [
  {
    Header: "name",
    accessor: "name",
    Cell: (row) => {
      return (
        <div>
          <span className="inline-flex items-center">
            {/* <span className="w-7 h-7 rounded-full ltr:mr-3 rtl:ml-3 flex-none bg-slate-600">
              <img
                src={row?.cell?.value.image}
                alt=""
                className="object-cover w-full h-full rounded-full"
              />
            </span> */}
            {/* <span className="text-sm text-slate-600 dark:text-slate-300 capitalize font-medium">
              {row?.cell?.value.name}
            </span> */}
          </span>
        </div>
      );
    },
  },
  {
    Header: "role",
    accessor: "role",
    Cell: (row) => {
      return (
        <span className="text-slate-500 dark:text-slate-400">
          {row?.cell?.value}
          <span className="inline-block ml-1">
            {Math.floor(Math.random() * 12) + 1}:
            {Math.floor(Math.random() * 60) + 1}
          </span>
        </span>
      );
    },
  },
  {
    Header: "total scans",
    accessor: "scans",
    Cell: (row) => {
      return (
        <span className="text-slate-500 dark:text-slate-400">
          <span className="block text-slate-600 dark:text-slate-300">
            15
          </span>
          {/* <span className="block text-slate-500 text-xs">
            Trans ID: 8HG654Pk32
          </span> */}
        </span>
      );
    },
  },
  {
    Header: "contact",
    accessor: "contact",
    Cell: (row) => {
      return (
        <span className="text-slate-500 dark:text-slate-400">
          <span className="block text-slate-600 dark:text-slate-300">
            0785697415
          </span>
          {/* <span className="block text-slate-500 text-xs">
            Trans ID: 8HG654Pk32
          </span> */}
        </span>
      );
    },
  },
  {
    Header: "email",
    accessor: "email",
    Cell: (row) => {
      return (
        <span className="text-slate-500 dark:text-slate-400">
          <span className="block text-slate-600 dark:text-slate-300">
            kareneboyette@armyspy.com
          </span>
          {/* <span className="block text-slate-500 text-xs">
            Trans ID: 8HG654Pk32
          </span> */}
        </span>
      );
    },
  },
  {
    Header: "status",
    accessor: "status",
    Cell: (row) => {
      return (
        <span className="block w-full">
          <span
            className={`${
              row?.cell?.value === "paid" ? "text-success-500 " : ""
            } 
            ${row?.cell?.value === "due" ? "text-warning-500 " : ""}
            // ${row?.cell?.value === "cancled" ? "text-danger-500" : ""}
            
             `}
          >
            {row?.cell?.value === "due" && <span>active</span>}
            {row?.cell?.value === "paid" && <span>inacvtive</span>}
            {/* {row?.cell?.value === "cancled" && <span>+$ 1400.00</span>} */}
          </span>
        </span>
      );
    },
  },
 
];


const AgentsReportPage = ( ) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => advancedTable, []);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 4,
      },
    },

    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
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
          <h4 className="card-title">Most active agents</h4>
          <div className="row">
            <div className="col-6">
              <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            </div>
            <div className="col-5">
              <div className="row">
                <div className="col-6">
                  <Button 
                    icon="ion:print-outline" 
                    text="print"
                    className="btn-outline-secondary p-2 text-muted"
                  />
                </div>
                <div className="col-6">
                  <Button 
                    text="Download"
                    className="btn-outline-secondary p-2 text-muted"
                  />
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
                            <td
                              {...cell.getCellProps()}
                              className="table-td py-2"
                            >
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
      </Card>
    </>
  );
};

export default AgentsReportPage;
