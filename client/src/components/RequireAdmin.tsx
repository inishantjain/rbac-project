import { useAuth } from "../context/AuthContext";

const RequireAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (!user?.isAdmin) return <h2 className="text-center text-xl">Access Denied.</h2>;
  return <div>{children}</div>;
};

export default RequireAdmin;
