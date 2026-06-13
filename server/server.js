import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import interviewRoutes from "./routes/interviewRoutes.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
// Test Route
app.get("/", (req, res) => {
    res.send("AI Mock Interview Backend Running...");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.use("/api/interview", interviewRoutes);
connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});