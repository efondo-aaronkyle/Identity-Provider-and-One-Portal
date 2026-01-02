export default function AddUserCard({title, description, children }) {
  return (
    <div className="card bg-white w-full max-w-3xl shadow-xl">
      <div className="card-body space-y-6">
        <div>
          <h2 className="text-[#991b1b] text-[40px] font-bold leading-9 sm:leading-0 ">{title}</h2>
          {description && (
            <p className="text-[16px] mt-1 sm:mt-5 text-gray-600">
              {description}
            </p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
