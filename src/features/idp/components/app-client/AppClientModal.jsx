import React, { useState, useEffect } from "react";

export default function AppClientModal({ open, mode, client, onClose, onSubmit }) {
  const [name, setName] = useState(client?.name || "");
  const [callbacks, setCallbacks] = useState(client?.callbacks || "");
  const [logouts, setLogouts] = useState(client?.logouts || "");
  const [selectedScopes, setSelectedScopes] = useState(client?.scopes || ["openid"]);

  useEffect(() => {
  if (mode === "create") {
    // Reset all fields for creating a new client
    setName("");
    setCallbacks("");
    setLogouts("");
    setSelectedScopes(["openid"]);
  } else {
    // Load existing client for view/edit
    setName(client?.name || "");
    setCallbacks(client?.callbacks || "");
    setLogouts(client?.logouts || "");
    setSelectedScopes(client?.scopes || ["openid"]);
  }
}, [client, mode]);

  const toggleScope = (scope) => {
    if (selectedScopes.includes(scope)) {
      setSelectedScopes(selectedScopes.filter((s) => s !== scope));
    } else {
      setSelectedScopes([...selectedScopes, scope]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "view") return onClose();

    onSubmit({ clientId: client?.clientId, // keep the existing ID for edit, undefined for new create
      name,
      callbacks,
      logouts,
      scopes: selectedScopes,
      created: client?.created || new Date().toISOString().slice(0, 10),
      lastUsed: client?.lastUsed || "-", });
  };

  if (!open) return null;

  return (
    <dialog className="modal modal-open">
      <form className="modal-box bg-white w-full max-w-xl sm:max-w-4xl rounded-xl max-h-[80vh] flex flex-col overflow-y-auto" onSubmit={handleSubmit}>
        {/* Close button */}
        <button type="button" className="btn btn-sm btn-circle text-gray-700 hover:bg-transparent border-none btn-ghost absolute right-2 top-2" onClick={onClose}>
          ✕
        </button>

        {/* Modal title */}
        <h3 className="text-sm sm:text-xl font-bold text-[#991b1b] mb-5">
          {mode === "create" ? "Create App Client" : mode === "edit" ? "Edit App Client" : "View App Client"}
        </h3>

        {/* Form fields */}
        <div className="space-y-4 flex-1">
          {(mode === "view" || mode === "edit") && (
            <input type="text" value={client?.clientId} placeholder="Client ID" readOnly className="w-full px-3 py-2 rounded-md border bg-gray-100 text-gray-700 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#991b1b]"/>
          )}
          
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="client_name" placeholder="Client name (e.g., My Web App)" required className="w-full px-3 py-2 rounded-md border bg-transparent text-gray-700 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#991b1b]" disabled={mode === "view"}/>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <textarea value={callbacks} onChange={(e) => setCallbacks(e.target.value)} name="callback_urls" rows="3" placeholder="Callback URLs (comma-separated)" className="w-full px-3 py-2 rounded-md border bg-transparent text-gray-700 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#991b1b] resize-none max-h-40 overflow-y-auto" disabled={mode === "view"}/>
            <textarea value={logouts} onChange={(e) => setLogouts(e.target.value)} name="logout_urls" rows="3" placeholder="Sign out URLs (comma-separated)" className="w-full px-3 py-2 rounded-md border bg-transparent text-gray-700 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#991b1b] resize-none max-h-40 overflow-y-auto" disabled={mode === "view"}/>
          </div>

          {/* Allowed scopes */}
          <div className="mb-5">
            <span className="block text-sm font-medium text-gray-700">Allowed scopes</span>
            <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {["openid", "profile", "email", "phone"].map((scope) => (
                <label key={scope} className="flex items-center gap-2 text-gray-700">
                  <input type="checkbox" name="scopes" value={scope} className="checkbox border-gray-300 bg-transparent checked:bg-[#991b1b] checked:border-red-900 checked:text-white mr-1" checked={selectedScopes.includes(scope)} onChange={() => toggleScope(scope)} disabled={mode === "view"} />
                  <span className="text-[#991b1b] text-[.7rem] sm:text-sm">{scope}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-end gap-3 mt-4">
          <button type="button" className="btn btn-outline text-[#991b1b] border-[#991b1b] hover:bg-[#ffd700] hover:border-[#ffd700] hover:text-[#991b1b]" onClick={onClose}>
            Cancel
          </button>
          {mode !== "view" && (
            <button type="submit" className="btn bg-[#991b1b] text-white border-[#991b1b] hover:bg-[#ffd700] hover:border-[#ffd700] hover:text-[#991b1b]">
              {mode === "create" ? "Create" : "Save"}
            </button>
          )}
        </div>
      </form>
    </dialog>
  );
}
