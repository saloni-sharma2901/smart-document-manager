import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/docs"
});

// Get all
export const getDocs = () => API.get("/");

// Upload
export const uploadDoc = (data) => API.post("/", data);

// Delete
export const deleteDoc = (id) => API.delete(`/${id}`);

// Toggle status
export const toggleStatus = (id) => API.put(`/${id}`);

// Search
export const searchDoc = (key) => API.get(`/search/${key}`);