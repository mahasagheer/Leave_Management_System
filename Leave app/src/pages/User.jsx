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

  const handleUserDelete = (id) => {
    setUsers(users.filter((user) => user._id !== id));
  };
  let filter;
  if (data.role === "HR") {
    filter = users.filter((data) => data.role === "user");
  }
  if (data.role === "admin") {
    filter = users.filter((data) => data.role === "user" || data.role === "HR");
  }
  return (
    <>
      <section id="user">
        <div className="p-2 sm:ml-64">
          <div className="  h-auto  dark:border-gray-700  mt-16">
            {Loading && <div className=" loader ml-[50%] mt-[25%]"></div>}
            {!Loading && (
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-3">
                <div className="flex flex-col lg:flex-row md:flex-col justify-between sm:flex-col items-center py-4 px-4 sm:px-6">
                  <div className="w-full lg:w-auto">
                    {isAdmin ? (
                      <h1 className="text-xl sm:text-2xl md:text-3xl py-4 sm:py-6 text-center lg:text-left">
                        Viewing All Employees ({users.length - 1})
                      </h1>
                    ) : (
                      <h1 className="text-xl sm:text-2xl md:text-3xl py-4 sm:py-6 text-center lg:text-left">
                        Viewing All Employees ({filter.length})
                      </h1>
                    )}
                  </div>
                  <div className="flex flex-col lg:flex-row md:flex-row sm:flex-col md:gap-4 sm:gap-2 justify-center lg:items-center lg:justify-end items-center w-full lg:w-auto">
                    <div className="relative z-0 w-full lg:w-auto mb-2 ">
                      <div class="relative  pt-2">
                        <div class="absolute  inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                          <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className="mt-2"
                          />
                        </div>
                        <input
                          type="text"
                          class="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="Search..."
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-auto lg:ml-4 mt-2 sm:mt-0">
                      <Link
                        to="/new_user"
                        className="text-black h-10 ease-in-out duration-300 transition bg-[#90d7f5] hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 sm:px-5 py-2.5 text-center flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        <FontAwesomeIcon icon={faUserPlus} />
                        <div className="ml-3 whitespace-nowrap">
                          Add Employee
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white text-sm text-left rtl:text-right dark:text-gray-400">
                    <thead className="bg-[#90d7f5] text-xs uppercase  dark:text-black">
                      <tr>
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
                            className="border-b hover:bg-blue-50 transition-colors  "
                          >
                            <td className="px-4 py-4 font-bold underline text-sky-600">
                              <Link to={`/user/${data._id}`}>{data._id}</Link>
                            </td>
                            <td className="px-4 py-4">{data.name}</td>
                            <td className="px-4 py-4 ">{data.Job_title}</td>

                            <td className="px-4 py-4">
                              {data.hire_date.substring(0, 10)}
                            </td>
                            <td className="px-4 py-4 ">{data.salary}$</td>
                            <td className="px-4 py-4 ">{data.department}</td>
                            <td className="px-4 py-4">{data.email}</td>
                            <td className="px-4 py-4  dark:bg-gray-800">
                              <div className="flex justify-center gap-4">
                                <Link to={`/update_user/${data._id}`}>
                                  <button className="text-blue-700 hover:text-blue-900">
                                    <FontAwesomeIcon
                                      icon={faPenToSquare}
                                      size="lg"
                                    />
                                  </button>
                                </Link>
                                <Deleteuser
                                  id={data._id}
                                  onDelete={() => handleUserDelete(data._id)}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default User;
