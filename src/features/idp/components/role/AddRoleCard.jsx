import RoleCard from "./RoleCard";

export default function AddRoleCard({ openCreate }) {
    return (
        <RoleCard>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1 min-w-0">
                    <h3 className="text-[#991b1b] text-lg sm:text-2xl font-bold">
                        Create role
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                        Create a new role to manage user access and permissions
                    </p>
                </div>
                <button onClick={openCreate} className="btn bg-[#991b1b] w-full sm:w-auto rounded-lg text-white border-[#991b1b] hover:bg-[#ffd700] hover:border-[#ffd700] hover:text-[#991b1b]">
                    Create role
                </button>
            </div>
        </RoleCard>
    );
}