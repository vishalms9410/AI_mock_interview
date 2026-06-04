import express from "express";
import { generateQuestions, evaluateAnswer, } from "../controllers/interviewController.js";

const router = express.Router();

router.post("/generate-questions", generateQuestions);
router.post("/evaluate-answer", evaluateAnswer);

export default router;