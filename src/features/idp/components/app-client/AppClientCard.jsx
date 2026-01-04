export default function AppClientCard({ children }) {
  return (
    <div className="card bg-white w-full max-w-[65vw] sm:max-w-md md:max-w-lg lg:max-w-4xl mx-auto shadow-xl rounded-xl">
      <div className="card-body space-y-4 sm:space-y-6 px-4 sm:px-6">
        {children}
      </div>
    </div>
  );
}
