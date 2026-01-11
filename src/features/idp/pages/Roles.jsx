import { useState, useMemo, useEffect } from "react";
import IdpLayout from "../layouts/IdpLayout";
import AddRoleCard from "../components/role/AddRoleCard";
import RolesListCard from "../components/role/RolesListCard";
import RoleModal from "../components/role/RoleModal";
import SuccessAlert from "../../../components/SuccessAlert";
import DeleteConfirmModal from "../../../components/DeleteConfirmAlert";
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
        <IdpLayout>
            <div className="flex flex-col items-center gap-6 px-3 sm:px-6">
                <div className="max-w-md md:max-w-lg lg:max-w-6xl w-full mx-auto">
                    <h1 className="text-[#991b1b] text-2xl sm:text-4xl font-bold">Roles</h1>
                    <p className="text-sm text-gray-600">Manage system roles and permissions</p>
                </div>
                <AddRoleCard openCreate={openCreate} />
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
        </IdpLayout>
    );
}