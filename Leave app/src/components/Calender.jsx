import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import axios from "axios";

const Calender = ({ id }) => {
  const [Loading, setLoading] = useState(false);
  const [dataLeave, setDataLeave] = useState({});
  const [data, setData] = useState({});
  const local = localStorage.getItem("user");
  const apiURL = import.meta.env.VITE_API;
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
        <DayPicker modifiers={modifiers} modifiersStyles={modifiersStyles} />
      </div>
    </>
  );
};

export default Calender;
