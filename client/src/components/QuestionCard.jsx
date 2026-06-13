import { useState } from "react";
import axios from "axios";

function QuestionCard({ question, onEvaluation }) {
  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submitAnswer = async () => {
    if (!answer.trim()) {
      alert("Please enter an answer first.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/interview/evaluate-answer",
        {
          question,
          answer,
        }
      );

      const result = response.data.evaluation;

      setEvaluation(result);
      setSubmitted(true);

      if (onEvaluation) {
        onEvaluation({
          question,
          answer,
          score: result.score,
          strengths: result.strengths,
          weaknesses: result.weaknesses,
          improvedAnswer: result.improvedAnswer,
        });
      }
    } catch (error) {
      console.error(error);
      alert("Failed to evaluate answer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="question-card">
      <div className="question-header">
        <h3>{question}</h3>

        {evaluation && (
          <span className="score-badge">
            {evaluation.score}/10
          </span>
        )}
      </div>

      <textarea
        placeholder="Write your answer here..."
        value={answer}
        disabled={submitted}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <button
        onClick={submitAnswer}
        disabled={loading || submitted}
      >
        {loading
          ? "Evaluating..."
          : submitted
          ? "Submitted"
          : "Submit Answer"}
      </button>

      {evaluation && (
        <div className="feedback-box">
          <div className="strength-box">
            <h4>✅ Strengths</h4>

            <ul>
              {evaluation.strengths.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="weakness-box">
            <h4>⚠️ Weaknesses</h4>

            <ul>
              {evaluation.weaknesses.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="improved-answer">
            <h4>🚀 Improved Answer</h4>

            <p>{evaluation.improvedAnswer}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionCard;