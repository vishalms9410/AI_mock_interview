import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function History() {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(
        "https://ai-mock-interview-c974.onrender.com/interviews/history",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setInterviews(response.data.interviews);
    } catch (error) {
      console.error(error);
    }
  };

  // For history cards (newest first)
  const sortedInterviews = interviews;

  // For chart (oldest first)
  const chartInterviews = [...interviews].reverse();

  const chartData = {
    labels: chartInterviews.map(
      (_, index) => `Interview ${index + 1}`
    ),
    datasets: [
      {
        label: "Average Score",
        data: chartInterviews.map(
          (item) => item.averageScore
        ),
        borderColor: "#6366f1",
        backgroundColor: "#6366f1",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Interview Performance Trend",
      },
    },
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Interview History</h1>

        <Link to="/">
          <button>← Back To Interview</button>
        </Link>

        {chartInterviews.length > 0 && (
          <div className="chart-container">
            <Line
              data={chartData}
              options={chartOptions}
            />
          </div>
        )}

        {sortedInterviews.length === 0 ? (
          <p>No interviews found.</p>
        ) : (
          sortedInterviews.map((interview) => (
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