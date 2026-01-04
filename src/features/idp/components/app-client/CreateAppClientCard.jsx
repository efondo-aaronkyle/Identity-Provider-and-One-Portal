import AppClientCard from "./AppClientCard";

export default function CreateAppClientCard({ onCreate }) {
  return (
    <AppClientCard>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-[#991b1b] text-lg sm:text-2xl font-bold">
            Create app client integration
          </h3>
          <p className="text-xs sm:text-sm text-gray-600">
            Create a new application client and configure allowed flows and callbacks
          </p>
        </div>
        <button onClick={onCreate} className="btn bg-[#991b1b] w-full sm:w-auto rounded-lg text-white border-[#991b1b] hover:bg-[#ffd700] hover:border-[#ffd700] hover:text-[#991b1b]">
          Create app client
        </button>
      </div>
    </AppClientCard>
  );
}
