// // src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import { Bar } from "react-chartjs-2";
import API from "../utils/api";
import socket from "../utils/socket";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AdminDashboard = () => {
  const [topIssues, setTopIssues] = useState([]);
  const [stats, setStats] = useState(null);

  const loadTopIssues = async () => {
    try {
      const { data } = await API.get("/admin/top-issues");
      setTopIssues(data);
    } catch (err) {
      console.error("Error loading top issues:", err);
      setTopIssues([
        { issue: "Road Repair", count: 18 },
        { issue: "Water Supply", count: 12 },
        { issue: "Street Lights", count: 9 },
        { issue: "Drainage Cleaning", count: 7 },
        { issue: "Garbage Collection", count: 6 },
      ]);
    }
  };

  const loadStats = async () => {
    try {
      const { data } = await API.get("/admin/stats");
      setStats(data);
    } catch (err) {
      console.error("Error loading stats");
    }
  };

  useEffect(() => {
    loadTopIssues();
    loadStats();

    socket.on("newFeedback", () => {
      loadTopIssues();
    });

    socket.on("voteUpdate", () => {
      loadStats();
    });

    return () => {
      socket.off("newFeedback");
      socket.off("voteUpdate");
    };
  }, []);

  const chartData = {
    labels: topIssues.map((i) => i.issue),
    datasets: [
      {
        label: "Most Requested Issues",
        data: topIssues.map((i) => i.count),
        backgroundColor: "rgba(52, 152, 219, 0.7)",
        borderColor: "rgba(41, 128, 185, 1)",
        borderWidth: 1.5,
      },
    ],
  };

  return (
    <div className="app-container">
      <header className="mb-4 flex items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-semibold">
            Admin Dashboard – Top Village Issues
          </h2>
          <p className="text-xs text-slate-500">
            Live view of what citizens are asking for the most.
          </p>
        </div>
      </header>

      <div className="chart-box">
        <Bar
          data={chartData}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>

      {stats && (
        <section className="stats-box mt-5">
          <h3 className="text-lg font-semibold mb-2">System Stats</h3>
          <div className="grid gap-3 sm:grid-cols-3 mb-3 text-sm">
            <div>
              <p className="text-slate-500">Total Feedback</p>
              <p className="text-lg font-semibold">{stats.feedbackCount}</p>
            </div>
            <div>
              <p className="text-slate-500">Total Announcements</p>
              <p className="text-lg font-semibold">
                {stats.announcementsCount}
              </p>
            </div>
            <div>
              <p className="text-slate-500">Total Candidates</p>
              <p className="text-lg font-semibold">{stats.candidateCount}</p>
            </div>
          </div>

          <h4 className="text-sm font-semibold mb-1">Vote Details</h4>
          <ul className="mt-1 space-y-1 text-sm">
            {stats.voteDetails.map((c) => (
              <li key={c._id}>
                <span className="font-medium">{c.name}</span>: {c.votes} votes
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default AdminDashboard;

