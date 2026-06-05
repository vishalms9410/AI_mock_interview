import { useState } from "react";
import axios from "axios";
import QuestionCard from "../components/QuestionCard";
import { Link } from "react-router-dom";

function Home() {
  const [questions, setQuestions] = useState([]);
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const [role, setRole] = useState("Frontend Developer");
  const [difficulty, setDifficulty] = useState("Medium");

  const generateQuestions = async () => {
    try {
      setLoading(true);

      // Reset previous interview data
      setQuestions([]);
      setScores([]);
      setSaved(false);

      const response = await axios.post(
        "http://localhost:5000/api/interview/generate-questions",
        {
          role,
          difficulty,
        }
      );

      setQuestions(response.data.questions);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEvaluation = (score) => {
    setScores((prev) => [...prev, score]);
  };

  const averageScore =
    scores.length > 0
      ? (
          scores.reduce((sum, score) => sum + score, 0) /
          scores.length
        ).toFixed(1)
      : 0;

  const saveInterview = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/interview/save-interview",
        {
          role,
          difficulty,
          questions,
          scores,
          averageScore,
        }
      );

      setSaved(true);
      alert("Interview Saved Successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save interview");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>AI Mock Interview</h1>

        <Link to="/history">
          <button>View Interview History</button>
        </Link>

        <label>Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option>Frontend Developer</option>
          <option>Backend Developer</option>
          <option>Full Stack Developer</option>
          <option>React Developer</option>
        </select>

        <label>Difficulty</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <button onClick={generateQuestions}>
          {loading ? "Generating..." : "Generate Questions"}
        </button>

        {questions.length > 0 && (
          <div className="question-box">
            {questions.map((question, index) => (
              <QuestionCard
                key={index}
                question={question}
                onEvaluation={handleEvaluation}
              />
            ))}
          </div>
        )}

        {scores.length > 0 && (
          <div className="summary-card">
            <h2>Interview Summary</h2>

            <p>
              <strong>Questions Evaluated:</strong>{" "}
              {scores.length}
            </p>

            <p>
              <strong>Average Score:</strong>{" "}
              {averageScore}/10
            </p>

            {!saved ? (
              <button onClick={saveInterview}>
                Save Interview
              </button>
            ) : (
              <p>✅ Interview Saved Successfully</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;