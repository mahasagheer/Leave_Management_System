import React, { useState, useEffect } from "react";
import User from "../public/userImg.png";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../service/authentication";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faUser,
  faEnvelopeOpenText,
  faEnvelopesBulk,
  faUsers,
  faRightFromBracket,
  faInbox,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { leavehistorytable } from "../Utiles/TableHearer";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data, isUser, isHR, isAdmin, setAdmin, setUser, setHR } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [dataLeave, setDataLeave] = useState({});
  const [Data, setData] = useState([]);
  const local = localStorage.getItem("user");
  const { id } = useParams();
  const apiURL = import.meta.env.VITE_API;
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
        setData(res.data?.data);
        setLoading(false);
        setDataLeave(res.data?.leaves[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("user");
    if (isAdmin == true && data.name == "admin") {
      setAdmin(false);
    } else if (isHR == true) {
      setHR(false);
    } else {
      setUser(false);
    }
    navigate("/");
  };
  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <FontAwesomeIcon icon={faBars} />
                <span className="sr-only">Open sidebar</span>
              </button>
              <a href="#" className="flex ms-2 md:me-24">
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  WORK PAUSE
                </span>
              </a>
            </div>
            <div className="flex items-center ">
              <div className="flex items-center justify-center ms-3">
                {data && (
                  <div className="text-right mr-4">
                    <p>{data.name}</p>
                    <p>{data.email}</p>
                  </div>
                )}
                <button
                  type="button"
                  className="flex text-sm rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                >
                  <span className="sr-only">Open user menu</span>

                  <img
                    className="w-10 h-10 rounded-full"
                    src={User}
                    alt="user photo"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {isUser && (
              <li>
                <Link
                  to="/dashboard"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#4a9dc9] dark:hover:bg-gray-700 group"
                >
                  <FontAwesomeIcon icon={faGauge} />
                  <span className="ms-3">Dashboard</span>
                </Link>
              </li>
            )}
            {isHR && (
              <>
                <li>
                  <Link
                    to="/dashboard"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#90d7f5] dark:hover:bg-gray-700 group"
                  >
                    <FontAwesomeIcon icon={faGauge} />
                    <span className="ms-3">Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Leave"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#90d7f5]  group"
                  >
                    <FontAwesomeIcon icon={faEnvelopeOpenText} />
                    <span className="ms-3">Apply Leave</span>
                  </Link>
                </li>
              </>
            )}
            {isUser && (
              <>
                <li>
                  <Link
                    to="/my_profile"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#90d7f5] dark:hover:bg-gray-700 group"
                  >
                    <FontAwesomeIcon icon={faUser} />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      My Profile
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Leave"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#90d7f5]  group"
                  >
                    <FontAwesomeIcon icon={faEnvelopeOpenText} />
                    <span className="ms-3">Apply Leave</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/inbox"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#90d7f5] dark:hover:bg-gray-700 group"
                  >
                    <FontAwesomeIcon icon={faEnvelopesBulk} />
                    <span className="ms-3">View Leave</span>
                  </Link>
                </li>
              </>
            )}
            {(isHR || isAdmin) && (
              <li>
                <Link
                  to="/inbox"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#90d7f5] dark:hover:bg-gray-700 group"
                >
                  <FontAwesomeIcon icon={faInbox} />
                  <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                  <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-xs font-medium text-blue-800 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    New
                  </span>
                </Link>
              </li>
            )}
            {(isAdmin || isHR) && (
              <li>
                <Link
                  to="/user"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#90d7f5] dark:hover:bg-gray-700 group"
                >
                  <FontAwesomeIcon icon={faUsers} />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Employee
                  </span>
                </Link>
              </li>
            )}
            <li>
              <a
                onClick={handleLogout}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#90d7f5] dark:hover:bg-gray-700 group"
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
                <span className="flex-1 ms-3 whitespace-nowrap">Log Out</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default DashboardLayout;
