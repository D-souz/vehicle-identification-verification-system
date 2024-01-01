import React, { useEffect } from "react";
import Icon from "@/components/ui/Icon";
import { useDispatch, useSelector } from "react-redux";
import { getAgents } from "../../../../pages/app/agents/agentsStore";
import { getEnrollees } from "../../../../pages/app/enrollees/enrolleeStore";
import { getStatistics } from "../../../../pages/app/reports/reportStore";


const GroupChart1 = () => {
  const dispatch = useDispatch();
  const { agents } = useSelector((state) => state.agents);
  const { enrollees } = useSelector((state) => state.enrollees);
  const { allStats } = useSelector((state) => state.stats);

  // fetching agents and enrollees
  useEffect(() => {
    dispatch(getEnrollees());
    dispatch(getAgents());
    // get generated qrcodes
  }, [dispatch]);
  

// returning the total counts
  const enrolleesCount = enrollees.length;
  const agentCount = agents.length;

  // calculating percentage increase
   

  const statistics = [
    {
      title: "Total enrolles",
      count: enrolleesCount,
      bg: "bg-[#E7FDF1] dark:bg-slate-900	",
      icon: "heroicons-outline:user",
    },
    {
      title: "Agents",
      count: agentCount,
      bg: "bg-[#E5F9FF] dark:bg-slate-900	",
      icon: "heroicons-outline:user-group",
    },
    {
      title: "Generated Qrcodes",
      count: "564",
      bg: "bg-[#FFEDE5] dark:bg-slate-900	",
      icon: "ic:round-qr-code-scanner",
    },
    {
      title: "Growth",
      count: "+5.0%",
      bg: "bg-[#EAE5FF] dark:bg-slate-900	",
      icon: "heroicons:arrow-trending-up-solid",
    },
  ];
  return (
    <>
      {statistics.map((item, i) => (
        <div className={`py-[18px] px-4 rounded-[6px] ${item.bg}`} key={i}>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
             <Icon icon={item.icon} className="h-12 w-12 rounded-full bg-[#cbd5e1]"/>
            <div className="flex-1">
              <div className="text-slate-800 dark:text-slate-300 text-sm mb-1 font-medium">
                {item.title}
              </div>
              <div className="text-slate-900 dark:text-white text-lg font-medium">
                {item.count}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default GroupChart1;
