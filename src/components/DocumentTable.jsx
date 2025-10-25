
// import React, { useEffect, useState } from "react";
// import { getDocuments, deleteDocument } from "../services/api";

// const DocumentTable = () => {
//   const [documents, setDocuments] = useState([]);

//   const loadDocuments = async () => {
//     const res = await getDocuments();
//     setDocuments(res.data);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this file?")) {
//       await deleteDocument(id);
//       loadDocuments(); // refresh after delete
//     }
//   };

//   useEffect(() => {
//     loadDocuments();
//   }, []);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2 style={{ marginBottom: "16px", color: "#333" }}>Uploaded Documents</h2>
//       <table
//         style={{
//           width: "100%",
//           borderCollapse: "collapse",
         
//           boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//         }}
//       >
//         <thead>
//           <tr style={{ backgroundColor: "#8ab7f1ff", color: "#fff" }}>
//             <th style={{ padding: "12px" }}>Name</th>
//             <th style={{ padding: "12px" }}>Type</th>
//             <th style={{ padding: "12px" }}>Size (KB)</th>
//             <th style={{ padding: "12px" }}>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {documents.map((doc, index) => (
//             <tr
//               key={doc.id}
//               style={{
//                 backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
//               }}
//             >
//               <td style={{ padding: "10px" }}>{doc.name}</td>
//               <td style={{ padding: "10px" }}>{doc.type}</td>
//               <td style={{ padding: "10px" }}>{(doc.size / 1024).toFixed(2)}</td>
//               <td style={{ padding: "10px" }}>
//                 <button
//                   onClick={() => handleDelete(doc.id)}
//                   style={{
//                     padding: "6px 12px",
//                     backgroundColor: "#d60000",
//                     color: "#fff",
//                     border: "none",
//                     borderRadius: "4px",
//                     cursor: "pointer",
//                     transition: "background-color 0.3s",
//                   }}
//                   onMouseOver={(e) => (e.target.style.backgroundColor = "#a50000")}
//                   onMouseOut={(e) => (e.target.style.backgroundColor = "#d60000")}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DocumentTable;



// import React, { useEffect, useState } from "react";
// import { getDocuments, deleteDocument } from "../services/api";

// const DocumentTable = () => {
//   const [documents, setDocuments] = useState([]);

//   const loadDocuments = async () => {
//     try {
//       const res = await getDocuments();
//       setDocuments(res.data);
//     } catch (err) {
//       console.error("Failed to load documents:", err);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this file?")) {
//       try {
//         await deleteDocument(id);
//         loadDocuments();
//       } catch (err) {
//         console.error("Delete failed:", err);
//       }
//     }
//   };

//   useEffect(() => {
//     loadDocuments();
//   }, []);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2 style={{ marginBottom: "16px", color: "#333" }}>Uploaded Documents</h2>
//       <table style={{ width: "100%", borderCollapse: "collapse", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
//         <thead>
//           <tr style={{ backgroundColor: "#8ab7f1", color: "#fff" }}>
//             <th style={{ padding: "12px" }}>Name</th>
//             <th style={{ padding: "12px" }}>Type</th>
//             <th style={{ padding: "12px" }}>Size (KB)</th>
//             <th style={{ padding: "12px" }}>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {documents.length === 0 && (
//             <tr>
//               <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
//                 No documents uploaded yet.
//               </td>
//             </tr>
//           )}
//           {documents.map((doc, index) => (
//             <tr key={doc.id} style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff" }}>
//               <td style={{ padding: "10px" }}>{doc.name}</td>
//               <td style={{ padding: "10px" }}>{doc.type}</td>
//               <td style={{ padding: "10px" }}>{(doc.size / 1024).toFixed(2)}</td>
//               <td style={{ padding: "10px" }}>
//                 <button
//                   onClick={() => handleDelete(doc.id)}
//                   style={{
//                     padding: "6px 12px",
//                     backgroundColor: "#d60000",
//                     color: "#fff",
//                     border: "none",
//                     borderRadius: "4px",
//                     cursor: "pointer",
//                     transition: "background-color 0.3s",
//                   }}
//                   onMouseOver={(e) => (e.target.style.backgroundColor = "#a50000")}
//                   onMouseOut={(e) => (e.target.style.backgroundColor = "#d60000")}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DocumentTable;



import React from "react";

const DocumentTable = ({ documents, onDelete, onView }) => {
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "16px", color: "#333" }}>Uploaded Documents</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#8ab7f1", color: "#fff" }}>
            <th style={{ padding: "12px" }}>Name</th>
            <th style={{ padding: "12px" }}>Type</th>
            <th style={{ padding: "12px" }}>Size (KB)</th>
            <th style={{ padding: "12px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {documents.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                No documents uploaded yet.
              </td>
            </tr>
          ) : (
            documents.map((doc, index) => (
              <tr
                key={doc.id}
                style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff" }}
              >
                <td
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                    color: "#0070c9",
                    textDecoration: "underline",
                  }}
                  onClick={() => onView(doc)}
                  title="Click to view/download"
                >
                  {doc.name}
                </td>
                <td style={{ padding: "10px" }}>{doc.contentType || doc.type}</td>
                <td style={{ padding: "10px" }}>{(doc.size / 1024).toFixed(2)}</td>
                <td style={{ padding: "10px", display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => onDelete(doc.id)}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#d60000",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      transition: "background-color 0.3s",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#a50000")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#d60000")}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentTable;
