export default function DeleteConfirmModal({ open, message = "Delete this app client?", onCancel, onConfirm }) {
  return (
    <dialog className={`modal modal-middle ${open ? "modal-open" : ""}`}>
      <form method="dialog" className="modal-box bg-white rounded-xl text-center">
        <h3 className="font-bold text-2xl text-[#991b1b]">{message}</h3>
        <p className="text-sm text-gray-700">This action cannot be undone.</p>
        <div className="modal-action justify-center">
          <button type="button" className="btn btn-outline text-[#991b1b] border-[#991b1b] hover:bg-[#ffd700] hover:border-[#ffd700] hover:text-[#991b1b]" onClick={onCancel}>Cancel</button>
          <button type="button" className="btn bg-[#991b1b] text-white border-[#991b1b] hover:bg-[#ffd700] hover:border-[#ffd700] hover:text-[#991b1b]" onClick={onConfirm}>Delete</button>
        </div>
      </form>
    </dialog>
  );
}
