import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import interviewRoutes from "./routes/interviewRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.send("AI Mock Interview Backend Running...");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.use("/api/interview", interviewRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});