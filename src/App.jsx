

// import React, { useState, useEffect } from "react";
// import LoginPage from "./components/LoginPage";
// import UploadPage from "./components/UploadPage";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Lazy initialize documents from localStorage
//   const [documents, setDocumentsState] = useState(() => {
//     try {
//       const raw = localStorage.getItem("jnj_documents");
//       return raw ? JSON.parse(raw) : [];
//     } catch (e) {
//       console.error("Failed to parse documents from localStorage", e);
//       return [];
//     }
//   });

//   // Whenever documents change, persist to localStorage
//   useEffect(() => {
//     try {
//       localStorage.setItem("jnj_documents", JSON.stringify(documents));
//     } catch (e) {
//       console.error("Failed to save documents to localStorage", e);
//     }
//   }, [documents]);

//   // wrapper setter that keeps the same API
//   const setDocuments = (updater) => {
//     // allow functional or direct set
//     setDocumentsState((prev) => {
//       const next = typeof updater === "function" ? updater(prev) : updater;
//       return next;
//     });
//   };

//   return (
//     <div>
//       {isLoggedIn ? (
//         <UploadPage
//           documents={documents}
//           setDocuments={setDocuments}
//           onBack={() => setIsLoggedIn(false)}
//         />
//       ) : (
//         <LoginPage onLogin={() => setIsLoggedIn(true)} />
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import LoginPage from "./components/LoginPage";
import UploadPage from "./components/UploadPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? (
        <UploadPage onBack={() => setIsLoggedIn(false)} />
      ) : (
        <LoginPage onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;
