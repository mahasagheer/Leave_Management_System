import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
const user_detail = () => {
  const [data, setData] = useState({});
  const [user, setUser] = useState([]);
  const local = localStorage.getItem("user");
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${id}`, {
        headers: {
          Authorization: `${local}`,
        },
      })
      .then((res) => {
        const userData = res.data.data;
        setData(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleDelete = () => {
    axios
      .delete(`http://localhost:3000/users/${id}`, {
        headers: {
          Authorization: `${local}`,
        },
      })
      .then((res) => {
        setUser(res.data);

        navigate("/user");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <section id="dashboard">
        <div className="p-4 sm:ml-64 ">
          <div className="p-4 border-2 border-[#4a9dc9] border-dashed  h-auto rounded-lg dark:border-gray-700 mt-16">
            <h1 className="text-2xl text-center py-5"> Employee Detail</h1>{" "}
            <span className="flex gap-4 justify-end items-center">
              <Link to={`/update_user/${data._id}`}>
                <button className="flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm14-7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
                  </svg>
                  Edit User
                </button>
              </Link>
              <button
                className="flex items-center gap-2"
                onClick={handleDelete}
              >
                <svg
                  className="w-6 h-6 text-red-600 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="M19 0H1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1ZM2 6v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6H2Zm11 3a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0h2a1 1 0 0 1 2 0v1Z" />
                </svg>
                Delete User
              </button>
            </span>
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
