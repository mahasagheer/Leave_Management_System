import React, { useEffect } from "react";
import Approve from "../public/leave-approval.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Aos from "aos";
import "aos/dist/aos.css";
const ApproveSection = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between gap-10 p-6 md:p-[8%] bg-[#90d7f5]">
        <div className="w-full lg:w-[50%] lg:ml-[8%] mb-6 lg:mb-0">
          <img
            src={Approve}
            alt="Approval"
            className="w-full h-auto object-cover"
          />
        </div>
        <div
          className="w-full lg:w-[50%] px-4 lg:px-[5%] overflow-hidden"
          data-aos="fade-left"
        >
          <p className="text-2xl md:text-4xl my-6 lg:my-[8%]">
            Leave approvals with notifications
          </p>
          <p className="text-base md:text-xl mb-4 lg:mb-[5%]">
            The approval process is fast, and the result is clear and visible to
            everyone involved.
          </p>
          <p className="text-base md:text-xl mb-4 lg:mb-[5%]">
            Administrators get an email notification when a new request is made,
            and the employees are notified when their request is approved or
            rejected.
          </p>
          <p className="text-base md:text-xl py-2">
            <FontAwesomeIcon icon={faCircleCheck} className="pr-3" /> No more
            endless email chains
          </p>
          <p className="text-base md:text-xl py-2">
            <FontAwesomeIcon icon={faCircleCheck} className="pr-3" /> Fast
            approvals
          </p>
          <p className="text-base md:text-xl py-2 ">
            <FontAwesomeIcon icon={faCircleCheck} className="pr-3" />{" "}
            Transparent history of approvals
          </p>
        </div>
      </div>
    </>
  );
};

export default ApproveSection;
