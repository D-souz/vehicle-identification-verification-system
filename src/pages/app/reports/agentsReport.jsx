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
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/components/ui/Button";

const COLUMNS = [
  {
    Header: "name",
    accessor: "enrollee.name",
    Cell: (row) => {
      return (
        <div>
          <span className="inline-flex items-center">
            {row?.cell?.value}
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
    Header: "vin",
    accessor: "enrollee.vin",
    Cell: (row) => {
      return (
        <span className="text-slate-500 dark:text-slate-400">
          {row?.cell?.value}
          {/* <span className="inline-block ml-1">
            {Math.floor(Math.random() * 12) + 1}:
            {Math.floor(Math.random() * 60) + 1}
          </span> */}
        </span>
      );
    },
  },
  {
    Header: "model",
    accessor: "enrollee.model",
    Cell: (row) => {
      return (
        <span className="text-slate-500 dark:text-slate-400">
          <span className="block text-slate-600 dark:text-slate-300">
            {row?.cell?.value}
          </span>
          {/* <span className="block text-slate-500 text-xs">
            Trans ID: 8HG654Pk32
          </span> */}
        </span>
      );
    },
  },
  {
    Header: "number plate",
    accessor: "enrollee.numberPlate",
    Cell: (row) => {
      return (
        <span className="text-slate-500 dark:text-slate-400">
          <span className="block text-slate-600 dark:text-slate-300">
            {row?.cell?.value}
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
    accessor: "enrollee.telephone",
    Cell: (row) => {
      return (
        <span className="text-slate-500 dark:text-slate-400">
          <span className="block text-slate-600 dark:text-slate-300">
           {row?.cell?.value}
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
    accessor: "enrollee.email",
    Cell: (row) => {
      return (
        <span className="text-slate-500 dark:text-slate-400">
          <span className="block text-slate-600 dark:text-slate-300">
            {row?.cell?.value}
          </span>
          {/* <span className="block text-slate-500 text-xs">
            Trans ID: 8HG654Pk32
          </span> */}
        </span>
      );
    },
  },
  // {
  //   Header: "status",
  //   accessor: "status",
  //   Cell: (row) => {
  //     return (
  //       <span className="text-slate-500 dark:text-slate-400">
  //         <span className="block text-slate-600 dark:text-slate-300">
  //           {row?.cell?.value}
  //         </span>
  //         {/* <span className="block text-slate-500 text-xs">
  //           Trans ID: 8HG654Pk32
  //         </span> */}
  //       </span>
  //     );
  //   },
  // },
  {
    Header: "access type",
    accessor: "accessType",
    Cell: (row) => {
      return (
        <span className="block w-full">
          <span
            className={`${
              row?.cell?.value === "grant-in" ? "text-success-500 " : ""
            }   
            ${row?.cell?.value === "deny" ? "text-warning-500 " : ""}
            ${row?.cell?.value === "grant-out" ? "text-primary-500" : ""}
            
             `}
          >
            {row?.cell?.value === "grant-in" && <span>granted in</span>}
            {row?.cell?.value === "deny" && <span>denied</span>}
            {row?.cell?.value === "grant-out" && <span>granted out</span>}
          </span>
        </span>
      );
    },
  },
  {
    Header: "time",
    accessor: "timestamp",
    Cell: (row) => {
      return (
        <span className="text-slate-500 dark:text-slate-400">
          <span className="block text-slate-600 dark:text-slate-300">
          {new Date(row?.cell?.value).toLocaleString("en-Us")}
          </span>
          {/* <span className="block text-slate-500 text-xs">
            Trans ID: 8HG654Pk32
          </span> */}
        </span>
      );
    },
  },
  // {
  //   Header: "time out",
  //   accessor: "grantedOut.dateTime",
  //   Cell: (row) => {
  //     return (
  //       <span className="text-slate-500 dark:text-slate-400">
  //         <span className="block text-slate-600 dark:text-slate-300">
  //           {row?.cell?.value}
  //         </span>
  //         {/* <span className="block text-slate-500 text-xs">
  //           Trans ID: 8HG654Pk32
  //         </span> */}
  //       </span>
  //     );
  //   },
  // },
  // {
  //   Header: "access denied",
  //   accessor: "denied.dateTime",
  //   Cell: (row) => {
  //     return (
  //       <span className="text-slate-500 dark:text-slate-400">
  //         <span className="block text-slate-600 dark:text-slate-300">
  //           {row?.cell?.value}
  //         </span>
  //         {/* <span className="block text-slate-500 text-xs">
  //           Trans ID: 8HG654Pk32
  //         </span> */}
  //       </span>
  //     );
  //   },
  // },
  {
    Header: "agent's name",
    accessor: "agent.name",
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
    Header: "agent's role",
    accessor: "agent.role",
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
  
  // {
  //   Header: "action",
  //   accessor: "action",
  //   Cell: (row) => {
  //     return (
  //       <div className=" text-center">
  //         <Dropdown
  //           classMenuItems="right-0 w-[140px] top-[110%] "
  //           label={
  //             <span className="text-xl text-center block w-full">
  //               <Icon icon="heroicons-outline:dots-vertical" />
  //             </span>
  //           }
  //         >
  //           <div className="divide-y divide-slate-100 dark:divide-slate-800">
  //             {actions.map((item, i) => (
  //               <Menu.Item key={i}>
  //                 <div
  //                   className={`
                
  //                 ${
  //                   item.name === "delete"
  //                     ? "bg-danger-500 text-danger-500 bg-opacity-30   hover:bg-opacity-100 hover:text-white"
  //                     : "hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50"
  //                 }
  //                  w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer 
  //                  first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse `}
  //                 >
  //                   <span className="text-base">
  //                     <Icon icon={item.icon} />
  //                   </span>
  //                   <span>{item.name}</span>
  //                 </div>
  //               </Menu.Item>
  //             ))}
  //           </div>
  //         </Dropdown>
  //       </div>
  //     );
  //   },
  // },
];

// const actions = [
//   {
//     name: "view",
//     icon: "heroicons-outline:eye",
//   },
//   // {
//   //   name: "edit",
//   //   icon: "heroicons:pencil-square",
//   // },
//   // {
//   //   name: "delete",
//   //   icon: "heroicons-outline:trash",
//   // },
// ];

const AgentsTable = ( ) => {
  const dispatch = useDispatch();
  const columns = useMemo(() => COLUMNS, []);
  const data = useSelector((state) => state.stats.accessDetails);
  // console.log(data)


  const tableInstance = useTable(
    {
      columns,
      data,
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
          <h4 className="card-title">Access log</h4>
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

export default AgentsTable;
