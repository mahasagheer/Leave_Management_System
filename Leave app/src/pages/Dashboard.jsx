import { useEffect, useState } from "react";
import "../index.css";
import { useContext } from "react";
import { AuthContext } from "../service/authentication";
import axios from "axios";
import { leavehistorytable } from "../Utiles/TableHearer";
import { ToastContainer, toast } from "react-toastify";
import PieChart from "../components/PieChart";
import Calendar from "../components/Calender";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faHourglassHalf,
  faBell,
  faVirus,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function CircularProgressBar({ value, max, color, label }) {
  const radius = 36;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const percent = Math.min(100, Math.round((value / max) * 100));
  const strokeDashoffset = circumference - (percent / 100) * circumference;
  return (
    <div className="flex flex-col items-center">
      <svg height={radius * 2} width={radius * 2} className="mb-2">
        <circle
          stroke="#E5E7EB"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s' }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy="0.3em"
          className="text-xl font-bold fill-gray-900 dark:fill-white"
        >
          {value}
        </text>
      </svg>
      <span className="text-sm text-gray-500 text-center leading-tight">{label}</span>
    </div>
  );
}

function statusBadge(status) {
  if (status === "HR Approved") return "bg-blue-100 text-blue-700 border-blue-300";
  if (status === "Manager Approved") return "bg-teal-100 text-teal-700 border-teal-300";
  if (status === "Rejected by Manager") return "bg-orange-100 text-orange-700 border-orange-300";
  if (status === "Admin Approved") return "bg-blue-100 text-blue-700 border-blue-300";
  if (status === "Admin Rejected") return "bg-red-100 text-red-700 border-red-300";
  if (status === "Approved") return "bg-green-100 text-green-700 border-green-300";
  if (status === "Declined") return "bg-red-100 text-red-700 border-red-300";
  if (status === "Pending") return "bg-yellow-100 text-yellow-700 border-yellow-300";
  return "bg-gray-100 text-gray-700 border-gray-300";
}

const dashboard = () => {
  const { data } = useContext(AuthContext);
  const [leaveDetail, setLeaveDetail] = useState([]);
  const apiURL = import.meta.env.VITE_API;
  const [Data, setData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dataLeave, setDataLeave] = useState({});
  const local = localStorage.getItem("user");
  const userdata = JSON.parse(local)?.data;
  const [datahandler, setDatahandler] = useState(false);
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiURL}/users/${data._id}`, {
        headers: {
          Authorization: `${local}`,
        },
      })
      .then((res) => {
        axios
          .get(`${apiURL}/employee_leave_detail/${data._id}`)
          .then((res) => {
            setLeaveDetail(res.data);
          })
          .catch((err) => console.log(err));
        setData(res.data?.data);
        setLoading(false);
        setDataLeave(res.data?.leaves[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data, datahandler]);

  const sendLeaveReminder = () => {
    axios
      .post(
        `${apiURL}/send_email/leave/reminder`,
        {
          name: userdata?.name,
          email: userdata?.email,
        },
        {
          headers: {
            Authorization: `${local}`,
          },
        }
      )
      .then((res) => {
        setDatahandler(!datahandler);
        toast.success("Reminder Mail sent Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
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
  };
  const remaining_leave = leaveDetail?.remaining_leave ?? 35;
  const sick_leave = leaveDetail?.sick_leave ?? 15;
  const pending_leave = leaveDetail?.pending_leave ?? 0;
  const annual_leave = leaveDetail?.annual_leave ?? 0;
  const [leave, setLeave] = useState({
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
    if (leaveDetail) {
      const remaining_leave = leaveDetail.remaining_leave || 0;
      const sick_leave = leaveDetail.sick_leave || 0;
      const pending_leave = leaveDetail.pending_leave || 0;
      const annual_leave = leaveDetail.annual_leave || 0;
      setLeave({
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
  }, [leaveDetail]);
  return (
    <>
      <ToastContainer />
      <div className="p-2 sm:p-6 md:p-4 mt-[3%] sm:ml-64 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        {Loading && <div className="loader mx-auto mt-32"></div>}
        {!Loading && (
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
            {/* LEFT COLUMN: Leave Management, Calendar */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              {/* Leave Management Section */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                <div className="flex flex-col md:flex-row gap-8 flex-1">
                  {/* Circular Progress Bars */}
                  <div className="flex flex-row gap-8 items-center">
                    <CircularProgressBar
                      value={leaveDetail?.remaining_leave ?? 15}
                      max={30}
                      color="#36A2EB"
                      label={<>Remaining Leave</>}
                    />
                    <CircularProgressBar
                      value={leaveDetail?.sick_leave ?? 1}
                      max={15}
                      color="#FF6384"
                      label={<>Sick Leave</>}
                    />
                    <CircularProgressBar
                      value={leaveDetail?.pending_leave ?? 4}
                      max={10}
                      color="#FFCE56"
                      label={<>Pending Leave</>}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button
                    className="bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full px-6 py-3 shadow transition-all text-base"
                    onClick={() => navigate('/Leave')}
                  >
                    Request a Leave
                  </button>
                </div>
              </div>

              {/* Calendar Section */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-0">Calendar</h2>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold">Month</button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <Calendar id={data._id} />
                </div>
                {/* Legend */}
                <div className="flex flex-wrap gap-4 mt-4 text-xs">
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-400 inline-block"></span>Pending Leave</span>

                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Public Holidays, Pie Chart */}
            <div className="flex flex-col gap-8">
              {/* Upcoming Public Holidays Section */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col gap-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Upcoming Public Holidays</h2>
                <ul className="flex flex-col gap-3 max-h-96 overflow-y-auto pr-2">
                  {/* Example holidays, replace with real data if available */}
                  <li className="flex flex-col gap-1 border-b pb-2">
                    <span className="text-xs text-gray-400">Jul 08, 2022 &bull; Friday</span>
                    <span className="font-medium text-gray-800 dark:text-gray-100">Arafat Day</span>
                  </li>
                  <li className="flex flex-col gap-1 border-b pb-2">
                    <span className="text-xs text-gray-400">Jul 09, 2022 &bull; Saturday</span>
                    <span className="font-medium text-gray-800 dark:text-gray-100">Eid al-Adha</span>
                  </li>
                  <li className="flex flex-col gap-1 border-b pb-2">
                    <span className="text-xs text-gray-400">Jul 10, 2022 &bull; Sunday</span>
                    <span className="font-medium text-gray-800 dark:text-gray-100">Eid al-Adha Holiday</span>
                  </li>
                  {/* ...more holidays... */}
                </ul>
              </div>
              {/* Pie Chart Section (after holidays) */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Leave Breakdown</h2>
                <div className="w-full flex justify-center">
                  <PieChart chartData={leave} />
                  </div>
              </div>
            </div>
          </div>
        )}
        {/* Leave Record Table: Full width below all cards */}
        {!Loading && (
          <div className="max-w-7xl mx-auto mt-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all duration-300 overflow-x-auto">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Leave Record</h2>
              <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-200">
                <thead className="text-xs uppercase bg-[#90d7f5] dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                  <tr>
                    {leavehistorytable?.map((item, index) => (
                      <th
                        scope="col"
                        key={index}
                        className="px-6 py-3 whitespace-nowrap"
                      >
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataLeave?.messages?.map((data) => (
                    <tr key={data._id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4">{data.leave_type}</td>
                      <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow border ${statusBadge(data.status)}`}>
                          {data.status}
                        </span>
                        </td>
                      <td className="px-6 py-4">{data.from_date.substring(0, 10)}</td>
                      <td className="px-6 py-4">{data.to_date.substring(0, 10)}</td>
                      <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">{data.leave_application ? data.leave_application.split(" ").slice(0, 3).join(" ") + "..." : ""}</td>
                      <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">{data.status}</td>
                      <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                          <button
                            onClick={sendLeaveReminder}
                            disabled={
                              data.status === "Approved" ||
                              data.status === "Declined" ||
                              !data?.reminder
                            }
                          className={`px-2 py-1 sm:px-3 sm:py-2 text-white transition-all duration-200 ${
                              data.status === "Approved" ||
                              data.status === "Declined" ||
                              !data.reminder
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-blue-500 hover:bg-blue-600"
                            } rounded`}
                          >
                          {data.status === "Approved" || data.status === "Declined"
                              ? "Actioned"
                              : "Notify"}
                          </button>
                        </td>
                      </tr>
                  ))}
                    </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default dashboard;
