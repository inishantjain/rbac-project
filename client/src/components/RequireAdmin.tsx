import { useAuth } from "../context/AuthContext";

const RequireAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  console.log(user);
  if (!user?.isAdmin) return <h2 className="text-center text-xl">Access Denied.</h2>;
  return <div>{children}</div>;
};

export default RequireAdmin;
