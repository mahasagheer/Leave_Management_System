import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const leaveDecision = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        status: "",
        comment: "",
        employee_id: id,
      },
      validationSchema: Yup.object({
        name: Yup.string().required(),
        email: Yup.string().required(),
        status: Yup.string().required(),
        comment: Yup.string(),
        employee_id: Yup.string().required(),
      }),
      onSubmit: (values) => {
        axios
          .post("http://localhost:3000/send_email/leave_reply", {
            name: values.name,
            email: values.email,
            status: values.status,
            comment: values.comment,
            employee_id: values.employee_id,
          })
          .then((res) => {
            navigate("/send");
          })
          .catch((error) => {
            console.log(error);
          });
      },
    });
  return (
    <>
      <section id="applyLeave">
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-[#4a9dc9] h-auto border-dashed rounded-lg dark:border-gray-700 mt-16 ">
            <h1 className="text-3xl text-center ">Approve & Reject Leave </h1>
            <form className="mx-[15%] mb-[4%]" onSubmit={handleSubmit}>
              <div className="mb-5">
                <label
                  htmlFor="base-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  id="base-input"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <label
                  htmlFor="base-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="base-input"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <label
                htmlFor="decision"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Leave Decision
              </label>
              <select
                id="status"
                onChange={handleChange}
                onBlur={handleBlur}
                name="status"
                value={values.status}
                className=" mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>Pending</option>
                <option>Approved</option>
                <option>Declined</option>
              </select>
              <div class="relative z-0 w-full mb-5 group">
                <label
                  htmlFor="base-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Comments
                </label>
                <input
                  type="text"
                  id="base-input"
                  name="comment"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.comment}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className=" flex  text-white gap-3 mt-4 bg-[#f18620] hover:bg-[#f18620] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-6 h-6 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 5h9M5 9h5m8-8H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h4l3.5 4 3.5-4h5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                  />
                </svg>
                Send
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default leaveDecision;
