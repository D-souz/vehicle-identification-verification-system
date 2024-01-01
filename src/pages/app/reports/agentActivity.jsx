import React, { useState, useMemo, useEffect } from "react";
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
import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { getMostScans } from "../agents/agentsStore";

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
            {row?.cell?.value}
          </span>
        </div>
      );
    },
  },
  {
    Header: "gender",
    accessor: "gender",
    Cell: (row) => {
      return (
        <span className="text-slate-500 dark:text-slate-400">
          {row?.cell?.value}
        </span>
      );
    },
  },
  {
    Header: "scans",
    accessor: "scansCount",
    Cell: (row) => {
      return (
        <span className="text-slate-500 dark:text-slate-400">
          <span className="block text-slate-600 dark:text-slate-300">
          {row?.cell?.value}
          </span>       
        </span>
      );
    },
  },
  {
    Header: "contact",
    accessor: "telephone",
    Cell: (row) => {
      return (
        <span className="text-slate-500 dark:text-slate-400">
          <span className="block text-slate-600 dark:text-slate-300">
            {row?.cell?.value}
          </span>
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
          {row?.cell?.value}
          </span>
           </span>
      );
    },
  },
  {
    Header: "role",
    accessor: "role",
    Cell: (row) => {
      return (
        <span className="text-slate-500 dark:text-slate-400">
          <span className="block text-slate-600 dark:text-slate-300">
          {row?.cell?.value}
          </span>
        </span>
      );
    },
  },
  {
    Header: "qr codes generated",
    accessor: "generationsCount",
    Cell: (row) => {
      return (
        <span className="text-slate-500 dark:text-slate-400">
          <span className="block text-slate-600 dark:text-slate-300">
          {row?.cell?.value}
          </span>
        </span>
      );
    },
  },
  {
    Header: "qr codes downloaded",
    accessor: "downloadsCount",
    Cell: (row) => {
      return (
        <span className="text-slate-500 dark:text-slate-400">
          <span className="block text-slate-600 dark:text-slate-300">
          {row?.cell?.value}
          </span>
        </span>
      );
    },
  },
];


const AgentActivityPage = () => {
  const dispatch = useDispatch();
  const columns = useMemo(() => COLUMNS, []);
  const data = useSelector((state) => state.agents.mostScans);


  // dispatching the fetching action
  useEffect(() => {
    dispatch(getMostScans());
    // console.log(getEnrollees);
  }, [dispatch])

  const tableInstance = useTable(
    {
      columns,
      data,
      // initialState: {
      //   pageSize: 4,
      // },
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
          <h4 className="card-title">Agents Activity</h4>
          <div className="row">
            <div className="col-6">
              <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            </div>
            <div className="col-6">
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

export default AgentActivityPage;
