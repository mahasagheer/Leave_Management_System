import { useEffect, useState } from "react";
import "../index.css";
import { useContext } from "react";
import { AuthContext } from "../service/authentication";
import axios from "axios";

const dashboard = () => {
  const { data } = useContext(AuthContext);
  const [leaveDetail, setLeaveDetail] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:3000/employee_leave_detail/${data._id}`)
      .then((res) => {
        setLeaveDetail(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <section id="dashboard">
        <div className="p-4 sm:ml-64 ">
          <div className="p-4 border-2 border-gray-200 border-dashed  h-auto rounded-lg dark:border-gray-700 mt-16">
            <div className="flex gap-8 ">
              <div className="flex pl-10 mb-4 items-center flex-row h-30 w-full rounded  bg-[#eaeeef]">
                <div className="p-8">
                  <p className="text-3xl text-left "> Welcome back! </p>
                  <p className="text-lg pr-4">
                    Effortlessly manage your leave requests and stay on top of
                    your time off with our intuitive system
                  </p>
                </div>
              </div>
            </div>

            <h1 className="text-center text-2xl  my-5">
              Leave Status Overview
            </h1>
            <div className="flex gap-8">
              <div className="card">
                <a className="card1">
                  <p className="small">{leaveDetail.rejected_leave} Days</p>
                  <p className="text-3xl ">Rejected Leave</p>

                  <div className="go-corner">
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 14 20"
                    >
                      <path d="M13 20a1 1 0 0 1-.64-.231L7 15.3l-5.36 4.469A1 1 0 0 1 0 19V2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v17a1 1 0 0 1-1 1Z" />
                    </svg>
                    <div className="go-arrow"></div>
                  </div>
                </a>
              </div>

              <div className="card">
                <a className="card1">
                  <p className="small">{leaveDetail.pending_leave} Days</p>
                  <p className="text-3xl ">Pending Leave</p>
                  <div className="go-corner">
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3.546l3.2 3.659a1 1 0 0 0 1.506 0L13.454 14H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-8 10H5a1 1 0 0 1 0-2h5a1 1 0 1 1 0 2Zm5-4H5a1 1 0 0 1 0-2h10a1 1 0 1 1 0 2Z" />
                    </svg>
                    <div className="go-arrow"></div>
                  </div>
                </a>
              </div>
              <div className="card">
                <a className="card1">
                  <p className="small">{leaveDetail.remaining_leave} Days</p>
                  <p className="text-3xl ">Remaining Leave</p>
                  <div className="go-corner">
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 20"
                    >
                      <path d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z" />
                    </svg>
                    <div className="go-arrow"></div>
                  </div>
                </a>
              </div>
            </div>
            <h1 className="text-center text-2xl my-5">Leave Entitlements</h1>
            <div className="grid grid-cols-3 gap-4 mb-4 ">
              <div className="card">
                <a className="card1">
                  <p className="small">{leaveDetail.annual_leave} Days</p>
                  <p className="text-3xl ">Annual Leave</p>
                  <div className="go-corner">
                    <svg
                      className="w-8 h-8 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 16"
                    >
                      <path d="M19 0H1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1ZM2 6v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6H2Zm11 3a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0h2a1 1 0 0 1 2 0v1Z" />
                    </svg>
                    <div className="go-arrow"></div>
                  </div>
                </a>
              </div>
              <div className="card">
                <a className="card1">
                  <p className="small">{leaveDetail.causal_leave} Days</p>
                  <p className="text-3xl ">Causal Leave</p>
                  <div className="go-corner">
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M19.728 10.686c-2.38 2.256-6.153 3.381-9.875 3.381-3.722 0-7.4-1.126-9.571-3.371L0 10.437V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-7.6l-.272.286Z" />
                      <path d="m.135 7.847 1.542 1.417c3.6 3.712 12.747 3.7 16.635.01L19.605 7.9A.98.98 0 0 1 20 7.652V6a2 2 0 0 0-2-2h-3V3a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1H2a2 2 0 0 0-2 2v1.765c.047.024.092.051.135.082ZM10 10.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5ZM7 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1H7V3Z" />
                    </svg>
                    <div className="go-arrow"></div>
                  </div>
                </a>
              </div>
              <div className="card">
                <a className="card1">
                  <p className="small">{leaveDetail.sick_leave} Days</p>
                  <p className="text-3xl ">Sick Leave</p>
                  <div className="go-corner">
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                    <div className="go-arrow"></div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default dashboard;
