import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const user_detail = () => {
  const [data, setData] = useState({});
  const local = localStorage.getItem("user");
  const { id } = useParams();
  const apiURL = import.meta.env.VITE_API;

  useEffect(() => {
    axios
      .get(`${apiURL}users/${id}`, {
        headers: {
          Authorization: `${local}`,
        },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <section id="dashboard">
        <div className="p-4 sm:ml-64 ">
          <div className="p-4 border-2 border-[#4a9dc9] border-dashed  h-auto rounded-lg dark:border-gray-700 mt-16">
            <h1 className="text-2xl text-center py-5"> Employee Detail</h1>{" "}
            <p className="text-xl py-3">Personal Detail:</p>
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
            <p className="text-xl py-3">Job Position:</p>
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
      </section>
    </>
  );
};

export default user_detail;
