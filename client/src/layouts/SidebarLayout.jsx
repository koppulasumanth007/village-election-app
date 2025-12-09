import React from "react";
import Dashboard from "../pages/Dashboard";
import Feedback from "../pages/Feedback";
import Announcements from "../pages/Announcements";
import AdminDashboard from "../pages/AdminDashboard";
import "./SidebarLayout.css";


const SidebarLayout = ({ children, setActivePage, user }) => {
  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2>మన గ్రామ ఎన్నికలు</h2>
        <p style={styles.user}>Logged in as: {user.name}</p>

        <button style={styles.btn} onClick={() => setActivePage("dashboard")}>
          Dashboard
        </button>

        <button style={styles.btn} onClick={() => setActivePage("feedback")}>
          Feedback
        </button>

        <button style={styles.btn} onClick={() => setActivePage("announcements")}>
          Announcements
        </button>

        <button style={styles.btn} onClick={() => setActivePage("admin")}>
          Admin Dashboard
        </button>
      </div>

      {/* Main Content */}
      <div style={styles.content}>{children}</div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  sidebar: {
    width: "220px",
    backgroundColor: "#2c3e50",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  user: {
    fontSize: "14px",
    opacity: 0.8,
  },
  btn: {
    backgroundColor: "#34495e",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    textAlign: "left",
    fontSize: "16px",
  },
  content: {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
  },
};

export default SidebarLayout;

