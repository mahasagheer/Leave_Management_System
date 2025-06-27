import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../service/authentication";
import { addUserSchema } from "../validation/addUserValidate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  // Add role options based on current user's role
  const roleOptions = data.role === "admin"
    ? [
        { value: "HR", label: "HR" },
        { value: "Manager", label: "Manager" },
        { value: "user", label: "User" },
      ]
    : data.role === "HR" || data.role === "Manager"
    ? [
        { value: "user", label: "User" },
      ]
    : [];

  const staffTypeOptions = [
    { value: "permanent", label: "Permanent" },
    { value: "intern", label: "Intern" },
    { value: "probation", label: "Probation" },
  ];

  // Define technical positions for manager
  const managerPositions = [
    { value: "Software Engineer", label: "Software Engineer" },
    { value: "Senior Software Engineer", label: "Senior Software Engineer" },
    { value: "Associate Software Engineer", label: "Associate Software Engineer" },
    { value: "Intern", label: "Intern" },
    { value: "Frontend Developer", label: "Frontend Developer" },
    { value: "Backend Developer", label: "Backend Developer" },
    { value: "Full Stack Developer", label: "Full Stack Developer" },
    { value: "QA Engineer", label: "QA Engineer" },
    { value: "DevOps Engineer", label: "DevOps Engineer" },
    { value: "UI/UX Designer", label: "UI/UX Designer" },
    { value: "Mobile App Developer", label: "Mobile App Developer" },
    { value: "Data Engineer", label: "Data Engineer" },
    { value: "Data Scientist", label: "Data Scientist" },
  ];

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        role: roleOptions.length > 0 ? roleOptions[0].value : "",
        staff_type: "permanent",
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
        annual_leave: 18,
        sick_leave: 8,
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
              salary: Number(values.salary),
              age: Number(values.age),
              exit_date: values.exit_date,
              Job_title: values.Job_title,
              gender: values.gender,
              hire_date: values.hire_date,
              department: values.department,
              city: values.city,
              password: values.password,
              role: values.role,
              phone: Number(values.phone),
              staff_type: values.staff_type,
            },
            {
              headers: {
                Authorization: `${local}`,
              },
            }
          )
          .then((res) => {
            const userId = res.data.user;
            return axios.post(`${apiURL}/employee_leave_detail`, {
                employee_id: userId,
                annual_leave: values.annual_leave,
                sick_leave: values.sick_leave,
            }).then(() => userId);
          })
          .then((userId) => {
            return axios.post(`${apiURL}/inbox_messages`, {
              employee_id: userId,
              });
          })
          .then(() => {
            setLoading(false);
            toast.success("New team member added successfully!");
            setTimeout(() => {
              navigate("/user");
            }, 1200);
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
          });
      },
    });

  // Auto-set annual leave and sick leave based on staff type
  useEffect(() => {
    if (values.staff_type === "permanent") {
      setFieldValue("annual_leave", 18);
      setFieldValue("sick_leave", 8);
    } else if (values.staff_type === "intern" || values.staff_type === "probation") {
      setFieldValue("annual_leave", 3);
      setFieldValue("sick_leave", 3);
    }
  }, [values.staff_type, setFieldValue]);

  return (
    <section id="addUser" className="p-0 sm:p-4 sm:ml-64 bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-10 mx-2 animate-fadeIn mt-20">
        <ToastContainer />
        {Loading && <div className="loader ml-[50%] mt-[25%]"></div>}
        {!Loading && (
          <>
            <h1 className="text-3xl text-center mb-2 text-gray-900 dark:text-white">Add New Employee</h1>
            <p className="mb-6 text-center text-gray-500 dark:text-gray-300 lg:mx-[5%] md:mx-[15%]">Please fill out this form to add a new employee to the team and ensure all necessary details are recorded for onboarding.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Name</label>
                    <input
                      type="text"
                    id="name"
                    name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  {errors.name && touched.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                  </div>
                <div>
                  <label htmlFor="salary" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Salary</label>
                    <input
                      name="salary"
                    id="salary"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.salary}
                      type="number"
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                  {errors.salary && touched.salary && <p className="text-red-600 text-xs mt-1">{errors.salary}</p>}
                </div>
                <div>
                  <label htmlFor="age" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Age</label>
                    <input
                      type="number"
                    id="age"
                      name="age"
                      value={values.age}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                  {errors.age && touched.age && <p className="text-red-600 text-xs mt-1">{errors.age}</p>}
                </div>
                <div>
                  <label htmlFor="exit_date" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Exit Date</label>
                    <input
                      type="text"
                    id="exit_date"
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
                <label htmlFor="Job_title" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Job Title</label>
                <select
                  id="Job_title"
                  value={values.Job_title}
                  name="Job_title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  {data.role === "admin" && HrRole.map((option, idx) => (
                    <option key={option.value + '-' + idx} value={option.value}>{option.label}</option>
                  ))}
                  {data.role === "HR" && position.map((option, idx) => (
                    <option key={option.value + '-' + idx} value={option.value}>{option.label}</option>
                  ))}
                  {data.role === "Manager" && managerPositions.map((option, idx) => (
                    <option key={option.value + '-' + idx} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {errors.Job_title && touched.Job_title && <p className="text-red-600 text-xs mt-1">{errors.Job_title}</p>}
              </div>

                <fieldset className="flex items-center gap-6">
                  <legend className="sr-only">Gender</legend>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Gender:</label>
                <div className="flex items-center gap-2">
                    <input
                      id="male"
                      type="radio"
                      name="gender"
                      value="Male"
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
                      onChange={handleChange}
                      onBlur={handleBlur}
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="female" className="text-sm text-gray-700 dark:text-gray-300">Female</label>
                  </div>
                </fieldset>
              {errors.gender && touched.gender && <p className="text-red-600 text-xs mt-1">{errors.gender}</p>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="hire_date" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Hire Date</label>
                  <input
                    type="date"
                    id="hire_date"
                    name="hire_date"
                    value={values.hire_date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                  {errors.hire_date && touched.hire_date && <p className="text-red-600 text-xs mt-1">{errors.hire_date}</p>}
                </div>
                <div>
                  <label htmlFor="department" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Department</label>
                <select
                    id="department"
                  value={values.department}
                  name="department"
                  onChange={handleChange}
                  onBlur={handleBlur}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  {department.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                  {errors.department && touched.department && <p className="text-red-600 text-xs mt-1">{errors.department}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="city" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">City</label>
                    <select
                    id="city"
                      name="city"
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      {city.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                    </select>
                  {errors.city && touched.city && <p className="text-red-600 text-xs mt-1">{errors.city}</p>}
                  </div>
                <div>
                  <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Phone No:</label>
                    <input
                      type="tel"
                    id="phone"
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="+923XXXXXXXX"
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  {errors.phone && touched.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
                    <input
                      type="email"
                    id="email"
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
                  <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
                    <input
                      type="password"
                    id="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Password"
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  {errors.password && touched.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="staff_type" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Staff Type</label>
                <select
                  id="staff_type"
                  name="staff_type"
                  value={values.staff_type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  {staffTypeOptions.map((option, idx) => (
                      <option key={option.value + '-' + idx} value={option.value}>{option.label}</option>
                  ))}
                </select>
                  {errors.staff_type && touched.staff_type && <p className="text-red-600 text-xs mt-1">{errors.staff_type}</p>}
                </div>
                <div>
                  <label htmlFor="role" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Select Role</label>
                <select
                  id="role"
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition"
                  disabled={roleOptions.length === 1}
                >
                  {roleOptions.map((option, idx) => (
                      <option key={option.value + '-' + idx} value={option.value}>{option.label}</option>
                  ))}
                </select>
                  {errors.role && touched.role && <p className="text-red-600 text-xs mt-1">{errors.role}</p>}
                </div>
              </div>

                <button
                  type="submit"
                className="w-full py-3 mt-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg shadow transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Submit
                </button>
              </form>
          </>
        )}
        </div>
      </section>
  );
};

export default AddUser;
