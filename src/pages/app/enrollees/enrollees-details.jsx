import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Modal from "@/components/ui/Modal";
import { EditEnrollee } from "./editEnrollee";
import { toast } from "react-toastify";
// import GroupChart4 from "@/components/partials/widget/chart/group-chart-4";
// import DonutChart from "@/components/partials/widget/chart/donut-chart";
// import { meets, files } from "@/constant/data";
// import SelectMonth from "@/components/partials/SelectMonth";
// import TaskLists from "@/components/partials/widget/task-list";
// import MessageList from "@/components/partials/widget/message-list";
// import TrackingParcel from "@/components/partials/widget/activity";
// import TeamTable from "@/components/partials/Table/team-table";
// import CalendarView from "@/components/partials/widget/CalendarView";

import TabMenu from "./TabMenu";
import Button from "@/components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { getSingleEnrollee, getQrcode, reset } from "./enrolleeStore";

const EnrolleeDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isError, isSuccess, enrollee } = useSelector((state) => state.enrollees);
  // const [disBtn, setDisBtn] = useState(false);


//  // fetch a single enrolle
 useEffect(() => {
  if (isError) {
    console.log(message);
  }
  dispatch(getSingleEnrollee(id));
  
  return () => {
    dispatch(reset())
  }
 }, [id, dispatch]);

 const genQrcode = () => {
  dispatch(getQrcode(id))

  if (isSuccess) {
    toast.success("Qrcode generated successfully", {
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
  
  
  // setDisBtn = true;
 }
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-12 gap-5 mb-5">
        <div className="2xl:col-span-9 lg:col-span-12 col-span-12">
          <Card bodyClass="p-4">
            <div className="row pb-3">
              <div className="col-8">
                <h4 className="card-title">Enrollee ID: {id.slice(0, 8)}</h4>
              </div>
              <div className="col-4 text-end">
                <div className="row">
                  <div className="col-7">
                    <Button 
                      text="Generate Qrcode" 
                      className="btn-outline-secondary p-2 text-muted"
                      onClick={genQrcode}
                      // disabled={disBtn}
                    />
                    </div>
                    {/* updating the enrollee data */}
                  <div className="col-5">
                    {/* <Button 
                      icon="heroicons-outline:pencil"
                      text="Edit"
                      className="btn-outline-secondary p-2 text-muted"
                      onClick={() => <Modal> <p>hello</p></Modal>}
                    /> */}
                    <Modal
                      title="Edit Enrollee"
                      label="Edit"
                      labelClass="btn-outline-secondary p-2 w-20 text-muted"  
                      uncontrol
                    >
                      <EditEnrollee />
                    </Modal>
                    </div>
                    <div className="col-4">
                    </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div>
               <TabMenu />
              </div>
            </div>

          </Card>
        </div>
      </div>
    </div>
  );
};

export default EnrolleeDetailsPage;
