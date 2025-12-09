import express from "express";
import { getTopIssues, getStats } from "../controllers/adminController.js";

const router = express.Router();

router.get("/top-issues", getTopIssues);
router.get("/stats", getStats);

export default router;
