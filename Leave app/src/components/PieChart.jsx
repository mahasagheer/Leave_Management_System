import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the required components
ChartJS.register(ArcElement, Tooltip, Legend);
const PieChart = ({ chartData }) => {
  return (
    <>
      <div>
        <Pie data={chartData} />
      </div>
    </>
  );
};

export default PieChart;
