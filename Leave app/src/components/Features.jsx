import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarPlus,
  faFileSignature,
  faClipboardCheck,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";
const Features = () => {
  return (
    <>
      <section className=" mx-[5%] text-center my-[5%]">
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-center">
          Online leave management.{" "}
          <span className="text-lime-500">Now made more efficient</span>
        </h1>

        <div className="flex flex-wrap mx-[5%] justify-evenly mt-[5%] gap-5">
          <div className="w-full sm:w-[45%] lg:w-[30%] border-2 border-lime-500 rounded-lg p-4">
            <FontAwesomeIcon
              icon={faFileSignature}
              size="2xl"
              className="m-4"
            />
            <p className="text-center text-2xl">Leave Tracking</p>
            <p className="my-2  sm:text-md">
              Tracking feature allows both employees and managers to monitor
              remaining, pending, and rejected leaves in real-time. This
              transparency aids in effective planning and prevents any
              miscommunication.
            </p>
          </div>
          <div className="w-full sm:w-[45%] lg:w-[30%] border-2  border-lime-500 rounded-lg p-4">
            <FontAwesomeIcon
              icon={faClipboardCheck}
              size="2xl"
              className="m-4"
            />
            <p className="text-center text-2xl">Approve and Reject</p>
            <p className="my-2  sm:text-md">
              The Leave Requests and Approvals process enables employees to
              easily submit leave requests and allows managers to promptly
              approve or reject them. Ensures a smooth leave process.
            </p>
          </div>
          <div className="w-full sm:w-[45%] lg:w-[30%] border-2  border-lime-500 rounded-lg p-4">
            <FontAwesomeIcon icon={faHandshake} size="2xl" className="m-4" />
            <p className="text-center text-2xl">Leave Policy</p>
            <p className="my-2  sm:text-md">
              Leave Policies information of company leave policies. This ensures
              employees are well-informed about their entitlements and the
              company’s guidelines, fostering a transparent and fair work
              environment.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
