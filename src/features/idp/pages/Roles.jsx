import { useState, useMemo, useEffect } from "react";
import IdpLayout from "../layouts/IdpLayout";
import AddRoleCard from "../components/role/AddRoleCard";
import RolesListCard from "../components/role/RolesListCard";
import RoleModal from "../components/role/RoleModal";
import SuccessAlert from "../../../components/SuccessAlert";
import DeleteConfirmModal from "../../../components/DeleteConfirmAlert";
import { getRoles } from "../data/RolesData";

const ITEMS_PER_PAGE = 10;


export default function Roles() {
    const [roles, setRoles] = useState([]);

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState("create");
    const [activeRole, setActiveRole] = useState(null);

    const [successMessage, setSuccessMessage] = useState("");
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const loadRoles = async () => {
            try {
                setLoading(true);
                const data = await getRoles();
                setRoles(data || []); 
            } catch (err) {
                console.error("Failed to load roles:", err);
            } finally {
                setLoading(false);
            }
        };
        loadRoles();
    }, []);
    

    useEffect(() => {
        if(!successMessage) return;

        const timer = setTimeout(() => {
            setSuccessMessage("");
        }, 3000);

        return () => clearTimeout(timer);
    }, [successMessage]);

    const filtered = useMemo(() => {
        return roles.filter((r) => 
            r.roleName.toLowerCase().includes(search.toLowerCase())
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

    const confirmDelete = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:8080/api/v1/admin/roles/${deleteTarget}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete role');
            }

            // Only update the UI if the backend successfully deleted the record
            setRoles((prev) => prev.filter((r) => r.id !== deleteTarget));
            setShowDeleteAlert(false);
            setDeleteTarget(null);
            setSuccessMessage("Role successfully deleted!");

        } catch (err) {
            console.error("Delete error:", err.message);
            // Add an error message state if you want to show the user it failed
        }
    };

    const saveRole = (data) => {
        if (mode === "create") {
            // data should already have the correct ID from the Go backend response
            setRoles((prev) => [data, ...prev]);
            setSuccessMessage("Role successfully created!");
        } else if (mode === "edit") {
            setRoles((prev) => 
                prev.map((r) => (Number(r.id) === Number(data.id) ? data : r))
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