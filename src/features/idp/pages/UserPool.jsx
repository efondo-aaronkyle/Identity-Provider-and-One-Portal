import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import IdpLayout from "../layouts/IdpLayout";
import UserPoolCard from "../components/user-pool/UserPoolCard";
import UserPoolFilters from "../components/user-pool/UserPoolFilters";
import UserPoolTable from "../components/user-pool/UserPoolTable";
import Pagination from "../../../components/Pagination";
import UserPoolModal from "../components/user-pool/UserPoolModal";
import SuccessAlert from "../../../components/SuccessAlert";
import DeleteConfirmModal from "../../../components/DeleteConfirmAlert";
import ResultsCount from "../../../components/ResultsCount";
import { userPoolData } from "../data/UserPoolData";

const ITEMS_PER_PAGE = 10;

export default function UserPool() {
    const location = useLocation();
    const navigate = useNavigate();
    const hasConsumedRouterState = useRef(false);
    const [users, setUsers] = useState(userPoolData);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(1); 
    const [openModal, setOpenModal] = useState(false);
    const [modalMode, setModalMode] = useState("view");
    const [selectedUser, setSelectedUser] = useState(null);
    const [openDelete, setOpenDelete] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (location.state?.newUser && !hasConsumedRouterState.current) {
            hasConsumedRouterState.current = true;
            setUsers((prev) => [location.state.newUser, ...prev]);
            setSuccessMessage(location.state.successMessage);

            navigate(location.pathname, { replace: true });
        }
    }, [location.state, navigate, location.pathname]);

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

        const timer = setTimeout(() => {
            setSuccessMessage("");
        }, 3000);

        return () => clearTimeout(timer);
    }, [successMessage]);

    const handleView = (user) => {
        setSelectedUser(user);
        setModalMode("view");
        setOpenModal(true);
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setModalMode("edit");
        setOpenModal(true);
    };

    const handleSave = (updatedUser) => {
        setUsers((prev) => 
            prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
        )
        setOpenModal(false);
        setSelectedUser(null);
        setSuccessMessage(`User ${updatedUser.username} updated successfully`);
    };

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
        <IdpLayout>
            <div className="flex flex-col items-center gap-6 px-3 sm:px-6">
                <div className="max-w-md md:max-w-lg lg:max-w-6xl w-full mx-auto">
                    <h1 className="text-[#991b1b] text-2xl sm:text-4xl font-bold">Users</h1>
                    <p className="text-sm text-gray-600">Manage and view user accounts in the user pool</p>
                </div>
                <UserPoolCard>
                    <UserPoolFilters 
                        search={search} 
                        setSearch={setSearch} 
                        status={status} 
                        setStatus={setStatus} 
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
                        open={openModal}
                        mode={modalMode}
                        user={selectedUser}
                        onClose={() => setOpenModal(false)}
                        onSubmit={handleSave}
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
        </IdpLayout>
    );
}