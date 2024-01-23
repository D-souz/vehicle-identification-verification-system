import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { EnrolleesTable } from "./EnrolleeTable";
import { useSelector } from "react-redux";

const EnrolleesPage = () => {
  return (
    <div>
      <ToastContainer />

      {/* parent component */}
      <EnrolleesTable />
    </div>
  );
};

export default EnrolleesPage;
