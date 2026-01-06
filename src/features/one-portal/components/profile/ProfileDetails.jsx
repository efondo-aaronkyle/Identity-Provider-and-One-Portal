export default function ProfileDetails({ profile }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-500 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                    Student ID
                </label>
                <div className="input input-bordered border-gray-300 h-12 rounded-lg w-full bg-gray-50 flex items-center">
                    <span className="font-mono text-sm text-red-800" id="studentIdDisplay">{profile.studentId || "2023-1234-TG-0"}</span>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-500 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Username
                </label>
                <div className="input input-bordered border-gray-300 h-12 rounded-lg text-base w-full bg-gray-50 flex items-center">
                    <span className="text-gray-800" id="usernameValue">{profile.username}</span>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-500 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    First Name
                </label>
                <div className="input input-bordered border-gray-300 h-12 rounded-lg text-base w-full bg-gray-50 flex items-center">
                    <span className="text-gray-800" id="firstName">{profile.firstName}</span>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-500 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Middle Name
                </label>
                <div className="input input-bordered border-gray-300 h-12 rounded-lg text-base w-full bg-gray-50 flex items-center">
                    <span className="text-gray-800" id="middleName">{profile.middleName}</span>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-500 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Last Name
                </label>
                <div className="input input-bordered border-gray-300 h-12 rounded-lg text-base w-full bg-gray-50 flex items-center">
                    <span className="text-gray-800" id="lastName">{profile.lastName}</span>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-500 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email Address
                </label>
                <div className="input input-bordered border-gray-300 h-12 rounded-lg text-base w-full bg-gray-50 flex items-center">
                    <span className="text-gray-800" id="emailValue">juan.delacruz@iskolarngbayan.pup.edu.ph</span>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-500 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Account Status
                </label>
                <div className="input input-bordered border-gray-300 h-12 rounded-lg text-base w-full bg-gray-50 flex items-center">
                    <span className="text-gray-800 capitalize" id="statusValue">active</span>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-500 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    User Role
                </label>
                <div className="input input-bordered border-gray-300 h-12 rounded-lg text-base w-full bg-gray-50 flex items-center">
                    <span className="text-gray-800" id="roleValue">Student</span>
                </div>
            </div>

            <div className="md:col-span-2 mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Audit Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="card bg-white shadow-lg rounded-2xl">
                        <div className="card-body p-4">
                            <h4 className="card-title text-sm text-gray-500">Created At</h4>
                            <p className="text-gray-800 font-medium text-base" id="createdAt">2023-08-15 10:30:45</p>
                        </div>
                    </div>
                    <div className="card bg-white shadow-lg rounded-2xl">
                        <div className="card-body p-4">
                            <h4 className="card-title text-sm text-gray-500">Updated At</h4>
                            <p className="text-gray-800 font-medium text-base" id="updatedAt">2024-01-20 14:25:10</p>
                        </div>
                    </div>
                    <div className="card bg-white shadow-lg rounded-2xl">
                        <div className="card-body p-4">
                            <h4 className="card-title text-sm text-gray-500">Deleted At</h4>
                            <p className="text-gray-800 font-medium text-base" id="deletedAt">-</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}