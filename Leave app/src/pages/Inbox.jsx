import User from "../userImg.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../service/authentication";

const view = () => {
  const [allMessages, setMessages] = useState([]);
  const { data, isHR } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/inbox_messages/${data._id}`)
      .then((response) => {
        setMessages(response.data.messages);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      <section id="inbox">
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-[#4a9dc9] h-auto border-dashed rounded-lg dark:border-gray-700 mt-16 ">
            <h1 className="text-3xl text-center py-5">Inbox </h1>
            {isHR
              ? allMessages.map((data) => {
                  return (
                    <Link to={`/leave_Decision/${data.employee_id}`}>
                      <div
                        key={data.employee_id}
                        class="flex items-center gap-5 border-2 m-2 border-[#4a9dc9] rounded-lg p-2 "
                      >
                        <img class="w-8 h-8 rounded-full" src={User} alt="" />
                        <div class="flex flex-col w-full leading-1.5">
                          <div class="flex items-center  space-x-2 rtl:space-x-reverse">
                            <span class="text-sm font-semibold text-gray-900 dark:text-white">
                              {data.name}
                            </span>
                            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                              {data.email}
                            </span>
                          </div>
                          <div class="flex items-center  space-x-2 rtl:space-x-reverse">
                            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                              From {data.to_date}
                            </span>
                            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                              To: {data.from_date}
                            </span>
                          </div>
                          <p class="text-sm font-normal py-2 text-gray-900 dark:text-white">
                            {data.leave_application}
                          </p>
                          <p>{data.status}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })
              : allMessages.map((data) => {
                  return (
                    <div
                      key={data.employee_id}
                      class="flex items-center gap-5 border-2 m-2 border-[#4a9dc9] rounded-lg p-2 "
                    >
                      <img class="w-8 h-8 rounded-full" src={User} alt="" />
                      <div class="flex flex-col w-full leading-1.5">
                        <div class="flex items-center  space-x-2 rtl:space-x-reverse">
                          <span class="text-sm font-semibold text-gray-900 dark:text-white">
                            {data.name}
                          </span>
                          <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                            {data.email}
                          </span>
                        </div>
                        <div class="flex items-center  space-x-2 rtl:space-x-reverse">
                          <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                            From {data.to_date}
                          </span>
                          <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                            To: {data.from_date}
                          </span>
                        </div>
                        <p class="text-sm font-normal py-2 text-gray-900 dark:text-white">
                          {data.leave_application}
                        </p>
                        <p>{data.status}</p>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </section>
    </>
  );
};

export default view;
