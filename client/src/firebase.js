import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBdaDv7Jajsi-5m4MzeXjW0N98R-b3N55Q",
  authDomain: "village-election-app.firebaseapp.com",
  projectId: "village-election-app",
  storageBucket: "village-election-app.firebasestorage.app",
  messagingSenderId: "310772940698",
  appId: "1:310772940698:web:17848d07b81390bc430423",
  measurementId: "G-JFXW8LFMNW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
