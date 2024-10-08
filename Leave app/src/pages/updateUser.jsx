import React, { useState, useEffect } from "react";

import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { updateUserSchema } from "../validation/addUserValidate";

const updateUser = () => {
  const [data, setData] = useState([]);
  const local = localStorage.getItem("user");
  const apiURL = import.meta.env.VITE_API;
  const [Loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiURL}/users/${id}`, {
        headers: {
          Authorization: `${local}`,
        },
      })
      .then((res) => {
        const userData = res.data.data;
        if (userData.hire_date) {
          userData.hire_date = new Date(userData.hire_date)
            .toISOString()
            .split("T")[0];
        }
        setLoading(false);
        setData(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, apiURL, local]);
  // Formik Validation
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: data.name || "",
        salary: data.salary || "",
        age: data.age || "",
        exit_date: data.exit_date || "",
        Job_title: data.Job_title || "",
        gender: data.gender || "",
        hire_date: data.hire_date || "",
        department: data.department || "",
        city: data.city || "",
        email: data.email || "",
        password: "",
      },
      enableReinitialize: true,
      validationSchema: updateUserSchema,
      onSubmit: (values) => {
        setLoading(true);
        axios
          .put(
            `${apiURL}/users/${id}`,
            {
              name: values.name,
              salary: values.salary,
              age: values.age,
              exit_date: values.exit_date,
              Job_title: values.Job_title,
              gender: values.gender,
              hire_date: values.hire_date,
              department: values.department,
              city: values.city,
              email: values.email,
              password: values.password,
            },
            {
              headers: {
                Authorization: `${local}`,
              },
            }
          )
          .then((res) => {
            setLoading(false);
            navigate("/user");
          })
          .catch((error) => {
            console.log(error);
          });
      },
    });

  return (
    <>
      <section id="addUser">
        <div className="p-4 sm:ml-64">
          {Loading && <div className=" loader ml-[50%] mt-[25%]"></div>}
          {!Loading && (
            <div className="p-4 border-2 border-[#4a9dc9] h-auto border-dashed rounded-lg dark:border-gray-700  mt-16  ">
              <h1 className="text-3xl text-center my-4">Update Employee</h1>
              <p className="my-6 text-center ">
                Please fill out this form to add a new employee to the team and
                ensure all necessary details are recorded for onboarding.
              </p>
              <p></p>
              <form
                className="md:mx-[15%]  lg:mx-[25%]"
                onSubmit={handleSubmit}
              >
                <div className="flex gap-4 justify-between">
                  <div className="mb-5">
                    <label
                      htmlFor="base-input"
                      className="block mb-2 text-sm  font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="name"
                      value={values.name}
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors.name && touched.name ? (
                      <p className="text-red-600 text-sm">{errors.name}</p>
                    ) : null}
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="base-input"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Salary
                    </label>
                    <input
                      name="salary"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.salary}
                      type="number"
                      id="base-input"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors.salary && touched.salary ? (
                      <p className="text-red-600 text-sm">{errors.salary}</p>
                    ) : null}
                  </div>{" "}
                  <div className="mb-5">
                    <label
                      htmlFor="base-input"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Age
                    </label>
                    <input
                      type="number"
                      id="base-input"
                      name="age"
                      value={values.age}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors.age && touched.age ? (
                      <p className="text-red-600 text-sm">{errors.age}</p>
                    ) : null}
                  </div>{" "}
                  <div className="mb-5">
                    <label
                      htmlFor="base-input"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Exit Date
                    </label>
                    <input
                      type="text"
                      id="base-input"
                      name="exit_date"
                      value={values.exit_date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors.exit_date && touched.exit_date ? (
                      <p className="text-red-600 text-sm">{errors.exit_date}</p>
                    ) : null}
                  </div>
                </div>

                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select Job Title
                </label>
                <select
                  id="countries"
                  value={values.Job_title}
                  name="Job_title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="bg-gray-50 border mb-2  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>Marketing Manager</option>
                  <option>Digital Marketing Specialist</option>
                  <option>Social Media Manager</option>
                  <option>Brand Manager</option>
                  <option>Sales Manager</option>
                  <option>Sales Representative</option>
                  <option>Business Development Manager</option>
                  <option>Human Resources Manager</option>
                  <option>Talent Acquisition Specialist</option>
                  <option>HR Generalist</option>
                  <option>Software Engineer</option>
                  <option>Frontend Developer</option>
                  <option>Backend Developer</option>
                  <option>IT Support Specialist</option>
                  <option>Data Scientist</option>
                  <option>Financial Analyst</option>
                  <option>Accountant</option>
                  <option>Graphic Designer</option>
                  <option>UX/UI Designer</option>
                  <option>Content Creator</option>
                  <option>Research Scientist</option>
                  <option>Customer Service Manager</option>
                </select>
                {errors.Job_title && touched.Job_title ? (
                  <p className="text-red-600 text-sm">{errors.Job_title}</p>
                ) : null}
                <fieldset className="flex items-center gap-6">
                  <label
                    htmlFor="base-input"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Gender
                  </label>
                  <legend className="sr-only">Gender</legend>
                  <div className="flex ">
                    <input
                      id="male"
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={values.gender === "Male"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="male"
                      className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Male
                    </label>
                  </div>
                  <div className="flex ">
                    <input
                      id="Female"
                      type="radio"
                      name="gender"
                      checked={values.gender === "Female"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value="Female"
                      className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                    />

                    <label
                      htmlFor="country-option-2"
                      className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Female
                    </label>
                  </div>
                </fieldset>
                {errors.gender && touched.gender ? (
                  <p className="text-red-600 text-sm">{errors.gender}</p>
                ) : null}

                <div className="mb-5">
                  <label
                    htmlFor="base-input"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Hire Date
                  </label>
                  <input
                    type="date"
                    id="base-input"
                    value={values.hire_date}
                    name="hire_date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors.hire_date && touched.hire_date ? (
                    <p className="text-red-600 text-sm">{errors.hire_date}</p>
                  ) : null}
                </div>

                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Department
                </label>
                <select
                  id="countries"
                  value={values.department}
                  name="department"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>Management</option>
                  <option>Marketing</option>
                  <option>Sales</option>
                  <option>Human Resources</option>
                  <option>IT and Development</option>
                  <option>Finance and Accounting</option>
                  <option>Operations</option>
                  <option>Customer Service</option>
                  <option>Creative</option>
                  <option>Research and Development</option>
                </select>
                {errors.department && touched.department ? (
                  <p className="text-red-600 text-sm">{errors.department}</p>
                ) : null}
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  City
                </label>
                <select
                  id="countries"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>Islamabad</option>
                  <option>Karachi</option>
                  <option>Lahore</option>
                  <option>Fasialabad</option>
                </select>
                {errors.city && touched.city ? (
                  <p className="text-red-600 text-sm">{errors.city}</p>
                ) : null}
                <div className="grid md:grid-cols-2 md:gap-6">
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
                      placeholder="name@gmail.com"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors.email && touched.email ? (
                      <p className="text-red-600 text-sm">{errors.email}</p>
                    ) : null}
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-black h-10 ease-in-out duration-300 transition bg-[#90d7f5] hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 sm:px-5 py-2.5 text-center flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Update
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default updateUser;
