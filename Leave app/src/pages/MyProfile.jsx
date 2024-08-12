import React from "react";
import User from "../userImg-removebg-preview.png";
import { useContext } from "react";
import { AuthContext } from "../service/authentication";

const MyProfile = () => {
  const { data } = useContext(AuthContext);

  return (
    <>
      <section id="addUser">
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 px-[3%] border-[#4a9dc9] h-auto border-dashed rounded-lg dark:border-gray-700  mt-16  ">
            <h1 className="text-3xl text-center"> My profile</h1>
            <div className="flex justify-between items-center border-b-2  border-[#4a9dc9] pb-3">
              <div className="">
                <p className="text-lg">Username: {data.name}</p>
                <p>{data.email}</p>
                <p>Age: {data.age}</p>
                <p>City: {data.city}</p>
              </div>
              <div className="w-[15%]">
                <img src={User} />
              </div>
            </div>
            <p className="text-xl py-5">Job detail:</p>
            <p>My salary: {data.salary} $</p>
            <p>Job Title: {data.Job_title}</p>
            <p>Department: {data.department}</p>
            <p>Hire Date: {data.hire_date.substring(0, 10)}</p>
            <p>Exit Date: Currently {data.exit_date}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyProfile;
