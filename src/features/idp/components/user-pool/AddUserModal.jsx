import { useState, useEffect } from "react";
import MultiSelect from "./../MultiSelect";
import FadeWrapper from "../../../../components/FadeWrapper";
import ModalSteps from "../ModalSteps";
import { useAllRoles } from "../../hooks/useAllRoles";

const initialFormData = {
  username: "",
  email: "",
  phone: "",
  givenName: "",
  middleName: "",
  surname: "",
  inviteMode: "invite",
  delivery: "email",
  tempPassword: "",
  roleIds: [],
  status: "active",
};


export default function AddUserModal({ open, onClose, onSubmit }) {
    const [step, setStep] = useState(1);
    const roles = useAllRoles();
    const [data, setData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData({ ...data, [name]: type === "checkbox" ? checked : value });
    };

    const generatePassword = () => {
        const chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
        let pwd = "";
        for (let i = 0; i < 12; i++) {
            pwd += chars[Math.floor(Math.random() * chars.length)];
        }
        setData({ ...data, tempPassword: pwd });
    };

    const nextStep = () => {
        if (step === 1) {
            if (!data.email || !data.givenName || !data.surname) {
                alert("Please fill out all required fields.");
                return;
            }
        }

        if (step === 2) {
            if (!data.roleIds || data.roleIds.length === 0) {
                alert("Please select at least one role.");
                return;
            }
            if (data.inviteMode === "temp" && !data.tempPassword) {
                alert("Please generate a temporary password.");
                return;
            }
        }

        setStep(step + 1);
    };

    useEffect(() => {
        if (!open) {
            setData(initialFormData);
            setStep(1);
        }
    }, [open]);


    const handleSubmit = () => {
        const selectedRoles = roles
            .filter(r => data.roleIds.includes(r.id))
            .map(r => r.role_name);

        const fullName = `${data.givenName} ${data.middleName ? data.middleName + " " : ""}${data.surname}`;

        onSubmit({
            username: data.username,
            email: data.email,
            phone: data.phone,
            name: fullName,
            givenName: data.givenName,
            middleName: data.middleName,
            surname: data.surname,
            roleIds: data.roleIds,
            roles: selectedRoles,
            inviteMode: data.inviteMode,
            delivery: data.delivery,
            tempPassword: data.tempPassword,
            status: data.status,
        });

        onClose();
    };

    if (!open) return null;

    return (
        <dialog className="modal modal-open">
            <div className="modal-box max-w-xl max-h-[85vh] p-0 overflow-hidden flex flex-col">
                <div className="bg-linear-to-r from-[#991b1b] to-red-600 p-6 text-white shrink-0">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-bold">
                                Add User
                            </h3>
                            <p className="text-white/90 mt-1">
                                Enter user information
                            </p>
                        </div>
                        <button className="btn btn-sm btn-circle btn-ghost text-white hover:bg-white/20" onClick={onClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 bg-white space-y-4">
                    <ModalSteps
                        currentStep={step}
                        steps={[
                            <>
                                <span className="step-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                        <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
                                    </svg>
                                </span>Basic Info
                            </>,
                            <>
                                <span className="step-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                        <path fillRule="evenodd" d="M14.5 1A4.5 4.5 0 0 0 10 5.5V9H3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-1.5V5.5a3 3 0 1 1 6 0v2.75a.75.75 0 0 0 1.5 0V5.5A4.5 4.5 0 0 0 14.5 1Z" clipRule="evenodd" />
                                    </svg>
                                </span>Access
                            </>,
                            <>
                                <span className="step-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                        <path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 0 0 3 3.5v13A1.5 1.5 0 0 0 4.5 18h11a1.5 1.5 0 0 0 1.5-1.5V7.621a1.5 1.5 0 0 0-.44-1.06l-4.12-4.122A1.5 1.5 0 0 0 11.378 2H4.5ZM10 8a.75.75 0 0 1 .75.75v1.5h1.5a.75.75 0 0 1 0 1.5h-1.5v1.5a.75.75 0 0 1-1.5 0v-1.5h-1.5a.75.75 0 0 1 0-1.5h1.5v-1.5A.75.75 0 0 1 10 8Z" clipRule="evenodd" />
                                    </svg>
                                </span>Account Status
                            </>,
                        ]}
                    />
                    <FadeWrapper isVisible={step === 1}>
                        <>
                            <div className="mb-5">
                                <label className="block font-medium mb-1 text-black text-base">Username</label>
                                <label className="input rounded-lg flex items-center gap-2 bg-transparent border border-gray-300 text-gray-700 w-full focus-within:ring-2 focus-within:ring-[#991b1b] focus-within:border-[#991b1b]">
                                    <span className="pr-3 border-r border-gray-300 text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        name="username"
                                        value={data.username}
                                        onChange={handleChange}
                                        placeholder="Enter username"
                                        className="grow bg-transparent"
                                    />
                                    <span className="badge badge-neutral badge-xs">Optional</span>
                                </label>
                            </div>
                            <div className="mb-5">
                                <label className="block font-medium mb-1 text-black text-base">Email Address <span className="text-red-500">*</span></label>
                                <label className="input flex items-center gap-2 rounded-lg bg-transparent border border-gray-300 text-gray-700 w-full focus-within:ring-2 focus-within:ring-[#991b1b] focus-within:border-[#991b1b]">
                                    <span className="pr-3 border-r border-gray-300 text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                            <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                                            <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                                        </svg>
                                    </span>
                                    <input
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter email"
                                        className="grow bg-transparent"
                                    />
                                </label>
                            </div>
                            <div className="mb-5">
                                <label className="block font-medium mb-1 text-black text-base">Phone Number</label>
                                <label className="input flex items-center rounded-lg gap-2 bg-transparent border border-gray-300 text-gray-700 w-full focus-within:ring-2 focus-within:ring-[#991b1b] focus-within:border-[#991b1b]">
                                    <span className="pr-3 border-r border-gray-300 text-gray-500">+63</span>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={data.phone}
                                        onChange={handleChange}
                                        placeholder="(123) 456 7890"
                                        className="grow bg-transparent"
                                    />
                                    <span className="badge badge-neutral badge-xs">Optional</span>
                                </label>
                            </div>
                            <div className="mb-5">
                                <label className="block font-medium mb-1 text-black text-base">First Name <span className="text-red-500">*</span></label>
                                <input
                                type="text"
                                name="givenName"
                                value={data.givenName}
                                onChange={handleChange}
                                required
                                placeholder="Enter firstname"
                                className="input bg-transparent border rounded-lg border-gray-300 text-gray-700 w-full focus-within:ring-2 focus-within:ring-[#991b1b] focus-within:border-[#991b1b]"
                                />
                            </div>
                            <div className="mb-5">
                                <label className="block font-medium mb-1 text-black text-base">Middle Name</label>
                                <label className="input flex items-center rounded-lg gap-2 bg-transparent border border-gray-300 text-gray-700 w-full focus-within:ring-2 focus-within:ring-[#991b1b] focus-within:border-[#991b1b]">
                                <input
                                    type="text"
                                    name="middleName"
                                    value={data.middleName}
                                    onChange={handleChange}
                                    placeholder="Enter middlename"
                                    className="grow bg-transparent"
                                />
                                <span className="badge badge-neutral badge-xs">Optional</span>
                                </label>
                            </div>
                            <div className="mb-5">
                                <label className="block font-medium mb-1 text-black text-base">Last Name <span className="text-red-500">*</span></label>
                                <input
                                type="text"
                                name="surname"
                                value={data.surname}
                                onChange={handleChange}
                                required
                                placeholder="Enter lastname"
                                className="input bg-transparent border rounded-lg border-gray-300 text-gray-700 w-full focus-within:ring-2 focus-within:ring-[#991b1b] focus-within:border-[#991b1b]"
                                />
                            </div>
                        </>
                    </FadeWrapper>
                    <FadeWrapper isVisible={step === 2}>
                        <>
                            <div className="mb-5">
                                <label className="block font-medium text-black text-base">
                                    Role<span className="text-red-500"> *</span>
                                </label>
                                <p className="text-xs text-gray-500 italic mb-2">
                                    Choose a role for the user
                                </p>
                                <MultiSelect
                                    options={roles.map(r => ({
                                        id: r.id,
                                        role_name: r.role_name
                                    }))}
                                    selectedValues={data.roleIds || []}
                                    onChange={(ids) =>
                                        setData({ ...data, roleIds: ids })
                                    }
                                    placeholder="Select entity groups"
                                />
                            </div>
                            <div className="mb-5">
                                <label className="font-medium text-black text-base">
                                    Invitation method
                                </label>
                                <p className="text-xs text-gray-500 italic mb-2">
                                    Choose how the user will get access
                                </p>
                                <select
                                    name="inviteMode"
                                    value={data.inviteMode}
                                    onChange={handleChange}
                                    className="select bg-white border rounded-lg border-gray-300 text-gray-700 w-full focus:outline-none focus:ring-2 focus-within:ring-[#991b1b] focus-within:border-[#991b1b]"
                                >
                                    <option value="invite">Send an invitation to the user</option>
                                    <option value="temp">Set a temporary password</option>
                                </select>
                            </div>
                            <div className="relative overflow-hidden mb-5">
                                <div className={`${data.inviteMode === "invite" ? "relative" : "absolute top-0 left-0 w-full opacity-0 pointer-events-none"}`}>
                                    <FadeWrapper isVisible={data.inviteMode === "invite"} keyId="delivery">
                                    <div>
                                        <label className="block font-medium text-black text-base mb-2">
                                        Delivery method
                                        </label>
                                        <select
                                        name="delivery"
                                        value={data.delivery}
                                        onChange={handleChange}
                                        className="select bg-white border rounded-lg border-gray-300 text-gray-700 w-full focus:ring-0 focus:border-blue-200"
                                        >
                                        <option value="email">Email</option>
                                        <option value="sms">SMS</option>
                                        </select>
                                    </div>
                                    </FadeWrapper>
                                </div>
                        
                                <div className={`${data.inviteMode === "temp" ? "relative" : "absolute top-0 left-0 w-full opacity-0 pointer-events-none"}`}>
                                    <FadeWrapper isVisible={data.inviteMode === "temp"} keyId="tempPassword">
                                    <div>
                                        <label className="block font-medium text-black text-base mb-2">
                                            Temporary password
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                type="password"
                                                name="tempPassword"
                                                value={data.tempPassword}
                                                onChange={handleChange}
                                                placeholder="Temporary password"
                                                className="input bg-transparent border rounded-lg border-gray-300 text-gray-700 w-full focus:ring-0 focus:border-blue-200"
                                            />
                                            <button type="button" onClick={generatePassword} className="btn bg-[#991b1b] text-white border-[#991b1b] hover:bg-[#ffd700] hover:border-[#ffd700] hover:text-[#991b1b]">
                                                    Generate
                                            </button>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            User will be required to set a new password at first sign-in.
                                        </p>
                                    </div>
                                    </FadeWrapper>
                                </div>
                            </div>
                        </>
                    </FadeWrapper>
                    <FadeWrapper isVisible={step === 3}>
                        <>
                            <div className="mb-5">
                                <label className="font-medium text-black text-base">
                                    Account Status <span className="text-red-500">*</span>
                                </label>
                                <p className="text-xs text-gray-500 italic mb-2">
                                    Set the user's account state
                                </p>

                                <select
                                    name="status"
                                    value={data.status || "active"}
                                    onChange={handleChange}
                                    className="select bg-white border rounded-lg border-gray-300 text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-[#991b1b] focus:border-[#991b1b]"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="suspended">Suspended</option>
                                </select>
                            </div>
                        </>
                    </FadeWrapper>
                </div>
                <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
                    {step === 1 && (
                        <>
                            <button onClick={onClose} className="btn h-12 rounded-lg btn-outline text-[#991b1b] border-[#991b1b] hover:bg-[#ffd700] hover:border-[#ffd700] hover:text-[#991b1b]">Close</button>
                        </>
                    )}
                    {step > 1 && (
                        <>
                            <button onClick={() => setStep(step - 1)} className="btn h-12 rounded-lg btn-outline text-[#991b1b] border-[#991b1b] hover:bg-[#ffd700] hover:border-[#ffd700] hover:text-[#991b1b]">Back</button>
                        </>
                    )}
                    {step < 3 && (
                        <>
                            <button onClick={nextStep} className="btn h-12 rounded-lg bg-[#991b1b] text-white border-[#991b1b] hover:bg-[#ffd700] hover:border-[#ffd700] hover:text-[#991b1b]">Next</button>
                        </>
                    )}
                    {step === 3 && (
                        <>
                            <button onClick={handleSubmit} className="btn h-12 rounded-lg bg-[#991b1b] text-white border-[#991b1b] hover:bg-[#ffd700] hover:border-[#ffd700] hover:text-[#991b1b]">Create User</button>
                        </>
                    )}
                </div>
            </div>
        </dialog>
    );
}