import { useState } from "react";
import axios from "axios";

function QuestionCard({ question }) {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
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

      setFeedback(response.data.feedback);
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

      {feedback && (
        <div className="feedback-box">
          <pre>{feedback}</pre>
        </div>
      )}
    </div>
  );
}

export default QuestionCard;