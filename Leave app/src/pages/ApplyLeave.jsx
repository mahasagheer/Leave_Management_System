import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../service/authentication";
import { leaveSchema } from "../validation/addUserValidate";

const ApplyLeave = () => {
  const { data } = useContext(AuthContext);
  const navigate = useNavigate();
  const local = localStorage.getItem("user");
  const apiURL = import.meta.env.VITE_API;

  let days = 0;
  console.log(data);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: data.name || "",
        email: data.email || "",
        leave_type: "",
        to_date: "",
        from_date: "",
        leave_application: "",
        employee_id: data._id || "",
        message: "",
        status: "Pending",
      },
      validationSchema: leaveSchema,
      onSubmit: (values) => {
       
        const start = values.from_date
          ? new Date(values.from_date)
          : new Date();
        const end = new Date(values.to_date);

        if (start > end) {
          days = 0;
          alert("'To Date' cannot be before 'From Date'");
          return;
        }

        const timeDiff = end.getTime() - start.getTime();
        const dayDiff = timeDiff / (1000 * 3600 * 24);
        days = dayDiff + 1;
        axios
          .patch(`${apiURL}inbox_messages`, {
            employee_id: data._id,
            message: {
              name: values.name,
              email: values.email,
              leave_type: values.leave_type,
              days: days,
              to_date: values.to_date,
              from_date: values.from_date,
              leave_application: values.leave_application,
              status: values.status,
            },
          })
          .then(function (response) {
            console.log(response.data);
            axios
              .post(
                `${apiURL}send_email`,
                {
                  name: values.name,
                  email: values.email,
                  leave_type: values.leave_type,
                  days: days,
                  to_date: values.to_date,
                  from_date: values.from_date,
                  leave_application: values.leave_application,
                },
                {
                  headers: {
                    Authorization: `${local}`,
                  },
                }
              )
              .then((res) => {
                console.log(res);
                navigate("/inbox");
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((err) => console.log(err));
      },
    });

  return (
    <>
      <section id="applyLeave">
        <div className="p-4 sm:ml-64">
          <div className="p-2 border-2 border-[#4a9dc9] h-auto border-dashed rounded-lg dark:border-gray-700 mt-16 ">
            <h1 className="text-3xl text-center ">Apply For A Leave </h1>
            <p className="my-3 text-center ">
              If you have any issues or need assistance, please specify your
              reason for requesting leave below.
            </p>
            <form className="mx-[15%] mb-[4%]" onSubmit={handleSubmit}>
              <div className="mb-5">
                <label
                  htmlFor="base-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.name && touched.name ? (
                  <p className="text-red-600 text-sm">{errors.name}</p>
                ) : null}
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
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="email"
                  value={values.email}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.email && touched.email ? (
                  <p className="text-red-600 text-sm">{errors.email}</p>
                ) : null}
              </div>
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Leave Type
              </label>
              <select
                id="countries"
                onChange={handleChange}
                onBlur={handleBlur}
                name="leave_type"
                value={values.leave_type}
                className=" mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <label
                    htmlFor="base-input"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    From:
                  </label>
                  <input
                    type="date"
                    id="base-input"
                    name="from_date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.from_date}
                    placeholder="name@gmail.com"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors.from_date && touched.from_date ? (
                    <p className="text-red-600 text-sm">{errors.from_date}</p>
                  ) : null}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <label
                    htmlFor="base-input"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    To:
                  </label>
                  <input
                    type="date"
                    id="base-input"
                    name="to_date"
                    value={values.to_date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors.to_date && touched.to_date ? (
                    <p className="text-red-600 text-sm">{errors.to_date}</p>
                  ) : null}
                </div>
              </div>

              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Leave Application
              </label>

              <textarea
                id="message"
                rows="4"
                className="block  p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
