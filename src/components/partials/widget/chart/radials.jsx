import React from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";
import useWidth from "@/hooks/useWidth";
import { useSelector } from "react-redux";

const RadialsChart = () => {
  const { allStats, isError } = useSelector((state) => state.stats);
  const {totalGrantedIn, totalGrantedOut } = allStats;
  const [isDark] = useDarkMode();
  const { width, breakpoints } = useWidth();
  const series = [totalGrantedIn, totalGrantedOut ];
  const totalCount = (totalGrantedIn + totalGrantedOut) / 100;

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "22px",
            color: isDark ? "#CBD5E1" : "#475569",
          },
          value: {
            fontSize: "16px",
            color: isDark ? "#CBD5E1" : "#475569",
          },
          total: {
            show: true,
            label: "Total",
            color: isDark ? "#CBD5E1" : "#475569",
            formatter: function () {
              return totalCount;
            },
          },
        },
        track: {
          background: "#E2E8F0",
          strokeWidth: "97%",
        },
      },
    },
    labels: ["Vehicles in", "Vehicles out"],
    colors: ["#4669FA", "#FA916B"],
  };

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="radialBar"
        height={width > breakpoints.md ? 360 : 250}
      />
    </div>
  );
};

export default RadialsChart;
