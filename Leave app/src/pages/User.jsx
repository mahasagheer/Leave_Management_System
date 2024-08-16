import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../service/authentication";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Deleteuser from "../components/deleteuser";
const User = () => {
  const { data } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const local = localStorage.getItem("user");

  useEffect(() => {
    axios
      .get("http://localhost:3000/users", {
        headers: {
          Authorization: `${local}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-[#4a9dc9] h-auto border-dashed rounded-lg dark:border-gray-700  mt-16  ">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <h1 className="text-3xl text-center py-6">Employee List</h1>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                    >
                      Employee ID{" "}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Full Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                    >
                      Job Title{" "}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Gender
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3  bg-gray-50 dark:bg-gray-800"
                    >
                      Age
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Hire Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3  bg-gray-50 dark:bg-gray-800"
                    >
                      Salary (USD)
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3  bg-gray-50 dark:bg-gray-800"
                    >
                      Department
                    </th>
                    <th scope="col" className="px-6 py-3">
                      City
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3  bg-gray-50 dark:bg-gray-800"
                    >
                      Exit Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Update/Delete
                    </th>
                  </tr>
                </thead>

                {filter.map((data) => {
                  return (
                    <tbody key={data._id}>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-7 py-7 bg-gray-50 font-bold underline text-sky-600 dark:bg-gray-800">
                          <Link to={`/user/${data._id}`}>{data._id}</Link>
                        </td>
                        <td className="px-6 py-4">{data.name}</td>
                        <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                          {data.Job_title}
                        </td>
                        <td className="px-6 py-4">{data.gender}</td>
                        <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                          {data.age}
                        </td>
                        <td className="px-6 py-4">
                          {data.hire_date.substring(0, 10)}
                        </td>
                        <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                          {data.salary}
                        </td>
                        <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                          {data.department}
                        </td>
                        <td className="px-6 py-4">{data.city}</td>
                        <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                          {data.exit_date}
                        </td>
                        <td className="px-6 py-4">{data.email}</td>
                        <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                          <span className="flex gap-10 justify-center flex-nowrap items-center">
                            <Link to={`/update_user/${data._id}`}>
                              <button className="flex items-center  gap-2 text-blue-700">
                                <FontAwesomeIcon
                                  icon={faPenToSquare}
                                  size="lg"
                                />
                              </button>
                            </Link>
                            <Deleteuser />
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default User;
