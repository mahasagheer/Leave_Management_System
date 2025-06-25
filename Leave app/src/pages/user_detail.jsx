import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Calender from "../components/Calender";

import axios from "axios";
import { leavehistorytable } from "../Utiles/TableHearer";
import { useReactToPrint } from "react-to-print";
import { ToastContainer, toast } from "react-toastify";
import UserAvatar from "../public/userImg.png";

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
    <section id="user-profile" className="p-0 sm:p-4 sm:ml-64 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {Loading && <div className="loader ml-[50%] mt-[25%]"></div>}
        {!Loading && (
        <div className="flex flex-col gap-6 mt-20">
          {/* Top: Profile Card, Calendar, Leave Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center relative overflow-visible">
              <div className="relative mb-4">
                <span className="absolute -inset-1 rounded-full bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400 blur-lg opacity-60 animate-spin-slow"></span>
                <img src={UserAvatar} alt="User Avatar" className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-xl relative z-10" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{data.name}</h2>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-300 shadow">Active</span>
              </div>
              <div className="text-blue-500 dark:text-blue-300 font-semibold mb-1">{data.Job_title || "-"}</div>
              <div className="text-gray-400 text-sm mb-2">{data.department || "-"}</div>
              <div className="flex flex-col gap-1 mb-2">
                <span className="text-gray-700 dark:text-gray-200 text-sm"><strong>Role:</strong> {data.role}</span>
                <span className="text-gray-700 dark:text-gray-200 text-sm"><strong>Email:</strong> {data.email}</span>
                {data.phone && <span className="text-gray-700 dark:text-gray-200 text-sm"><strong>Phone:</strong> {data.phone}</span>}
              </div>
            </div>
            {/* Calendar */}
            <div className="col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center">
              <Calender id={id} />
            </div>
            {/* Leave Stats */}
            <div className="col-span-1 flex flex-col gap-6">
              <div className="bg-gradient-to-tr from-blue-100 to-blue-300 dark:from-blue-900 dark:to-blue-700 rounded-2xl shadow-xl p-6 flex-1 flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 17l4 4 4-4m0-5V3m-8 4v10a4 4 0 004 4h4a4 4 0 004-4V7a4 4 0 00-4-4H8a4 4 0 00-4 4v10a4 4 0 004 4h4" /></svg>
                  <h2 className="text-lg font-bold text-blue-800 dark:text-blue-200">Leave Balances</h2>
                </div>
                <ul className="space-y-2 text-base">
                  <li><strong>Remaining:</strong> {leave.remaining_leave ?? 0}</li>
                  <li><strong>Sick:</strong> {leave.sick_leave ?? 0}</li>
                  <li><strong>Pending:</strong> {leave.pending_leave ?? 0}</li>
                  <li><strong>Annual:</strong> {leave.annual_leave ?? 0}</li>
                </ul>
              </div>
              <div className="bg-gradient-to-tr from-green-100 to-green-300 dark:from-green-900 dark:to-green-700 rounded-2xl shadow-xl p-6 flex-1 flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <h2 className="text-lg font-bold text-green-800 dark:text-green-200">Leave Requests</h2>
                </div>
                {Array.isArray(dataLeave?.messages) ? (
                  <ul className="space-y-2 text-base">
                    <li><strong>Total:</strong> {dataLeave.messages.length}</li>
                    <li><strong>Pending:</strong> {dataLeave.messages.filter(l => l.status === 'Pending').length}</li>
                    <li><strong>Approved:</strong> {dataLeave.messages.filter(l => l.status === 'Approved').length}</li>
                    <li><strong>Declined:</strong> {dataLeave.messages.filter(l => l.status === 'Declined').length}</li>
                  </ul>
                ) : (
                  <p className="text-gray-400">No leave requests found.</p>
                )}
              </div>
              </div>
            </div>

          {/* Info Cards: Only show fields that exist in backend */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Basic Info */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col gap-2">
              <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">Basic Information</h3>
              <div className="flex flex-wrap gap-4 mb-2">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Hire Date</span>
                  <span className="font-medium text-gray-900 dark:text-white">{data.hire_date ? data.hire_date.substring(0, 10) : '-'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Employee ID</span>
                  <span className="font-medium text-gray-900 dark:text-white">{data._id}</span>
                </div>
              </div>
            </div>
            {/* Personal Info */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col gap-2">
              <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">Personal Information</h3>
              <div className="flex flex-wrap gap-4 mb-2">
                {data.city && (
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">City</span>
                    <span className="font-medium text-gray-900 dark:text-white">{data.city}</span>
                  </div>
                )}
                {data.address && (
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Address</span>
                    <span className="font-medium text-gray-900 dark:text-white">{data.address}</span>
                  </div>
                )}
              </div>
            </div>
            {/* Occupation Info */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col gap-2">
              <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">Occupation Information</h3>
              <div className="flex flex-wrap gap-4 mb-2">
                {data.department && (
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-400">Department</span>
                    <span className="font-medium text-gray-900 dark:text-white">{data.department}</span>
                  </div>
                )}
                {data.staff_type && (
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-400">Type</span>
                    <span className="font-medium text-gray-900 dark:text-white">{data.staff_type}</span>
                  </div>
                )}
              </div>
            </div>
            </div>

          {/* Leave History Table & PDF Button */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mt-2">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Employee Leave History</h2>
            <div className="overflow-x-auto w-full my-4" ref={component}>
              <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-200">
                <thead className="text-xs uppercase bg-[#90d7f5] dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                    <tr>
                      {leavehistorytable?.map((item, index) => (
                      <th scope="col" key={index} className="px-6 py-3">{item}</th>
                      ))}
                    </tr>
                  </thead>
                <tbody>
                  {dataLeave?.messages?.map((data) => (
                    <tr key={data._id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="px-6 py-4">{data.leave_type}</td>
                      <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">{data.days}</td>
                      <td className="px-6 py-4">{data.from_date.substring(0, 10)}</td>
                      <td className="px-6 py-4">{data.to_date.substring(0, 10)}</td>
                      <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">{data.leave_application}</td>
                      <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">{data.status}</td>
                      </tr>
                  ))}
                </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition"
                onClick={handleGeneratePdf}
              >
                Generate PDF
              </button>
            </div>
            </div>
          </div>
        )}
        <ToastContainer limit="1" />
      </section>
  );
};

export default user_detail;
