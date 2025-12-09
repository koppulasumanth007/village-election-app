import express from "express";
import { submitFeedback, getAllFeedback } from "../controllers/feedbackController.js";

const router = express.Router();

router.post("/submit", submitFeedback);   // No verifyUser
router.get("/all", getAllFeedback);       // Admin access later

export default router;
