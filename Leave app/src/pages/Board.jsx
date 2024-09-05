import React, { useState } from "react";
import User from "../public/features-1.png";
import Features from "../components/Features";
import Footer from "../components/Footer";
import ModalComponent from "../components/Model";
import ModelTwo from "../components/ModelTwo";
import Section from "../components/Section";
import ApproveSection from "../components/ApproveSection";
const Board = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
          <a className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center sm:text-3xl font-semibold whitespace-nowrap dark:text-white xs:text-2xl">
              WORK PAUSE
            </span>
          </a>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <ModalComponent />
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-user"
              aria-expanded={isNavOpen}
              onClick={toggleNav}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between ${
              isNavOpen ? "block" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  className="block py-2 px-3 text-white bg-lime-500 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                  About
                </a>
              </li>
              <li>
                <a className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                  Services
                </a>
              </li>
              <li>
                <a className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                  Pricing
                </a>
              </li>
              <li>
                <a className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <section className="relative">
        <div className="border mx-[5%] text-gray-50 duration-300 relative group cursor-pointer overflow-hidden h-1/2 w-[90%] mt-[2%] min-h-[50vh] rounded-3xl bg-[#90d7f5] p-2 flex flex-col lg:flex-row">
          <div className="relative flex-1 lg:order-2 flex justify-end">
            <img
              src={User}
              alt="features"
              className="w-full h-auto lg:h-full object-contain"
            />
          </div>

          <div className="relative sm:my-[5%] flex-1 flex flex-col justify-center items-center lg:items-start text-black lg:order-1 lg:text-left lg:left-[4%] text-center mt-8 lg:mt-[5%] md:left-[0%] ">
            <p className="text-lg font-semibold mb-4 md:text-center">
              The Leave Management System
            </p>
            <p className="text-4xl mb-4 lg:text-5xl xl:text-6xl font-bold">
              For Modern Teams
            </p>
            <p className="lg:text-xl font-semibold mb-8 w-full md:w-3/4 lg:w-4/5 md:text-lg ">
              Work Pause is an easy-to-use online leave management system for
              tracking absence in organizations of any size.
            </p>
            <ModelTwo />
          </div>

          <div className="absolute group-hover:top-[random%] group-hover:left-[random%] z-10 w-20 h-20 rounded-full group-hover:scale-125 duration-[1000ms] right-[38%] top-[79%] bg-yellow-500 lg:visible xs:invisible "></div>
          <div className="absolute group-hover:top-[random%] group-hover:left-[random%] z-10 w-12 h-12 rounded-full group-hover:scale-125 duration-[1000ms] right-[45%] top-[5%] bg-orange-500  lg:visible xs:invisible"></div>
          <div className="absolute group-hover:top-[random%] group-hover:left-[random%] z-10 w-10 h-10 rounded-full group-hover:scale-125 duration-[1000ms] right-[55%] top-[60%] bg-pink-500  lg:visible xs:invisible"></div>
          <div className="absolute group-hover:top-[random%] group-hover:left-[random%] z-10 w-10 h-10 rounded-full group-hover:scale-125 duration-[1000ms] right-[5%] top-[85%] bg-red-600  lg:visible xs:invisible"></div>
        </div>
      </section>
      <Features id="features" />
      <Section />
      <ApproveSection />
      <Footer />
    </>
  );
};

export default Board;
