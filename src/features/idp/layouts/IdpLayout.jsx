import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function IdpLayout({ children }) {
  return (
    <div>
      <Navbar />
      <Sidebar />

      <main className="pt-20 pl-72 pr-6 bg-gray-100 min-h-screen">
        {children}
      </main>
    </div>
  );
}
