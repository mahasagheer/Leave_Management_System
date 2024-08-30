import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const Calender = () => {
  const [Loading, setLoading] = useState(false);
  const [dataLeave, setDataLeave] = useState({});
  const [data, setData] = useState({});
  const local = localStorage.getItem("user");
  const apiURL = import.meta.env.VITE_API;
  const { id } = useParams();

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
      <div className="w-[30%]">
        <DayPicker modifiers={modifiers} modifiersStyles={modifiersStyles} />
      </div>
    </>
  );
};

export default Calender;
