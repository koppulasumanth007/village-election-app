import mongoose from "mongoose";
import dotenv from "dotenv";
import Candidate from "./models/Candidate.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log("Connected");

  await Candidate.deleteMany({}); // Reset

  await Candidate.insertMany([
    // {
    //   name: "కట్ల సాగర్",
    //   party: "ఉంగరం",
    //   logo: "https://res.cloudinary.com/dyrhcm26t/image/upload/v1765195714/candidate1_f2ypbx.png"
    // },
    // {
    //   name: "కోప్పుల లక్ష్మన్న",
    //   party: "కత్తెర",
    //   logo: "https://res.cloudinary.com/dyrhcm26t/image/upload/v1765194988/candidate2_cg6ieb.png"
    // },
    // {
    //   name: "తాళ్లపల్లి రమేష్",
    //   party: "బ్యాట్",
    //   logo: "https://res.cloudinary.com/dyrhcm26t/image/upload/v1765195694/candidate3_c5vfw6.png"
    // }
    {
            _id: "1",
            name: "కట్ల సాగర్",
            party: "ఉంగరం",
            logo: "/img/candidate1.png",
            votes: 0
          },
          {
            _id: "2",
            name: "కొప్పుల లచ్చన్న",
            party: "కత్తెర",
            logo: "/img/candidate2.png",
            votes: 0
          },
          {
            _id: "3",
            name: "తాళ్లపల్లి రమేష్",
            party: "బ్యాట్",
            logo: "/img/candidate3.png",
            votes: 0
          }
  ]);

  console.log("Candidates added.");
  process.exit();
});
