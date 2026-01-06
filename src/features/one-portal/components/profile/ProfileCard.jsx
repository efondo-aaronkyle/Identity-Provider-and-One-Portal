import { useState } from "react";
import EditProfileModal from "./EditProfileModal";
import ChangePasswordModal from "./ChangePasswordModal";
import ProfileDetails from "./ProfileDetails";
import EmailStatus from "./EmailStatus";
import ActionButtons from "./ActionButtons";
import SuccessAlert from "../../../../components/SuccessAlert";

export default function ProfileCard({ addAuditLog }) {
    const [isEditOpen, setEditOpen] = useState(false);
    const [isPasswordOpen, setPasswordOpen] = useState(false);
    const [currentProfile, setCurrentProfile] = useState({
        firstName: "Juan",
        middleName: "Miguel",
        lastName: "Dela Cruz Santos",
        username: "juan.delacruz",
        profilePicture: "/assets/images/profile-pic.jpg",
    });

    const [toastMessage, setToastMessage] = useState("");

    const handleProfileUpdate = (updatedProfile) => {
        setCurrentProfile(updatedProfile);
        setToastMessage("Profile updated successfully!");
        setTimeout(() => setToastMessage(""), 2000);
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-linear-to-r from-[#991b1b] to-red-600 p-6 text-white">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="relative">
                        <div className="w-32 h-32 rounded-full border-4 border-white/30 overflow-hidden bg-white">
                            <img src={currentProfile.profilePicture || "/assets/images/profile-pic.jpg"} alt="Profile Picture" className="w-full h-full object-cover" onError={(e) => e.currentTarget.src = 'https://via.placeholder.com/128/991b1b/FFFFFF?text=PUPT'}/>
                        </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-2xl font-bold">
                            {`${currentProfile.firstName} ${currentProfile.middleName ? currentProfile.middleName + " " : ""}${currentProfile.lastName}`}
                        </h2>
                        <p className="text-white/90 mt-1">@{currentProfile.username}</p>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4">
                            <div className="badge badge-md rounded-xl text-base bg-white/20 border-0 text-white px-4 py-2" id="statusBadge">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Active
                            </div>
                            <div className="badge badge-md rounded-xl text-base bg-white/20 border-0 text-white px-4 py-2" id="roleBadge">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                Student
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-8">
                <ProfileDetails profile={currentProfile}/>
                <EmailStatus />
                <ActionButtons 
                    openEdit={() => setEditOpen(true)}
                    openPassword={() => setPasswordOpen(true)}
                />
            </div>
            <EditProfileModal 
                open={isEditOpen} 
                close={() => setEditOpen(false)}
                profileData={currentProfile} 
                updateProfile={handleProfileUpdate}
                addAuditLog={addAuditLog} 
            />
            <ChangePasswordModal 
                isOpen={isPasswordOpen} 
                onClose={() => setPasswordOpen(false)} 
                addAuditLog={addAuditLog}
                setToastMessage={setToastMessage}
            />
            <SuccessAlert 
                message={toastMessage}
                onClose={() => setToastMessage("")}
            />
        </div>
    );
}