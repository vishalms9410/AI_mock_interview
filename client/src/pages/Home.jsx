import { useState } from "react";
import axios from "axios";
import QuestionCard from "../components/QuestionCard";

function Home() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [role, setRole] = useState("Frontend Developer");
  const [difficulty, setDifficulty] = useState("Medium");

  const generateQuestions = async () => {
    try {
      setLoading(true);

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

  return (
    <div className="container">
      <div className="card">
        <h1>AI Mock Interview</h1>

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

        {questions && (
          <div className="question-box">
            <div className="question-box">
       {questions.map((question, index) => (
  <QuestionCard
    key={index}
    question={question}
  />
))}
</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;