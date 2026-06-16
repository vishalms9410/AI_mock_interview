import { useState } from "react";
import axios from "axios";
import QuestionCard from "../components/QuestionCard";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Home() {
  const [questions, setQuestions] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [report, setReport] = useState("");

  const [role, setRole] = useState("Frontend Developer");
  const [difficulty, setDifficulty] = useState("Medium");
  const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
  }
}, [navigate]);

  const generateQuestions = async () => {
    try {
      setLoading(true);

      setQuestions([]);
      setEvaluations([]);
      setSaved(false);
      setReport("");

      const response = await axios.post(
        "https://ai-mock-interview-c974.onrender.com/generate-questions",
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

  const handleEvaluation = (evaluationData) => {
    setEvaluations((prev) => [...prev, evaluationData]);
  };

  const averageScore =
    evaluations.length > 0
      ? (
          evaluations.reduce(
            (sum, item) => sum + item.score,
            0
          ) / evaluations.length
        ).toFixed(1)
      : 0;

  const saveInterview = async () => {
    try {
     await axios.post(
  "https://ai-mock-interview-c974.onrender.com/interviews/save-interview",
  {
    role,
    difficulty,
    questions,
    evaluations,
    averageScore,
  },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        "token"
      )}`,
    },
  }
);

      setSaved(true);
      alert("Interview Saved Successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save interview");await axios.post(
  "https://ai-mock-interview-c974.onrender.com/interviews/save-interview",
  {
    role,
    difficulty,
    questions,
    evaluations,
    averageScore,
  },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);
    }
  };

  const generateReport = async () => {
  try {
    const response = await axios.post(
      "https://ai-mock-interview-c974.onrender.com/interviews/generate-report",
      {
        role,
        difficulty,
        averageScore,
        evaluations,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setReport(response.data.report);
  } catch (error) {
    console.error(error);
    alert("Failed to generate report");
  }
};

 const downloadPDF = () => {
  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(18);
  doc.text("AI Mock Interview Report", 20, y);

  y += 20;

  doc.setFontSize(12);
  doc.text(`Role: ${role}`, 20, y);

  y += 10;
  doc.text(`Difficulty: ${difficulty}`, 20, y);

  y += 10;
  doc.text(`Average Score: ${averageScore}/10`, 20, y);

  y += 20;

  const lines = doc.splitTextToSize(report, 170);

  lines.forEach((line) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }

    doc.text(line, 20, y);
    y += 8;
  });

  doc.save("Interview_Report.pdf");
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/login");
};

 return (
  <div className="container">
    <div className="dashboard">

      {/* Header */}

      <div className="header">
        <div>
          <h1>🚀 AI Mock Interview</h1>
          <p>
            Practice technical interviews with
            AI-powered evaluation and personalized feedback.
          </p>
        </div>

       <div className="header-actions">

  <Link to="/history">
    <button className="history-btn">
      📜 Interview History
    </button>
  </Link>

  <button
    className="logout-btn"
    onClick={logout}
  >
    🚪 Logout
  </button>

</div>
      </div>

      {/* Controls */}

      <div className="controls-card">

        <div className="form-row">

          <div className="form-group">
            <label>Role</label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>Full Stack Developer</option>
              <option>React Developer</option>

              <option>Java Developer</option>
              <option>Python Developer</option>
              <option>Node.js Developer</option>
              <option>MERN Stack Developer</option>

              <option>Software Engineer</option>
              <option>Software Developer</option>

              <option>Data Structures and Algorithms</option>
              <option>Competitive Programming</option>

              <option>DBMS</option>
              <option>Operating Systems</option>
              <option>Computer Networks</option>
              <option>OOPs</option>

              <option>Machine Learning Engineer</option>
              <option>Data Scientist</option>
              <option>Data Analyst</option>

              <option>DevOps Engineer</option>
              <option>Cloud Engineer</option>

              <option>Cyber Security Analyst</option>

              <option>SDE Intern</option>
              <option>Graduate Software Engineer</option>

              <option>HR Interview</option>
              <option>Behavioral Interview</option>
            </select>
          </div>

          <div className="form-group">
            <label>Difficulty</label>

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

        </div>

        <button
          className="generate-btn"
          onClick={generateQuestions}
        >
          {loading
            ? "Generating Questions..."
            : "Generate Questions"}
        </button>

      </div>

      {/* Stats */}

      {evaluations.length > 0 && (
        <div className="stats-grid">

          <div className="stat-card">
            <h3>{evaluations.length}</h3>
            <p>Questions Evaluated</p>
          </div>

          <div className="stat-card">
            <h3>{averageScore}</h3>
            <p>Average Score</p>
          </div>

          <div className="stat-card">
            <h3>{difficulty}</h3>
            <p>Difficulty</p>
          </div>

          <div className="stat-card">
            <h3>{role}</h3>
            <p>Role</p>
          </div>

        </div>
      )}

      {/* Questions */}

      {questions.length > 0 && (
        <>
          <div className="section-title">
            <h2>Interview Questions</h2>
          </div>

          <div className="question-box">
            {questions.map((question, index) => (
              <QuestionCard
                key={index}
                question={question}
                onEvaluation={handleEvaluation}
              />
            ))}
          </div>
        </>
      )}

      {/* Summary */}

      {evaluations.length > 0 && (
        <div className="summary-card">

          <h2>Interview Summary</h2>

          <p>
            <strong>Questions Evaluated:</strong>{" "}
            {evaluations.length}
          </p>

          <p>
            <strong>Average Score:</strong>{" "}
            {averageScore}/10
          </p>

          <div className="summary-buttons">

            {!saved ? (
              <button onClick={saveInterview}>
                Save Interview
              </button>
            ) : (
              <button disabled>
                ✅ Saved Successfully
              </button>
            )}

            <button onClick={generateReport}>
              Generate AI Report
            </button>

          </div>

        </div>
      )}

      {/* Report */}

      {report && (
        <div className="report-section">

          <div className="report-header">

            <h2>📊 AI Performance Report</h2>

            <button onClick={downloadPDF}>
              Download PDF
            </button>

          </div>

          <div className="feedback-box">
            <pre>{report}</pre>
          </div>

        </div>
      )}

    </div>
  </div>
);
}
export default Home;