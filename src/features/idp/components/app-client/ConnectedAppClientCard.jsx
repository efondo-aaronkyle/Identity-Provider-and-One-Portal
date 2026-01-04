import AppClientCard from "./AppClientCard";
import Pagination from "./Pagination";
import ConnectedAppClientTable from "./ConnectedAppClientTable";

export default function ConnectedAppClientCard({ clients, totalResults, itemsPerPage, search, setSearch, page, totalPages, onPageChange, onView, onEdit, onDelete }) {
    const start = totalResults === 0 ? 0 : (page - 1) * itemsPerPage + 1;
    const end = totalResults === 0 ? 0 : Math.min(page * itemsPerPage, totalResults);
    
    return (
        <AppClientCard title="Connected App Clients">
            <div className="grid grid-cols-1 md:grid    -cols-2 gap-4 mb-4">
                <label className="input rounded-lg flex items-center gap-2 bg-transparent border border-gray-300 text-gray-700 w-full focus-within:ring-1 focus-within:ring-red-500 focus-within:border-red-500">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor" className="w-6">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input type="search" value={search} placeholder="Search by name or client ID..." className="grow bg-transparent" onChange={(e) => setSearch(e.target.value)} />
                </label>
                <div className="flex items-center justify-end text-sm text-gray-600">
                    Showing <span className="mx-1">{start}</span> to
                    <span className="mx-1">{end}</span> of
                    <span className="mx-1">{totalResults}</span> results
                </div>
            </div>
            <ConnectedAppClientTable clients={clients} onView={onView} onEdit={onEdit} onDelete={onDelete} />
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={onPageChange} />
        </AppClientCard>
            
    );
}