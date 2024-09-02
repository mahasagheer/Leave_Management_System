import { useEffect, useState } from "react";
import "../index.css";
import { useContext } from "react";
import { AuthContext } from "../service/authentication";
import axios from "axios";
import { useParams } from "react-router-dom";
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

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiURL}/users/${data._id}`, {
        headers: {
          Authorization: `${local}`,
        },
      })
      .then((res) => {
        console.log(res.data);
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
  const remaining_leave = leaveDetail.remaining_leave || 35;
  const sick_leave = leaveDetail.sick_leave || 15;
  const pending_leave = leaveDetail.pending_leave || 0;
  const annual_leave = leaveDetail.annual_leave || 0;
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
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-16">
          <div className="flex items-center h-25 mb-4 rounded ">
            <div className="py-6 pl-4">
              <FontAwesomeIcon icon={faHouse} size="xl" className="pb-2" />
              <p className="text-3xl "> Hi {data.name}! </p>
              <p className="text-lg">
                Effortlessly manage your leave requests and stay on top of your
                time off with our intuitive system
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-4 px-2 sm:px-3 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
            <button className="relative group cursor-pointer text-lg sm:text-xl overflow-hidden w-full rounded-md p-2 flex justify-center items-center">
              <p className="z-10 flex flex-col items-center gap-1 sm:gap-2 text-sm sm:text-lg">
                <span className="text-base sm:text-xl">Leave Dates</span>
                <Calendar id={data._id} />
              </p>
            </button>

            <button className="relative group cursor-pointer text-lg sm:text-xl overflow-hidden w-full rounded-md p-2 flex justify-center items-center">
              <p className="z-10 flex flex-col items-center gap-1 sm:gap-2 text-sm sm:text-lg">
                <span className="text-base sm:text-xl">Leave Detail</span>
                <PieChart chartData={leave} />
              </p>
            </button>

            <div className="flex gap-4 flex-col">
              <button className="relative group cursor-pointer text-lg sm:text-xl text-white overflow-hidden w-full h-[50%] rounded-md bg-[#36A2EB] p-2 flex justify-center items-center hover:scale-95 duration-300">
                <div>
                  <p className="z-10 flex items-center gap-1 sm:gap-2 text-sm sm:text-lg">
                    <FontAwesomeIcon icon={faBell} size="lg" />
                    <span className="text-sm sm:text-base">
                      Remaining {leaveDetail?.remaining_leave}
                    </span>
                  </p>
                </div>
              </button>

              <button className="relative group cursor-pointer text-lg sm:text-xl text-white overflow-hidden w-full h-[50%] rounded-md bg-[#FF6384] p-2 flex justify-center items-center hover:scale-95 duration-300">
                <p className="z-10 flex items-center gap-1 sm:gap-2 text-sm sm:text-lg">
                  <FontAwesomeIcon icon={faVirus} size="lg" />
                  <span className="text-sm sm:text-base">
                    Sick {leaveDetail?.sick_leave}
                  </span>
                </p>
              </button>
            </div>

            <div className="flex gap-4 flex-col">
              <button className="relative group cursor-pointer text-lg sm:text-xl text-white overflow-hidden w-full h-[50%] rounded-md bg-[#FFCE56] p-2 flex justify-center items-center hover:scale-95 duration-300">
                <div>
                  <p className="z-10 flex items-center gap-1 sm:gap-2 text-sm sm:text-lg">
                    <FontAwesomeIcon icon={faHourglassHalf} size="lg" />
                    <span className="text-sm sm:text-base">
                      Pending {leaveDetail?.pending_leave}
                    </span>
                  </p>
                </div>
              </button>

              <button className="relative group cursor-pointer text-lg sm:text-xl text-white overflow-hidden w-full h-[50%] rounded-md bg-[#4BC0C0] p-2 flex justify-center items-center hover:scale-95 duration-300">
                <p className="z-10 flex items-center gap-1 sm:gap-2 text-sm sm:text-lg">
                  <FontAwesomeIcon icon={faCircleXmark} size="lg" />
                  <span className="text-sm sm:text-base">
                    Annual {leaveDetail?.annual_leave}
                  </span>
                </p>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto w-full my-8 flex justify-center px-6  ">
            <table className="w-full text-sm text-left rtl:text-right ">
              <thead className="text-xs text-black uppercase dark:text-gray-400 bg-[#7cc5fa]">
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
              {dataLeave?.messages?.map((data) => {
                return (
                  <tbody key={data._id}>
                    <tr className="border-b px-2 sm:px-4">
                      <td className="p-1 sm:p-2 whitespace-nowrap">
                        {data.leave_type}
                      </td>
                      <td className="p-1 sm:p-2 whitespace-nowrap">
                        {data.days}
                      </td>
                      <td className="p-1 sm:p-2 whitespace-nowrap">
                        {data.from_date.substring(0, 10)}
                      </td>
                      <td className="p-1 sm:p-2 whitespace-nowrap">
                        {data.to_date.substring(0, 10)}
                      </td>
                      <td className="p-1 sm:p-2 whitespace-nowrap">
                        {data.leave_application
                          ? data.leave_application
                              .split(" ")
                              .slice(0, 3)
                              .join(" ") + "..."
                          : ""}
                      </td>
                      <td className="p-1 sm:p-2 whitespace-nowrap">
                        {data.status}
                      </td>
                      <td className="p-1 sm:p-2 whitespace-nowrap">
                        <button
                          onClick={sendLeaveReminder}
                          disabled={
                            data.status === "Approved" ||
                            data.status === "Declined" ||
                            !data?.reminder
                          }
                          className={`px-2 py-1 sm:px-3 sm:py-2 text-white ${
                            data.status === "Approved" ||
                            data.status === "Declined" ||
                            !data.reminder
                              ? "bg-gray-400"
                              : "bg-blue-500"
                          } rounded`}
                        >
                          {data.status === "Approved" ||
                          data.status === "Declined"
                            ? "Actioned"
                            : "Notify"}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default dashboard;
