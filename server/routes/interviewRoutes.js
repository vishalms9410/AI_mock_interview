import express from "express";
import { generateQuestions, evaluateAnswer, saveInterview, getInterviews, } from "../controllers/interviewController.js";

const router = express.Router();

router.post("/generate-questions", generateQuestions);
router.post("/evaluate-answer", evaluateAnswer);
router.post("/save-interview", saveInterview);
router.get("/history", getInterviews);

export default router;