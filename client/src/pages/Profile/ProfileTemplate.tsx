import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";

function ProfileTemplate() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default ProfileTemplate;
