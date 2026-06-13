import express from "express";

import {
  generateQuestions,
  evaluateAnswer,
  saveInterview,
  getInterviews,
  generateReport,
} from "../controllers/interviewController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/generate-questions",
  generateQuestions
);

router.post(
  "/evaluate-answer",
  evaluateAnswer
);

router.post(
  "/generate-report",
  authMiddleware,
  generateReport
);

router.post(
  "/save-interview",
  authMiddleware,
  saveInterview
);

router.get(
  "/history",
  authMiddleware,
  getInterviews
);

export default router;