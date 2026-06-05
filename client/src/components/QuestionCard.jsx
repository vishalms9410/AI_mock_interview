import { useState } from "react";
import axios from "axios";

function QuestionCard({ question, onEvaluation }) {
  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitAnswer = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/interview/evaluate-answer",
        {
          question,
          answer,
        }
      );

      setEvaluation(response.data.evaluation);

      if (onEvaluation) {
        onEvaluation(response.data.evaluation.score);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="question-card">
      <h3>{question}</h3>

      <textarea
        placeholder="Write your answer here..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <button onClick={submitAnswer}>
        {loading ? "Evaluating..." : "Submit Answer"}
      </button>

      {evaluation && (
        <div className="feedback-box">
          <h3>Score: {evaluation.score}/10</h3>

          <h4>Strengths</h4>
          <ul>
            {evaluation.strengths.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h4>Weaknesses</h4>
          <ul>
            {evaluation.weaknesses.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h4>Improved Answer</h4>
          <p>{evaluation.improvedAnswer}</p>
        </div>
      )}
    </div>
  );
}

export default QuestionCard;