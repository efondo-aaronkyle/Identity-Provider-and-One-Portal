export default function AddUserCard({ children }) {
  return (
    <div className="card bg-white w-full max-w-3xl lg:max-w-6xl mx-auto shadow-xl rounded-xl">
      <div className="card-body space-y-4 sm:space-y-6 px-4 sm:px-6">
        {children}
      </div>
    </div>
  );
}
