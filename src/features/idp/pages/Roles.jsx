import { useState, useMemo, useEffect } from "react";
import RolesListCard from "../components/role/RolesListCard";
import RoleModal from "../components/role/RoleModal";
import SuccessAlert from "../../../components/SuccessAlert";
import DeleteConfirmModal from "../../../components/DeleteConfirmAlert";
import PageHeader from "../components/PageHeader";
import { initialRoles } from "../data/RolesData";

const ITEMS_PER_PAGE = 10;


export default function Roles() {
    const [roles, setRoles] = useState(initialRoles);

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState("create");
    const [activeRole, setActiveRole] = useState(null);

    const [successMessage, setSuccessMessage] = useState("");
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);

    useEffect(() => {
        if(!successMessage) return;

        const timer = setTimeout(() => {
            setSuccessMessage("");
        }, 3000);

        return () => clearTimeout(timer);
    }, [successMessage]);

    const filtered = useMemo(() => {
        return roles.filter((r) => 
            r.role_name.toLowerCase().includes(search.toLowerCase())
        );
    }, [roles, search]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
    const paginated = filtered.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );
    
    const openCreate = () => {
        setMode("create");
        setActiveRole(null);
        setModalOpen(true);
    };

    const openView = (role) => {
        setMode("view");
        setActiveRole(role);
        setModalOpen(true);
    };

    const openEdit = (role) => {
        setMode("edit");
        setActiveRole(role);
        setModalOpen(true);
    };

    const deleteRole = (id) => {
        setDeleteTarget(id);
        setShowDeleteAlert(true);
    };

    const confirmDelete = () => {
        setRoles((prev) => prev.filter((r) => r.id !== deleteTarget));
        setShowDeleteAlert(false);
        setDeleteTarget(null);
        setSuccessMessage("Role successfully deleted!");
    };

    const saveRole = (data) => {
        if(mode === "create") {
            const nextId = roles.length > 0 ? Math.max(...roles.map(r => r.id)) + 1 : 1;
            setRoles((prev) => [
                {
                    ...data,
                    id: nextId,
                    created_at: new Date().toISOString().slice(0,10),
                },
                ...prev,
            ]);
            setSuccessMessage("Role successfully created!");
        } else if(mode === "edit") {
            setRoles((prev) => 
                prev.map((r) => (r.id === data.id ? data : r))
            );
            setSuccessMessage("Role successfully updated!");
        }
        setModalOpen(false);
    };

    return (
        <>
            <div className="flex flex-col items-center gap-6 px-3 sm:px-6">
                <PageHeader
                    title="Roles"
                    description="Manage system roles and permissions"
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-28 h-28 text-[#991b1b]">
                            <path fillRule="evenodd" d="M9.661 2.237a.531.531 0 0 1 .678 0 11.947 11.947 0 0 0 7.078 2.749.5.5 0 0 1 .479.425c.069.52.104 1.05.104 1.59 0 5.162-3.26 9.563-7.834 11.256a.48.48 0 0 1-.332 0C5.26 16.564 2 12.163 2 7c0-.538.035-1.069.104-1.589a.5.5 0 0 1 .48-.425 11.947 11.947 0 0 0 7.077-2.75Zm4.196 5.954a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                        </svg>
                    }
                />
                <RolesListCard 
                    roles={paginated}
                    totalResults={filtered.length}
                    itemsPerPage={ITEMS_PER_PAGE}
                    search={search}
                    setSearch={setSearch}
                    page={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                    onView={openView}
                    onEdit={openEdit}
                    onDelete={deleteRole}
                    onCreate={openCreate}
                />
                <RoleModal 
                    open={modalOpen}
                    mode={mode}
                    role={activeRole}
                    onClose={() => setModalOpen(false)}
                    onSubmit={saveRole}
                />
            </div>
            <DeleteConfirmModal 
                open={showDeleteAlert}
                message="Delete this role?"
                onCancel={() => {
                    setShowDeleteAlert(false);
                    setDeleteTarget(null);
                }}
                onConfirm={confirmDelete}
            />
            <SuccessAlert 
                message={successMessage}
                onClose={() => setSuccessMessage("")}
            />
        </>
    );
}