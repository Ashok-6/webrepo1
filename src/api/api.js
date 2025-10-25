
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL + "/documents";




export const getDocuments = () => axios.get(API_BASE);

export const uploadDocument = (formData) =>
  axios.post(`${API_BASE}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteDocument = (id) => axios.delete(`${API_BASE}/${id}`);
