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
      <div className="modal-box max-w-2xl max-h-[85vh] p-0 overflow-hidden flex flex-col">
        <div className="bg-linear-to-r from-[#991b1b] to-red-600 p-6 text-white shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">
                {mode === "create" ? "Create App Client" : mode === "edit" ? "Edit App Client" : "View App Client"}
              </h3>
            </div>
            <button className="btn btn-sm btn-circle btn-ghost text-white hover:bg-white/20" onClick={onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <form id="app-client-form" className="flex-1 overflow-y-auto p-6 space-y-4 bg-white" onSubmit={handleSubmit}>
          <div className="space-y-4 flex-1">
            {(mode === "view" || mode === "edit") && (
              <div className="space-y-0.5">
                <label className="block text-sm font-semibold text-gray-700">
                  Client Id
                </label>
                <input type="text" value={client?.clientId} placeholder="Client ID" readOnly className="w-full px-3 py-2 rounded-md border bg-gray-100 text-gray-700 border-gray-300"/>
              </div>
            )}
            
            <div className="space-y-0.5">
              <label className="block text-sm font-semibold text-gray-700">
                  Client Name
                </label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="client_name" placeholder="Client name (e.g., My Web App)" required className={`w-full px-3 py-2 rounded-lg border border-gray-300 ${
                mode === "view" ? "bg-gray-100 text-gray-700" : "bg-transparent text-gray-700 focus:ring-2 focus:ring-[#991b1b]"
              }`} disabled={mode === "view"}/>
            </div>
            

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-0.5">
                <label className="block text-sm font-semibold text-gray-700">
                  Callback URLs
                </label>
                <textarea value={callbacks} onChange={(e) => setCallbacks(e.target.value)} name="callback_urls" rows="3" placeholder="Callback URLs (comma-separated)" className={`w-full px-3 py-2 rounded-md border border-gray-300 resize-none max-h-40 overflow-y-auto foucs:outline-none ${
                mode === "view" ? "bg-gray-100 text-gray-700" : "bg-transparent text-gray-700 focus:ring-2 focus:ring-[#991b1b]"}`} disabled={mode === "view"}/>
              </div>
              <div className="space-y-0.5">
                <label className="block text-sm font-semibold text-gray-700">
                  Signout URLs
                </label>
                <textarea value={logouts} onChange={(e) => setLogouts(e.target.value)} name="logout_urls" rows="3" placeholder="Sign out URLs (comma-separated)" className={`w-full px-3 py-2 rounded-md border border-gray-300 resize-none max-h-40 overflow-y-auto foucs:outline-none ${
                mode === "view" ? "bg-gray-100 text-gray-700" : "bg-transparent text-gray-700 focus:ring-2 focus:ring-[#991b1b]"}`}  disabled={mode === "view"}/>
              </div>
            </div>

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
        </form>

        {/* Action buttons */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 shrink-0">
          <div className="flex justify-end gap-3">
            <button type="button" className="btn h-12 rounded-lg btn-outline text-[#991b1b] border-[#991b1b] hover:bg-[#ffd700] hover:border-[#ffd700] hover:text-[#991b1b]" onClick={onClose}>
              Cancel
            </button>
            {mode !== "view" && (
              <button form="app-client-form" type="submit" className="btn h-12 rounded-lg bg-[#991b1b] text-white border-[#991b1b] hover:bg-[#ffd700] hover:border-[#ffd700] hover:text-[#991b1b]">
                {mode === "create" ? "Create" : "Save"}
              </button>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}
