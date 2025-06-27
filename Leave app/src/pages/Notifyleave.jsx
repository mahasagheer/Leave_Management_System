import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../service/authentication";
import axios from "axios";
import { leavehistorytable } from "../Utiles/TableHearer";
import { ToastContainer, toast } from "react-toastify";
import Modal from "../components/Model.jsx";
import User from "../public/userImg.png";

export default function NotifyLeave() {
  const { data } = useContext(AuthContext);
  const [dataLeave, setDataLeave] = useState({});
  const [Loading, setLoading] = useState(false);
  const [datahandler, setDatahandler] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const apiURL = import.meta.env.VITE_API;
  const local = localStorage.getItem("user");
  const userdata = JSON.parse(local)?.data;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiURL}/users/${data._id}`, {
        headers: {
          Authorization: `${local}`,
        },
      })
      .then((res) => {
        setDataLeave(res.data?.leaves[0]);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
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
  };

  const openModal = (leave) => {
    setSelectedLeave(leave);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLeave(null);
  };

  return (
    <>
       <section
      id="inbox"
      className="p-0 sm:p-4 sm:ml-64  sm:t-50 bg-gray-50 dark:bg-gray-900 min-h-screen"
    >
      <ToastContainer />
      <div className="p-2 sm:p-2 md:p-2 mt-[2%] bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {Loading && <div className="loader mx-auto mt-32"></div>}
        {!Loading && (
          <div className="max-w-7xl mx-auto mt-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all duration-300 overflow-x-auto">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Leave Record
              </h2>
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
                    <tr
                      key={data._id}
                      className="border-b border-gray-100 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                      onClick={() => openModal(data)}
                    >
                      <td className="px-6 py-4">{data.leave_type}</td>
                      <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold shadow border`}
                        >
                          {data.days}
                        </span>
                      </td>
                      <td className="px-6 py-4">{data.from_date.substring(0, 10)}</td>
                      <td className="px-6 py-4">{data.to_date.substring(0, 10)}</td>
                      <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                        {data.leave_application
                          ? data.leave_application.split(" ").slice(0, 3).join(" ") + "..."
                          : ""}
                      </td>
                      <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                        {["Admin Approved", "Hr Approved"].includes(data.status)
                          ? "Approved"
                          : [
                              "Admin Rejected",
                              "Hr Rejected",
                              "Manager Rejected",
                            ].includes(data.status)
                          ? "Rejected"
                          : "Pending"}
                      </td>
                      <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                        <button
                          onClick={(e) => { e.stopPropagation(); sendLeaveReminder(); }}
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
      {isModalOpen && selectedLeave && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-lg w-full relative animate-fadeIn">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
              onClick={closeModal}
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="flex items-center gap-4 border-b pb-4 mb-4">
              <img
                src={User}
                alt="User"
                className="w-14 h-14 rounded-full object-cover border-2 border-blue-400 shadow"
              />
              <div>
                <div className="font-bold text-lg text-gray-900 dark:text-white">
                  {selectedLeave.name || data.name}
                </div>
                <div className="text-sm text-gray-500">
                  {selectedLeave.email || data.email}
                </div>
                <div className="text-xs text-gray-400">
                  {selectedLeave.createdAt ? new Date(selectedLeave.createdAt).toLocaleString() : ""}
                </div>
              </div>
              <span
                className={`ml-auto px-2 py-1 rounded-full text-xs border font-semibold ${
                  ["Admin Approved", "HR Approved", "Manager Approved", "Approved"].includes(selectedLeave.status)
                    ? "bg-green-100 text-green-700 border-green-300"
                    : ["Admin Rejected", "HR Rejected", "Manager Rejected", "Declined"].includes(selectedLeave.status)
                    ? "bg-red-100 text-red-700 border-red-300"
                    : selectedLeave.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                    : "bg-gray-100 text-gray-700 border-gray-300"
                }`}
              >
                {selectedLeave.status}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-xs text-gray-500">From</div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {selectedLeave.from_date
                    ? new Date(selectedLeave.from_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : ""}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500">To</div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {selectedLeave.to_date
                    ? new Date(selectedLeave.to_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : ""}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Days</div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {selectedLeave.days}
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="text-xs text-gray-500 mb-1">Application</div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded p-3 text-gray-900 dark:text-white whitespace-pre-line max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-100">
                {selectedLeave.leave_application}
              </div>
            </div>
           {/*  {selectedLeave.reminder && (
              <div className="mb-4">
                <div className="text-xs text-gray-500 mb-1">Reminder</div>
                <div className="bg-blue-50 dark:bg-blue-900 rounded p-2 text-blue-800 dark:text-blue-200">
                  {selectedLeave.reminder}
                </div>
              </div>
            )}
              */}
            <div className="flex justify-end mt-6">
              <button
                onClick={() => { sendLeaveReminder(); closeModal(); }}
                disabled={
                  selectedLeave.status === "Approved" ||
                  selectedLeave.status === "Declined" ||
                  !selectedLeave?.reminder
                }
                className={`px-6 py-2 rounded-lg font-semibold shadow transition-all duration-200 text-white text-base focus:outline-none focus:ring-2 focus:ring-blue-400
                  ${
                    selectedLeave.status === "Approved" ||
                    selectedLeave.status === "Declined" ||
                    !selectedLeave.reminder
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }
                `}
              >
                Notify
              </button>
            </div>
          </div>
        </div>
      )}
      </section>
    </>
  );
}