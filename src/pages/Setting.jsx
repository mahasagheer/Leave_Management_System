import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../service/authentication";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
const Setting = () => {
  const themeColors = [
    "#17a589",
    "#9b59b6",
    "#2980b9",
    "#27ae60",
    "#f39c12",
    "#DFFF00",
    "#FF7F50",
    "#DE3163",
    "#40E0D0",
    "#6495ED",
    "#571845",
  ];
  const [bgColor, setBgColor] = useState("");
  const [orgLogo, setOrgLogo] = useState();
  const { themeColor, setThemeColor } = useContext(AuthContext);
  const apiURL = import.meta.env.VITE_API;
  const handleFileChange = (e) => {
    setOrgLogo(e.target.files[0]);
  };
  const handleColorChange = (e) => {
    setBgColor(e.target.value);
    setThemeColor(bgColor);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("logo", orgLogo);
    formData.append("color", bgColor);
    await axios.post(`${apiURL}/system_setting`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };
  return (
    <>
      <section id="inbox">
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-[#4a9dc9] border-dashed md:p-2 rounded-lg dark:border-gray-700 mt-16">
            <h1 className="text-xl sm:text-2xl md:text-3xl py-4 sm:py-6 text-center lg:text-left mx-5">
              Appearance
            </h1>
            <form onSubmit={handleSubmit}>
              <hr />
              <div className="flex flex-col sm:flex-row gap-4 mx-5 items-center">
                <div className="w-full sm:w-[35%] text-center sm:text-left">
                  <p className="text-lg font-bold">Company Logo</p>
                  <p className="text-gray-600">Update your company logo</p>
                </div>
                <div className="w-full sm:w-[50%] flex items-center justify-center sm:justify-start my-10 gap-4">
                  <FontAwesomeIcon icon={faImage} size="2xl" />
                  <input
                    className="block w-full sm:w-[70%] text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="user_avatar_help"
                    onChange={handleFileChange}
                    id="user_avatar"
                    name="file"
                    type="file"
                  />
                </div>
              </div>
              <hr />
              <div className="flex flex-col sm:flex-row gap-4 mx-5 items-center">
                <div className="w-full sm:w-[35%] text-center sm:text-left">
                  <p className="text-lg font-bold">Organization Color</p>
                  <p className="text-gray-600">
                    Select your organization Color
                  </p>
                </div>
                <div className="w-full sm:w-[50%] flex items-center justify-center sm:justify-start my-10 gap-4 flex-wrap">
                  {themeColors.map((color, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setBgColor(color);
                        setThemeColor(color);
                      }}
                      className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full cursor-pointer"
                      style={{ backgroundColor: color }}
                    >
                      &nbsp;
                    </div>
                  ))}
                  <div className="flex flex-col sm:flex-row items-center gap-4 p-4">
                    <label
                      htmlFor="favcolor"
                      className="text-lg font-semibold text-gray-700 sm:text-left text-center"
                    >
                      Select your favorite color:
                    </label>
                    <input
                      type="color"
                      value={bgColor}
                      onClick={() => {
                        setBgColor(bgColor);
                        setThemeColor(bgColor);
                      }}
                      onChange={handleColorChange}
                      className="w-10 h-10 rounded-lg border-2 border-gray-300 cursor-pointer transition-transform duration-200 hover:scale-110"
                    />
                  </div>
                </div>
              </div>
              <hr />
              <button
                type="submit"
                className="text-black h-10 mx-5 mt-5 ease-in-out duration-300 transition bg-[#90d7f5] hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 sm:px-5 py-2.5 text-center flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Apply Changes
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Setting;
