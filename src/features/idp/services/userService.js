import axiosInstance from "../../../services/axiosInstance";

export const userService = {
  async getUsers(page = 1) {
    const res = await axiosInstance.get(`/admin/users?page=${page}`);
    return res.data;
  },

  async createUser(payload) {
    const res = await axiosInstance.post("/admin/users", payload);
    return res.data;
  },

  async deleteUser(id) {
    const res = await axiosInstance.delete(`/admin/users/${id}`);
    return res.data;
  },
};