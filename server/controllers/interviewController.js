import Interview from "../models/Interview.js";
import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const generateQuestions = async (req, res) => {
  console.log("Controller hit!");

  try {
    const { role, difficulty } = req.body;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `
Generate exactly 5 ${difficulty} level interview questions for a ${role}.

Return ONLY a valid JSON array.

Example:

[
  "Question 1",
  "Question 2",
  "Question 3",
  "Question 4",
  "Question 5"
]

Do not return anything except the JSON array.
`,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    const questions = JSON.parse(
  completion.choices[0].message.content
);

    res.status(200).json({
      success: true,
      questions,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error generating questions",
    });
  }
};

export const evaluateAnswer = async (req, res) => {
  try {
    const { question, answer } = req.body;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `
Interview Question:
${question}

Candidate Answer:
${answer}

Evaluate this answer.

Return ONLY a valid JSON object in this exact format:

{
  "score": 8,
  "strengths": [
    "Point 1",
    "Point 2"
  ],
  "weaknesses": [
    "Point 1",
    "Point 2"
  ],
  "improvedAnswer": "Write an improved answer here"
}

Do not return markdown.
Do not use \`\`\`json.
Return only valid JSON.
`,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    const rawResponse = completion.choices[0].message.content;

    const evaluation = JSON.parse(rawResponse);

    res.status(200).json({
      success: true,
      evaluation,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error evaluating answer",
    });
  }
};

export const saveInterview = async (req, res) => {
  try {
    const {
      role,
      difficulty,
      questions,
      scores,
      averageScore,
    } = req.body;

    const interview = await Interview.create({
      role,
      difficulty,
      questions,
      scores,
      averageScore,
    });

    res.status(201).json({
      success: true,
      interview,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error saving interview",
    });
  }
};

export const getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      interviews,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error fetching interviews",
    });
  }
};