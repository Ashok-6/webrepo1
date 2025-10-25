

// import axios from "axios";

// const API_BASE = "http://localhost:8087/api/documents";

// export const getDocuments = () => axios.get(API_BASE);
// export const uploadDocument = (formData) => axios.post(`${API_BASE}/upload`, formData);
// export const deleteDocument = (id) => axios.delete(`${API_BASE}/${id}`);



// import axios from "axios";

// // For Vite:
// const API_BASE = import.meta.env.VITE_API_URL + "/documents";

// // For CRA, use: 
// // const API_BASE = process.env.REACT_APP_API_BASE + "/documents";

// export const getDocuments = () => axios.get(API_BASE);
// export const uploadDocument = (formData) => axios.post(`${API_BASE}/upload`, formData);
// export const deleteDocument = (id) => axios.delete(`${API_BASE}/${id}`);


import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL + "/documents";

// Get all documents
export const getDocuments = () => axios.get(API_BASE);

// Upload a document
export const uploadDocument = (formData) => 
    axios.post(`${API_BASE}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

// Delete a document by ID
export const deleteDocument = (id) => axios.delete(`${API_BASE}/${id}`);
