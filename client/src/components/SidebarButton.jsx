import React from "react";

const SidebarButton = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        ...styles.btn,
        backgroundColor: active ? "#34495e" : "transparent",
      }}
    >
      {label}
    </button>
  );
};

const styles = {
  btn: {
    width: "100%",
    padding: "12px",
    border: "none",
    color: "white",
    textAlign: "left",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "6px",
    marginBottom: "8px",
  },
};

export default SidebarButton;
src/components/SidebarButton.jsx

