import { useState, useMemo, useEffect } from "react";
import ConnectedAppClientCard from "../components/app-client/ConnectedAppClientCard";
import AppClientModal from "../components/app-client/AppClientModal";
import SuccessAlert from "../../../components/SuccessAlert";
import DeleteConfirmModal from "../../../components/DeleteConfirmAlert";
import PageHeader from "../components/PageHeader";

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
        image: "/assets/images/connected-systems-button.png",
        },
    ]);

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState("create");
    const [activeClient, setActiveClient] = useState(null);

    const [successMessage, setSuccessMessage] = useState("");

    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);

    useEffect(() => {
        if (!successMessage) return;

        const timer = setTimeout(() => {
            setSuccessMessage("");
        }, 3000);

        return () => clearTimeout(timer);
    }, [successMessage]);

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
    };


    return (
        <>
            <div className="flex flex-col items-center gap-6 px-3 sm:px-6">
                <PageHeader
                    title="App Client"
                    description="Manage application clients and settings"
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-28 h-28 text-[#991b1b]">
                            <path d="M16.555 5.412a8.028 8.028 0 0 0-3.503-2.81 14.899 14.899 0 0 1 1.663 4.472 8.547 8.547 0 0 0 1.84-1.662ZM13.326 7.825a13.43 13.43 0 0 0-2.413-5.773 8.087 8.087 0 0 0-1.826 0 13.43 13.43 0 0 0-2.413 5.773A8.473 8.473 0 0 0 10 8.5c1.18 0 2.304-.24 3.326-.675ZM6.514 9.376A9.98 9.98 0 0 0 10 10c1.226 0 2.4-.22 3.486-.624a13.54 13.54 0 0 1-.351 3.759A13.54 13.54 0 0 1 10 13.5c-1.079 0-2.128-.127-3.134-.366a13.538 13.538 0 0 1-.352-3.758ZM5.285 7.074a14.9 14.9 0 0 1 1.663-4.471 8.028 8.028 0 0 0-3.503 2.81c.529.638 1.149 1.199 1.84 1.66ZM17.334 6.798a7.973 7.973 0 0 1 .614 4.115 13.47 13.47 0 0 1-3.178 1.72 15.093 15.093 0 0 0 .174-3.939 10.043 10.043 0 0 0 2.39-1.896ZM2.666 6.798a10.042 10.042 0 0 0 2.39 1.896 15.196 15.196 0 0 0 .174 3.94 13.472 13.472 0 0 1-3.178-1.72 7.973 7.973 0 0 1 .615-4.115ZM10 15c.898 0 1.778-.079 2.633-.23a13.473 13.473 0 0 1-1.72 3.178 8.099 8.099 0 0 1-1.826 0 13.47 13.47 0 0 1-1.72-3.178c.855.151 1.735.23 2.633.23ZM14.357 14.357a14.912 14.912 0 0 1-1.305 3.04 8.027 8.027 0 0 0 4.345-4.345c-.953.542-1.971.981-3.04 1.305ZM6.948 17.397a8.027 8.027 0 0 1-4.345-4.345c.953.542 1.971.981 3.04 1.305a14.912 14.912 0 0 0 1.305 3.04Z" />
                        </svg>
                    }
                />
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
                    onCreate={openCreate}
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

            <DeleteConfirmModal open={showDeleteAlert} message="Delete this app client?" onCancel={() => {
                    setShowDeleteAlert(false);
                    setDeleteTarget(null);
                }}
                onConfirm={confirmDelete}
            />

            <SuccessAlert message={successMessage} onClose={() => setSuccessMessage("")} />
        </>
    );
}