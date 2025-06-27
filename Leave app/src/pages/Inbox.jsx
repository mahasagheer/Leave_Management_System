import User from "../public/userImg.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../service/authentication";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { leaveDecisionSchema } from "../validation/addUserValidate";
import { useFormik } from "formik";

const View = () => {
  const [allMessages, setMessages] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const { data, isHR, isAdmin, isManager } = useContext(AuthContext);
  const apiURL = import.meta.env.VITE_API;
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [error, setError] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [selectedMsgIndex, setSelectedMsgIndex] = useState(null);

  // Define all status filters with their badge color
  const statusFilters = [
    { label: "All", value: "All", color: "bg-gray-200 text-gray-700" },
    { label: "Pending", value: "Pending", color: "bg-yellow-100 text-yellow-700 border-yellow-300" },
    { label: "HR Approved", value: "HR Approved", color: "bg-blue-100 text-blue-700 border-blue-300" },
    { label: "Manager Approved", value: "Manager Approved", color: "bg-teal-100 text-teal-700 border-teal-300" },
    { label: "Rejected by Manager", value: "Rejected by Manager", color: "bg-orange-100 text-orange-700 border-orange-300" },
    { label: "Admin Approved", value: "Admin Approved", color: "bg-blue-100 text-blue-700 border-blue-300" },
    { label: "Admin Rejected", value: "Admin Rejected", color: "bg-red-100 text-red-700 border-red-300" },
  ];

  const fetchMessages = () => {
    setLoading(true);
    setError(null);
    let url = `${apiURL}/inbox_messages/${data._id}`;

    if (isAdmin) {
      url = `${apiURL}/inbox_messages/all_leaves/${selectedStatus}`;
    } else if (isHR) {
      url = `${apiURL}/inbox_messages/hr_leave/${selectedStatus}`;
    } else if (isManager) {
      url = `${apiURL}/inbox_messages/manager_leave/${selectedStatus}`;
    }
    axios
      .get(url)
      .then((response) => {
        setLoading(false);
        // Normalize the data structure for both HR/Admin and regular users
        const normalizedData =
          isHR || isAdmin || isManager
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
      axios
        .get(`${apiURL}/users`)
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
  if (isManager && !isHR && !isAdmin && allUsers.length > 0) {
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

  // For user role, flatten messages
  let userMessages = data.role === "user" ? allMessages[0]?.messages || [] : [];
  // Sort user messages by most recent createdAt (descending)
  if (data.role === "user" && Array.isArray(userMessages)) {
    userMessages = [...userMessages].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      if (isNaN(dateA) && isNaN(dateB)) return 0;
      if (isNaN(dateA)) return 1;
      if (isNaN(dateB)) return -1;
      return dateB - dateA;
    });
  }
  // Select the correct message list
  const messageList = data.role === "user" ? userMessages : filteredMessages;

  // Select the message to show in detail
  const selectedMessage =
    selectedMsgIndex !== null && messageList[selectedMsgIndex]
      ? data.role === "user"
        ? messageList[selectedMsgIndex]
        : messageList[selectedMsgIndex]?.messages ||
          messageList[selectedMsgIndex]
      : null;

  // Formik for approve/decline
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
      if (values.status === "Approved") {
        if (isHR) {
      axios
            .put(`${apiURL}/send_email/hr_approve`, {
          employee_id: values.employee_id,
              message_id: values.leave_id,
              comment: values.comment,
            })
           // .then(() => {
           //   return axios.post(`${apiURL}/send_email/leave_reply`, {
            //    name: values.name,
            //    email: values.email,
         // status: values.status,
           //     comment: values.comment,
           //     employee_id: values.employee_id,
         // leave_id: values.leave_id,
          //    });
          //  })
            .then(() => {
              setLoading(false);
              fetchMessages();
              resetForm();
              setFieldValue("status", "");
              setFieldValue("comment", "");
            })
            .catch((error) => {
              console.error(error);
              setLoading(false);
              setSubmitError(
                error.response?.data?.message ||
                  "Failed to process the request. Please try again."
              );
            });
        } else if (data.role === "Manager") {
          axios
            .put(`${apiURL}/send_email/manager_approve`, {
              employee_id: values.employee_id,
              message_id: values.leave_id,
              comment: values.comment,
            })
            .then(() => {
              setLoading(false);
              fetchMessages();
              resetForm();
              setFieldValue("status", "");
              setFieldValue("comment", "");
            })
            .catch((error) => {
              console.error(error);
              setLoading(false);
              setSubmitError(
                error.response?.data?.message ||
                  "Failed to process the request. Please try again."
              );
            });
        }
      } else {
        if (isHR) {
          axios
            .put(`${apiURL}/send_email/hr_reject`, {
              employee_id: values.employee_id,
              message_id: values.leave_id,
              comment: values.comment,
        })
        //.then(() => {
        //  return axios.post(`${apiURL}/send_email/leave_reply`, {
         // name: values.name,
         // email: values.email,
         // status: values.status,
         // comment: values.comment,
         // employee_id: values.employee_id,
         // leave_id: values.leave_id,
         // });
      //  })
        .then(() => {
              setLoading(false);
          fetchMessages();
          resetForm();
          setFieldValue("status", "");
          setFieldValue("comment", "");
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
          setSubmitError(
            error.response?.data?.message ||
              "Failed to process the request. Please try again."
          );
        });
        } else if (data.role === "Manager") {
          axios
            .put(`${apiURL}/send_email/manager_reject`, {
              employee_id: values.employee_id,
              message_id: values.leave_id,
              comment: values.comment,
            })
            .then(() => {
              setLoading(false);
              fetchMessages();
              resetForm();
              setFieldValue("status", "");
              setFieldValue("comment", "");
            })
            .catch((error) => {
              console.error(error);
              setLoading(false);
              setSubmitError(
                error.response?.data?.message ||
                  "Failed to process the request. Please try again."
              );
            });
        }
      }
    },
  });

  // When a message is selected, set form values for HR/Admin/Manager
  const handleSelectMessage = (index, msgObj) => {
    setSelectedMsgIndex(index);
    resetForm();
    if (data.role !== "user") {
      const msg = msgObj.messages || msgObj;
      setValues({
        name: msg?.name || "",
        email: msg?.email || "",
        status: "",
        comment: "",
        employee_id: msgObj.employee_id || "",
        leave_id: msg?._id || "",
      });
    }
  };

  // Status badge color
  const statusBadge = (status) => {
    if (status === "HR Approved") return "bg-blue-100 text-blue-700 border-blue-300";
    if (status === "Manager Approved") return "bg-teal-100 text-teal-700 border-teal-300";
    if (status === "Rejected by Manager") return "bg-orange-100 text-orange-700 border-orange-300";
    if (status === "Admin Approved") return "bg-blue-100 text-blue-700 border-blue-300";
    if (status === "Admin Rejected") return "bg-red-100 text-red-700 border-red-300";
    if (status === "Approved") return "bg-green-100 text-green-700 border-green-300";
    if (status === "Declined") return "bg-red-100 text-red-700 border-red-300";
    if (status === "Pending") return "bg-yellow-100 text-yellow-700 border-yellow-300";
    return "bg-gray-100 text-gray-700 border-gray-300";
  };

  // When filtering messages:
  const filteredSortedMessageList = selectedStatus === "All"
    ? messageList
    : messageList.filter((msgObj) => {
        const msg = data.role === "user" ? msgObj : msgObj.messages || msgObj;
        return msg.status === selectedStatus;
      });

  return (
    <section
      id="inbox"
      className="p-0 sm:p-4 sm:ml-64  sm:t-50 bg-gray-50 dark:bg-gray-900"
    >
      {loading && <div className="loader ml-[50%] mt-[25%]"></div>}
      {error && (
        <div className="text-red-500 text-center p-4 bg-red-100 rounded-lg mb-4">
          {error}
        </div>
      )}
      {!loading && !error && (
        <div className="flex flex-col md:flex-row gap-4 h-[87vh] mt-16">
          {/* Left Panel: Message List */}
          <div className="w-full md:w-1/3 bg-white dark:bg-gray-800 rounded-lg shadow p-2 overflow-y-auto">
            <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
              {(isHR || isAdmin || isManager) && (
                <>
                  {statusFilters.map((filter) => (
                  <button
                      key={filter.value}
                      onClick={() => setSelectedStatus(filter.value)}
                      className={`flex justify-center text-sm items-center p-1 gap-2 h-8 w-auto px-3 rounded-full cursor-pointer transition-all text-xs sm:text-sm md:text-base border ${filter.color} ${selectedStatus === filter.value ? 'ring-2 ring-blue-400' : ''}`}
                  >
                      <span className="mt-[1px] text-xs font-sans">
                        {filter.label}
                    </span>
                  </button>
                  ))}
                </>
              )}
            </div>
            {/* Message List */}
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredSortedMessageList.length === 0 && (
                <div className="text-center text-gray-400 py-8">
                  No messages found.
                </div>
              )}
              {filteredSortedMessageList.map((msgObj, idx) => {
                const msg =
                  data.role === "user" ? msgObj : msgObj.messages || msgObj;
                return (
                  <div
                    key={msg._id || idx}
                    className={`flex items-center gap-3 p-3 cursor-pointer rounded-lg transition-colors mb-1 hover:bg-blue-50 dark:hover:bg-gray-700 ${
                      selectedMsgIndex === idx
                        ? "bg-blue-100 dark:bg-gray-700 border-l-4 border-blue-500"
                        : ""
                    }`}
                    onClick={() => handleSelectMessage(idx, msgObj)}
                  >
                    <img
                      src={User}
                      alt="User"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 dark:text-white truncate">
                          {msg.name}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs border ${statusBadge(
                            msg.status
                          )}`}
                        >
                          {msg.status}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {msg.email}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(msg.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Right Panel: Message Detail */}
          <div className="w-full md:w-2/3 bg-white dark:bg-gray-800 rounded-lg shadow p-6 overflow-y-auto flex flex-col">
            {!selectedMessage ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                <FontAwesomeIcon icon={faComment} size="3x" className="mb-4" />
                <div>Select a message to view details</div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 border-b pb-4">
                  <img
                    src={User}
                    alt="User"
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-bold text-lg text-gray-900 dark:text-white">
                      {selectedMessage.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {selectedMessage.email}
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(selectedMessage.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <span
                    className={`ml-auto px-3 py-1 rounded-full text-xs border ${statusBadge(
                      selectedMessage.status
                    )}`}
                  >
                    {selectedMessage.status}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-gray-500">From</div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {selectedMessage.to_date
                        ? new Date(selectedMessage.to_date).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "long", day: "numeric" }
                          )
                        : ""}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">To</div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {selectedMessage.from_date
                        ? new Date(
                            selectedMessage.from_date
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : ""}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Days</div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {selectedMessage.days}
                    </div>
                        </div>
                            </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Application</div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded p-3 text-gray-900 dark:text-white whitespace-pre-line max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-100">
                    {selectedMessage.leave_application}
                          </div>
                        </div>
                {/* Approve/Decline/Comment for HR/Admin/Manager */}
                {(isHR || isAdmin || data.role === "Manager") && selectedMessage && (
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                      // Prevent submission if status is HR Approved or Admin Approved
                      if (selectedMessage.status === "HR Approved" || selectedMessage.status === "Admin Approved") return;
                              handleSubmit();
                            }}
                    className="mt-4"
                          >
                    <div className="mb-2">
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
                        disabled={selectedMessage.status === "HR Approved" || selectedMessage.status === "Admin Approved"}
                              ></textarea>
                      {touched.comment && errors.comment && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.comment}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 mb-2">
                                  <button
                                    type="button"
                        onClick={() => setFieldValue("status", "Declined")}
                        className={`px-4 py-1 rounded-md border ${
                                      values.status === "Declined"
                            ? "bg-red-500 text-white border-red-700"
                            : "bg-white text-red-600 border-red-300"
                                    }`}
                        disabled={selectedMessage.status === "HR Approved" || selectedMessage.status === "Admin Approved"}
                                  >
                        <FontAwesomeIcon icon={faTimesCircle} className="mr-1" /> Decline
                                  </button>
                                  <button
                                    type="button"
                        onClick={() => setFieldValue("status", "Approved")}
                        className={`px-4 py-1 rounded-md border ${
                                      values.status === "Approved"
                            ? "bg-green-500 text-white border-green-700"
                            : "bg-white text-green-600 border-green-300"
                                    }`}
                        disabled={selectedMessage.status === "HR Approved" || selectedMessage.status === "Admin Approved"}
                                  >
                        <FontAwesomeIcon icon={faCheckCircle} className="mr-1" /> Approve
                                  </button>
                                </div>
                                <button
                                  type="submit"
                      disabled={loading || selectedMessage.status === "HR Approved" || selectedMessage.status === "Admin Approved"}
                      className={`bg-blue-500 text-white px-6 py-2 rounded-md mt-2 ${
                        loading || selectedMessage.status === "HR Approved" || selectedMessage.status === "Admin Approved" ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                                >
                      {loading ? "Submitting..." : "Submit"}
                                </button>
                    {submitError && (
                      <div className="text-red-500 text-sm mt-2">{submitError}</div>
                    )}
                          </form>
                        )}
                      </div>
            )}
            </div>
        </div>
      )}
      </section>
  );
};

export default View;
