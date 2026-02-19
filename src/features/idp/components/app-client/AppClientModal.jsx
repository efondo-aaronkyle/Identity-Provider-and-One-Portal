import React, { useState, useEffect } from "react";
import ErrorAlert from "../../../../components/ErrorAlert";

export default function AppClientModal({ open, mode, client, onClose, onSubmit }) {
  const [name, setName] = useState(client?.name || "");
  const [baseURL, setBaseURL] = useState(client?.baseURL || "");
  const [redirectURL, setRedirectURL] = useState(client?.redirectURL || "");
  const [logoutURL, setLogoutURL] = useState(client?.logoutURL || "");
  const [selectedScopes, setSelectedScopes] = useState(client?.scopes || ["openid"]);
  const [imagePreview, setImagePreview] = useState(client?.image || null);
  const [isDragging, setIsDragging] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
  if (mode === "create") {
    // Reset all fields for creating a new client
    setName("");
    setBaseURL("");
    setRedirectURL("");
    setLogoutURL("");
    setSelectedScopes(["openid"]);
    setImagePreview(null);
    setError("");
  } else {
    // Load existing client for view/edit
    setName(client?.name || "");
    setBaseURL(client?.baseURL || "");
    setRedirectURL(client?.redirectURL || "");
    setLogoutURL(client?.logoutURL || "");
    setSelectedScopes(client?.scopes || ["openid"]);
    setImagePreview(client?.image || null);
  }
}, [client, mode]);

  const processFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (mode !== "view") setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (mode !== "view") {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  const removeImage = (e) => {
    e.stopPropagation(); // Prevent opening the preview when clicking delete
    setImagePreview(null);
    const input = document.getElementById('dropzone-file');
    if (input) input.value = "";
  };

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

    if (!name.trim()) {
      setError("Client name is required.");
      return;
    }

    if (!baseURL.trim() || !redirectURL.trim() || !logoutURL.trim()) {
      setError("All URL fields are required.");
      return;
    }

    setError("");

    onSubmit({ 
      clientId: client?.clientId, // keep the existing ID for edit, undefined for new create
      name,
      baseURL,
      redirectURL,
      logoutURL,
      scopes: selectedScopes,
      image: imagePreview,
      created: client?.created || new Date().toISOString().slice(0, 10),
      lastUsed: client?.lastUsed || "-", 
    });
  };

  if (!open) return null;

  return (
    <>
      <dialog className={`modal ${open ? "modal-open" : ""} z-998`}>
        <div className="modal-box max-w-2xl max-h-[85vh] p-0 overflow-hidden flex flex-col">
          <div className="bg-linear-to-r from-[#991b1b] to-red-600 p-6 text-white shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">
                  {mode === "edit" ? "Edit App Client" : "View App Client"}
                </h3>
                <p className="text-white/90 mt-1">
                  {mode === "edit" ? "Update the application client's configuration and settings." : "Application client's configuration details."}
                </p>
              </div>
              <button className="btn btn-sm btn-circle btn-ghost text-white hover:bg-white/20" onClick={onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <form id="app-client-form" className="flex-1 overflow-y-auto p-6 space-y-4 bg-white" onSubmit={handleSubmit}>
            <ErrorAlert message={error} onClose={() => setError("")}/>
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">System Logo</label>
              <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}className={`relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl transition-all duration-200 ${
                  isDragging ? "border-[#991b1b] bg-red-50" : "border-gray-300 bg-gray-50"
                } ${mode === "view" ? "border-gray-200 cursor-default" : "hover:bg-gray-100 cursor-pointer"}`}
              >
                {!imagePreview ? (
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                      <svg className={`w-8 h-8 mb-2 transition-colors ${isDragging ? "text-[#991b1b]" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-xs text-gray-500">
                        <span className="font-semibold text-[#991b1b]">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-[10px] text-gray-400 uppercase mt-1">PNG or JPG</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" accept="image/png, image/jpeg" onChange={handleImageChange} disabled={mode === "view"} />
                  </label>
                ) : (
                  <div className="relative w-full h-full p-2 flex items-center justify-center">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="max-h-full max-w-full object-contain rounded-lg cursor-zoom-in hover:opacity-90 transition-opacity"
                      onClick={() => setShowFullImage(true)} 
                    />
                    {mode !== "view" && (
                      <button 
                        type="button" 
                        onClick={removeImage} 
                        className="absolute top-2 right-2 btn btn-circle btn-xs bg-white border-[#991b1b] hover:bg-[#ffd700] hover:border-[#ffd700] shadow-lg z-10"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#991b1b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
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
                    Base URLs
                  </label>
                  <textarea value={baseURL} onChange={(e) => setBaseURL(e.target.value)} rows="3" placeholder="Callback URLs (comma-separated)" className={`w-full px-3 py-2 rounded-md border border-gray-300 resize-none max-h-40 overflow-y-auto foucs:outline-none ${
                  mode === "view" ? "bg-gray-100 text-gray-700" : "bg-transparent text-gray-700 focus:ring-2 focus:ring-[#991b1b]"}`} disabled={mode === "view"}/>
                </div>
                <div className="space-y-0.5">
                  <label className="block text-sm font-semibold text-gray-700">
                    Redirect URLs
                  </label>
                  <textarea value={redirectURL} onChange={(e) => setRedirectURL(e.target.value)} rows="3" placeholder="Sign out URLs (comma-separated)" className={`w-full px-3 py-2 rounded-md border border-gray-300 resize-none max-h-40 overflow-y-auto foucs:outline-none ${
                  mode === "view" ? "bg-gray-100 text-gray-700" : "bg-transparent text-gray-700 focus:ring-2 focus:ring-[#991b1b]"}`}  disabled={mode === "view"}/>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 flex justify-center">
                  <div className="w-full md:w-1/2 space-y-0.5">
                    <label className="block text-sm font-semibold text-gray-700">
                      Logout URLs
                    </label>
                    <textarea value={logoutURL} onChange={(e) => setLogoutURL(e.target.value)} rows="3" placeholder="Sign out URLs (comma-separated)" className={`w-full px-3 py-2 rounded-md border border-gray-300 resize-none max-h-40 overflow-y-auto foucs:outline-none ${
                    mode === "view" ? "bg-gray-100 text-gray-700" : "bg-transparent text-gray-700 focus:ring-2 focus:ring-[#991b1b]"}`}  disabled={mode === "view"}/>
                  </div>
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
      {showFullImage && (
        <div className="fixed inset-0 flex items-center justify-center z-9999" onClick={() => setShowFullImage(false)}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
          <div className="relative max-w-4xl p-4 flex flex-col items-center justify-center pointer-events-none">
            <button 
              className="btn btn-circle btn-sm absolute -top-4 -right-4 bg-white border-[#991b1b] hover:bg-[#ffd700] hover:border-[#ffd700] text- pointer-events-auto"
              onClick={() => setShowFullImage(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#991b1b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img 
              src={imagePreview} 
              className="max-w-full max-h-[90vh] rounded-xl shadow-2xl pointer-events-auto" 
              alt="Full Preview" 
            />
          </div>
        </div>
      )}
    </>
  );
}
