import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { authService } from "../services/authService";

export default function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verify = async () => {
      try {
        await authService.checkSession();
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };

    verify();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#991b1b] flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}