import React, { useState } from "react";
import "./Login.css";
import { auth, googleProvider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

const Login = ({ onLoginSuccess }) => {
  const [error, setError] = useState("");
  const [showAgeBox, setShowAgeBox] = useState(false);
  const [age, setAge] = useState("");

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Show age box UI
      setShowAgeBox(true);

      // Temporarily store logged-in user until age validates
      localStorage.setItem("tempUserName", user.displayName);
      localStorage.setItem("tempUserEmail", user.email);
      localStorage.setItem("tempUserPhoto", user.photoURL);

    } catch (err) {
      console.error(err);
      setError("Login failed. Try again.");
    }
  };

  const handleAgeSubmit = async () => {
    if (!age || isNaN(age)) {
      setError("Please enter a valid number.");
      return;
    }

    if (Number(age) < 18) {
      setError("You must be 18+ to use this app.");
      return;
    }

    // Retrieve temporary user data
    const name = localStorage.getItem("tempUserName");
    const email = localStorage.getItem("tempUserEmail");
    const photo = localStorage.getItem("tempUserPhoto");

    localStorage.removeItem("tempUserName");
    localStorage.removeItem("tempUserEmail");
    localStorage.removeItem("tempUserPhoto");

    // Get Firebase token
    const token = await auth.currentUser.getIdToken();
    localStorage.setItem("token", token);
    localStorage.setItem("userEmail", email);

    onLoginSuccess({ name, email, photo });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>మన గ్రామ ఎన్నికలు</h2>

      {!showAgeBox && (
        <button style={styles.button} onClick={handleGoogleLogin}>
          Sign in with Google
        </button>
      )}

      {/* Age Input Box */}
      {showAgeBox && (
        <div style={styles.ageBox}>
          <p>Please enter your age to continue:</p>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={styles.input}
            placeholder="Enter age"
          />
          <button style={styles.button} onClick={handleAgeSubmit}>
            Submit Age
          </button>
        </div>
      )}

      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    fontFamily: "Arial",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
  },
  button: {
    padding: "12px 22px",
    border: "none",
    backgroundColor: "#4285F4",
    color: "white",
    fontSize: "18px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  ageBox: {
    textAlign: "center",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#fafafa",
  },
  input: {
    padding: "10px",
    width: "160px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  },
  error: {
    color: "red",
  },
};

export default Login;


          
