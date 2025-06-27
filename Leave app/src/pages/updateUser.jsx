import React, { useState, useEffect } from "react";

import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { updateUserSchema } from "../validation/addUserValidate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            toast.success("User updated successfully!");
            setTimeout(() => {
              navigate("/user");
            }, 1200);
          })
          .catch((error) => {
            console.log(error);
          });
      },
    });

  return (
    <section id="updateUser" className="p-0 sm:p-4 sm:ml-64 bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full mt-20 max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-10 mx-2 animate-fadeIn">
        <ToastContainer />
        {Loading && <div className="loader ml-[50%] mt-[25%]"></div>}
        {!Loading && (
          <>
            <h1 className="text-3xl text-center mb-2 text-gray-900 dark:text-white">Update Employee</h1>
            <p className="mb-6 text-center text-gray-500 dark:text-gray-300">Update the employee details below. All fields are required.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Name</label>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="name"
                      value={values.name}
                      type="text"
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  {errors.name && touched.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                  </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Salary</label>
                    <input
                      name="salary"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.salary}
                      type="number"
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  {errors.salary && touched.salary && <p className="text-red-600 text-xs mt-1">{errors.salary}</p>}
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Age</label>
                    <input
                      type="number"
                      name="age"
                      value={values.age}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  {errors.age && touched.age && <p className="text-red-600 text-xs mt-1">{errors.age}</p>}
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Exit Date</label>
                    <input
                      type="text"
                      name="exit_date"
                      value={values.exit_date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  {errors.exit_date && touched.exit_date && <p className="text-red-600 text-xs mt-1">{errors.exit_date}</p>}
                </div>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Job Title</label>
                <select
                  value={values.Job_title}
                  name="Job_title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition"
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
                {errors.Job_title && touched.Job_title && <p className="text-red-600 text-xs mt-1">{errors.Job_title}</p>}
              </div>
              <div className="flex flex-col sm:flex-row gap-6">
                <fieldset className="flex items-center gap-4">
                  <legend className="sr-only">Gender</legend>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Gender:</label>
                  <div className="flex items-center gap-2">
                    <input
                      id="male"
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={values.gender === "Male"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="male" className="text-sm text-gray-700 dark:text-gray-300">Male</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      id="female"
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={values.gender === "Female"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="female" className="text-sm text-gray-700 dark:text-gray-300">Female</label>
                  </div>
                </fieldset>
                {errors.gender && touched.gender && <p className="text-red-600 text-xs mt-1">{errors.gender}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Hire Date</label>
                  <input
                    type="date"
                    name="hire_date"
                    value={values.hire_date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                  {errors.hire_date && touched.hire_date && <p className="text-red-600 text-xs mt-1">{errors.hire_date}</p>}
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Department</label>
                <select
                    name="department"
                  value={values.department}
                  onChange={handleChange}
                  onBlur={handleBlur}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition"
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
                  {errors.department && touched.department && <p className="text-red-600 text-xs mt-1">{errors.department}</p>}
                </div>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">City</label>
                <select
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option>Islamabad</option>
                  <option>Karachi</option>
                  <option>Lahore</option>
                  <option>Fasialabad</option>
                </select>
                {errors.city && touched.city && <p className="text-red-600 text-xs mt-1">{errors.city}</p>}
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder="name@gmail.com"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                {errors.email && touched.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                  </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Enter new password"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition"
                />
                {errors.password && touched.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
                </div>
                <button
                  type="submit"
                className="w-full py-3 mt-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg shadow transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Update
                </button>
              </form>
          </>
          )}
        </div>
      </section>
  );
};

export default updateUser;
