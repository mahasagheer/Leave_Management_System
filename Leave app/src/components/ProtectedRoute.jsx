import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../service/authentication";

const ProtectedRoute = ({ children, roles }) => {
  const store = localStorage.getItem("user");
  const data = JSON.parse(store);
  const token = data?.token;
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { isUser, isAdmin, isHR } = useContext(AuthContext);
  if (isAdmin == true && roles.includes("admin") && token) {
    return children;
  }
  if (isUser == true && roles.includes("user") && token) {
    return children;
  }
  if (isHR == true && roles.includes("HR") && token) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace />;
};

export default ProtectedRoute;
