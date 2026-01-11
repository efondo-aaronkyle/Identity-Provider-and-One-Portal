import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const AuthCallback = () => {
  const hasExchanged = useRef(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const exchangeCodeForToken = async () => {
      const code = searchParams.get("code");
      if (hasExchanged.current) return; 
      hasExchanged.current = true;

      if (!code) {
        console.error("No code found in URL");
        navigate("/");
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            code: code,
            client_id: import.meta.env.VITE_CLIENT_ID,
            client_secret: import.meta.env.VITE_CLIENT_SECRET,
            }),
        });

        const data = await response.json();

        if (response.ok) {
          // 1. Store the RS256 JWT
          localStorage.setItem("token", data.access_token);
          
          if (data.roles && data.roles.includes("idp:admin")) {
            navigate("/idp/user-pool");
          } else {
            navigate("/portal");
          }
        } else {
          alert("Token exchange failed: " + (data.error +": "+ data.message || "Unknown error"));
          navigate("/");
        }
      } catch (err) {
        console.error("Exchange Error:", err);
        navigate("/");
      }
    };

    exchangeCodeForToken();
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center">
        <div className="loading loading-spinner loading-lg text-[#991b1b] mb-4"></div>
        <p className="text-gray-600 font-medium">Verifying credentials, please wait...</p>
      </div>
    </div>
  );
};

export default AuthCallback;