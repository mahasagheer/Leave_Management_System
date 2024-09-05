import React, { useEffect, useState } from "react";
import User from "../public/userImg-removebg-preview.png";
import { useContext } from "react";
import { AuthContext } from "../service/authentication";

const MyProfile = () => {
  const { data } = useContext(AuthContext);
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      <section id="addUser">
        <div className="p-4 sm:ml-64">
          {Loading && <div className=" loader ml-[50%] mt-[25%]"></div>}
          {!Loading && (
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-16">
              <div className=" w-full flex flex-col lg:flex-row justify-between gap-4 p-4">
                <div className="w-full lg:w-[48%] py-4 ">
                  <div className=" rounded-3xl flex flex-col items-center justify-center p-4">
                    <img
                      src={User}
                      alt="user_profile"
                      className="w-[40%] mb-4"
                    />
                    <p className="text-xl sm:text-2xl md:text-3xl">
                      MY PROFILE
                    </p>
                    <div className="flex flex-col w-full mt-4">
                      <div className="flex justify-between px-4 sm:px-8">
                        <div className="text-lg font-bold">Name:</div>
                        <div>{data.name}</div>
                      </div>
                      <div className="flex justify-between px-4 sm:px-8 mt-2">
                        <div className="text-lg font-bold">Email:</div>
                        <div>{data.email}</div>
                      </div>
                      <div className="flex justify-between px-4 sm:px-8 mt-2">
                        <div className="text-lg font-bold">Age:</div>
                        <div>{data.age}</div>
                      </div>
                      <div className="flex justify-between px-4 sm:px-8 mt-2">
                        <div className="text-lg font-bold">City:</div>
                        <div>{data.city}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-[48%] flex flex-col gap-[5%] sm:gap-4 py-4">
                  <div className="border-2 bg-[#36A2EB] text-white rounded-2xl p-6 text-center">
                    <p className="text-xl sm:text-2xl md:text-3xl ">
                      DEPARTMENT
                    </p>
                    <p className="mt-2 text-lg ">{data.department}</p>
                  </div>
                  <div className="text-white bg-[#FF6384] rounded-2xl p-4 text-center">
                    <p className="text-xl sm:text-2xl md:text-3xl">
                      JOB DETAIL
                    </p>
                    <div className="flex justify-between mt-4">
                      <div className="text-lg font-bold">Job position :</div>
                      <div>{data.Job_title}</div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <div className="text-lg font-bold">Exit Date :</div>
                      <div>{data.exit_date}</div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <div className="text-lg font-bold">Hire Date :</div>
                      <div>{data.hire_date.substring(0, 10)}</div>
                    </div>
                  </div>
                  <div className="text-white  rounded-2xl p-6 text-center bg-[#FFCE56]">
                    <p className="text-xl sm:text-2xl md:text-3xl">SALARY</p>
                    <p className="mt-2 text-lg">{data.salary} $</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default MyProfile;
