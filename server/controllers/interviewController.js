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

Provide:
1. Score out of 10
2. Strengths
3. Weaknesses
4. Improved Answer
`,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    res.status(200).json({
      success: true,
      feedback: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error evaluating answer",
    });
  }
};