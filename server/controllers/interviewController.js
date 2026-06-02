import dotenv from "dotenv";
dotenv.config();
import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export const generateQuestions = async (req, res) => {
    try {
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content:
                        "Generate 5 React interview questions. Return only the questions.",
                },
            ],
            model: "llama-3.3-70b-versatile",
        });

        const questions =
            completion.choices[0].message.content;

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