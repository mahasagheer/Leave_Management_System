import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../service/authentication";
import { leaveSchema } from "../validation/addUserValidate";

const ApplyLeave = () => {
  const { data } = useContext(AuthContext);
  const navigate = useNavigate();
  const local = localStorage.getItem("user");
  const apiURL = import.meta.env.VITE_API;
  const [Loading, setLoading] = useState(false);

  let days = 0;
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
        setLoading(true);
        axios
          .patch(`${apiURL}/inbox_messages`, {
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
            axios
              .post(
                `${apiURL}/send_email`,
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
                setLoading(false);
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
    <section id="applyLeave" className="p-0 sm:p-4 sm:ml-64 bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-10 mx-2 animate-fadeIn mt-20">
        {Loading && <div className="loader ml-[50%] mt-[25%]"></div>}
        {!Loading && (
          <>
            <h1 className="text-3xl text-center mb-2 text-gray-900 dark:text-white">Apply For A Leave</h1>
            <p className="mb-6 text-center text-gray-500 dark:text-gray-300">If you have any issues or need assistance, please specify your reason for requesting leave below.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Full Name</label>
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
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
                  <input
                    type="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="email"
                    value={values.email}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                  {errors.email && touched.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Leave Type</label>
                <select
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="leave_type"
                  value={values.leave_type}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="">Select Leave Type</option>
                  <option>Causal Leave</option>
                  <option>Annual Leave</option>
                  <option>Sick Leave</option>
                  <option>Maternity Leave</option>
                  <option>Paternity Leave</option>
                  <option>Special Leave</option>
                </select>
                {errors.leave_type && touched.leave_type && <p className="text-red-600 text-xs mt-1">{errors.leave_type}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">From</label>
                  <input
                    type="date"
                    name="from_date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.from_date}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                  {errors.from_date && touched.from_date && <p className="text-red-600 text-xs mt-1">{errors.from_date}</p>}
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">To</label>
                  <input
                    type="date"
                    name="to_date"
                    value={values.to_date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                  {errors.to_date && touched.to_date && <p className="text-red-600 text-xs mt-1">{errors.to_date}</p>}
                </div>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Leave Application</label>
                <textarea
                  rows="4"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Leave a Reason..."
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.leave_application}
                  name="leave_application"
                ></textarea>
                {errors.leave_application && touched.leave_application && <p className="text-red-600 text-xs mt-1">{errors.leave_application}</p>}
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-3 w-full text-white mt-4 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 shadow transition-all duration-200"
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
          </>
        )}
      </div>
    </section>
  );
};

export default ApplyLeave;
