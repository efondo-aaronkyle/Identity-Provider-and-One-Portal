import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PortalNavbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <div className="header-navbar w-full bg-[#991b1b] flex items-center justify-between px-6 py-3 z-100 relative">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <img src="/assets/images/PUPlogo.png" alt="PUP Logo" className="pup-logo-img"/>
                </div>
                <div className="text-column">
                    <div className="title"> PUP TAGUIG ONE PORTAL</div>
                    <div className="subtitle">POLYTECHNIC UNIVERSITY OF THE PHILIPPINES — TAGUIG CAMPUS</div>
                </div>
            </div>
            <div className="relative">
                <button className="profile-btn" onClick={(e) => {
                        e.stopPropagation();
                        setDropdownOpen(!dropdownOpen);
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor">
                        <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 
                        1.5c-4 0-7.5 1.79-7.5 4v1.5A1.5 1.5 0 0 0 6 21h12a1.5 
                        1.5 0 0 0 1.5-1.5V17.5c0-2.21-3.5-4-7.5-4Z"/>
                    </svg>
                </button>
                <div id="profile-dropdown" className={`absolute right-0 mt-2 w-32 bg-white text-black rounded-2xl shadow transition-all ${
                        dropdownOpen ? "block" : "hidden"
                    }`}
                >
                    <button className="w-full text-left font-semibold px-4 py-2 transition-colors rounded-2xl bg-transparent hover:bg-gray-200 hover:text-[#b22222]" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
}