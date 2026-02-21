import { useState, useMemo, useEffect } from "react";
import { initialRoles } from "../data/RolesData";

const ITEMS_PER_PAGE = 10;

export function useRoles() {
  const [roles, setRoles] = useState(initialRoles);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");

  // =========================
  // FILTERING
  // =========================
  const filteredRoles = useMemo(() => {
    return roles.filter((r) =>
      r.role_name.toLowerCase().includes(search.toLowerCase())
    );
  }, [roles, search]);

  const totalResults = filteredRoles.length;

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRoles.length / ITEMS_PER_PAGE)
  );

  const paginatedRoles = useMemo(() => {
    return filteredRoles.slice(
      (page - 1) * ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE
    );
  }, [filteredRoles, page]);

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [search]);

  // Auto-hide success alert
  useEffect(() => {
    if (!successMessage) return;
    const timer = setTimeout(() => setSuccessMessage(""), 3000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  // =========================
  // CRUD
  // =========================

  const createRole = (data) => {
    const nextId =
      roles.length > 0 ? Math.max(...roles.map((r) => r.id)) + 1 : 1;

    const newRole = {
      ...data,
      id: nextId,
      created_at: new Date().toISOString().slice(0, 10),
    };

    setRoles((prev) => [newRole, ...prev]);
    setSuccessMessage("Role successfully created!");
  };

  const updateRole = (data) => {
    setRoles((prev) =>
      prev.map((r) => (r.id === data.id ? { ...r, ...data } : r))
    );

    setSuccessMessage("Role successfully updated!");
  };

  const deleteRole = (id) => {
    setRoles((prev) => prev.filter((r) => r.id !== id));
    setSuccessMessage("Role successfully deleted!");
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
    paginatedRoles,
    totalPages,
    totalResults,

    // CRUD
    createRole,
    updateRole,
    deleteRole,
  };
}