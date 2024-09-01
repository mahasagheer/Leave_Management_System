import { Pie } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

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
