import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="h-24 bg-[#991b1b] shadow flex items-center px-6 justify-between transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <img src="/assets/images/PUPlogo.png" alt="PUP Logo" className="h-9 sm:h-15" />
        </div>
        <div className="flex flex-col items-start ml-1.25 text-white">
          <div className="font-bold text-[.73em] sm:text-[1.1em] tracking-[1px]">
            PUP TAGUIG IDENTITY PROVIDER
          </div>
          <div className="text-[.5em] sm:text-[.75em] opacity-[.9] -mt-0.5">
            POLYTECHNIC UNIVERSITY OF THE PHILIPPINES — TAGUIG CAMPUS
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={() => navigate("/idp/profile")} className="group relative flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-lg hover:shadow-black/30 active:scale-95">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-11 h-11 text-white transition-transform duration-300 group-hover:scale-110">
            <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z" clipRule="evenodd" />
          </svg>
          <div className="flex flex-col text-left">
            <span className="text-white font-semibold transition-colors duration-300 group-hover:text-yellow-300">John Doe</span>
            <span className="text-xs text-yellow-300 transition-all duration-300 group-hover:text-white group-hover:tracking-wide">SuperAdmin</span>
          </div>
        </button>
        <label className="swap swap-rotate cursor-pointer border-l border-red-900 pl-4 group">
          <input type="checkbox" />
          <svg className="swap-on h-10 w-10 fill-current text-white transition-all duration-300 group-hover:text-[#ffd700] group-hover:scale-110" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
          <svg className="swap-off  h-10 w-10 fill-current text-white transition-all duration-300 group-hover:text-[#991b1b] group-hover:scale-110" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>
    </nav>
  );
}
