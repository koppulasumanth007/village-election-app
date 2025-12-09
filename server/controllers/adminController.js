import Feedback from "../models/Feedback.js";
import Candidate from "../models/Candidate.js";

// GET TOP ISSUES
export const getTopIssues = async (req, res) => {
  try {
    const feedbackList = await Feedback.find();

    // Count common issues
    const issueMap = {};

    feedbackList.forEach(fb => {
      const text = fb.feedback.toLowerCase();
      if (!issueMap[text]) issueMap[text] = 0;
      issueMap[text]++;
    });

    const sorted = Object.entries(issueMap)
      .map(([issue, count]) => ({ issue, count }))
      .sort((a, b) => b.count - a.count);

    res.json(sorted.slice(0, 10)); // top 10
  } catch (error) {
    console.error("Admin Issue Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET STATS
export const getStats = async (req, res) => {
  try {
    const feedbackCount = await Feedback.countDocuments();
    const candidateCount = await Candidate.countDocuments();
    const voteData = await Candidate.find().select("name votes");

    res.json({
      feedbackCount,
      candidateCount,
      voteDetails: voteData,
    });
  } catch (error) {
    console.error("Admin Stats Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
