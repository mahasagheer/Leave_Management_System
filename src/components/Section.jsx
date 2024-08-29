import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const Section = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <>
      <div className="font-bold py-8 px-6 md:py-[10%] md:px-[15%] text-[#2b2f32]">
        <p
          className="text-3xl lg:text-6xl md:text-5xl text-center "
          data-aos="fade-down"
        >
          A leave management system your managers and employees will love to use
        </p>
        <p
          className="text-base md:text-lg text-center px-2 py-4 md:px-4"
          data-aos="fade-down"
        >
          All Hours is a user-friendly employee leave management solution that
          helps you to reduce the time and costs associated with leave
          management. It currently has 5,000+ users in organizations of all
          sizes.
        </p>
      </div>
    </>
  );
};

export default Section;
