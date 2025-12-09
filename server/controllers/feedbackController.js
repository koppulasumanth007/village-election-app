import Feedback from "../models/Feedback.js";

export const submitFeedback = async (req, res) => {
  try {
    const fb = await Feedback.create(req.body);

    req.io.emit("newFeedback", fb);

    res.status(201).json({ message: "Feedback submitted", fb });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllFeedback = async (req, res) => {
  try {
    const list = await Feedback.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
