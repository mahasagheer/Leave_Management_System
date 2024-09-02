import { Doughnut } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

const PieChart = ({ chartData }) => {
  return (
    <>
      <div className="w-[30%]">
        <Doughnut data={chartData} />
      </div>
    </>
  );
};

export default PieChart;
