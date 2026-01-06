import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/pages/Login";
import OnePortalHome from "./features/one-portal/pages/OnePortalHome";
import Profile from "./features/one-portal/pages/Profile";
import AddUser from "./features/idp/pages/AddUser";
import AppClient from "./features/idp/pages/AppClient";
import UserPool from "./features/idp/pages/UserPool";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Root redirect to Login */}
        <Route path="/" element={<Login />} />

        {/* IDP */}
        <Route path="/idp/add-user" element={<AddUser />} />
        <Route path="/idp/app-client" element={<AppClient/>} />
        <Route path="/idp/user-pool" element={<UserPool/>} />

        {/* One Portal */}
        <Route path="/portal" element={<OnePortalHome />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}
