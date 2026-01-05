import { useEffect, useState } from "react";

export default function UserPoolModal({ open, mode, user, onClose, onSubmit }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("ACTIVE");

  useEffect(() => {
    if (!user) return;

    setUsername(user.username || "");
    setEmail(user.email || "");
    setName(user.name || "");
    setStatus(user.status || "ACTIVE");
  }, [user, mode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "view") return onClose();

    onSubmit({
      ...user,
      username,
      email,
      name,
      status,
    });
  };

  if (!open) return null;

  return (
    <dialog className="modal modal-open">
      <form
        onSubmit={handleSubmit}
        className="modal-box bg-white w-full max-w-xl rounded-xl max-h-[80vh] flex flex-col overflow-y-auto"
      >
        {/* Close */}
        <button
          type="button"
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Title */}
        <h3 className="text-sm sm:text-2xl font-bold text-[#991b1b] mb-5">
          {mode === "edit" ? "Edit User" : "View User"}
        </h3>

        {/* Fields */}
        <div className="space-y-4 flex-1">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={mode === "view"}
            className={`w-full px-3 py-2 rounded-lg border ${
              mode === "view" ? "bg-gray-100 text-gray-700" : "bg-transparent text-gray-700 focus:ring-2 focus:ring-[#991b1b]"
            }`}
            placeholder="Username"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={mode === "view"}
            className={`w-full px-3 py-2 rounded-lg border ${
              mode === "view" ? "bg-gray-100 text-gray-700" : "bg-transparent text-gray-700 focus:ring-2 focus:ring-[#991b1b]"
            }`}
            placeholder="Email"
          />

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={mode === "view"}
            className={`w-full px-3 py-2 rounded-lg border ${
              mode === "view" ? "bg-gray-100 text-gray-700" : "bg-transparent text-gray-700 focus:ring-2 focus:ring-[#991b1b]"
            }`}
            placeholder="Full Name"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            disabled={mode === "view"}
            className={`w-full px-3 py-2 rounded-lg border ${
              mode === "view" ? "bg-gray-100 text-gray-700" : "bg-transparent text-gray-700 focus:ring-2 focus:ring-[#991b1b]"
            }`}
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            className="btn btn-outline text-[#991b1b] border-[#991b1b] hover:bg-[#ffd700] hover:border-[#ffd700] hover:text-[#991b1b]"
            onClick={onClose}
          >
            Close
          </button>

          {mode === "edit" && (
            <button
              type="submit"
              className="btn bg-[#991b1b] text-white border-[#991b1b] hover:bg-[#ffd700] hover:border-[#ffd700] hover:text-[#991b1b]"
            >
              Save
            </button>
          )}
        </div>
      </form>
    </dialog>
  );
}
