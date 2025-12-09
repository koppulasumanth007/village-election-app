import dotenv from "dotenv";
dotenv.config();

// AUTHENTICATE ADMIN ONLY
const auth = (req, res, next) => {
  try {
    const adminKey = req.headers["x-admin-key"];

    if (!adminKey) {
      return res.status(401).json({ message: "Admin Key Missing" });
    }

    if (adminKey !== process.env.ADMIN_SECRET) {
      return res.status(403).json({ message: "Unauthorized Access" });
    }

    next();
  } catch (error) {
    console.error("Admin Auth Error", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default auth;
