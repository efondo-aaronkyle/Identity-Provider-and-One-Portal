import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function IdpLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-200 text-gray-800 font-[Poppins]">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(prev => !prev)} />

      {/* Main content */}
      <div className="flex-1 flex flex-col ml-14 lg:ml-0 transition-all duration-300">
        <Navbar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(prev => !prev)} />
        <main className="p-6"><Outlet /></main>
      </div>
    </div>
  );
}
