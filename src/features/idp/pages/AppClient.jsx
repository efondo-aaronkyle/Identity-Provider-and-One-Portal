import { useState, useMemo } from "react";
import IdpLayout from "../layouts/IdpLayout";
import CreateAppClientCard from "../components/app-client/CreateAppClientCard";
import ConnectedAppClientCard from "../components/app-client/ConnectedAppClientCard";
import AppClientModal from "../components/app-client/AppClientModal";
import SuccessAlert from "../../../components/SuccessAlert";
import DeleteConfirmModal from "../../../components/DeleteConfirmAlert";

const ITEMS_PER_PAGE = 10;

export default function AppClient() {
    const [clients, setClients] = useState([
        {
        name: "Admission System",
        clientId: "as-ewfc2mewf",
        created: "2024-06-22",
        lastUsed: "2024-10-28",
        callbacks: "puptas.com",
        logouts: "",
        scopes: ["openid", "profile"],
        },
    ]);

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState("create");
    const [activeClient, setActiveClient] = useState(null);

    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const filtered = useMemo(() => {
        return clients.filter(
        (c) =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.clientId.toLowerCase().includes(search.toLowerCase())
        );
    }, [clients, search]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
    const paginated = filtered.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    const openCreate = () => {
        setMode("create");
        setActiveClient(null);
        setModalOpen(true);
    };

    const openView = (client) => {
        setMode("view");
        setActiveClient(client);
        setModalOpen(true);
    };

    const openEdit = (client) => {
        setMode("edit");
        setActiveClient(client);
        setModalOpen(true);
    };

    const deleteClient = (id) => {
        setDeleteTarget(id);
        setShowDeleteAlert(true);
    };

    const confirmDelete = () => {
        setClients((prev) => prev.filter((c) => c.clientId !== deleteTarget));
        setShowDeleteAlert(false);
        setDeleteTarget(null);

        setSuccessMessage("App client successfully deleted!");
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const generateClientId = (name) => {
    // take first letters of each word in the name
    const prefix = name
        .split(" ")
        .map((w) => w[0].toLowerCase())
        .join("");
    // random 8-character alphanumeric string
    const random = Math.random().toString(36).substring(2, 10);
    return `${prefix}-${random}`;
    };

    const saveClient = (data) => {
    if (mode === "create") {
        setClients((prev) => [
        {
            ...data,
            clientId: generateClientId(data.name),
            created: new Date().toISOString().slice(0, 10),
            lastUsed: "-",
        },
        ...prev,
        ]);
        setSuccessMessage("App client successfully created!");
    } else if (mode === "edit") {
        setClients((prev) =>
            prev.map((c) => (c.clientId === data.clientId ? data : c))
        );
        setSuccessMessage("App client successfully updated!");
    }
    setModalOpen(false);
    setShowSuccess(true);

    setTimeout(() => setShowSuccess(false), 3000);
    };


    return (
        <IdpLayout>
            <div className="flex flex-col items-center gap-6 px-3 sm:px-6">
                <div className="max-w-md md:max-w-lg lg:max-w-4xl w-full mx-auto">
                    <h1 className="text-[#991b1b] text-2xl sm:text-4xl font-bold">App Client</h1>
                    <p className="text-sm text-gray-600">Manage application clients and settings</p>
                </div>
                <CreateAppClientCard onCreate={openCreate} />
                <ConnectedAppClientCard
                    clients={paginated}
                    totalResults={filtered.length}
                    itemsPerPage={ITEMS_PER_PAGE}
                    search={search}
                    setSearch={setSearch}
                    page={page}
                    totalPages={totalPages}
                    onPageChange={(p) => setPage(p)}
                    onView={openView}
                    onEdit={openEdit}
                    onDelete={deleteClient}
                />
                <AppClientModal 
                    key={modalOpen + mode + (activeClient?.clientId || "new")}
                    open={modalOpen}
                    mode={mode}
                    client={activeClient}
                    onClose={() => setModalOpen(false)}
                    onSubmit={saveClient}
                />
            </div>

            {showDeleteAlert && (
                <DeleteConfirmModal open={showDeleteAlert} message="Delete this app client?" onCancel={() => {
                        setShowDeleteAlert(false);
                        setDeleteTarget(null);
                    }}
                    onConfirm={confirmDelete}
                />
            )}
            {showSuccess && (
                <SuccessAlert message={successMessage} onClose={() => setShowSuccess(false)} />
            )}
        </IdpLayout>
    );
}