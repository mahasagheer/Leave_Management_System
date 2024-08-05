import React, { useEffect } from "react";
import Send from "../send.png";
import Aos from "aos";
import "aos/dist/aos.css";

const LeaveSend = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <>
      <section>
        <div className="p-4 sm:ml-64 " data-aos="fade-down">
          <div className="p-4 border-2 border-gray-200 h-auto  bg-[#eaeeef] border-dashed rounded-lg dark:border-gray-700  mt-16  ">
            <div className="flex justify-center flex-col my-[9%]  py-[1%]  mx-[35%] bg-[#eaeeef]">
              <h1 className="text-2xl text-center">Send Successfully</h1>
              <p className="text-center">
                Your leave request has been successfully sent. Please wait for a
                response. Thank you for your patience.
              </p>
              <img src={Send} alt="send_img_successfully" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LeaveSend;
