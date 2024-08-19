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
  const { data, isHR, isAdmin, isUser } = useContext(AuthContext);
  const apiURL = import.meta.env.VITE_API;
  const [loading, setLoading] = useState(false);

  const fetchMessages = () => {
    setLoading(true);
    axios
      .get(
        isHR || isAdmin
          ? `${apiURL}/inbox_messages/all_leaves/${selectedStatus}`
          : `${apiURL}/inbox_messages/${data._id}`
      )
      .then((response) => {
        setLoading(false);
      
        setMessages(isHR || isAdmin ? response?.data : response?.data);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedStatus, isHR, isAdmin, data._id, apiURL]);

  const [openedIndex, setOpenedIndex] = useState(null);

  const handleCommentClick = (index, message) => {
    setOpenedIndex(openedIndex === index ? null : index);
    setValues({
      name: message?.messages.name,
      email: message?.messages.email,
      status: values.status,
      comment: values.comment,
      employee_id: message.employee_id,
      leave_id: message?.messages._id,
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
    resetForm,  // Add resetForm from Formik
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
      axios
        .post(`${apiURL}/send_email/leave_reply`, {
          name: values.name,
          email: values.email,
          status: values.status,
          comment: values.comment,
          employee_id: values.employee_id,
        })
        .then((res) => {
          console.log(res.data);
          axios
            .patch(`${apiURL}/send_email/update_message_status`, {
              employee_id: values.employee_id,
              status: values.status,
              leave_id: values.leave_id,
            })
            .then((res) => {
              console.log(res);
              setLoading(false);
              fetchMessages(); // Re-fetch messages after update
              resetForm(); // Reset form fields after submission
              setOpenedIndex(null);
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            });
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    },
  });

  return (
    <>
      <section id="inbox">
        <div className="p-4 sm:ml-64">
          {loading && <div className="loader ml-[50%] mt-[25%]"></div>}
   
          {!loading && (
            <div className="p-4 border-2 border-[#4a9dc9] h-auto border-dashed md:p-2 rounded-lg dark:border-gray-700 mt-16">
              {isHR || isAdmin ? (
                <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
                  <button
                    onClick={() => setSelectedStatus("All")}
                    className={`flex justify-center items-center p-2 gap-2 h-10 w-20 bg-lime-300 rounded-full cursor-pointer hover:bg-lime-400 transition-all text-sm md:text-base ${
                      selectedStatus === "All" ? "bg-lime-400 text-white" : ""
                    }`}
                  >
                    <span className="mt-[1px] text-black font-sans tracking-wider">
                      All ({allMessages?.length})
                    </span>
                  </button>
                  <button
                    onClick={() => setSelectedStatus("Pending")}
                    className={`flex justify-center items-center p-2 gap-2 h-10 w-20 bg-lime-300 rounded-full cursor-pointer hover:bg-lime-400 transition-all text-sm md:text-base ${
                      selectedStatus === "Pending" ? "bg-lime-400 text-white" : ""
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => setSelectedStatus("Approved")}
                    className={`flex justify-center items-center p-2 gap-2 h-10 w-20 bg-lime-300 rounded-full cursor-pointer hover:bg-lime-400 transition-all text-sm md:text-base ${
                      selectedStatus === "Approved" ? "bg-lime-400 text-white" : ""
                    }`}
                  >
                    Approved
                  </button>
                  <button
                    onClick={() => setSelectedStatus("Declined")}
                    className={`flex justify-center items-center p-2 gap-2 h-10 w-20 bg-lime-300 rounded-full cursor-pointer hover:bg-lime-400 transition-all text-sm md:text-base ${
                      selectedStatus === "Declined" ? "bg-lime-400 text-white" : ""
                    }`}
                  >
                    Declined
                  </button>
                </div>
              ) : null}
              {isHR || isAdmin
                ? allMessages?.map((data, index) => (
                    <div
                      key={data?.messages._id}
                      className="flex flex-col sm:flex-row items-start gap-2.5 mb-3"
                    >
                      <img
                        className="w-8 h-8 rounded-full"
                        src={User}
                        alt="User"
                      />
                      <div className="flex flex-col gap-1 w-full ">
                        <div className="flex flex-wrap items-center space-x-2 rtl:space-x-reverse">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {data?.messages.name} |
                          </span>
                          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            {data?.messages.email} | 11:49
                          </span>
                        </div>
                        <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                          <p> From {data?.messages.to_date}</p>
                          <p> To: {data?.messages.from_date}</p>
                          <p> Days: {data?.messages.days}</p>
                          <p className="text-sm font-normal text-gray-900 dark:text-white">
                            {data?.messages.leave_application}
                          </p>
                          <div
                            className="flex items-center justify-between border w-28 text-center p-2 rounded-lg mt-3 border-lime-300"
                            onClick={() => handleCommentClick(index, data)}
                          >
                            <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                              {data?.messages.status}
                            </div>
                            <button className="text-gray-500 dark:text-gray-400">
                              <FontAwesomeIcon
                                icon={faComment}
                                style={{ color: "#4977e7" }}
                              />
                            </button>
                          </div>
                        </div>

                        {openedIndex === index && (
                          <form
                            onSubmit={(e) => {
                              e.preventDefault(); // Prevent default form submission
                              handleSubmit(); // Call handleSubmit from Formik
                            }}
                          >
                            <div className="mt-2">
                              <textarea
                                className="w-full p-2 rounded-md border border-gray-300"
                                placeholder="Write your comment..."
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.comment}
                                name="comment"
                              ></textarea>
                              <div className="flex justify-between mt-2">
                                <div className="flex space-x-2">
                              
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setFieldValue("status", "Declined")
                                    }
                                    className={`px-3 py-1 rounded-md ${
                                      values.status === "Declined"
                                        ? "bg-red-600 border border-black text-white"
                                        : "bg-red-500 text-white"
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
                                        ? "bg-green-600 border border-black text-white"
                                        : "bg-green-500 text-white"
                                    }`}
                                  >
                                    Approved
                                  </button>
                                </div>
                                <button
                                  type="submit"
                                  className="bg-blue-500 text-white px-4 py-1 rounded-md"
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                  ))
                : (allMessages?.messages || []).map((data) => (
                    <div
                      key={data?._id}
                      className="flex flex-col sm:flex-row items-start gap-2.5 mb-3"
                    >
                      <img
                        className="w-8 h-8 rounded-full"
                        src={User}
                        alt="User"
                      />
                      <div className="flex flex-col gap-1 w-full ">
                        <div className="flex flex-wrap items-center space-x-2 rtl:space-x-reverse">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {data?.name} |
                          </span>
                          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            {data?.email} | 11:49
                          </span>
                        </div>
                        <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                          <p> From {data?.to_date}</p>
                          <p> To: {data?.from_date}</p>
                          <p> Days: {data?.days}</p>
                          <p className="text-sm font-normal text-gray-900 dark:text-white">
                            {data?.leave_application}
                          </p>
                          <div className="text-sm font-normal text-gray-500 dark:text-gray-400 border w-28 text-center p-2 rounded-lg mt-3 border-lime-300">
                          {data?.status}
                          </div>
                        </div>
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
