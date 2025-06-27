import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContext, ThemeProvider } from "../context/themeContext";
import User from "../public/userImg.png";
import axios from "axios";
import { AuthContext } from "../service/authentication";
import { useFormik } from "formik";
import { retinaScale } from "chart.js/helpers";

const DirectLeaveActionContent = () => {
  const { token } = useParams();
  const { isDark } = useContext(ThemeContext);
  const {  isHR, isAdmin, isManager } = useContext(AuthContext);
  const apiURL = import.meta.env.VITE_API;
  const [leave, setLeave] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actioned, setActioned] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [role,setRole]= useState("");
  const[employeeId,setEmployeeId]=useState("")
  // Fetch leave message by ID
  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.post(`${apiURL}/inbox_messages/leave/verify_token`, { token })
      .then((res) => {
        setLeave(res.data.message);
        setRole(res.data.approverRole)
        setEmployeeId(res.data.employee_id)
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch leave details. Please try again later.");
        setLoading(false);
      });
  }, [token, apiURL]);

  // Formik for approve/reject
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    onSubmit: (values) => {
      if (!leave) return;
      setLoading(true);
      setSubmitError(null);
      let endpoint = "";
      if (role === "HR") {
        endpoint = values.status === "Approved" ? "/send_email/hr_approve" : "/send_email/hr_reject";
      } else if (role==="Manager") {
        endpoint = values.status === "Approved" ? "/send_email/manager_approve" : "/send_email/manager_reject";
      } else if (role ==="admin") {
        endpoint = values.status === "Approved" ? "/send_email/admin_approve" : "/send_email/admin_reject";
      }
      axios
        .put(`${apiURL}${endpoint}`,
          {
            employee_id: employeeId,
            message_id: leave._id,
            comment: values.comment,
          }
        )
        .then(() => {
          setLoading(false);
          setActioned(true);
          toast.success(`Leave ${values.status === "Approved" ? "approved" : "rejected"} successfully!`);
        })
        .catch((err) => {
          setLoading(false);
          setSubmitError(
            err.response?.data?.message ||
              "Failed to process the request. Please try again."
          );
        });
    },
  });

  // Status badge color (copied from inbox)
  const statusBadge = (status) => {
    if (isHR || isAdmin || isManager) {
      if (status === "HR Approved") return "bg-blue-100 text-blue-700 border-blue-300";
      if (status === "Manager Approved") return "bg-teal-100 text-teal-700 border-teal-300";
      if (status === "Rejected by Manager") return "bg-orange-100 text-orange-700 border-orange-300";
      if (status === "Admin Approved") return "bg-blue-100 text-blue-700 border-blue-300";
      if (status === "Admin Rejected") return "bg-red-100 text-red-700 border-red-300";
      if (status === "Pending") return "bg-yellow-100 text-yellow-700 border-yellow-300";
    }
    if (status === "Approved") return "bg-green-100 text-green-700 border-green-300";
    if (status === "Declined") return "bg-red-100 text-red-700 border-red-300";
    if (status === "Pending") return "bg-yellow-100 text-yellow-700 border-yellow-300";
    return "bg-gray-100 text-gray-700 border-gray-300";
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-100"}`}>
        <div className="text-lg text-gray-500">Loading leave details...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-100"}`}>
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }
  if (!leave) return null;

  return (
    <div className={`flex items-center justify-center min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-100"}`}>
      <ToastContainer position="top-center" />
      <div className={`w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col gap-6`}>
        {/* Header: Avatar, Name, Email, Date, Status */}
        <div className="flex items-center gap-4 border-b pb-4">
          <img
            src={User}
            alt="User"
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <div className="font-bold text-lg text-gray-900 dark:text-white">
              {leave.name || leave.employee_name || "Employee"}
            </div>
            <div className="text-sm text-gray-500">
              {leave.email || leave.employee_email || "-"}
            </div>
            <div className="text-xs text-gray-400">
              {leave.createdAt ? new Date(leave.createdAt).toLocaleString() : "-"}
            </div>
          </div>
          <span
            className={`ml-auto px-3 py-1 rounded-full text-xs border font-semibold ${statusBadge(leave.status)}`}
          >
            {leave.status}
          </span>
        </div>
        {/* Leave Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <div className="text-xs text-gray-500">From</div>
            <div className="font-medium text-gray-900 dark:text-white">
              {leave.from_date ? new Date(leave.from_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "-"}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">To</div>
            <div className="font-medium text-gray-900 dark:text-white">
              {leave.to_date ? new Date(leave.to_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "-"}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Days</div>
            <div className="font-medium text-gray-900 dark:text-white">
              {leave.days || "-"}
            </div>
          </div>
        </div>
        {/* Reason Section */}
        <div>
          <div className="text-xs text-gray-500 mb-1">Reason</div>
          <div className="bg-gray-100 dark:bg-gray-700 rounded p-3 text-gray-900 dark:text-white whitespace-pre-line max-h-40 overflow-y-auto">
            {leave.reason || leave.leave_application || "-"}
          </div>
        </div>
        {/* Approve/Reject Form for HR/Manager/Admin only */}
        {(isHR || isAdmin || isManager) && !actioned && (
          <form onSubmit={formik.handleSubmit} className="mt-4">
            <div className="mb-2">
              <textarea
                className={`w-full p-2 rounded-md border ${formik.touched.comment && formik.errors.comment ? "border-red-500" : "border-gray-300"}`}
                placeholder="Write your comment..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.comment}
                name="comment"
                disabled={loading || leave.status === "HR Approved" || leave.status === "Admin Approved"}
              ></textarea>
              {formik.touched.comment && formik.errors.comment && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.comment}
                </div>
              )}
            </div>
            <div className="flex gap-2 mb-2">
              <button
                type="button"
                onClick={() => formik.setFieldValue("status", "Declined") || formik.handleSubmit()}
                className={`px-4 py-1 rounded-md border ${formik.values.status === "Declined" ? "bg-red-500 text-white border-red-700" : "bg-white text-red-600 border-red-300"}`}
                disabled={loading || leave.status === "HR Approved" || leave.status === "Admin Approved"}
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => formik.setFieldValue("status", "Approved") || formik.handleSubmit()}
                className={`px-4 py-1 rounded-md border ${formik.values.status === "Approved" ? "bg-green-500 text-white border-green-700" : "bg-white text-green-600 border-green-300"}`}
                disabled={loading || leave.status === "HR Approved" || leave.status === "Admin Approved"}
              >
                Approve
              </button>
            </div>
            {submitError && (
              <div className="text-red-500 text-sm mt-2">{submitError}</div>
            )}
          </form>
        )}
        {actioned && (
          <div className="text-center text-lg font-semibold text-green-500">Action completed!</div>
        )}
      </div>
    </div>
  );
};

const DirectLeaveAction = () => (
  <ThemeProvider>
    <DirectLeaveActionContent />
  </ThemeProvider>
);

export default DirectLeaveAction; 