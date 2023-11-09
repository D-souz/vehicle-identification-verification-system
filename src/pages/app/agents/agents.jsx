import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Image from "@/components/ui/Image";
import responsiveImage4 from "@/assets/images/all-img/thumb-4.png";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";
import Tooltip from "@/components/ui/Tooltip";
// import Button from "@/components/ui/Button";

const AgentsPage = () => {
  return (
    <div>
      <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4 mb-6">
        Agents list
      </h4>
      <div className="grid grid-cols-12 gap-4">
        <Card className="lg:col-span-10 col-span-12">
          <div className="row">
            <div className="col-3">
              <Image src={responsiveImage4}  className="rounded-md  border-slate-300" />
            </div>
            <div className="col-9">
              <div className="pb-6 d-flex flex-row justify-content-between">
                <div>
                  <p>Karen Eilla Boyette</p>
                  <p>Agent ID: #18457 865 8745</p>
                </div>
                <div>
                  {/* <Button 
                    text="view" className=" btn-secondary block-btn"
                    link="/dashboard"
                  /> */}
                  <Link to="/agents-details">
                    <Tooltip content="View" placement="top" arrow animation="shift-away">
                      <button className="action-btn" type="button">
                        <Icon icon="heroicons:eye" />
                      </button>
                    </Tooltip>
                  </Link>
                </div>
              </div>

              <div className="row">
                <div className="col-6">

                  <div className="d-flex flex-row ">
                    <div className="pt-1"><Icon icon="ic:outline-email" /></div>
                    <div className="pl-4">kareneboyette@armyspy.com</div>
                  </div>

                  <div className="d-flex flex-row ">
                    <div className="pt-1"><Icon icon={"solar:phone-bold"} /></div>
                    <div className="pl-4"><p>+502-324-4194</p></div>
                  </div>
                </div>

                <div className="col-6">

                  <div className="d-flex flex-row ">
                    <div className="pt-1"><Icon icon="mdi:location" /></div>
                    <div className="pl-4"><p>location</p></div>
                  </div>

                  <div className="d-flex flex-row ">
                    <div className="pt-1"><Icon icon="bx:qr-scan" /></div>
                    <div className="pl-4"><p>12 Scans</p></div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AgentsPage;
