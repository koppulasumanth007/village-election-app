import React, { useState } from "react";
import Login from "./Login";
import SidebarLayout from "./layouts/SidebarLayout";
import Dashboard from "./pages/Dashboard";
import Feedback from "./pages/Feedback";
import Announcements from "./pages/Announcements";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [user, setUser] = useState(null);
  const [activePage, setActivePage] = useState("dashboard");

  if (!user) {
    return <Login onLoginSuccess={setUser} />;
  }

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard user={user} />;
      case "feedback":
        return <Feedback user={user} />;
      case "announcements":
        return <Announcements />;
      case "admin":
        return <AdminDashboard />;
      default:
        return <Dashboard user={user} />;
    }
  };

  return (
    <SidebarLayout user={user} setActivePage={setActivePage}>
      {renderPage()}
    </SidebarLayout>
  );
}

export default App;
