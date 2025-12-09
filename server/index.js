// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import http from "http";
// import { Server } from "socket.io";
// import connectDB from "./config/db.js";

// import feedbackRoutes from "./routes/feedbackRoutes.js";
// import voteRoutes from "./routes/voteRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";

// dotenv.config();
// connectDB();

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST"]
//   }
// });

// // Attach socket instance to all requests
// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });

// app.use(cors());
// app.use(express.json());

// // API Routes
// app.use("/api/feedback", feedbackRoutes);
// app.use("/api/votes", voteRoutes);
// app.use("/api/admin", adminRoutes);

// io.on("connection", (socket) => {
//   console.log("Client Connected:", socket.id);
// });

// const PORT = process.env.PORT || 5001;
// const MONGO_URI = process.env.MONGO_URI;
// server.listen(PORT, () =>console.log(`🚀 Backend API Live on http://localhost:${PORT}`));
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";

import feedbackRoutes from "./routes/feedbackRoutes.js";
import voteRoutes from "./routes/voteRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// Allowed origins for CORS
const allowedOrigins = [
  "http://localhost:3000",      
  process.env.CLIENT_URL,       // Frontend URL on Vercel
];

// CORS (Backend)
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin) || /vercel\.app$/.test(origin)) {
        return callback(null, true);
      }

      console.log("❌ CORS BLOCKED:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Parse JSON bodies
app.use(express.json());

// SOCKET.IO Setup
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Attach io instance to every route
app.use((req, res, next) => {
  req.io = io;
  next();
});

// API Routes
app.use("/api/feedback", feedbackRoutes);
app.use("/api/votes", voteRoutes);
app.use("/api/admin", adminRoutes);

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log("🟢 Socket Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Socket Disconnected:", socket.id);
  });
});

// Port + Server Start
const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`🚀 Backend API is running on port ${PORT}`);
});
