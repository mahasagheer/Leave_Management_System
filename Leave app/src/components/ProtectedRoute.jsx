import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../service/authentication";

const ProtectedRoute = ({ children, roles }) => {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { isUser, isAdmin, isHR } = useContext(AuthContext);
  if (isAdmin == true && roles.includes("admin")) {
    return children;
  }
  if (isUser == true && roles.includes("user")) {
    return children;
  }
  if (isHR == true && roles.includes("HR")) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace />;
};

export default ProtectedRoute;
