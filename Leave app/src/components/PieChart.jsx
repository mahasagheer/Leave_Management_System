import { Pie } from "react-chartjs-2";

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
