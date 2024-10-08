import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { AuthContext } from "../service/authentication";
import { addUserSchema } from "../validation/addUserValidate";

const AddUser = () => {
  const local = localStorage.getItem("user");
  const { data } = useContext(AuthContext);
  const apiURL = import.meta.env.VITE_API;
  const [Loading, setLoading] = useState(false);

  const [annual_leave, setAnnualLeave] = useState([
    { value: 30, label: 30 },
    { value: 25, label: 25 },
    { value: 20, label: 20 },
    { value: 15, label: 15 },
    { value: 8, label: 8 },
  ]);

  const [sick_leave, setSickLeave] = useState([
    {
      value: 20,
      label: 20,
    },
    { value: 15, label: 15 },
    {
      value: 10,
      label: 10,
    },
    {
      value: 5,
      label: 5,
    },
  ]);

  const [remaining_leave, setRemaining] = useState([
    {
      value: 45,
      label: 45,
    },
    { value: 35, label: 35 },
    {
      value: 25,
      label: 25,
    },
    {
      value: 15,
      label: 15,
    },
    {
      value: 10,
      label: 10,
    },
  ]);
  const [HrRole, setHrRole] = useState([
    { value: "Human Resources Manager", label: "Human Resources Manager" },
    {
      value: "Talent Acquisition Specialist",
      label: "Talent Acquisition Specialist",
    },
    { value: "HR Generalist", label: "HR Generalist" },
    { value: "HR Intern", label: "HR Intern" },
  ]);
  const [position, setPosition] = useState([
    {
      value: "Marketing Manager",
      label: "Marketing Manager",
    },
    {
      value: "Digital Marketing Specialist",
      label: "Digital Marketing Specialist",
    },
    {
      value: "Social Media Manager",
      label: "Social Media Manager",
    },
    { value: "Brand Manager", label: "Brand Manager" },
    { value: "Sales Manager", label: "Sales Manager" },
    {
      value: "Sales Representative",
      label: "Sales Representative",
    },
    {
      value: "Business Development Manager",
      label: "Business Development Manager",
    },
    {
      value: "Software Engineer",
      label: "Software Engineer",
    },
    {
      value: "Frontend Developer",
      label: "Frontend Developer",
    },
    {
      value: "Backend Developer",
      label: "Backend Developer",
    },
    {
      value: "IT Support Specialist",
      label: "IT Support Specialist",
    },
    { value: "Data Scientist", label: "Data Scientist" },
    {
      value: "Financial Analyst",
      label: "Financial Analyst",
    },
    { value: "Accountant", label: "Accountant" },
    {
      value: "Graphic Designer",
      label: "Graphic Designer",
    },

    { value: "UX/UI Designer", label: "UX/UI Designer" },
    { value: "Content Creator", label: "Content Creator" },
    {
      value: "Research Scientist",
      label: "Research Scientist",
    },
    {
      value: "Customer Service Manager",
      label: "Customer Service Manager",
    },
  ]);
  const [department, setDepartment] = useState([
    { value: "Management", label: "Management" },
    { value: "Marketing", label: "Marketing" },
    { value: "Sales", label: "Sales" },
    {
      value: "Human Resources",
      label: "Human Resources",
    },
    {
      value: "IT and Development",
      label: "IT and Development",
    },
    {
      value: "Finance and Accounting",
      label: "Finance and Accounting",
    },
    {
      value: "Operations",
      label: "Operations",
    },
    {
      value: "Customer Service",
      label: "Customer Service",
    },
    { value: "Creative", label: "Creative" },
    {
      value: "Research and Development",
      label: "Research and Development",
    },
  ]);
  const [city, setCity] = useState([
    { value: "Islamabad", label: "Islamabad" },
    {
      value: "Lahore",
      label: "Lahore",
    },
    {
      value: "Faisalabad",
      label: "Faisalabad",
    },
    { value: "Karachi", label: "Karachi" },
  ]);
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
        phone: "",
        password: "",
        annual_leave: "25",
        sick_leave: "15",
        employee_id: "",
        remaining_leave: "45",
      },
      validationSchema: addUserSchema,
      onSubmit: (values) => {
        setLoading(true);
        axios
          .post(
            `${apiURL}/users`,
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
              phone: values.phone,
            },
            {
              headers: {
                Authorization: `${local}`,
              },
            }
          )
          .then((res) => {
            userId = res.data.user;
            axios
              .post(`${apiURL}/employee_leave_detail`, {
                employee_id: userId,
                annual_leave: values.annual_leave,
                sick_leave: values.sick_leave,
                remaining_leave: values.remaining_leave,
              })
              .then(function (response) {
                axios.post(
                  `${apiURL}/send_email/invite_employee`,
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
              .post(`${apiURL}/inbox_messages`, {
                employee_id: userId,
              })
              .then((res) => res)
              .catch((err) => console.log(err));
            setLoading(false);
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
          {Loading && <div className=" loader ml-[50%] mt-[25%]"></div>}
          {!Loading && (
            <div className="p-4 border-2 border-[#4a9dc9] h-auto border-dashed rounded-lg dark:border-gray-700  mt-16  ">
              <h1 className="text-3xl text-center my-4">Add New Employee</h1>
              <p className="my-6 text-center lg:mx-[25%] md:mx-[15%] ">
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
                      {HrRole.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </>
                  ) : null}
                  {data.role === "HR" ? (
                    <>
                      {position.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}{" "}
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
                  {department.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}{" "}
                </select>
                {errors.department && touched.department ? (
                  <p className="text-red-600 text-sm">{errors.department}</p>
                ) : null}

                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
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
                      {city.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}{" "}
                    </select>
                    {errors.city && touched.city ? (
                      <p className="text-red-600 text-sm">{errors.city}</p>
                    ) : null}
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <label
                      htmlFor="base-input"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Phone No:
                    </label>
                    <input
                      type="tel"
                      id="base-input"
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="+923XXXXXXXX"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors.phone && touched.phone ? (
                      <p className="text-red-600 text-sm">{errors.phone}</p>
                    ) : null}
                  </div>
                </div>
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
                  value={values.annual_leave}
                  onChange={handleChange}
                  id="annual_leave"
                  name="annual_leave"
                  onBlur={handleBlur}
                  className="bg-gray-50 border mb-2  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {annual_leave.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
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
                  {sick_leave.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
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
                  {remaining_leave.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="mt-4  sm:mt-0 text-black h-10 ease-in-out duration-300 transition bg-[#90d7f5] hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 sm:px-5 py-2.5 text-center flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </form>
            </div>
          )}{" "}
        </div>
      </section>
    </>
  );
};

export default AddUser;
