import { useLocation, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../service/authentication";

const ProtectedRoute = ({ children, roles }) => {
  const store = localStorage.getItem("user");
  const data = store ? JSON.parse(store) : null;
  const token = data?.token;
  const userRole = data?.data?.role;
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { isUser, isAdmin, isHR } = useContext(AuthContext);
  const roleCheck = () => {
    if (roles.includes(userRole)) return true;
    if (isAdmin && roles.includes("admin")) return true;
    if (isUser && roles.includes("user")) return true;
    if (isHR && roles.includes("HR")) return true;
    return false;
  };

  if (token && roleCheck()) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default ProtectedRoute;
