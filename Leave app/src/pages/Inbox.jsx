import User from "../public/userImg.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext, useNavigate } from "react";
import { AuthContext } from "../service/authentication";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { leaveDecisionSchema } from "../validation/addUserValidate";

const view = () => {
  const [allMessages, setMessages] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const { data, isHR, isAdmin } = useContext(AuthContext);
  const apiURL = import.meta.env.VITE_API;
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        isHR
          ? `${apiURL}/inbox_messages/all_leaves/${selectedStatus}`
          : `${apiURL}/inbox_messages/${data._id}`
      )
      .then((response) => {
        setLoading(false);
        setMessages(isHR ? response.data : response.data.messages);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selectedStatus]);

  const [openedMessageId, setOpenedMessageId] = useState(null);

  const handleCommentClick = (messageId) => {
    setOpenedMessageId(openedMessageId === messageId ? null : messageId);
  };

  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        status: "",
        comment: "",
        employee_id: "",
      },
      validationSchema: leaveDecisionSchema,
      onSubmit: (values) => {
        console.log(values);
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
              })
              .then((res) => {
                console.log(res);
                navigate("/send");
              })
              .catch((err) => console.log(err));
          })
          .catch((error) => {
            console.log(error);
          });
      },
    });
  return (
    <>
      <section id="inbox">
        <div className="p-4 sm:ml-64">
          {Loading && <div className=" loader ml-[50%] mt-[25%]"></div>}

          {!Loading && (
            <div className="p-4 border-2 border-[#4a9dc9] h-auto border-dashed md:p-2 rounded-lg dark:border-gray-700 mt-16">
              {isHR || isAdmin ? (
                <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
                  <button
                    onClick={() => setSelectedStatus("All")}
                    className="flex justify-center items-center p-2 gap-2 h-10 w-20 bg-lime-300 rounded-full cursor-pointer hover:bg-lime-400 transition-all text-sm md:text-base"
                  >
                    <span className="mt-[1px] text-black font-sans tracking-wider">
                      All ({allMessages.length})
                    </span>
                  </button>
                  <button
                    onClick={() => setSelectedStatus("Pending")}
                    className="flex justify-center items-center p-2 gap-2 h-10 w-20  bg-lime-300 rounded-full cursor-pointer hover:bg-lime-400 transition-all text-sm md:text-base"
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => setSelectedStatus("Approved")}
                    className="flex justify-center items-center p-2 gap-2 h-10 w-20  bg-lime-300 rounded-full cursor-pointer hover:bg-lime-400 transition-all text-sm md:text-base"
                  >
                    Approved
                  </button>
                  <button
                    onClick={() => setSelectedStatus("Declined")}
                    className="flex justify-center items-center p-2 gap-2 h-10 w-20  bg-lime-300 rounded-full cursor-pointer hover:bg-lime-400 transition-all text-sm md:text-base"
                  >
                    Declined
                  </button>
                </div>
              ) : null}
              {isHR || isAdmin
                ? allMessages?.map((data) => {
                    return (
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
                          </div>
                          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            {data?.messages.status}
                          </span>
                          <div className="flex items-center">
                            <button
                              className="text-gray-500 dark:text-gray-400"
                              onClick={() =>
                                handleCommentClick(data?.messages._id)
                              }
                            >
                              <FontAwesomeIcon
                                icon={faComment}
                                style={{ color: "#4977e7" }}
                              />
                            </button>
                          </div>
                          {openedMessageId === data?.messages._id && (
                            <form onClick={handleSubmit}>
                              <div className="mt-2">
                                <textarea
                                  className="w-full p-2 rounded-md border border-gray-300"
                                  placeholder="Write your comment..."
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.comment}
                                ></textarea>
                                <div className="flex justify-between mt-2">
                                  <div className="flex space-x-2">
                                    <button
                                      value={"Pending"}
                                      name="status"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                                    >
                                      Pending
                                    </button>
                                    <button
                                      value={"Declined"}
                                      name="status"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      className="bg-red-500 text-white px-3 py-1 rounded-md"
                                    >
                                      Declined
                                    </button>
                                    <button
                                      value={"Approved"}
                                      name="value"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      className="bg-green-500 text-white px-3 py-1 rounded-md"
                                    >
                                      Approved
                                    </button>
                                  </div>
                                  <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-3 py-1 rounded-md"
                                  >
                                    Send
                                  </button>
                                </div>
                              </div>
                            </form>
                          )}
                        </div>
                      </div>
                    );
                  })
                : allMessages?.map((data) => {
                    return (
                      <div className="flex flex-col sm:flex-row items-start gap-2.5 mb-3">
                        <img
                          className="w-8 h-8 rounded-full"
                          src={User}
                          alt="User"
                        />

                        <div className="flex flex-col gap-1 w-full ">
                          <div className="flex flex-wrap items-center space-x-2 rtl:space-x-reverse">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                              {data?.name}
                            </span>
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                              {data.email} | 11:49
                            </span>
                          </div>
                          <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                            <p> From {data?.to_date}</p>
                            <p> To: {data?.from_date}</p>
                            <p> Days: {data?.days}</p>
                            <p className="text-sm font-normal text-gray-900 dark:text-white">
                              {data?.leave_application + "...."}
                            </p>
                          </div>
                          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            {data?.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default view;
