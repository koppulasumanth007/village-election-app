
import React, { useState, useEffect } from "react";
import CandidateCard from "../components/CandidateCard";
import API from "../utils/api";

const Dashboard = ({ user }) => {
  const [candidates, setCandidates] = useState([]);

  const loadCandidates = async () => {
    // STATIC candidate data with images from /public/img/
    const staticCandidates = [
      {
        _id: "1",
        name: "కట్ల సాగర్",
        party: "ఉంగరం",
        logo: "candidate1.png",
        votes: 0,
      },
      {
        _id: "2",
        name: "కొప్పుల లచ్చన్న",
        party: "కత్తెర",
        logo: "candidate2.png",
        votes: 0,
      },
      {
        _id: "3",
        name: "తాళ్లపల్లి రమేష్",
        party: "బ్యాట్",
        logo: "candidate3.png",
        votes: 0,
      }
    ];

    try {
      const res = await API.get("/votes/counts");

      const merged = staticCandidates.map(sc => {
        const backend = res.data.find(b => b._id === sc._id);
        return backend ? { ...sc, votes: backend.votes } : sc;
      });

      setCandidates(merged);
    } catch (err) {
      console.error("Error loading candidates:", err);
      setCandidates(staticCandidates);
    }
  };

  // ✅ useEffect runs ONLY once → NO infinite loop
  useEffect(() => {
    loadCandidates();
  }, []);

  const handleVote = async (candidateId) => {
    try {
      const res = await API.post("/votes/cast", {
        candidateId,
        email: user.email,
      });

      alert(res.data.message);
      loadCandidates(); // refresh after vote
    } catch (err) {
      alert(err.response?.data?.message || "Vote failed");
    }
  };

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <h3>Select Your Candidate (Poll)</h3>

      <div style={styles.cardContainer}>
        {candidates.map(cand => (
          <CandidateCard
            key={cand._id}
            candidate={cand}
            onVote={handleVote}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px",
    marginTop: "30px",
  },
};
// const styles = {
//   cardContainer: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//     gap: "20px",
//     marginTop: "20px",
//     alignItems: "start"
//   }
// };



export default Dashboard;
