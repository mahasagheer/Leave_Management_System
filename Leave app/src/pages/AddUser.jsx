import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { useContext } from "react";
import { AuthContext } from "../service/authentication";
import { addUserSchema } from "../validation/addUserValidate";

const AddUser = () => {
  const local = localStorage.getItem("user");
  const { data } = useContext(AuthContext);
  const apiURL = import.meta.env.VITE_API;

  const navigate = useNavigate();
  let role;
  let userId;
  // Formik Validation
  if (data.role === "admin") {
    role = "HR";
  }
  if (data.role === "HR") {
    role = "user";
  }
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        role: role,
        salary: "",
        age: "",
        exit_date: "",
        Job_title: "",
        gender: "",
        hire_date: "",
        department: "",
        city: "",
        password: "",
        annual_leave: "25",
        sick_leave: "15",
        employee_id: "",
        remaining_leave: "45",
      },
      validationSchema: addUserSchema,
      onSubmit: (values) => {
       
        axios
          .post(
            `${apiURL}users`,
            {
              name: values.name,
              email: values.email,
              salary: values.salary,
              age: values.age,
              exit_date: values.exit_date,
              Job_title: values.Job_title,
              gender: values.gender,
              hire_date: values.hire_date,
              department: values.department,
              city: values.city,
              password: values.password,
              role: values.role,
            },
            {
              headers: {
                Authorization: `${local}`,
              },
            }
          )
          .then((res) => {
            console.log(res);
            userId = res.data.user;
            axios
              .post(`${apiURL}employee_leave_detail`, {
                employee_id: userId,
                annual_leave: values.annual_leave,
                sick_leave: values.sick_leave,
                remaining_leave: values.remaining_leave,
              })
              .then(function (response) {
                console.log(response);
                axios.post(
                  `${apiURL}send_email/invite_employee`,
                  {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                  },
                  {
                    headers: {
                      Authorization: `${local}`,
                    },
                  }
                );
              })
              .catch(function (error) {
                console.log(error);
              });
          })
          .then(function (response) {
            axios
              .post(`${apiURL}inbox_messages`, {
                employee_id: userId,
              })
              .then((res) => console.log(res))
              .catch((err) => console.log(err));
            navigate("/user");
          })
          .catch(function (error) {
            console.log(error);
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
          <div className="p-4 border-2 border-[#4a9dc9] h-auto border-dashed rounded-lg dark:border-gray-700  mt-16  ">
            <h1 className="text-3xl text-center my-4">Add New Employee</h1>
            <p className="my-6 text-center ">
              Please fill out this form to add a new employee to the team and
              ensure all necessary details are recorded for onboarding.
            </p>
            <p></p>
            <form className="mx-[15%]" onSubmit={handleSubmit}>
              <div className="flex gap-4 justify-between">
                <div className="mb-5">
                  <label
                    htmlFor="base-input"
                    className="block mb-2 text-sm  font-medium text-gray-900 dark:text-white"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="name"
                    value={values.name}
                    id="base-input"
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
                {data.role === "admin" ? (
                  <>
                    {" "}
                    <option>Human Resources Manager</option>
                    <option>Talent Acquisition Specialist</option>
                    <option>HR Generalist</option>
                  </>
                ) : null}
                {data.role === "HR" ? (
                  <>
                    {" "}
                    <option>Marketing Manager</option>
                    <option>Digital Marketing Specialist</option>
                    <option>Social Media Manager</option>
                    <option>Brand Manager</option>
                    <option>Sales Manager</option>
                    <option>Sales Representative</option>
                    <option>Business Development Manager</option>
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
                  </>
                ) : null}
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
                <option>Faisalabad</option>
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
                <div className="relative z-0 w-full mb-5 group">
                  <label
                    htmlFor="base-input"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="base-input"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors.password && touched.password ? (
                    <p className="text-red-600 text-sm">{errors.password}</p>
                  ) : null}
                </div>
              </div>
              <label
                htmlFor="annual_leave"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Annual Leave
              </label>
              <select
                id="annual_leave"
                value={values.annual_leave}
                name="annual_leave"
                onChange={handleChange}
                onBlur={handleBlur}
                className="bg-gray-50 border mb-2  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>25</option>
                <option>20</option>
                <option>15</option>
                <option>8</option>
              </select>
              <label
                htmlFor="sick_leave"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Sick Leave
              </label>
              <select
                id="sick_leave"
                value={values.sick_leave}
                name="sick_leave"
                onChange={handleChange}
                onBlur={handleBlur}
                className="bg-gray-50 border mb-2  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>15</option>
                <option>12</option>
                <option>10</option>
                <option>5</option>
              </select>

              <label
                htmlFor="remaining_leave"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Remaining Leave
              </label>
              <select
                id="remaining_leave"
                value={values.remaining_leave}
                name="remaining_leave"
                onChange={handleChange}
                onBlur={handleBlur}
                className="bg-gray-50 border mb-2  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>45</option>
                <option>35</option>
                <option>25</option>
                <option>12</option>
              </select>
              <button
                type="submit"
                className="text-white ease-in-out duration-300 transition bg-[#f18620] hover:bg-[#f18620] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddUser;
