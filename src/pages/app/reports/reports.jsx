import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import { toast } from "react-toastify";
import AreaSpaLine from "../../chart/appex-chart/AreaSpaline";
import TransactionsTable from "../../../components/partials/Table/transactions";
import EnrolleesTable from "./enrolleesTable";
import AgentsTable from "./agentsTable";
// import RecentEnrolleesTable from "./recentScans";
import { useDispatch, useSelector } from "react-redux";
import { getStatistics } from "./reportStore";
import { getAgents } from "../agents/agentsStore";
import { getEnrollees } from "../enrollees/enrolleeStore";
import { getAccessDetails } from "./reportStore";

const ReportsPage = () => {
 const dispatch = useDispatch();
 const { allStats, isError } = useSelector((state) => state.stats);
 const { agents } = useSelector((state) => state.agents);
 const { enrollees } = useSelector((state) => state.enrollees);

const totalVerifications = allStats.totalGrantedIn + allStats.totalGrantedOut + allStats.totalDenied;
const successfulVerifications = allStats.totalGrantedIn + allStats.totalGrantedOut;

//  loading statistics
useEffect(() => {
  dispatch(getStatistics());
  dispatch(getAccessDetails());
  if (isError) {
    toast.error("Failed to load statistics", {
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
},[dispatch]);

useEffect(() => {
  dispatch(getEnrollees());
  dispatch(getAgents());
},[dispatch])

// returning the total counts
const enrolleesCount = enrollees.length;
const agentCount = agents.length;

  return (
    <div className="space-y-5">
      <div className="row">
        <div className="col-8">
          <Card>
            <h5 className="pb-4">Overview</h5>
              <div className="row pb-3">
                <div className="col-3">
                  <p className="pb-2 pl-8">{totalVerifications}</p>
                  <p className="text-primary">Total verifications</p>
                </div>
                <div className="col-4 text-center">
                  <p className="pb-2">{successfulVerifications}</p>
                  <p style={{color: "#E19133"}}>successful verifications</p>
                </div>
                <div className="col-4">
                  <p className="pb-2 pl-8">{allStats.totalDenied}</p>
                  <p className="text-danger">failed verifications</p>
                </div>
              </div>
              <hr />
              <div className="row pt-3">
                <div className="col-4">
                  <p className="pb-2 pl-6">{agentCount}</p>
                  <p style={{color: "#845EBC"}}>Total Agents</p>
                </div>
                <div className="col-4 ">
                  <p className="pb-2 pl-4">{enrolleesCount}</p>
                  <p style={{color: "coral"}}>Enrollees</p>
                </div>
              </div>
          </Card>
        </div>
        <div className="col-4">
          <Card>
            <h5 className="pb-4">Current Vehicle Status</h5>
            <div className="row">
              <div className="text-center col-6 border-end">
                <p>{allStats.accessIn}</p>
                <p className="text-success">Vehicles in</p>
              </div>
              <div className="text-center col-6">
                <p>{allStats.accessOut}</p>
                <p className="text-danger">Vehicles out</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div>
        <Card title="Daily verification activity">
          <AreaSpaLine />
        </Card>
      </div>
      <AgentsTable />
      {/* <RecentEnrolleesTable /> */}
      <EnrolleesTable />
    </div>
  );
};

export default ReportsPage;
