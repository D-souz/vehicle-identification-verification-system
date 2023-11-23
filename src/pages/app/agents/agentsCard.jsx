import React from 'react';
import Card from "@/components/ui/Card";
import Image from "@/components/ui/Image";
import responsiveImage4 from "@/assets/images/all-img/thumb-4.png";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
// import Button from "@/components/ui/Button";
import Tooltip from "@/components/ui/Tooltip";
import { useDispatch} from 'react-redux';
import { deleteAgent } from "./agentsStore"

const AgentCard = ({agentID, name, email, contact, role}) => {
const dispatch = useDispatch();

  return (
    <div className="grid grid-cols-12 gap-4 p-2">
        <Card className="lg:col-span-10 col-span-12">
          <div className="row">
            <div className="col-3">
              <Image src={responsiveImage4}  className="rounded-md  border-slate-300" />
            </div>
            <div className="col-9">
              <div className="pb-6 d-flex flex-row justify-content-between">
                <div>
                  <p>{name}</p>
                  <p>Agent ID: {agentID.slice(0, 10)}</p>
                </div>
                <div className='row'>
                  <div className='col-6'>
                    <Tooltip content="Delete agent" placement="top" arrow animation="shift-away" theme="danger">
                        <button className="action-btn" type="button" onClick={() => dispatch(deleteAgent(agentID))}>
                          <Icon icon="heroicons:trash" />
                        </button>
                      </Tooltip>
                  </div>
                  <div className='col-6'>
                    <Link to={`/agents-details/${agentID}`}>
                      <Tooltip content="View" placement="top" arrow animation="shift-away">
                        <button className="action-btn" type="button">
                          <Icon icon="heroicons:eye" />
                        </button>
                      </Tooltip>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-6">

                  <div className="d-flex flex-row ">
                    <div className="pt-1 pb-2"><Icon icon="ic:outline-email" /></div>
                    <div className="pl-4">{email}</div>
                  </div>

                  <div className="d-flex flex-row ">
                    <div className="pt-1"><Icon icon={"solar:phone-bold"} /></div>
                    <div className="pl-4"><p>{contact}</p></div>
                  </div>
                </div>

                <div className="col-6">

                  <div className="d-flex flex-row ">
                    <div className="pt-1">status: <span className="text-success">active</span></div>
                    {/* <div className="pl-4"><p>active</p></div> */}
                  </div>

                  <div className="d-flex flex-row ">
                    <div className="pt-1">Role: {role}</div>
                    {/* <div className="pl-4"><p>12 Scans</p></div> */}
                  </div>
                </div>

              </div>

            </div>
          </div>
        </Card>
    </div>
  )
}

export default AgentCard;