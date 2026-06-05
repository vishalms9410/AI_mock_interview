import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    role: String,
    difficulty: String,
    questions: [String],
    scores: [Number],
    averageScore: Number,
  },
  {
    timestamps: true,
  }
);

const Interview = mongoose.model(
  "Interview",
  interviewSchema
);

export default Interview;