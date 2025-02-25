import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token") || null; // Check if user is logged in
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
