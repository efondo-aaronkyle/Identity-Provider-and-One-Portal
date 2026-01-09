import React, { useState, useEffect } from "react";

export default function RoleModal({ open, mode, role, onClose, onSubmit }) {
    const [roleName, setRoleName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if(mode === "create") {
            setRoleName("");
            setDescription("");
        } else if(mode === "edit" || mode === "view") {
            setRoleName(role?.role_name || "");
            setDescription(role?.description || "");
        }
    }, [mode, role, open]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (mode === "view") return onClose();

        onSubmit({
            id: role?.id || Date.now(),
            role_name: roleName,
            description,
            created_at: role?.created_at || new Date().toISOString().slice(0, 10),
        });
        setRoleName("");
        setDescription("");
    };

    if (!open) return null;
    
    return (
        <dialog className="modal modal-open">
            <div className="modal-box max-w-2xl max-h-[85vh] p-0 overflow-hidden flex flex-col">
                <div className="bg-linear-to-r from-[#991b1b] to-red-600 p-6 text-white shrink-0">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-bold">
                                {mode === "create" ? "Create Role" : mode === "edit" ? "Edit Role" : "View Role"}
                            </h3>
                        </div>
                        <button className="btn btn-sm btn-circle btn-ghost text-white hover:bg-white/20" onClick={onClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                <form id="role-form" className="flex-1 overflow-y-auto p-6 space-y-4 bg-white" onSubmit={handleSubmit}>
                    <div className="space-y-4 flex-1">
                        {(mode === "view" || mode === "edit") && (
                        <div className="space-y-0.5">
                            <label className="block text-sm font-semibold text-gray-700">
                            Role Id
                            </label>
                            <input type="text" value={role?.id} placeholder="Role ID" readOnly className="w-full px-3 py-2 rounded-md border bg-gray-100 text-gray-700 border-gray-300"/>
                        </div>
                        )}

                        <div className="space-y-0.5">
                            <label className="block text-sm font-semibold text-gray-700">
                                Role Name
                            </label>
                            <input type="text" value={roleName} onChange={(e) => setRoleName(e.target.value)} name="role_name" placeholder="Role name (e.g., Admin)" required className={`w-full px-3 py-2 rounded-lg border border-gray-300 ${
                                mode === "view" ? "bg-gray-100 text-gray-700" : "bg-transparent text-gray-700 focus:ring-2 focus:ring-[#991b1b]"
                            }`} disabled={mode === "view"}/>
                        </div>

                        <div className="space-y-0.5">
                            <label className="block text-sm font-semibold text-gray-700">
                                Role Description
                            </label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" rows="3" placeholder="Role description" required className={`w-full px-3 py-2 rounded-lg border border-gray-300 ${
                                mode === "view" ? "bg-gray-100 text-gray-700" : "bg-transparent text-gray-700 focus:ring-2 focus:ring-[#991b1b]"
                            }`} disabled={mode === "view"}/>
                        </div>
                    </div>
                </form>

                {/* Action buttons */}
                <div className="p-6 bg-gray-50 border-t border-gray-200 shrink-0">
                    <div className="flex justify-end gap-3">
                        <button type="button" className="btn h-12 rounded-lg btn-outline text-[#991b1b] border-[#991b1b] hover:bg-[#ffd700] hover:border-[#ffd700] hover:text-[#991b1b]" onClick={onClose}>
                            Cancel
                        </button>
                        {mode !== "view" && (
                            <button form="role-form" type="submit" className="btn h-12 rounded-lg bg-[#991b1b] text-white border-[#991b1b] hover:bg-[#ffd700] hover:border-[#ffd700] hover:text-[#991b1b]">
                                {mode === "create" ? "Create" : "Save"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </dialog>
    );
}