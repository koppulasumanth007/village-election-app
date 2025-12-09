import React from "react";

const FeedbackItem = ({ item }) => {
  return (
    <div style={styles.box}>
      <p style={styles.author}>
        <strong>{item.submittedBy}</strong>
      </p>
      <p style={styles.text}>{item.feedback}</p>
      {item.date && <small style={styles.date}>{item.date}</small>}
    </div>
  );
};

const styles = {
  box: {
    backgroundColor: "#fff",
    padding: "14px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    marginBottom: "12px",
  },
  author: {
    marginBottom: "4px",
  },
  text: {
    fontSize: "15px",
    marginBottom: "8px",
  },
  date: {
    color: "#777",
    fontSize: "12px",
  },
};

export default FeedbackItem;


