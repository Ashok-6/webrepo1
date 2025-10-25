
// import React, { useEffect, useState } from "react";
// import Header from "./Header";
// import DocumentTable from "./DocumentTable";
// import logo from "../assets/jnj-logo.png";

// //const API_BASE = "http://localhost:8087/api/documents";


// const API_BASE = import.meta.env.VITE_API_URL + "/documents";


// const UploadPage = ({ onBack }) => {
//     const [documents, setDocuments] = useState([]);
//     const [selectedFiles, setSelectedFiles] = useState([]);
//     const [message, setMessage] = useState("");
//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);

//     const fetchDocs = async () => {
//         setError("");
//         try {
//             const res = await fetch(`${API_BASE}`);
//             if (!res.ok) throw new Error("Failed to fetch documents");
//             const data = await res.json();
//             const normalized = (data || []).map((d) => ({
//                 id: d.id || d._id,
//                 name: d.name || d.filename,
//                 contentType: d.type || d.contentType,
//                 size: d.size,
//                 uploadDate: d.uploadDate || d.date,
//             }));
//             setDocuments(normalized);
//         } catch (err) {
//             console.error(err);
//             setError("Unable to load documents from server.");
//         }
//     };

//     useEffect(() => {
//         fetchDocs();
//     }, []);

//     const handleFileSelect = (e) => {
//         setSelectedFiles(Array.from(e.target.files || []));
//         setMessage("");
//         setError("");
//     };

//     const deleteServerDoc = async (id) => {
//         const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
//         if (!res.ok) throw new Error("Delete failed");
//         return true;
//     };

//     const uploadSingleFile = async (file) => {
//         const fd = new FormData();
//         fd.append("file", file);
//         const res = await fetch(`${API_BASE}/upload`, {
//             method: "POST",
//             body: fd,
//         });
//         if (!res.ok) {
//             const text = await res.text();
//             throw new Error(text || `Upload failed for ${file.name}`);
//         }
//         return await res.text();
//     };

//     const handleUpload = async () => {
//         if (selectedFiles.length === 0) {
//             setMessage("No files selected.");
//             setTimeout(() => setMessage(""), 2000);
//             return;
//         }

//         const nameToId = new Map(documents.map((d) => [d.name, d.id]));
//         const duplicates = selectedFiles.filter((f) => nameToId.has(f.name));
//         let replaceAll = false;

//         if (duplicates.length > 0) {
//             const names = duplicates.map((d) => d.name).join(", ");
//             replaceAll = window.confirm(
//                 `Some files already exist: ${names}.\nDo you want to replace them?`
//             );
//         }

//         setLoading(true);
//         try {
//             if (replaceAll) {
//                 for (const dup of duplicates) {
//                     const idToDelete = nameToId.get(dup.name);
//                     try {
//                         await deleteServerDoc(idToDelete);
//                     } catch (err) {
//                         console.warn("Failed to delete before replace:", dup.name, err);
//                     }
//                 }
//             }

//             const filesToUpload = replaceAll
//                 ? selectedFiles
//                 : selectedFiles.filter((f) => !nameToId.has(f.name));

//             const uploadedNames = [];
//             const failedNames = [];
//             for (const file of filesToUpload) {
//                 try {
//                     await uploadSingleFile(file);
//                     uploadedNames.push(file.name);
//                 } catch {
//                     failedNames.push(file.name);
//                 }
//             }

//             await fetchDocs();
//             const parts = [];
//             if (uploadedNames.length) parts.push(`${uploadedNames.length} uploaded`);
//             if (failedNames.length) parts.push(`${failedNames.length} failed`);
//             setMessage(`Upload complete (${parts.join(", ")}) at ${new Date().toLocaleTimeString()}`);
//             setSelectedFiles([]);
//         } catch (err) {
//             console.error(err);
//             setError("Upload failed. See console for details.");
//         } finally {
//             setLoading(false);
//             setTimeout(() => setMessage(""), 2000);
//         }
//     };

//     const handleDelete = async (id) => {
//         if (!window.confirm("Are you sure you want to delete this document?")) return;
//         try {
//             setLoading(true);
//             await deleteServerDoc(id);
//             setDocuments((prev) => prev.filter((d) => d.id !== id));
//             setMessage("Deleted");
//             setTimeout(() => setMessage(""), 2000);
//         } catch {
//             setError("Delete failed");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleView = (doc) => {
//         window.open(`${API_BASE}/download/${doc.id}`, "_blank");
//     };

//     return (
//         <div style={{ minHeight: "100vh", background: "#f9f9f9" }}>
//             {/* <Header /> */}

//             <div style={{ display: "flex", justifyContent: "center", padding: 28 }}>
//                 <div
//                     style={{
//                         width: 820,
//                         background: "#fff",
//                         padding: 24,
//                         borderRadius: 8,
//                         boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
//                     }}
//                 >
                    
//                     {/* Header with right-aligned logo */}
//                     <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
//                         <img src={logo} alt="JnJ Logo" style={{ height: "25px" }} />
//                     </div>
//                     <br />
//                     <h2 style={{ margin: 0 }}>Upload Documents</h2>
//                     <br />
//                     {/* File Input */}
//                     <input
//                         type="file"
//                         multiple
//                         onChange={handleFileSelect}
//                         accept=".jpeg,.jpg,.png,.pdf,.docx"
//                         style={{ width: "100%", marginBottom: 16 }}
//                     />

//                     <div style={{ color: "#666", marginBottom: 12 }}>Allowed: JPEG, PNG, PDF, DOCX</div>

//                     {/* Buttons Centered */}
//                     <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 16 }}>
//                         <button
//                             onClick={handleUpload}
//                             disabled={loading}
//                             style={{
//                                 padding: "10px 20px",
//                                 backgroundColor: "#0070c9",
//                                 color: "#fff",
//                                 border: "none",
//                                 borderRadius: 6,
//                                 fontWeight: 600,
//                                 cursor: loading ? "not-allowed" : "pointer",
//                             }}
//                         >
//                             {loading ? "Please wait..." : "Upload"}
//                         </button>
//                         <button
//                             onClick={onBack}
//                             style={{
//                                 padding: "10px 20px",
//                                 backgroundColor: "#d60000",
//                                 color: "#fff",
//                                 border: "none",
//                                 borderRadius: 6,
//                                 fontWeight: 600,
//                                 cursor: "pointer",
//                             }}
//                         >
//                             Logout
//                         </button>
//                     </div>

                    

//                     {message && <div style={{ color: "green", marginBottom: 12, fontWeight: 600 }}>{message}</div>}
//                     {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}

//                     <DocumentTable documents={documents} onView={handleView} onDelete={handleDelete} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UploadPage;













import React, { useEffect, useState } from "react";
import DocumentTable from "./DocumentTable";
import logo from "../assets/jnj-logo.png";
import { getDocuments, uploadDocument, deleteDocument } from "../services/api";

const UploadPage = ({ onBack }) => {
  const [documents, setDocuments] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch documents from backend
  const fetchDocs = async () => {
    setError("");
    try {
      const res = await getDocuments();
      const normalized = (res.data || []).map((d) => ({
        id: d.id || d._id,
        name: d.name || d.filename,
        contentType: d.type || d.contentType,
        size: d.size,
        uploadDate: d.uploadDate || d.date,
      }));
      setDocuments(normalized);
    } catch (err) {
      console.error(err);
      setError("Unable to load documents from server.");
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  // File selection
  const handleFileSelect = (e) => {
    setSelectedFiles(Array.from(e.target.files || []));
    setMessage("");
    setError("");
  };

  // Upload selected files
  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setMessage("No files selected.");
      setTimeout(() => setMessage(""), 2000);
      return;
    }

    const nameToId = new Map(documents.map((d) => [d.name, d.id]));
    const duplicates = selectedFiles.filter((f) => nameToId.has(f.name));
    let replaceAll = false;

    if (duplicates.length > 0) {
      const names = duplicates.map((d) => d.name).join(", ");
      replaceAll = window.confirm(
        `Some files already exist: ${names}.\nDo you want to replace them?`
      );
    }

    setLoading(true);
    try {
      // Delete duplicates if replaceAll
      if (replaceAll) {
        for (const dup of duplicates) {
          const idToDelete = nameToId.get(dup.name);
          try {
            await deleteDocument(idToDelete);
          } catch (err) {
            console.warn("Failed to delete before replace:", dup.name, err);
          }
        }
      }

      // Upload files
      const filesToUpload = replaceAll
        ? selectedFiles
        : selectedFiles.filter((f) => !nameToId.has(f.name));

      const uploadedNames = [];
      const failedNames = [];

      for (const file of filesToUpload) {
        const formData = new FormData();
        formData.append("file", file);
        try {
          await uploadDocument(formData);
          uploadedNames.push(file.name);
        } catch (err) {
          console.error(err);
          failedNames.push(file.name);
        }
      }

      await fetchDocs();
      const parts = [];
      if (uploadedNames.length) parts.push(`${uploadedNames.length} uploaded`);
      if (failedNames.length) parts.push(`${failedNames.length} failed`);
      setMessage(
        `Upload complete (${parts.join(", ")}) at ${new Date().toLocaleTimeString()}`
      );
      setSelectedFiles([]);
    } catch (err) {
      console.error(err);
      setError("Upload failed. See console for details.");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 2000);
    }
  };

  // Delete single document
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this document?")) return;
    try {
      setLoading(true);
      await deleteDocument(id);
      setDocuments((prev) => prev.filter((d) => d.id !== id));
      setMessage("Deleted");
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      console.error(err);
      setError("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  // View document
  const handleView = (doc) => {
    window.open(`${import.meta.env.VITE_API_URL}/documents/download/${doc.id}`, "_blank");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f9f9f9" }}>
      <div style={{ display: "flex", justifyContent: "center", padding: 28 }}>
        <div
          style={{
            width: 820,
            background: "#fff",
            padding: 24,
            borderRadius: 8,
            boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
          }}
        >
          {/* Header with logo */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
            <img src={logo} alt="JnJ Logo" style={{ height: "25px" }} />
          </div>

          <h2 style={{ margin: 0 }}>Upload Documents</h2>
          <br />

          {/* File Input */}
          <input
            type="file"
            multiple
            onChange={handleFileSelect}
            accept=".jpeg,.jpg,.png,.pdf,.docx"
            style={{ width: "100%", marginBottom: 16 }}
          />
          <div style={{ color: "#666", marginBottom: 12 }}>Allowed: JPEG, PNG, PDF, DOCX</div>

          {/* Buttons */}
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 16 }}>
            <button
              onClick={handleUpload}
              disabled={loading}
              style={{
                padding: "10px 20px",
                backgroundColor: "#0070c9",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Please wait..." : "Upload"}
            </button>
            <button
              onClick={onBack}
              style={{
                padding: "10px 20px",
                backgroundColor: "#d60000",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>

          {/* Messages */}
          {message && <div style={{ color: "green", marginBottom: 12, fontWeight: 600 }}>{message}</div>}
          {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}

          {/* Document Table */}
          <DocumentTable documents={documents} onView={handleView} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
