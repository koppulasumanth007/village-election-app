// import Candidate from "../models/Candidate.js";

// export const castVote = async (req, res) => {
//   try {
//     const { candidateId, email } = req.body;

//     if (!candidateId || !email) {
//       return res.status(400).json({ message: "Missing data" });
//     }

//     const candidate = await Candidate.findById(candidateId);

//     if (!candidate) {
//       return res.status(404).json({ message: "Candidate not found" });
//     }

//     if (candidate.voters.includes(email)) {
//       return res.status(400).json({ message: "You already voted!" });
//     }

//     // Add vote
//     candidate.votes += 1;
//     candidate.voters.push(email);
//     await candidate.save();

//     res.json({ message: "Vote submitted successfully!", candidate });

//   } catch (err) {
//     console.error("Vote Error:", err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // Return vote counts
// export const getVoteCounts = async (req, res) => {
//   try {
//     const candidates = await Candidate.find().select("name votes logo party");
//     res.json(candidates);
//   } catch (err) {
//     console.error("Count Error:", err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };
import Candidate from "../models/Candidate.js";
import User from "../models/User.js";

export const castVote = async (req, res) => {
  try {
    const { candidateId, email } = req.body;

    if (!candidateId || !email) {
      return res.status(400).json({ message: "Missing candidateId or email" });
    }

    // Check if user has voted before
    const user = await User.findOne({ email });

    if (user && user.hasVoted) {
      return res.status(400).json({ message: "You have already voted!" });
    }

    // Check candidate exists
    const candidate = await Candidate.findById(candidateId);

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // Increase vote count
    candidate.votes += 1;
    await candidate.save();

    // Mark user as voted
    if (user) {
      user.hasVoted = true;
      await user.save();
    } else {
      await User.create({
        email,
        hasVoted: true
      });
    }

    res.json({ message: "Vote submitted successfully!" });

  } catch (err) {
    console.error("Vote Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


// Return all candidates with vote counts
export const getVoteCounts = async (req, res) => {
  try {
    const candidates = await Candidate.find({});
    res.json(candidates);
  } catch (err) {
    console.error("Count Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
