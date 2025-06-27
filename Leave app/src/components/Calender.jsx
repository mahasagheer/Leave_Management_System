import { useState, useEffect, useContext, useMemo } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import axios from "axios";
import { ThemeContext } from "../context/themeContext";
import enUS from "date-fns/locale/en-US";

const locales = {
  "en-US": enUS
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

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
        setLoading(false);
        console.log(err);
      });
  }, [id]);

  // Prepare events for react-big-calendar
  const events = useMemo(() => {
    if (!dataLeave?.messages) return [];
    return dataLeave.messages.map((leave) => ({
      title: leave.leave_type + (leave.status ? ` (${leave.status})` : ""),
      start: new Date(leave.from_date),
      end: new Date(leave.to_date),
      allDay: true,
      resource: leave,
    }));
  }, [dataLeave]);

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl transition-colors duration-300"
      style={{ minHeight: 400 }}
    >
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
        defaultView={Views.MONTH}
        style={{ height: 400, background: isDark ? "#1f2937" : "#fff", color: isDark ? "#fff" : "#222", borderRadius: "1rem" }}
        eventPropGetter={(event, _start, _end, isSelected) => {
          let bg = event.resource.status === "Approved"
            ? "#36A2EB"
            : event.resource.status === "Pending"
            ? "#FFCE56"
            : "#FF6384";
          return {
            style: {
              backgroundColor: bg,
              color: "#fff",
              borderRadius: "8px",
              border: isSelected ? "2px solid #2563eb" : "1px solid #e5e7eb",
              boxShadow: isSelected ? "0 2px 8px 0 rgba(37,99,235,0.15)" : "none",
              padding: "4px 8px",
              cursor: "pointer",
              textSizeAdjust:"16px",
              transition: "box-shadow 0.2s, border 0.2s",
            },
          };
        }}
        popup
        toolbar
        selectable={false}
        showAllEvents
        className="font-sans"
      />
    </div>
  );
};

export default Calender;
