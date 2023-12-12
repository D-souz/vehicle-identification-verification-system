import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { EnrolleesTable } from "./EnrolleeTable";
import { useSelector } from "react-redux";

const EnrolleesPage = () => {
  // const { enrollees } = useSelector((state) => state.enrollees);
  // console.log(enrollees);

  // function mapping over the enrollees and returning the enrollee ids
  // function getIds() {
  //   const ids = enrollees.map((item) => item._id);
  //   return ids;
  // }
// console.log(getIds());
  return (
    <div>
      <ToastContainer />

      {/* parent component */}
      <EnrolleesTable />
    </div>
  );
};

export default EnrolleesPage;
