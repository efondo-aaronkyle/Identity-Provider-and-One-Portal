import AppClientCard from "./AppClientCard";
import Pagination from "../../../../components/Pagination";
import ConnectedAppClientTable from "./ConnectedAppClientTable";
import ResultsCount from "../../../../components/ResultsCount";

export default function ConnectedAppClientCard({ clients, totalResults, itemsPerPage, search, setSearch, page, totalPages, onPageChange, onView, onEdit, onDelete }) {
    return (
        <AppClientCard title="Connected App Clients">
            <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="w-full">
                    <label className="block font-semibold mb-1 text-black text-base">What are you looking for?</label>
                    <label className="input max-w-xl rounded-xl flex items-center gap-2 bg-transparent border border-gray-300 text-gray-700 w-full focus-within:ring-1 focus-within:ring-red-500 focus-within:border-red-500">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor" className="w-6">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input type="search" value={search} placeholder="Search by name or client ID..." className="grow bg-transparent" onChange={(e) => setSearch(e.target.value)} />
                    </label>
                </div>
                <ResultsCount page={page} itemsPerPage={itemsPerPage} totalResults={totalResults} />
            </div>
            <ConnectedAppClientTable clients={clients} onView={onView} onEdit={onEdit} onDelete={onDelete} />
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={onPageChange} />
        </AppClientCard>
            
    );
}