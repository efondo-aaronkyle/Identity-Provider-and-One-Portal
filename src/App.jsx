// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/pages/Login";
import AddUser from "./features/idp/pages/AddUser";
import OnePortalHome from "./features/one-portal/pages/OnePortalHome";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Root redirect to Login */}
        <Route path="/" element={<Login />} />

        {/* IDP */}
        <Route path="/idp/add-user" element={<AddUser />} />

        {/* One Portal */}
        <Route path="/portal" element={<OnePortalHome />} />
      </Routes>
    </Router>
  );
}
