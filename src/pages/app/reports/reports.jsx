import React, { useState } from "react";
import Card from "@/components/ui/Card";
import AreaSpaLine from "../../chart/appex-chart/AreaSpaline";
import TransactionsTable from "../../../components/partials/Table/transactions";
import EnrolleesTable from "./enrolleesTable";
import AgentsTable from "./agentsTable";
import RecentEnrolleesTable from "./recentScans";

const ReportsPage = () => {
  // const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="space-y-5">
      <div className="row">
        <div className="col-8">
          <Card>
            <h5 className="pb-4">Overview</h5>
              <div className="row pb-3">
                <div className="col-3">
                  <p className="pb-2 pl-8">800</p>
                  <p className="text-primary">Total verifications</p>
                </div>
                <div className="col-4 text-center">
                  <p className="pb-2">100</p>
                  <p style={{color: "#E19133"}}>successful verifications</p>
                </div>
                <div className="col-4">
                  <p className="pb-2 pl-8">200</p>
                  <p className="text-danger">failed verifications</p>
                </div>
              </div>
              <hr />
              <div className="row pt-3">
                <div className="col-4">
                  <p className="pb-2 pl-6">26</p>
                  <p style={{color: "#845EBC"}}>Total Agents</p>
                </div>
                <div className="col-4 ">
                  <p className="pb-2 pl-4">200</p>
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
                <p>100</p>
                <p className="text-success">Vehicles in</p>
              </div>
              <div className="text-center col-6">
                <p>200</p>
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
      <RecentEnrolleesTable />
      <EnrolleesTable />
    </div>
  );
};

export default ReportsPage;
