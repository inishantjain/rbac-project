import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AuthenticationPage = () => {
  const { user } = useAuth();
  if (user) return <Navigate to={"/profile"} />;
  return <Outlet />;
};

export default AuthenticationPage;
