import express from "express";
import { castVote, getVoteCounts } from "../controllers/voteController.js";
import Candidate from "../models/Candidate.js";

const router = express.Router();   // MUST COME FIRST

// -------------------------------
// 1️⃣ Setup Candidates (run once)
// -------------------------------
router.get("/setup", async (req, res) => {
  try {
    await Candidate.deleteMany();

    await Candidate.insertMany([
      {
        _id: "1",
        name: " కట్ల సాగర్ ",
        party: "ఉంగరం",
        logo: "candidate1.jpeg",
        votes: 0
      },
      {
        _id: "2",
        name: " కొప్పుల లచ్చన్న ",
        party: "కత్తెర",
        logo: "candidate2.jpeg",
        votes: 0
      },
      {
        _id: "3",
        name: " తాళ్లపల్లి రమేష్ ",
        party: "బ్యాట్",
        logo: "candidate3.jpeg",
        votes: 0
      }
    ]);

    res.send("Candidates inserted successfully!");
  } catch (err) {
    console.error("Setup Error:", err);
    res.status(500).send("Setup failed");
  }
});

// -------------------------------
// 2️⃣ CAST VOTE (POST)
// -------------------------------
router.post("/cast", castVote);

// -------------------------------
// 3️⃣ GET VOTE COUNTS (GET)
// -------------------------------
router.get("/counts", getVoteCounts);

export default router;
