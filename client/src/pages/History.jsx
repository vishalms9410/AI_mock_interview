import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function History() {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/interview/history"
      );

      setInterviews(response.data.interviews);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Interview History</h1>

        <Link to="/">
          <button>← Back To Interview</button>
        </Link>

        {interviews.length === 0 ? (
          <p>No interviews found.</p>
        ) : (
          interviews.map((interview) => (
            <div
              key={interview._id}
              className="history-card"
            >
              <h3>{interview.role}</h3>

              <p>
                <strong>Difficulty:</strong>{" "}
                {interview.difficulty}
              </p>

              <p>
                <strong>Average Score:</strong>{" "}
                {interview.averageScore}/10
              </p>

              <p>
                <strong>Questions Attempted:</strong>{" "}
                {interview.questions.length}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(
                  interview.createdAt
                ).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default History;