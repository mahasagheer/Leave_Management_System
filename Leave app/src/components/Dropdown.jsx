import React, { useState } from "react";

const Dropdown = (props) => {
  const [selectedValue, setSelectedValue] = useState("");

  const options = props.annual_leave;
  //   console.log(options);
  return (
    <>
      <select
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
        id="annual_leave"
        name="annual_leave"
        className="bg-gray-50 border mb-2  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default Dropdown;
