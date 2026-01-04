import { useNavigate } from "react-router-dom";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "User Pool",
      path: "/idp/user-pool",
      iconPath: "M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
    },
    {
      name: "Add User",
      path: "/idp/add-user",
      iconPath: "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
    },
    {
      name: "App Client",
      path: "/idp/app-client",
      iconPath: "M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
    }
  ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className={`flex flex-col bg-[#991b1b] border-red-900 transition-all duration-300 fixed lg:relative top-0 left-0 min-h-screen z-50 ${isOpen ? "w-64 translate-x-0" : "w-14 translate-x-0 lg:translate-x-0"}`}>

      <div className="h-24 px-3 flex items-center">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col items-start overflow-hidden">
            <h1 className={`text-white text-3xl font-bold transition-all duration-300 ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}>PUPIDP</h1>
            <span className={`inline-flex bg-[#ffd700] text-black mt-1 px-2 rounded-md text-xs transition-all duration-300 ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}>ver.2026</span>
          </div>
          <button type="button" className="p-2 rounded-full hover:bg-red-900 text-white shrink-0" onClick={toggleSidebar}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path d="M4 4m0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </button>
        </div>
      </div>

      <ul className="p-2 space-y-1">
        {menuItems.map((item, idx) => (
          <li key={idx} className="relative group">
            <button onClick={() => {
              navigate(item.path);
              if(window.innerWidth < 1024) toggleSidebar();
            }} 
            className="flex items-center h-11 w-full transition-all rounded-lg hover:bg-red-900">
              <div className="w-14 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-[.5em] w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.iconPath} />
                </svg>
              </div>
              <span className={`text-white ml-3 whitespace-nowrap font-semibold transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}>{item.name}</span>
            </button>

            {!isOpen && (
              <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded-md text-sm bg-[#991b1b] text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{item.name}</span>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-4"/>
      <div className="relative group p-2 border-t border-red-900">
        <button onClick={handleLogout} className="flex items-center h-11 w-full transition-all rounded-lg hover:bg-red-900">
          <div className="w-14 flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-[.5em] w-6 h-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>
          </div>
          <span className={`text-white ml-3 whitespace-nowrap font-semibold transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}>Logout</span>
        </button>
        {!isOpen && (
          <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded-md text-sm bg-[#991b1b] text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Logout</span>
        )}
      </div>
    </div>
  );
}
