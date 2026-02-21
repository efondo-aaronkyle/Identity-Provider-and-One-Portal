import { useState, useMemo, useEffect } from "react";

const ITEMS_PER_PAGE = 10;

export function useAppClients() {
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
  const [successMessage, setSuccessMessage] = useState("");

  // =========================
  // FILTERING
  // =========================
  const filteredClients = useMemo(() => {
    return clients.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.clientId.toLowerCase().includes(search.toLowerCase())
    );
  }, [clients, search]);

  const totalResults = filteredClients.length;

  const totalPages = Math.max(
    1,
    Math.ceil(filteredClients.length / ITEMS_PER_PAGE)
  );

  const paginatedClients = useMemo(() => {
    return filteredClients.slice(
      (page - 1) * ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE
    );
  }, [filteredClients, page]);

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [search]);

  // Auto-hide success
  useEffect(() => {
    if (!successMessage) return;
    const timer = setTimeout(() => setSuccessMessage(""), 3000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  // =========================
  // CRUD
  // =========================

  const generateClientId = (name) => {
    const prefix = name
      .split(" ")
      .map((w) => w[0]?.toLowerCase())
      .join("");
    const random = Math.random().toString(36).substring(2, 10);
    return `${prefix}-${random}`;
  };

  const createClient = (data) => {
    const newClient = {
      ...data,
      clientId: generateClientId(data.name),
      created: new Date().toISOString().slice(0, 10),
      lastUsed: "-",
    };

    setClients((prev) => [newClient, ...prev]);
    setSuccessMessage("App client successfully created!");
  };

  const updateClient = (data) => {
    setClients((prev) =>
      prev.map((c) =>
        c.clientId === data.clientId ? { ...c, ...data } : c
      )
    );

    setSuccessMessage("App client successfully updated!");
  };

  const deleteClient = (clientId) => {
    setClients((prev) =>
      prev.filter((c) => c.clientId !== clientId)
    );

    setSuccessMessage("App client successfully deleted!");
  };

  return {
    // state
    search,
    setSearch,
    page,
    setPage,
    successMessage,
    setSuccessMessage,

    // derived
    paginatedClients,
    totalPages,
    totalResults,

    // CRUD
    createClient,
    updateClient,
    deleteClient,
  };
}