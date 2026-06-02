import express from "express";
import { generateQuestions } from "../controllers/interviewController.js";

const router = express.Router();

router.post("/generate-questions", generateQuestions);

export default router;