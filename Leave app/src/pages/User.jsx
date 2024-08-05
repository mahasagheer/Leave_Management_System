import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const User = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <>
      {" "}
      <section id="user">
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 h-auto border-dashed rounded-lg dark:border-gray-700  mt-16  ">
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
                  <tr>
                    <th
                      scope="col"
                      class="px-3 py-3 bg-gray-50 dark:bg-gray-800"
                    >
                      Employee ID{" "}
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Full Name
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                    >
                      Job Title{" "}
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Gender
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3  bg-gray-50 dark:bg-gray-800"
                    >
                      Age
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Hire Date
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3  bg-gray-50 dark:bg-gray-800"
                    >
                      Annual Salary (USD)
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Bonus %
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3  bg-gray-50 dark:bg-gray-800"
                    >
                      Department
                    </th>
                    <th scope="col" class="px-6 py-3">
                      City
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3  bg-gray-50 dark:bg-gray-800"
                    >
                      Exit Date
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Email
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3  bg-gray-50 dark:bg-gray-800"
                    >
                      Password
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                    ></th>
                    <td class="px-6 py-4"></td>
                    <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800"></td>
                    <td class="px-6 py-4"></td>
                    <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800"></td>
                    <td class="px-6 py-4"></td>
                    <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800"></td>
                    <td class="px-6 py-4"></td>
                    <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800"></td>
                    <td class="px-6 py-4"></td>
                    <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800"></td>
                    <td class="px-6 py-4"></td>
                    <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default User;
