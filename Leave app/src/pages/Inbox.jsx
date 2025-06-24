import User from "../public/userImg.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../service/authentication";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { leaveDecisionSchema } from "../validation/addUserValidate";
import { useFormik } from "formik";

const View = () => {
  const [allMessages, setMessages] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const { data, isHR, isAdmin } = useContext(AuthContext);
  const apiURL = import.meta.env.VITE_API;
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [error, setError] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  const fetchMessages = () => {
    setLoading(true);
    setError(null);
    axios
      .get(
        isHR || isAdmin
          ? `${apiURL}/inbox_messages/all_leaves/${selectedStatus}`
          : `${apiURL}/inbox_messages/${data._id}`
      )
      .then((response) => {
        setLoading(false);
        // Normalize the data structure for both HR/Admin and regular users
        const normalizedData = isHR || isAdmin 
          ? response?.data 
          : response?.data?.messages 
            ? [{ employee_id: data._id, messages: response.data.messages }]
            : [];
        setMessages(normalizedData);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setError("Failed to fetch messages. Please try again later.");
      });
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedStatus, isHR, isAdmin, data._id, apiURL]);

  // Fetch all users if manager
  useEffect(() => {
    if (data.role === "Manager") {
      setLoading(true);
      axios.get(`${apiURL}/users`)
        .then((res) => {
          setAllUsers(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to fetch users. Please try again later.");
          setLoading(false);
        });
    }
  }, [data.role, apiURL]);

  // Filter messages for manager: only show messages from users with 'user' role
  let filteredMessages = allMessages;
  if (data.role === "Manager" && !isHR && !isAdmin && allUsers.length > 0) {
    // Build a map of userId to role
    const userRoleMap = {};
    allUsers.forEach((user) => {
      userRoleMap[user._id] = user.role;
    });
    // Only keep messages where employee_id's role is 'user'
    filteredMessages = (Array.isArray(allMessages) ? allMessages : []).filter(
      (msg) => userRoleMap[msg.employee_id] === "user"
    );
  }

  const [openedIndex, setOpenedIndex] = useState(null);

  const handleCommentClick = (index, message) => {
    setOpenedIndex(openedIndex === index ? null : index);
    // Reset form when opening a new message
    resetForm();
    setValues({
      name: message?.messages?.name || "",
      email: message?.messages?.email || "",
      status: "",
      comment: "",
      employee_id: message?.employee_id || "",
      leave_id: message?.messages?._id || "",
    });
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setValues,
    resetForm,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      status: "",
      comment: "",
      employee_id: "",
      leave_id: "",
    },
    validationSchema: leaveDecisionSchema,
    onSubmit: (values) => {
      setLoading(true);
      setSubmitError(null);

      // First update the message status
      axios
        .patch(`${apiURL}/send_email/update_message_status`, {
          employee_id: values.employee_id,
          status: values.status,
          leave_id: values.leave_id,
        })
        .then(() => {
          // Then send the email
          return axios.post(`${apiURL}/send_email/leave_reply`, {
            name: values.name,
            email: values.email,
            status: values.status,
            comment: values.comment,
            employee_id: values.employee_id,
            leave_id: values.leave_id,
          });
        })
        .then(() => {
          setLoading(false);
          fetchMessages(); // Re-fetch messages after update
          resetForm(); // Reset form fields after submission
          setOpenedIndex(null);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
          setSubmitError(
            error.response?.data?.message || 
            "Failed to process the request. Please try again."
          );
        });
    },
  });

  return (
    <>
      <section id="inbox">
        <div className="p-4 sm:ml-64">
          {loading && <div className="loader ml-[50%] mt-[25%]"></div>}
          {error && (
            <div className="text-red-500 text-center p-4 bg-red-100 rounded-lg mb-4">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="p-4 border-2 border-[#4a9dc9] border-dashed rounded-lg dark:border-gray-700 mt-16">
              {isHR || isAdmin ? (
                <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
                  <button
                    onClick={() => setSelectedStatus("All")}
                    className={`flex justify-center items-center bg-[#f3f4f6] p-2 gap-2 h-10 w-24 rounded-full cursor-pointer hover:bg-[#f4f4f5] transition-all text-xs sm:text-sm md:text-base ${
                      selectedStatus === "All" ? "bg-[#dbdcdd]" : ""
                    }`}
                  >
                    <span className="mt-[1px] text-black font-sans tracking-wider">
                      All ({filteredMessages?.length || 0})
                    </span>
                  </button>
                  <button
                    onClick={() => setSelectedStatus("Pending")}
                    className={`flex justify-center items-center bg-[#f3f4f6] p-2 gap-2 h-10 w-24  rounded-full cursor-pointer hover:bg-[#f4f4f5] transition-all text-xs sm:text-sm md:text-base ${
                      selectedStatus === "Pending" ? "bg-[#dbdcdd] " : ""
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => setSelectedStatus("Approved")}
                    className={`flex justify-center items-center bg-[#f3f4f6] p-2 gap-2 h-10 w-24  rounded-full cursor-pointer hover:bg-[#f4f4f5] transition-all text-xs sm:text-sm md:text-base ${
                      selectedStatus === "Approved" ? "bg-[#dbdcdd] " : ""
                    }`}
                  >
                    Approved
                  </button>
                  <button
                    onClick={() => setSelectedStatus("Declined")}
                    className={`flex justify-center items-center bg-[#f3f4f6] p-2 gap-2 h-10 w-24  rounded-full cursor-pointer hover:bg-[#f4f4f5] transition-all text-xs sm:text-sm md:text-base ${
                      selectedStatus === "Declined" ? "bg-[#dbdcdd] " : ""
                    }`}
                  >
                    Declined
                  </button>
                </div>
              ) : null}

              {data.role === "user"
                ? (allMessages[0]?.messages || []).map((msg, index) => (
                    <div
                      key={msg._id || index}
                      className="flex flex-col sm:flex-row items-start gap-2.5 mb-3"
                    >
                      <img
                        className="w-8 h-8 rounded-full"
                        src={User}
                        alt="User"
                      />
                      <div className="flex flex-col gap-1 w-full">
                        <div className="flex flex-wrap items-center space-x-2 rtl:space-x-reverse">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {msg.name || ""} |
                          </span>
                          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            {msg.email || ""} | {new Date(msg.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex flex-col p-4 border-gray-200 bg-gray-100 rounded-e-xl dark:bg-gray-700">
                          <p>From: {msg.to_date}</p>
                          <p>To: {msg.from_date}</p>
                          <p>Days: {msg.days}</p>
                          <p className="text-sm font-normal text-gray-900 dark:text-white">
                            {msg.leave_application}
                          </p>
                          <div className="text-sm font-normal text-gray-500 dark:text-gray-400 border w-28 text-center p-2 rounded-lg mt-3 border-lime-300">
                            {msg.status}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : filteredMessages.map((data, index) => (
                    <div
                      key={data?.messages?._id || index}
                      className="flex flex-col sm:flex-row items-start gap-2.5 mb-3"
                    >
                      <img
                        className="w-8 h-8 rounded-full"
                        src={User}
                        alt="User"
                      />
                      <div className="flex flex-col gap-1 w-full">
                        <div className="flex flex-wrap items-center space-x-2 rtl:space-x-reverse">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {data?.messages?.name || data?.name || ""} |
                          </span>
                          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            {data?.messages?.email || data?.email || ""} | {new Date(data?.messages?.createdAt || data?.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex flex-col p-4 border-gray-200 bg-gray-100 rounded-e-xl dark:bg-gray-700">
                          <p>From: {data?.messages?.to_date || data?.to_date}</p>
                          <p>To: {data?.messages?.from_date || data?.from_date}</p>
                          <p>Days: {data?.messages?.days || data?.days}</p>
                          <p className="text-sm font-normal text-gray-900 dark:text-white">
                            {data?.messages?.leave_application || data?.leave_application}
                          </p>
                          {(isHR || isAdmin || data.role === "Manager") ? (
                            <div
                              className="flex items-center justify-between border w-28 text-center p-2 rounded-lg mt-3 border-lime-300 cursor-pointer"
                              onClick={() => handleCommentClick(index, data)}
                            >
                              <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                {data?.messages?.status || data?.status || "Pending"}
                              </div>
                              <button className="text-gray-500 dark:text-gray-400">
                                <FontAwesomeIcon
                                  icon={faComment}
                                  style={{ color: "#4977e7" }}
                                />
                              </button>
                            </div>
                          ) : (
                            <div className="text-sm font-normal text-gray-500 dark:text-gray-400 border w-28 text-center p-2 rounded-lg mt-3 border-lime-300">
                              {data?.messages?.status || data?.status || "Pending"}
                            </div>
                          )}
                        </div>

                        {openedIndex === index && (
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              handleSubmit();
                            }}
                          >
                            <div className="mt-2">
                              <textarea
                                className={`w-full p-2 rounded-md border ${
                                  touched.comment && errors.comment 
                                    ? "border-red-500" 
                                    : "border-gray-300"
                                }`}
                                placeholder="Write your comment..."
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.comment}
                                name="comment"
                              ></textarea>
                              {touched.comment && errors.comment && (
                                <div className="text-red-500 text-sm mt-1">
                                  {errors.comment}
                                </div>
                              )}
                              <div className="flex justify-between mt-2">
                                <div className="flex space-x-2">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setFieldValue("status", "Declined")
                                    }
                                    className={`px-3 py-1 rounded-md ${
                                      values.status === "Declined"
                                        ? "bg-[#3b8fc2] border border-black text-white"
                                        : "bg-[#3b8fc2] text-black"
                                    }`}
                                  >
                                    Declined
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setFieldValue("status", "Approved")
                                    }
                                    className={`px-3 py-1 rounded-md ${
                                      values.status === "Approved"
                                        ? "bg-lime-300 border border-black text-white"
                                        : "bg-lime-300 text-black"
                                    }`}
                                  >
                                    Approved
                                  </button>
                                </div>
                                <button
                                  type="submit"
                                  disabled={loading}
                                  className={`bg-blue-500 text-white px-4 py-1 rounded-md ${
                                    loading ? "opacity-50 cursor-not-allowed" : ""
                                  }`}
                                >
                                  {loading ? "Submitting..." : "Submit"}
                                </button>
                              </div>
                              {submitError && (
                                <div className="text-red-500 text-sm mt-2">
                                  {submitError}
                                </div>
                              )}
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                  ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default View;
