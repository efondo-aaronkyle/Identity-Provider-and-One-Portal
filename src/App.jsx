// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/pages/Login";
import AddUser from "./features/idp/pages/AddUser";
import ClientApp from "./features/idp/pages/AppClient";
import OnePortalHome from "./features/one-portal/pages/OnePortalHome";
import AppClient from "./features/idp/pages/AppClient";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Root redirect to Login */}
        <Route path="/" element={<Login />} />

        {/* IDP */}
        <Route path="/idp/add-user" element={<AddUser />} />
        <Route path="idp/app-client" element={<AppClient/>} />

        {/* One Portal */}
        <Route path="/portal" element={<OnePortalHome />} />
      </Routes>
    </Router>
  );
}
