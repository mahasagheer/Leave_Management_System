import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../service/authentication";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faPenToSquare,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Deleteuser from "../components/deleteuser";
import UserAvatar from "../public/userImg.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const User = () => {
  const { data, isAdmin } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const local = localStorage.getItem("user");
  const apiURL = import.meta.env.VITE_API;
  const [Loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get(`${apiURL}/users`, {
        headers: {
          Authorization: `${local}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserDelete = (id, name) => {
    setUsers(users.filter((user) => user._id !== id));
    toast.success(`${name} deleted successfully!`);
  };
  let filter;
  if (data.role === "Manager") {
    filter = users.filter((data) => data.role === "user");
  }
  if (data.role === "admin" ||  data.role === "HR") {
    filter = users.filter((data) => data.role === "user" || data.role === "HR" || data.role === "Manager");
  }
  return (
    <section id="user" className="p-0 sm:p-4 sm:ml-64 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {Loading && <div className="loader ml-[50%] mt-[25%]"></div>}
      {!Loading && (
        <div className="flex flex-col gap-4 h-auto mt-16">
          <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow p-4 overflow-x-auto">
            <ToastContainer />
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl sm:text-3xl text-gray-900 dark:text-white">
                  Viewing All Employees {isAdmin ? `(${users.length - 1})` : `(${filter.length})`}
                </h1>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-400" />
                  </span>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                  />
                </div>
                <Link
                  to="/new_user"
                  className="flex items-center gap-2 bg-[#90d7f5] hover:bg-blue-400 text-black dark:bg-blue-600 dark:hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2.5 transition focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow"
                >
                  <FontAwesomeIcon icon={faUserPlus} />
                  <span>Add Employee</span>
                </Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-gray-800 text-sm text-left text-gray-700 dark:text-gray-400 rounded-lg">
                <thead className="bg-[#90d7f5] dark:bg-gray-700 text-xs uppercase text-gray-700 dark:text-gray-200">
                  <tr>
                    <th className="px-4 py-3">Avatar</th>
                    <th className="px-4 py-3">Employee ID</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Job Title</th>
                    <th className="px-4 py-3">Hire Date</th>
                    <th className="px-4 py-3">Salary</th>
                    <th className="px-4 py-3">Department</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Update/Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {filter
                    .filter((item) => {
                      return search.toLowerCase() === ""
                        ? item
                        : item.name.toLowerCase().includes(search);
                    })
                    .map((data) => (
                      <tr
                        key={data._id}
                        className="border-b border-gray-100 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors group"
                      >
                        <td className="px-4 py-4">
                          <img src={UserAvatar} alt="User" className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-600 shadow-sm" />
                        </td>
                        <td className="px-4 py-4 font-bold underline text-sky-600">
                          <Link to={`/user/${data._id}`}>{data._id}</Link>
                        </td>
                        <td className="px-4 py-4 font-semibold text-gray-900 dark:text-white">{data.name}</td>
                        <td className="px-4 py-4">{data.Job_title}</td>
                        <td className="px-4 py-4">{data.hire_date.substring(0, 10)}</td>
                        <td className="px-4 py-4">{data.salary}$</td>
                        <td className="px-4 py-4">{data.department}</td>
                        <td className="px-4 py-4">{data.email}</td>
                        <td className="px-4 py-4 dark:bg-gray-800">
                          <div className="flex justify-center gap-4">
                            <Link to={`/update_user/${data._id}`}>
                              <button className="text-blue-700 hover:text-blue-900 transition-colors">
                                <FontAwesomeIcon icon={faPenToSquare} size="lg" />
                              </button>
                            </Link>
                            <Deleteuser id={data._id} onDelete={() => handleUserDelete(data._id, data.name)} />
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default User;
