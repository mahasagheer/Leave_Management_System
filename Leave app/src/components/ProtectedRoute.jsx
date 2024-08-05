import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ admin, children, user }) => {
  if (admin == true) {
    return children;
  }
  if (user == true) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace />;
};

export default ProtectedRoute;
