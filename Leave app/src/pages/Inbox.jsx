import React, { useEffect } from "react";
import User from "../userImg.png";
import Aos from "aos";
import "aos/dist/aos.css";

const Inbox = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <>
      <section id="inbox">
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 h-auto border-dashed rounded-lg dark:border-gray-700 mt-16 ">
            <div class="flex items-center gap-5  ">
              <img class="w-8 h-8 rounded-full" src={User} alt="Jese image" />
              <div class="flex flex-col w-full leading-1.5">
                <div class="flex items-center  space-x-2 rtl:space-x-reverse">
                  <span class="text-sm font-semibold text-gray-900 dark:text-white">
                    User Name
                  </span>
                  <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                    11:46
                  </span>
                </div>
                <p class="text-sm font-normal py-2 text-gray-900 dark:text-white">
                  That's awesome. I think our users will really appreciate the
                  improvements.
                </p>
                <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                  New
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Inbox;
