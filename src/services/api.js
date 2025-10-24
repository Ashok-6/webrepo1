

import axios from "axios";

const API_BASE = "http://localhost:8087/api/documents";

export const getDocuments = () => axios.get(API_BASE);
export const uploadDocument = (formData) => axios.post(`${API_BASE}/upload`, formData);
export const deleteDocument = (id) => axios.delete(`${API_BASE}/${id}`);

