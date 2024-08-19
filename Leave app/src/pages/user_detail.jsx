import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import axios from "axios";
import { leavehistorytable } from "../Utiles/TableHearer";
const user_detail = () => {
  const [data, setData] = useState({});
  const [dataLeave, setDataLeave] = useState({});
  const local = localStorage.getItem("user");
  const { id } = useParams();
  const apiURL = import.meta.env.VITE_API;
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
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
  }, []);

  return (
    <>
      <section id="dashboard">
        <div className="p-4 sm:ml-64 ">
          {Loading && <div className=" loader ml-[50%] mt-[25%]"></div>}
          {!Loading && (
            <div className="p-4 border-2 border-[#4a9dc9] border-dashed  h-auto rounded-lg dark:border-gray-700 mt-16">
              <h1 className="text-3xl font-bold text-center py-5 ">
                {" "}
                Employee Detail
              </h1>{" "}
              <div className="flex justify-between px-10">
                <div>
                  <p className="text-2xl py-3 font-semibold">
                    Personal Detail:
                  </p>
                  <p className="text-lg ">
                    <strong>Employee Name:</strong> {data.name}
                  </p>
                  <p className="text-lg ">
                    <strong>Employee Email:</strong> {data.email}
                  </p>
                  <p className="text-lg ">
                    <strong>Employee Age:</strong> {data.age}
                  </p>
                  <p className="text-lg ">
                    <strong>Employee Name:</strong> {data.city}
                  </p>
                  <p className="text-lg ">
                    <strong>Employee Name:</strong> {data.gender}
                  </p>
                </div>
                <div>
                  <p className="text-2xl py-3 font-semibold">Job Position:</p>
                  <p className="text-lg ">
                    <strong>Employee Salary:</strong> {data.salary}
                  </p>
                  <p className="text-lg ">
                    <strong>Employee Job Title:</strong> {data.Job_title}
                  </p>
                  <p className="text-lg ">
                    <strong>Employee Department:</strong> {data.department}
                  </p>
                  <p className="text-lg ">
                    <strong>Employee Hiring Date:</strong> {data.hire_date}
                  </p>
                  <p className="text-lg ">
                    <strong>Employee Exit Date:</strong> {data.exit_date}
                  </p>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-center mt-4 ">
                {" "}
                Employee Leave History
              </h1>{" "}
              <div className="overflow-x-auto w-full my-8 flex justify-center">
                <table className=" text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 my-10 bg-blue-200">
                    <tr>
                      {leavehistorytable?.map((item, index) => (
                        <th scope="col" key={index} className="px-6 py-3">
                          {item}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  {dataLeave?.messages?.map((data) => {
                    return (
                      <tbody key={data._id}>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <td className="px-6 py-4">{data.leave_type}</td>

                          <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                            {data.days}
                          </td>
                          <td className="px-6 py-4">
                            {data.from_date.substring(0, 10)}
                          </td>
                          <td className="px-6 py-4">
                            {data.to_date.substring(0, 10)}
                          </td>
                          <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                            {data.leave_application}
                          </td>
                          <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                            {data.status}
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default user_detail;
