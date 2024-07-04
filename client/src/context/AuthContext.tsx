import { createContext, useContext, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import type { LoginFormType, RegisterFormType, User } from "../types/types";
import { getUserStateApi, loginApi, registerApi } from "../services/api";
import { useNavigate } from "react-router-dom";

// Define the AuthContextValue interface extending the State interface with additional methods

interface AuthContextType {
  user: User | null;
  login: (obj: LoginFormType) => Promise<void>;
  loading: boolean;
  logout: () => void;
  register: (obj: RegisterFormType) => void;
  error?: any;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchUserFromStorage = async () => {
    const token = localStorage.getItem("access_token");
    if (token)
      try {
        const user = await getUserStateApi();
        if (user) setUser(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
  };

  useEffect(() => {
    fetchUserFromStorage();
  }, []);

  useEffect(() => {
    if (error) setError(null); //reset error when user switches page
  }, [location.pathname]);

  const login = async ({ email, password }: LoginFormType) => {
    setLoading(true);
    try {
      const response = await loginApi(email, password);
      if (response.ok) {
        console.log("ok");
        const loginData = await response.json();
        localStorage.setItem("access_token", loginData.token);
        setUser(loginData.user);
        setError(null);
      } else {
        const errorData = await response.json();
        setError({ type: "login", message: errorData.message });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError({ type: "login", message: "An unexpected error occurred." });
    }
    setLoading(false);
  };

  const register = async ({ fname, lname, email, password, isAdmin }: RegisterFormType) => {
    setLoading(true);

    try {
      const response = await registerApi(fname, lname, email, password, isAdmin);
      if (response.ok) {
        alert("Registration successful, please login");
        setError(null);
      } else {
        const errorData = await response.json();
        setError({ type: "register", message: errorData.message });
      }
    } catch (error) {
      console.error("Error registering:", error);
      setError({ type: "register", message: "An unexpected error occurred." });
    }
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    setError(null);
    navigate("/login");
  };

  const value: AuthContextType = {
    login,
    register,
    logout,
    loading,
    error,
    user,
    setUser,
  };
  //   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  return useContext(AuthContext);
}
