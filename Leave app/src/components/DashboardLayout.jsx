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
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../context/themeContext";

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
    isManager,
    setManager
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dataLeave, setDataLeave] = useState({});
  const [Data, setData] = useState([]);
  const local = localStorage.getItem("user");
  const { id } = useParams();
  const apiURL = import.meta.env.VITE_API;
  const [Loading, setLoading] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const { isDark, toggleTheme } = useContext(ThemeContext);

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

  useEffect(() => {
    let url = "";
    if (isAdmin) {
      url = `${apiURL}/inbox_messages/all_leaves/Pending`;
    } else if (isHR) {
      url = `${apiURL}/inbox_messages/hr_leave/Pending`;
    } else if (isManager) {
      url = `${apiURL}/inbox_messages/manager_leave/Pending`;
    }
    if (url) {
      axios.get(url, { headers: { Authorization: `${local}` } })
        .then(res => {
          setPendingCount(Array.isArray(res.data) ? res.data.length : 0);
        })
        .catch(() => setPendingCount(0));
    }
  }, [isAdmin, isHR, isManager, apiURL, local]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    if (isAdmin == true && data.name == "admin") {
      setAdmin(false);
    } else if (isHR == true) {
      setHR(false);
    } else if(isManager == true){
      setManager(false)
    } else{
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
        //style={{ backgroundColor: themeColor }}
        className={`fixed top-0 z-50 bg-white w-full transition-colors  duration-500 ease-in-out border-gray-200 dark:bg-gray-800 dark:border-gray-700 `}
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
              <a href="#" className="flex md:me-24">
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  <img
                    src={`${apiURL}/uploads/${logo}`}
                    alt="logo_picture"
                    className="w-[65%]"
                  />
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
                        onClick={toggleTheme}
                        className="ml-2 p-3 mr-4 rounded-[100%] bg-gray-100 dark:bg-gray-700 hover:bg-lime-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
                        aria-label="Toggle theme"
                        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                      >
                        <FontAwesomeIcon icon={isDark ? faSun : faMoon} className="text-xl text-yellow-400 dark:text-gray-200" />
                      </button>
                <button
                  type="button"
                  onClick={toggleDropdown}
                  className="flex text-xs sm:text-sm rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 min-w-[2.5rem] min-h-[2.5rem] rounded-full object-cover"
                    src={User}
                    alt="user photo"
                  />
                </button>
                

                {dropdownOpen && (
                  <div className="absolute top-14 right-0 mt-2 w-80 max-w-xs bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 animate-fadeIn z-50">
                    <div className="flex items-center gap-3 px-5 py-4">
                      <img
                        src={User}
                        alt="User avatar"
                        className="w-12 h-12 rounded-full object-cover border-2 border-lime-400 shadow-sm"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="block text-base font-semibold text-gray-900 dark:text-white truncate">{data.name}</span>
                        <span className="block text-xs text-gray-500 dark:text-gray-400 truncate">{data.email}</span>
                      </div>
                      
                    </div>
                    <div className="border-t border-gray-100 dark:border-gray-700"></div>
                    <div className="flex items-center px-5 py-3">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full justify-center px-4 py-2 rounded-lg text-sm font-medium bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-200 hover:bg-red-100 dark:hover:bg-red-800 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                      >
                        <FontAwesomeIcon icon={faRightFromBracket} />
                        <span>Log Out</span>
                      </button>
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
        }  sm:translate-x-0 bg-white dark:bg-gray-800`}
        aria-label="Sidebar"
      >
        <div
          className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800"
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
            {(isHR || isManager) && (
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
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white group"
                  >
                    <FontAwesomeIcon icon={faEnvelopeOpenText} />
                    <span className="ms-3">Apply Leave</span>
                  </Link>
                </li>
              </>
            )}
            {(isUser )&& (
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
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
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
                    <span className="ms-3">My Leave Inbox</span>
                  </Link>
                </li>
              </>
            )}
            {(isHR || isAdmin ||isManager ) && (
              <li>
                <Link
                  to="/inbox"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
                >
                  <FontAwesomeIcon icon={faInbox} />
                  <span className="flex-1 ms-3 whitespace-nowrap">Leave Inbox</span>
                  <span className="inline-flex items-center justify-center min-w-[1.5rem] h-6 px-2 ms-3 text-xs font-medium text-blue-800 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    {pendingCount}
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
          {/*  {isAdmin && (
              <li>
                <Link
                  to="/setting"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
                >
                  <FontAwesomeIcon icon={faGear} />
                  <span className="flex-1 ms-3 whitespace-nowrap">Setting</span>
                </Link>
              </li>
            )} */}
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default DashboardLayout;
