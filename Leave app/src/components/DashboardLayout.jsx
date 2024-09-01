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
  faGear,
} from "@fortawesome/free-solid-svg-icons";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    data,
    isUser,
    isHR,
    isAdmin,
    setAdmin,
    setUser,
    setHR,
    themeColor,
    logo,
  } = useContext(AuthContext);
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
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <div>
      <nav
        style={{ backgroundColor: themeColor }}
        className={`fixed top-0 z-50 w-full transition-colors  duration-500 ease-in-out border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 `}
      >
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-black rounded-lg sm:hidden  dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <FontAwesomeIcon icon={faBars} size="xl" />
                <span className="sr-only">Open sidebar</span>
              </button>
              <a href="#" className="flex ms-2 md:me-24">
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  {/* <img
                    src={`${apiURL}/uploads/${logo}`}
                    alt="logo_picture"
                    className="w-[65%]"
                  /> */}
                  <span className="self-center sm:text-3xl font-semibold whitespace-nowrap dark:text-white xs:text-2xl">
                    WORK PAUSE
                  </span>
                </span>
              </a>
            </div>
            <div className="flex items-center relative">
              <div className="flex items-center justify-center ms-3">
                {data && (
                  <div className="text-right mr-4 hidden sm:block">
                    <p className="text-sm sm:text-base invisible">
                      {data.name}
                    </p>
                    <p className="text-xs sm:text-sm invisible text-gray-500">
                      {data.email}
                    </p>
                  </div>
                )}
                <button
                  type="button"
                  onClick={toggleDropdown}
                  className="flex text-xs sm:text-sm rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                    src={User}
                    alt="user photo"
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute top-14 right-0 mt-2 sm:w-[100%] xs:w-[60vw]  max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-white rounded-lg shadow-lg border border-gray-200">
                    <div className="flex items-center px-3 sm:px-4 py-2">
                      <p className="ml-2 text-xs sm:text-sm text-gray-700">
                        <span className="block text-sm sm:text-base">
                          {data.name}
                        </span>
                        <span className="block text-xs sm:text-sm text-gray-500">
                          {data.email}
                        </span>
                      </p>
                    </div>
                    <div className="border-t border-gray-200"></div>
                    <div className="flex items-center px-3 sm:px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <a
                        onClick={handleLogout}
                        className="flex items-center p-2 w-full text-xs sm:text-sm text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
                      >
                        <FontAwesomeIcon icon={faRightFromBracket} />
                        <span className="flex-1 ml-2 sm:ml-3 whitespace-nowrap">
                          Log Out
                        </span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }  border-r  sm:translate-x-0 dark:bg-gray-800 `}
        aria-label="Sidebar"
        style={{ backgroundColor: themeColor }}
      >
        <div
          className={`h-full px-3 pb-4 overflow-y-auto bg-white  `}
          style={{ backgroundColor: themeColor }}
        >
          <ul className="space-y-2 font-medium">
            {isUser && (
              <li>
                <Link
                  to="/dashboard"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
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
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
                  >
                    <FontAwesomeIcon icon={faGauge} />
                    <span className="ms-3">Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Leave"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200  group"
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
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
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
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200  group"
                  >
                    <FontAwesomeIcon icon={faEnvelopeOpenText} />
                    <span className="ms-3">Apply Leave</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/inbox"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
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
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
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
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
                >
                  <FontAwesomeIcon icon={faUsers} />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Employee
                  </span>
                </Link>
              </li>
            )}
            {isAdmin && (
              <li>
                <Link
                  to="/setting"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
                >
                  <FontAwesomeIcon icon={faGear} />
                  <span className="flex-1 ms-3 whitespace-nowrap">Setting</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default DashboardLayout;
