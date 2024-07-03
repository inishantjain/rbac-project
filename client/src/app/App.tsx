import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import AuthenticationPage from "../pages/Authentication";
import Profile from "../pages/Profile";
import ProfileTemplate from "../pages/Profile/ProfileTemplate";
import RequireAdmin from "../components/RequireAdmin";
import AdminPanel from "../pages/AdminPanel";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Navigate to={"/login"} />} />
        <Route element={<AuthenticationPage />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Route>
        <Route element={<ProfileTemplate />}>
          <Route path="/profile" element={<Profile />} />
          <Route
            path="admin-panel"
            element={
              <RequireAdmin>
                <AdminPanel />
              </RequireAdmin>
            }
          />
        </Route>
        <Route path="*" element={<h1 className="text-3xl">Not Found !</h1>} />
      </Routes>
    </>
  );
}

export default App;
