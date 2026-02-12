import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/pages/Login";
import OnePortalHome from "./features/one-portal/pages/OnePortalHome";
import OnePortalProfile from "./features/one-portal/pages/Profile";
import AppClient from "./features/idp/pages/AppClient";
import UserPool from "./features/idp/pages/UserPool";
import Roles from "./features/idp/pages/Roles";
import IdpProfile from "./features/idp/pages/Profile";
import IdpLayout from "./features/idp/layouts/IdpLayout";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Root redirect to Login */}
        <Route path="/" element={<Login />} />

        {/* IDP */}
        <Route element={<IdpLayout />}>
          <Route path="/idp/app-client" element={<AppClient />} />
          <Route path="/idp/user-pool" element={<UserPool />} />
          <Route path="/idp/role" element={<Roles />} />
          <Route path="/idp/profile" element={<IdpProfile />} />
        </Route>

        {/* One Portal */}
        <Route path="/portal" element={<OnePortalHome />} />
        <Route path="/profile" element={<OnePortalProfile />} />
      </Routes>
    </Router>
  );
}
