import React, { useEffect } from "react";
import Send from "../send.png";
import Aos from "aos";
import "aos/dist/aos.css";

const UserAdded = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <>
      <section>
        <div className="p-4 sm:ml-64 " data-aos="fade-down">
          <div className="p-4 border-2 border-[#4a9dc9] h-auto  bg-[#eaeeef] border-dashed rounded-lg dark:border-gray-700  mt-16  ">
            <div className="flex justify-center flex-col my-[9%] py-[1%] mx-[35%] bg-[#eaeeef]">
              <h1 className="text-2xl text-center">
                Employee Added Successfully
              </h1>
              <p className="text-center">
                Our team has grown! The new employee has been successfully added
                and we look forward to working together.{" "}
              </p>
              <img src={Send} alt="send_img_successfully" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserAdded;
