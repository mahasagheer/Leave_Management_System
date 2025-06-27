import { useState, useEffect, useContext } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import axios from "axios";
import { ThemeContext } from "../context/themeContext";

const Calender = ({ id }) => {
  const [Loading, setLoading] = useState(false);
  const [dataLeave, setDataLeave] = useState({});
  const [data, setData] = useState({});
  const local = localStorage.getItem("user");
  const apiURL = import.meta.env.VITE_API;
  const { isDark } = useContext(ThemeContext);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiURL}/users/${id}`, {
        headers: {
          Authorization: `${local}`,
        },
      })
      .then((res) => {
        setData(res.data?.data);
        setLoading(false);
        setDataLeave(res.data?.leaves[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const selectedDates = dataLeave?.messages?.map(
    (date) => new Date(date.from_date)
  );
  const modifiers = {
    highlighted: selectedDates,
  };
  const modifiersStyles = {
    highlighted: {
      color: "white",
      backgroundColor: "#FFCE56",
      borderRadius: "100%",
    },
  };

  return (
    <>
      <div>
        <DayPicker
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
          className={isDark ? "rdp-dark" : "rdp-light"}
          style={isDark ? {
            background: "#1f2937",
            color: "#fff",
            borderRadius: "1rem",
            padding: "0.5rem"
          } : {
            background: "#fff",
            color: "#222",
            borderRadius: "1rem",
            padding: "0.5rem"
          }}
          showOutsideDays
        />
      </div>
    </>
  );
};

export default Calender;
