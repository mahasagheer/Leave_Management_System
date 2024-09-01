import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Calender from "../components/Calender";
import PieChart from "../components/PieChart";

import axios from "axios";
import { leavehistorytable } from "../Utiles/TableHearer";
import { useReactToPrint } from "react-to-print";
import { ToastContainer, toast } from "react-toastify";
const user_detail = () => {
  const component = useRef();
  const [data, setData] = useState({});
  const [dataLeave, setDataLeave] = useState({});
  const local = localStorage.getItem("user");
  const { id } = useParams();
  const apiURL = import.meta.env.VITE_API;
  const [Loading, setLoading] = useState(false);
  const [leave, setLeave] = useState({});
  const notify = () => {
    toast.success("Report generated");
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiURL}/users/${id}`, {
        headers: {
          Authorization: `${local}`,
        },
      })
      .then((res) => {
        setData(res.data?.data);
        setLoading(false);
        setDataLeave(res.data?.leaves[0]);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${apiURL}/employee_leave_detail/${id}`, {
        headers: {
          Authorization: `${local}`,
        },
      })
      .then((res) => {
        setLeave(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const remaining_leave = leave.remaining_leave || 35;
  const sick_leave = leave.sick_leave || 15;
  const pending_leave = leave.pending_leave || 0;
  const annual_leave = leave.annual_leave || 0;
  const [leaveDetail, setLeaveDetail] = useState({
    labels: ["Remaining Leave", "Sick Leave", "Pending Leave", "Annual Leave"],
    datasets: [
      {
        label: "Leave Detail",
        data: [remaining_leave, sick_leave, pending_leave, annual_leave],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"],
      },
    ],
  });
  useEffect(() => {
    if (leave) {
      const remaining_leave = leave.remaining_leave || 0;
      const sick_leave = leave.sick_leave || 0;
      const pending_leave = leave.pending_leave || 0;
      const annual_leave = leave.annual_leave || 0;
      setLeaveDetail({
        labels: [
          "Remaining Leave",
          "Sick Leave",
          "Pending Leave",
          "Annual Leave",
        ],
        datasets: [
          {
            label: "Leave Detail",
            data: [remaining_leave, sick_leave, pending_leave, annual_leave],
            backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"],
          },
        ],
      });
    }
  }, [leave]);

  const handleGeneratePdf = useReactToPrint({
    content: () => component.current,
    documentTitle: "leaveDetail",
    onAfterPrint: () => notify(),
  });
  return (
    <>
      <section id="dashboard" className="p-4 sm:ml-64">
        {Loading && <div className="loader mx-auto mt-32"></div>}
        {!Loading && (
          <div className="p-4 border-2 border-[#4a9dc9] border-dashed rounded-lg dark:border-gray-700 mt-16">
            <h1 className="text-3xl font-bold text-center py-5">
              Employee Detail
            </h1>
            <div className="flex flex-col md:flex-row justify-between px-4 md:px-10 gap-8">
              <div>
                <p className="text-2xl py-3 font-semibold">Personal Detail:</p>
                <p className="text-lg">
                  <strong>Name:</strong> {data.name}
                </p>
                <p className="text-lg">
                  <strong>Email:</strong> {data.email}
                </p>
                <p className="text-lg">
                  <strong>Age:</strong> {data.age}
                </p>
                <p className="text-lg">
                  <strong>City:</strong> {data.city}
                </p>
                <p className="text-lg">
                  <strong>Gender:</strong> {data.gender}
                </p>
              </div>
              <div>
                <p className="text-2xl py-3 font-semibold">Job Position:</p>
                <p className="text-lg">
                  <strong>Salary:</strong> {data.salary}
                </p>
                <p className="text-lg">
                  <strong>Job Title:</strong> {data.Job_title}
                </p>
                <p className="text-lg">
                  <strong>Department:</strong> {data.department}
                </p>
                <p className="text-lg">
                  <strong>Hiring Date:</strong> {data.hire_date}
                </p>
                <p className="text-lg">
                  <strong>Exit Date:</strong> {data.exit_date}
                </p>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-evenly mt-8 mx-[6%] ">
              <Calender id={id} />
            </div>

            <h1 className="text-3xl font-bold text-center mt-8">
              Employee Leave History
            </h1>

            <div className="text-center text-xl" ref={component}>
              {data.name}
              <div className="overflow-x-auto w-full my-8">
                <table className="min-w-full text-sm text-left rtl:text-right text-black dark:text-gray-400">
                  <thead className="text-xs text-black uppercase dark:text-gray-400 bg-[#90d7f5]">
                    <tr>
                      {leavehistorytable?.map((item, index) => (
                        <th scope="col" key={index} className="px-6 py-3">
                          {item}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  {dataLeave?.messages?.map((data) => (
                    <tbody key={data._id}>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-6 py-4">{data.leave_type}</td>
                        <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                          {data.days}
                        </td>
                        <td className="px-6 py-4">
                          {data.from_date.substring(0, 10)}
                        </td>
                        <td className="px-6 py-4">
                          {data.to_date.substring(0, 10)}
                        </td>
                        <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                          {data.leave_application}
                        </td>
                        <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                          {data.status}
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleGeneratePdf}
              >
                Generate PDF
              </button>
            </div>
          </div>
        )}

        <ToastContainer limit="1" />
      </section>
    </>
  );
};

export default user_detail;
