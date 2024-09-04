import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setAdmin] = useState(false);
  const [isHR, setHR] = useState(false);
  const [isUser, setUser] = useState(false);
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const apiURL = process.env.VITE_API;
  const [themeColor, setThemeColor] = useState("");
  const [logo, setLogo] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { color, logoPath, data: userData } = JSON.parse(storedUser);
      setData(userData);
      if (userData.role === "admin") {
        setAdmin(true);
        setThemeColor(color);
        setLogo(logoPath);
        navigate("/user");
      } else if (userData.role === "HR") {
        setHR(true);
        setThemeColor(color);
        setLogo(logoPath);
        navigate("/dashboard");
      } else {
        setUser(true);
        setThemeColor(color);
        setLogo(logoPath);
        navigate("/dashboard");
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${apiURL}/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        const token = res.data.token;
        const userData = res.data.data;
        const logoPath = res.data.logoPath;
        const color = res.data.color;
        setData(userData);
        if (userData.role === "admin") {
          toast.success("Admin logged in successfully!");
          setAdmin(true);
          setHR(false);
          setThemeColor(color);
          setLogo(logoPath);
          setUser(false);
          navigate("/user");
        } else if (userData.role === "HR") {
          toast.success("HR logged in successfully!");
          setAdmin(false);
          setHR(true);
          setThemeColor(color);
          setLogo(logoPath);
          setUser(false);
          navigate("/dashboard");
        } else {
          toast.success("User logged in successfully!");
          setAdmin(false);
          setHR(false);
          setThemeColor(color);
          setLogo(logoPath);
          setUser(true);
          navigate("/dashboard");
        }
        localStorage.setItem(
          "user",
          JSON.stringify({
            token: token,
            data: userData,
            logoPath: logoPath,
            color: color,
          })
        );
      })
      .catch((err) => {
        toast.error("Failed to log in");
        console.log(err);
      });
  };

  const logout = () => {
    localStorage.removeItem("user");
    setData([]);
    setAdmin(false);
    setHR(false);
    setUser(false);
    navigate("/login");
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
        logout,
        setThemeColor,
        themeColor,
        logo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
