import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAgents, reset } from "./agentsStore";
import { AgentCard } from "./agentsCard";

const AgentsPage = () => {
  const dispatch = useDispatch();
  const { agent } = useSelector((state) => state.auth);
  const { agents, isLoading, isError, message } = useSelector((state) => state.agents);

// fetching the agents when the page loads
useEffect(() =>{

  if (isError) {
    console.log(message);
  }

  dispatch(getAgents());

  // reset the state when a leaves the page
  return () => {
    dispatch(reset());
  }
}, [agent, message, isError, dispatch])

  return (
    <div>
      <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4 mb-6">
        Agents list
      </h4>
        {agents.length > 0 ? (
          <div>
            {agents.map((agent) => (
              <AgentCard 
                key={agent._id}
                agentID={agent._id}
                name={agent.name}
                email={agent.email}
                contact={agent.telephone}
                role={agent.role}
                gender={agent.gender}
                profile={agent.profileImage}
              />
            ))}
          </div>
        ) 
        : 
        (
          <div>
            <h3>No agents available</h3>
          </div>
        )}
    </div>
  );
};

export default AgentsPage;
