// import React, { useState } from "react";
// import "./styles/global.css";
// import Login from "./Login";
// import SidebarLayout from "./SidebarLayout";

// const App = () => {
//   const [user, setUser] = useState(null);

//   // Called when login is successful
//   const handleLoginSuccess = (userData) => {
//     setUser(userData);
//   };

//   return (
//     <>
//       {!user ? (
//         <Login onLoginSuccess={handleLoginSuccess} />
//       ) : (
//         <SidebarLayout user={user} />
//       )}
//     </>
//   );
// };

// export default App;

// 222
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Feedback from "./pages/Feedback";
import Announcements from "./pages/Announcements";
import AdminDashboard from "./pages/AdminDashboard";
import SidebarLayout from "./layouts/SidebarLayout";

function App() {
  const [user, setUser] = useState(null);

  // Called when login is successful
  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  // If not logged in → redirect to login
  const ProtectedRoute = ({ element }) => {
    return user ? element : <Navigate to="/" replace />;
  };

  return (
    <Routes>
      {/* Login Page */}
      <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />

      {/* Protected Layout (requires login) */}
      <Route
        element={<SidebarLayout user={user} />}
      >
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard user={user} />} />}
        />
        <Route
          path="/feedback"
          element={<ProtectedRoute element={<Feedback user={user} />} />}
        />
        <Route
          path="/announcements"
          element={<ProtectedRoute element={<Announcements />} />}
        />
        <Route
          path="/admin"
          element={<ProtectedRoute element={<AdminDashboard />} />}
        />
      </Route>
    </Routes>
  );
}

export default App;

// src/App.jsx
// App.jsx
// App.jsx
// src/App.jsx
// import React, { useState } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Feedback from "./pages/Feedback";
// import Announcements from "./pages/Announcements";
// import AdminDashboard from "./pages/AdminDashboard";
// import SidebarLayout from "./layouts/SidebarLayout";

// function App() {
//   const [user, setUser] = useState(() => {
//     // Try to hydrate user from localStorage (safe)
//     const name = localStorage.getItem("userName");
//     const email = localStorage.getItem("userEmail");
//     const photo = localStorage.getItem("userPhoto");
//     return name ? { name, email, photo } : null;
//   });

//   // debug
//   console.log("APP RENDER - user:", user);

//   const handleLoginSuccess = (userData) => {
//     console.log("login success:", userData);
//     setUser(userData);
//   };

//   const Protected = ({ children }) => {
//     if (!user) return <Navigate to="/" replace />;
//     return children;
//   };

//   return (
//     <Routes>
//       <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />

//       {/* layout route: SidebarLayout must include <Outlet /> */}
//       <Route element={<SidebarLayout user={user} />} >
//         <Route
//           path="/dashboard"
//           element={
//             <Protected>
//               <Dashboard user={user} />
//             </Protected>
//           }
//         />
//         <Route
//           path="/feedback"
//           element={
//             <Protected>
//               <Feedback user={user} />
//             </Protected>
//           }
//         />
//         <Route
//           path="/announcements"
//           element={
//             <Protected>
//               <Announcements />
//             </Protected>
//           }
//         />
//         <Route
//           path="/admin"
//           element={
//             <Protected>
//               <AdminDashboard user={user} />
//             </Protected>
//           }
//         />
//       </Route>

//       {/* catch-all */}
//       <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} replace />} />
//     </Routes>
//   );
// }

// export default App;

