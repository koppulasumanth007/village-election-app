import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();

import serviceAccount from "../firebase/serviceAccountKey.json" assert { type: "json" };

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Remove 'Bearer ' prefix if present
    const cleanToken = token.replace("Bearer ", "");

    const decoded = await admin.auth().verifyIdToken(cleanToken);

    req.user = decoded; // attach decoded user data to request

    next();
  } catch (error) {
    console.error("Firebase Auth Error:", error);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default verifyUser;
