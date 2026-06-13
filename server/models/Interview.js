import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    role: String,

    difficulty: String,

    questions: [String],

    evaluations: [
      {
        question: String,
        answer: String,
        score: Number,
        strengths: [String],
        weaknesses: [String],
        improvedAnswer: String,
      },
    ],

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