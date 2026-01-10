import { useEffect, useState } from "react";
import { initialRoles } from "../../data/RolesData";

export default function UserPoolModal({ open, mode, user, onClose, onSubmit }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [roleId, setRoleId] = useState("");

  useEffect(() => {
    if (!user) return;

    setUsername(user.username || "");
    setEmail(user.email || "");
    setName(user.name || "");
    setStatus(user.status || "ACTIVE");
    const r = initialRoles.find(r => r.role_name === user.role);
    setRoleId(r?.id?.toString() || "");
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "view") return onClose();

    onSubmit({
      ...user,
      username,
      email,
      name,
      status,
      roleId,
      role: initialRoles.find(r => r.id.toString() === roleId)?.role_name || "USER",
    });
  };

  if (!open) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-xl max-h-[85vh] p-0 overflow-hidden flex flex-col">
        <div className="bg-linear-to-r from-[#991b1b] to-red-600 p-6 text-white shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">
                {mode === "edit" ? "Edit User" : "View User"}
              </h3>
              <p className="text-white/90 mt-1">
                {mode === "edit" ? "Update user account information" : "User account details"}
              </p>
            </div>
            <button className="btn btn-sm btn-circle btn-ghost text-white hover:bg-white/20" onClick={onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <form id="user-pool-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 bg-white space-y-4">
          <div className="space-y-0.5">
            <label className="block text-sm font-semibold text-gray-700">
              Username
            </label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
              disabled={mode === "view"}
              className={`w-full px-3 py-2 rounded-lg border ${
                mode === "view" ? "bg-gray-100 text-gray-700" : "bg-transparent text-gray-700 focus:ring-2 focus:ring-[#991b1b]"
              }`}
              placeholder="Username"
            />
          </div>
          
          <div className="space-y-0.5">
            <label className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              disabled={mode === "view"}
              className={`w-full px-3 py-2 rounded-lg border ${
                mode === "view" ? "bg-gray-100 text-gray-700" : "bg-transparent text-gray-700 focus:ring-2 focus:ring-[#991b1b]"
              }`}
              placeholder="Email"
            />
          </div>
          
          <div className="space-y-0.5">
            <label className="block text-sm font-semibold text-gray-700">
              Fullname
            </label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
              disabled={mode === "view"}
              className={`w-full px-3 py-2 rounded-lg border ${
                mode === "view" ? "bg-gray-100 text-gray-700" : "bg-transparent text-gray-700 focus:ring-2 focus:ring-[#991b1b]"
              }`}
              placeholder="Full Name"
            />
          </div>

          <div className="space-y-0.5">
            <label className="block text-sm font-semibold text-gray-700">
              Role
            </label>
            <select name="roleId" value={roleId} onChange={(e) => setRoleId(e.target.value)} disabled={mode === "view"}
              className={`select border rounded-lg w-full border-gray-700 text-gray-700 ${
                mode === "view" ? "bg-gray-100 cursor-not-allowed" : "bg-white focus:ring-2 focus:ring-[#991b1b]"
              }`}
              required
            >
              <option value="" className="text-gray-300">Select a role</option>
              {initialRoles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.role_name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="space-y-0.5">
            <label className="block text-sm font-semibold text-gray-700">
              Status
            </label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}
              disabled={mode === "view"}
              className={`select border rounded-lg w-full border-gray-700 text-gray-700 ${
                mode === "view" ? "bg-gray-100 cursor-not-allowed" : "bg-white focus:ring-2 focus:ring-[#991b1b]"
              }`}
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>
        </form>

        {/* Actions */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 shrink-0">
          <div className="flex justify-end gap-3">
            <button type="button" className="btn h-12 rounded-lg btn-outline text-[#991b1b] border-[#991b1b] hover:bg-[#ffd700] hover:border-[#ffd700] hover:text-[#991b1b]" onClick={onClose}>
              Close
            </button>

            {mode === "edit" && (
              <button type="submit" form="user-pool-form" className="btn h-12 rounded-lg bg-[#991b1b] text-white border-[#991b1b] hover:bg-[#ffd700] hover:border-[#ffd700] hover:text-[#991b1b]">
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}
