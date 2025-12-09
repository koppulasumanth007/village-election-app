import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    feedback: String,
    submittedBy: String,
    email: String
  },
  { timestamps: true }
);

export default mongoose.model("Feedback", feedbackSchema);
