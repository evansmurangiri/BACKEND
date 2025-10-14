// frontend/src/utils/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true, // send cookies (for auth)
});

// --- ADMIN APIs ---
export const fetchAllUsers = () => API.get("/admin/users");
export const deleteUser = (id) => API.delete(`/admin/users/${id}`);

export default API;
