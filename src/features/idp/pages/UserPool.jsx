import { useState, useEffect } from "react";
import UserPoolCard from "../components/user-pool/UserPoolCard";
import UserPoolFilters from "../components/user-pool/UserPoolFilters";
import UserPoolTable from "../components/user-pool/UserPoolTable";
import Pagination from "../../../components/Pagination";
import UserPoolModal from "../components/user-pool/UserPoolModal";
import AddUserModal from "../components/user-pool/AddUserModal"
import SuccessAlert from "../../../components/SuccessAlert";
import DeleteConfirmModal from "../../../components/DeleteConfirmAlert";
import ResultsCount from "../../../components/ResultsCount";
import PageHeader from "../components/PageHeader";
import { userPoolData } from "../data/UserPoolData";
import { initialRoles } from "../../idp/data/RolesData";

const ITEMS_PER_PAGE = 10;

export default function UserPool() {
    const [users, setUsers] = useState(userPoolData);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(1);
    const [openViewEditModal, setOpenViewEditModal] = useState(false);
    const [modalMode, setModalMode] = useState("view");
    const [selectedUser, setSelectedUser] = useState(null);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    const normalize = (str = "") =>
        str.toLowerCase().replace(/\s+/g, " ").trim();

    const filteredUsers = users.filter((u) => {
        const fullName = normalize(
        `${u.givenName || ""} ${u.middleName || ""} ${u.surname || ""}`
        );

        const searchValue = normalize(search);

        const matchesSearch =
        normalize(u.username).includes(searchValue) ||
        normalize(u.email).includes(searchValue) ||
        fullName.includes(searchValue);

        const matchesStatus = status ? u.status === status : true;

        return matchesSearch && matchesStatus;
    });

    const totalResults = filteredUsers.length;
    const totalPages = Math.max(1, Math.ceil(filteredUsers.length / ITEMS_PER_PAGE));
    const paginatedUsers = filteredUsers.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    useEffect(() => {
        setPage(1);
    }, [search, status]);

    useEffect(() => {
        if (!successMessage) return;
        const timer = setTimeout(() => setSuccessMessage(""), 3000);
        return () => clearTimeout(timer);
    }, [successMessage]);

    const handleOpenCreate = () => {
        setOpenAddModal(true);
    };

    const handleCreateUser = (newUser) => {
        const allIds = users.map(u => parseInt(u.id));
        const maxId = allIds.length > 0 ? Math.max(...allIds) : 15;
        const newId = (maxId + 1).toString();

        const selectedRoles = initialRoles
        .filter(r => newUser.roleIds.includes(r.id))
        .map(r => r.role_name);

        const finalUser = {
        id: newId,
        username: newUser.username || "",
        email: newUser.email,
        givenName: newUser.givenName,
        middleName: newUser.middleName,
        surname: newUser.surname,
        roleIds: newUser.roleIds,
        roles: selectedRoles,
        status: "active",
        emailVerified: newUser.emailVerified,
        createdAt: new Date().toISOString().split("T")[0],
        };

        setUsers((prev) => [finalUser, ...prev]);
        setSuccessMessage("User successfully created!");
    };

    const handleView = (user) => {
        setSelectedUser(user);
        setModalMode("view");
        setOpenViewEditModal(true);
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setModalMode("edit");
        setOpenViewEditModal(true);
    };

    const handleSave = (updatedUser) => {
        setUsers((prev) =>
        prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
        );
        setOpenViewEditModal(false);
        setSelectedUser(null);
        setSuccessMessage(`User ${updatedUser.username} updated successfully`);
    };

    // 🔹 DELETE
    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setOpenDelete(true);
    };

    const handleConfirmDelete = () => {
        setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
        setOpenDelete(false);
        setUserToDelete(null);
        setSuccessMessage(`User ${userToDelete.username} deleted successfully`);
    };

    return (
        <>
            <div className="flex flex-col items-center gap-6 px-3 sm:px-6">
                <PageHeader
                    title="Users"
                    description="Manage and view user accounts in the user pool"
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-28 h-28 text-[#991b1b]">
                            <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z" clipRule="evenodd" />
                        </svg>
                    }
                />
                <UserPoolCard>
                    <UserPoolFilters 
                        search={search} 
                        setSearch={setSearch} 
                        status={status} 
                        setStatus={setStatus} 
                        onCreate={handleOpenCreate}
                    />
                    <UserPoolTable 
                        users={paginatedUsers} 
                        onView={handleView}
                        onEdit={handleEdit}
                        onDisable={handleDeleteClick}
                    />
                    <ResultsCount
                        page={page}
                        itemsPerPage={ITEMS_PER_PAGE}
                        totalResults={totalResults}
                    />
                    <Pagination 
                        totalPages={totalPages}
                        currentPage={page}
                        onPageChange={setPage}
                    />
                    <UserPoolModal
                        open={openViewEditModal}
                        mode={modalMode}
                        user={selectedUser}
                        onClose={() => setOpenViewEditModal(false)}
                        onSubmit={handleSave}
                    />
                    <AddUserModal
                        open={openAddModal}
                        onClose={() => setOpenAddModal(false)}
                        onSubmit={handleCreateUser}
                    />
                </UserPoolCard>
            </div>
            <DeleteConfirmModal
                open={openDelete}
                message={`Delete user ${userToDelete?.username}?`}
                onCancel={() => {
                    setOpenDelete(false);
                    setUserToDelete(null);
                }}
                onConfirm={handleConfirmDelete}
            />
            <SuccessAlert
                message={successMessage}
                onClose={() => setSuccessMessage("")}
            />
        </>
    );
}