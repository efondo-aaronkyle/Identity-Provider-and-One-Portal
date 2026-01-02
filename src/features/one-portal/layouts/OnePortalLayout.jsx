import PortalNavbar from "../components/PortalNavbar";
import PortalFooter from "../components/PortalFooter";

export default function OnePortalLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-200 text-gray-800 font-[Poppins]">
            <PortalNavbar />
                {children} 
            <PortalFooter />
        </div>
    );
}