import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Aos from "aos";
import "aos/dist/aos.css";

const ApplyLeave = () => {
  const navigate = useNavigate();
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      leave_type: "",
      leave_application: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(4).max(20).required(),
      email: Yup.string().email().required(),
      leave_application: Yup.string().required(),
      leave_application: Yup.string().required(
        "Application must contain reason for leave"
      ),
    }),
    onSubmit: (values) => {
      navigate("/send");
      console.log(values);
    },
  });
  return (
    <>
      <section id="applyLeave">
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 h-auto border-dashed rounded-lg dark:border-gray-700 mt-16 ">
            <h1 className="text-3xl text-center ">Apply For A Leave </h1>
            <p className="my-3 text-center ">
              If you have any issues or need assistance, please specify your
              reason for requesting leave below.
            </p>
            <form class="mx-[15%] mb-[4%]" onSubmit={handleSubmit}>
              <div class="mb-5">
                <label
                  for="base-input"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full Name
                </label>
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="name"
                  value={values.name}
                  type="text"
                  id="base-input"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.name && touched.name ? (
                  <p className="text-red-600 text-sm">{errors.name}</p>
                ) : null}
              </div>

              <div class="relative z-0 w-full mb-5 group">
                <label
                  for="base-input"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="base-input"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="email"
                  value={values.email}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.email && touched.email ? (
                  <p className="text-red-600 text-sm">{errors.email}</p>
                ) : null}
              </div>
              <label
                for="countries"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Leave Type
              </label>
              <select
                id="countries"
                onChange={handleChange}
                onBlur={handleBlur}
                name="leave_type"
                value={values.leave_type}
                class=" mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>Causal Leave</option>
                <option>Annual Leave</option>
                <option>Sick Leave</option>
                <option>Maternity Leave</option>
                <option>Paternity Leave</option>
                <option>Special Leave</option>
              </select>
              {errors.leave_type && touched.leave_type ? (
                <p className="text-red-600 text-sm">{errors.leave_type}</p>
              ) : null}
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Leave Application
              </label>

              <textarea
                id="message"
                rows="4"
                class="block  p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Leave a Reason..."
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.leave_application}
                name="leave_application"
              ></textarea>
              {errors.leave_application && touched.leave_application ? (
                <p className="text-red-600 text-sm">
                  {errors.leave_application}
                </p>
              ) : null}
              <button
                type="submit"
                class=" flex  text-white gap-3 mt-4 bg-[#f18620] hover:bg-[#f18620] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  class="w-6 h-6 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 5h9M5 9h5m8-8H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h4l3.5 4 3.5-4h5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                  />
                </svg>
                Apply Leave
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ApplyLeave;
