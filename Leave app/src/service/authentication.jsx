import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setAdmin] = useState(false);
  const [isHR, setHR] = useState(false);
  const [isUser, setUser] = useState(false);
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_API;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${apiURL}login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        const token = res.data.token;
        const userData = res.data.data;
        setData(userData);
        if (userData.role === "admin") {
          setAdmin(true);
          navigate("/user");
        } else if (userData.role === "HR") {
          setHR(true);
          navigate("/dashboard");
        } else {
          setUser(true);
          navigate("/dashboard");
        }
        localStorage.setItem("user", token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        setAdmin,
        isHR,
        setHR,
        isUser,
        setUser,
        data,
        setData,
        email,
        setEmail,
        password,
        setPassword,
        handleSubmit,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
