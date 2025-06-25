import React, { useEffect, useState } from "react";
import UserAvatar from "../public/userImg-removebg-preview.png";
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
    <section id="my-profile" className="p-0 sm:p-4 sm:ml-64 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {Loading && <div className="loader ml-[50%] mt-[25%]"></div>}
      {!Loading && (
        <div className="flex flex-col gap-6 mt-20">
          {/* Top: Profile Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center relative overflow-visible">
              <div className="relative mb-4">
                <span className="absolute -inset-1 rounded-full bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400 blur-lg opacity-60 animate-spin-slow"></span>
                <img src={UserAvatar} alt="User Avatar" className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-xl relative z-10" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{data.name}</h2>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-300 shadow">Active</span>
              </div>
              <div className="text-blue-500 dark:text-blue-300 font-semibold mb-1">{data.Job_title || "-"}</div>
              <div className="text-gray-400 text-sm mb-2">{data.department || "-"}</div>
              <div className="flex flex-col gap-1 mb-2">
                <span className="text-gray-700 dark:text-gray-200 text-sm"><strong>Email:</strong> {data.email}</span>
                {data.phone && <span className="text-gray-700 dark:text-gray-200 text-sm"><strong>Phone:</strong> {data.phone}</span>}
              </div>
            </div>
            {/* Info Cards */}
            <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col gap-2">
                <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">Basic Information</h3>
                <div className="flex flex-wrap gap-4 mb-2">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Hire Date</span>
                    <span className="font-medium text-gray-900 dark:text-white">{data.hire_date ? data.hire_date.substring(0, 10) : '-'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Employee ID</span>
                    <span className="font-medium text-gray-900 dark:text-white">{data._id}</span>
                  </div>
                </div>
              </div>
              {/* Personal Info */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col gap-2">
                <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">Personal Information</h3>
                <div className="flex flex-wrap gap-4 mb-2">
                  {data.city && (
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400">City</span>
                      <span className="font-medium text-gray-900 dark:text-white">{data.city}</span>
                    </div>
                  )}
                  {data.address && (
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400">Address</span>
                      <span className="font-medium text-gray-900 dark:text-white">{data.address}</span>
                    </div>
                  )}
                </div>
              </div>
              {/* Occupation Info */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col gap-2 md:col-span-2">
                <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">Occupation Information</h3>
                <div className="flex flex-wrap gap-4 mb-2">
                  {data.department && (
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-gray-400">Department</span>
                      <span className="font-medium text-gray-900 dark:text-white">{data.department}</span>
                    </div>
                  )}
                  {data.staff_type && (
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-gray-400">Type</span>
                      <span className="font-medium text-gray-900 dark:text-white">{data.staff_type}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyProfile;
