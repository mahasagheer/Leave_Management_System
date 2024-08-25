import { useEffect, useState } from "react";
import "../index.css";
import { useContext } from "react";
import { AuthContext } from "../service/authentication";
import axios from "axios";
import { useParams } from "react-router-dom";
import { leavehistorytable } from "../Utiles/TableHearer";
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
  const { id } = useParams();
  const [Loading, setLoading] = useState(false);
  console.log("12121212",data._id);
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
            console.log(res);
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
  }, [data]);
  console.log(leaveDetail);
  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-16">
          <div className="flex items-center h-25 mb-4 rounded ">
            <div className="py-8 pl-4">
              <FontAwesomeIcon icon={faHouse} size="xl" className="pb-2" />
              <p className="text-3xl "> Welcome back! </p>
              <p className="text-lg">
                Effortlessly manage your leave requests and stay on top of your
                time off with our intuitive system
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4 mb-4 px-3">
            <button className="relative group cursor-pointer  text-xl  overflow-hidden h-28 w-full sm:max-w-xl md:max-w-2xl lg:max-w-2xl xl:max-w-2xl rounded-md bg-[#e54d3e] text-white p-2 flex justify-center items-center  hover:scale-95 duration-300">
              <p className="z-10 flex items-center md:gap-2  md:text-lg">
                <FontAwesomeIcon icon={faCircleXmark} size="xl" />
                Rejected {leaveDetail?.rejected_leave}
              </p>
            </button>
            <button className="relative group cursor-pointer  text-xl text-white overflow-hidden h-28 w-full sm:max-w-xl md:max-w-2xl lg:max-w-2xl xl:max-w-2xl rounded-md bg-[#f1b146] p-2 flex justify-center items-center  hover:scale-95 duration-300">
              <p className="z-10 flex items-center  md:gap-2 md:text-lg">
                <FontAwesomeIcon icon={faHourglassHalf} size="xl" />
                Pending {leaveDetail?.pending_leave}
              </p>
            </button>
            <button className="relative group cursor-pointer text-xl text-white overflow-hidden h-28 w-full sm:max-w-xl md:max-w-2xl lg:max-w-2xl xl:max-w-2xl rounded-md bg-[#0fbfa5] p-2 flex justify-center items-center hover:scale-95 duration-300">
              <p className="z-10 flex items-center  md:gap-2  md:text-lg">
                <FontAwesomeIcon icon={faBell} size="xl" />
                Remaining {leaveDetail?.remaining_leave}
              </p>
            </button>
            <button className="relative group cursor-pointer  text-xl text-white overflow-hidden h-28 w-full sm:max-w-xl md:max-w-2xl lg:max-w-2xl xl:max-w-2xl rounded-md bg-[#656df0] p-2 flex justify-center items-center hover:scale-95 duration-300">
              <p className="z-10 flex items-center  md:gap-2  md:text-lg">
                <FontAwesomeIcon icon={faVirus} size="xl" />
                Sick {leaveDetail?.sick_leave}
              </p>
            </button>
          </div>
          <div className="overflow-x-auto w-full my-8 flex justify-center px-3">
            <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data.leave_type}
                      </td>
                      <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800 whitespace-nowrap">
                        {data.days}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data.from_date.substring(0, 10)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data.to_date.substring(0, 10)}
                      </td>
                      <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800 whitespace-nowrap">
                        {data.leave_application}
                      </td>
                      <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800 whitespace-nowrap">
                        {data.status}
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
