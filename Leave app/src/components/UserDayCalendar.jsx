import { useContext } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ThemeContext } from "../context/themeContext";

const UserDayCalendar = ({ messages }) => {
  const { isDark } = useContext(ThemeContext);
  const pendingDates = messages?.filter(msg => msg.status === 'Pending').map(msg => new Date(msg.from_date)) || [];
  const otherDates = messages?.filter(msg => msg.status !== 'Pending').map(msg => new Date(msg.from_date)) || [];
  const modifiers = {
    pending: pendingDates,
    highlighted: otherDates,
  };
  const modifiersStyles = {
    pending: {
      color: "#fff",
      backgroundColor: "#FFCE56",
      borderRadius: "100%",
    },
    highlighted: {
      color: "white",
      backgroundColor: "#36A2EB",
      borderRadius: "100%",
    },
  };
  return (
    <div className="rounded-2xl bg-white dark:bg-gray-800 transition-colors duration-300">
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
  );
};

export default UserDayCalendar; 