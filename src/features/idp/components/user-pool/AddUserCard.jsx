import UserPoolCard from "./UserPoolCard";

export default function AddUserCard({ onCreate }) {
    return(
        <UserPoolCard>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <h3 className="text-[#991b1b] text-lg sm:text-2xl font-bold">
                        Create user
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                        Create a new user and assign roles for system access
                    </p>
                </div>
                <button onClick={onCreate} className="btn bg-[#991b1b] w-full sm:w-auto rounded-lg text-white border-[#991b1b] hover:bg-[#ffd700] hover:border-[#ffd700] hover:text-[#991b1b]">
                    Create user
                </button>
            </div>
        </UserPoolCard>
    )
}
