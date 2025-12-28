export default function AddUserCard({ icon, title, children }) {
  return (
    <div className="card bg-white w-full max-w-3xl shadow-xl">
      <div className="card-body space-y-6">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-[#B91C1C] text-4xl font-bold">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
}
