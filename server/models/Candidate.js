// import mongoose from "mongoose";

// const candidateSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   party: { type: String, required: true },
//   logo: { type: String, required: true },
//   votes: { type: Number, default: 0 },
//   voters: { type: [String], default: [] }
// });

// export default mongoose.model("Candidate", candidateSchema);
import mongoose from "mongoose";

const CandidateSchema = new mongoose.Schema({
  _id: String,   // ⬅ FIX: allow string IDs instead of ObjectId
  name: String,
  party: String,
  logo: String,
  votes: { type: Number, default: 0 }
});

export default mongoose.model("Candidate", CandidateSchema);

