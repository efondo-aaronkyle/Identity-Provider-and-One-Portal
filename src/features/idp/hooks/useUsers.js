import { useState, useEffect, useMemo } from "react";
import { userPoolData } from "../data/UserPoolData";
import { initialRoles } from "../data/RolesData";

const ITEMS_PER_PAGE = 10;

export function useUsers() {
  const [users, setUsers] = useState(userPoolData);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");

  // 🔹 Normalize helper
  const normalize = (str = "") =>
    str.toLowerCase().replace(/\s+/g, " ").trim();

  // 🔹 Filtered users
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
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
  }, [users, search, status]);

  const totalResults = filteredUsers.length;
  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)
  );

  const paginatedUsers = useMemo(() => {
    return filteredUsers.slice(
      (page - 1) * ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE
    );
  }, [filteredUsers, page]);

  // 🔹 Reset page on filter change
  useEffect(() => {
    setPage(1);
  }, [search, status]);

  // 🔹 Auto-hide success
  useEffect(() => {
    if (!successMessage) return;
    const timer = setTimeout(() => setSuccessMessage(""), 3000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  // =========================
  // CRUD OPERATIONS
  // =========================

  const createUser = (newUser) => {
    const allIds = users.map((u) => parseInt(u.id));
    const maxId = allIds.length > 0 ? Math.max(...allIds) : 0;
    const newId = (maxId + 1).toString();

    const selectedRoles = initialRoles
      .filter((r) => newUser.roleIds.includes(r.id))
      .map((r) => r.role_name);

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

  const updateUser = (updatedUser) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );

    setSuccessMessage(
      `User ${updatedUser.username} updated successfully`
    );
  };

  const deleteUser = (userId, username) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    setSuccessMessage(`User ${username} deleted successfully`);
  };

  return {
    // state
    search,
    setSearch,
    status,
    setStatus,
    page,
    setPage,
    successMessage,
    setSuccessMessage,

    // derived
    paginatedUsers,
    totalPages,
    totalResults,

    // CRUD
    createUser,
    updateUser,
    deleteUser,
  };
}