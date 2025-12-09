// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   photo: String
// });

// export default mongoose.model("User", userSchema);
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  hasVoted: { type: Boolean, default: false }
});

export default mongoose.model("User", UserSchema);

