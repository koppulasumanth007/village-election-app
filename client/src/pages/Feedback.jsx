// import React, { useState } from "react";
// import API from "../utils/api";
// import "./Feedback.css";

// const Feedback = ({ user }) => {
//   const [message, setMessage] = useState("");
//   const [isAnonymous, setAnonymous] = useState(false);
//   const [submitted, setSubmitted] = useState(false);

//   const submitFeedback = async () => {
//     if (!message.trim()) {
//       alert("Please enter your feedback.");
//       return;
//     }

//     const data = {
//       feedback: message,
//       submittedBy: isAnonymous ? "Anonymous" : user.name,
//       email: isAnonymous ? null : user.email,
//     };

//     try {
//       const res = await API.post("/feedback/submit", data);

//       if (res.status === 201) {
//         setSubmitted(true);
//         setMessage("");

//         setTimeout(() => setSubmitted(false), 2000);
//       }
//     } catch (error) {
//       console.error("Feedback error", error);
//       alert("Failed to submit feedback.");
//     }
//   };

//   return (
//     <div className="feedback-container">
//       <h2>Submit Your Feedback</h2>

//       <textarea
//         className="feedback-textarea"
//         placeholder="Enter your ideas for village development..."
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />

//       <div className="feedback-row">
//         <label>
//           <input
//             type="checkbox"
//             checked={isAnonymous}
//             onChange={() => setAnonymous(!isAnonymous)}
//           />
//           &nbsp;Submit Anonymously
//         </label>

//         <button
//           style={{
//             padding: "10px 20px",
//             backgroundColor: "#3498db",
//             border: "none",
//             color: "white",
//             borderRadius: "6px",
//             cursor: "pointer",
//             fontSize: "16px",
//             width: "100%",
//             maxWidth: "200px",
//           }}
//           onClick={submitFeedback}
//         >
//           Submit Feedback
//         </button>
//       </div>

//       {submitted && <p style={{ color: "green", marginTop: "10px" }}>Feedback submitted successfully!</p>}
//     </div>
//   );
// };

// export default Feedback;


import React, { useState } from "react";
import API from "../utils/api";
import "./Feedback.css";

const Feedback = ({ user }) => {
  const [message, setMessage] = useState("");
  const [isAnonymous, setAnonymous] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submitFeedback = async () => {
    if (!message.trim()) {
      alert("Please enter your feedback.");
      return;
    }

    const data = {
      feedback: message,
      submittedBy: isAnonymous ? "Anonymous" : user.name,
      email: isAnonymous ? null : user.email,
    };

    try {
      const res = await API.post("/feedback/submit", data);

      if (res.status === 201) {
        setSubmitted(true);
        setMessage("");
        setTimeout(() => setSubmitted(false), 2000);
      }
    } catch (error) {
      console.error("Feedback error", error);
      alert("Failed to submit feedback.");
    }
  };

  return (
    <div className="feedback-container">
      <h2 className="feedback-title">Submit Your Feedback</h2>

      <textarea
        className="feedback-textarea"
        placeholder="Enter your ideas for village development…"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <div className="feedback-options">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={() => setAnonymous(!isAnonymous)}
          />
          Submit Anonymously
        </label>

        <button className="submit-btn" onClick={submitFeedback}>
          Submit Feedback
        </button>
      </div>

      {submitted && (
        <p className="success-message">✔ Feedback submitted successfully!</p>
      )}
    </div>
  );
};

export default Feedback;
