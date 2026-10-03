# 🚀 AI Mock Interview Platform

An AI-powered mock interview platform that simulates real interview experiences by generating role-specific questions, evaluating candidate responses using Large Language Models, providing performance reports, and tracking interview progress over time.

The platform combines **Generative AI, full-stack web development, authentication, speech recognition, data persistence, and analytics** to create an interactive interview preparation environment.

---

## 🌐 Live Demo

**Frontend:**
https://ai-mock-interview-psi-orpin.vercel.app

**Backend:**
https://ai-mock-interview-c974.onrender.com

**GitHub Repository:**
https://github.com/vishalms9410/AI_mock_interview

---

# 📌 Table of Contents

* [Overview](#-overview)
* [Features](#-features)
* [How It Works](#-how-it-works)
* [System Architecture](#-system-architecture)
* [Tech Stack](#-tech-stack)
* [Project Structure](#-project-structure)
* [Application Flow](#-application-flow)
* [Authentication](#-authentication)
* [AI Question Generation](#-ai-question-generation)
* [Answer Evaluation](#-answer-evaluation)
* [Voice-to-Text](#-voice-to-text)
* [Interview Reports](#-interview-reports)
* [Interview History](#-interview-history)
* [Analytics](#-analytics)
* [API Endpoints](#-api-endpoints)
* [Database](#-database)
* [Environment Variables](#-environment-variables)
* [Installation](#-installation)
* [Running Locally](#-running-locally)
* [Deployment](#-deployment)
* [Challenges](#-technical-challenges)
* [Future Improvements](#-future-improvements)
* [Screenshots](#-screenshots)
* [License](#-license)

---

# 🎯 Overview

The **AI Mock Interview Platform** is designed to help candidates practice technical and professional interviews in an interactive environment.

Instead of following a fixed set of interview questions, the platform dynamically generates questions according to the user's selected:

* Job role
* Difficulty level

The candidate can answer questions using either:

* Keyboard input
* Voice input

The AI then evaluates the answer and provides feedback based on the quality and relevance of the response.

After completing an interview, the platform generates a performance report containing:

* Overall score
* Individual question performance
* Strengths
* Weaknesses
* Improvement suggestions

Interview results are stored in MongoDB, allowing authenticated users to view their previous interviews and track their performance over time.

---

# ✨ Features

## 🤖 AI-Powered Question Generation

Questions are dynamically generated using the Groq API and an LLM.

The system generates exactly five questions based on:

```text
Role + Difficulty
```

For example:

```text
Role: Data Analyst
Difficulty: Medium
```

The AI can generate questions covering areas such as:

* SQL
* Python
* Data Analysis
* Statistics
* Power BI
* Problem Solving
* Behavioral topics

---

## 📝 AI Answer Evaluation

After submitting an answer, the platform sends the response to the AI evaluation service.

The AI analyzes the response based on factors such as:

* Relevance
* Correctness
* Completeness
* Clarity
* Technical understanding

The result is converted into a score and feedback that helps the candidate understand what was done well and what needs improvement.

---

## 🎤 Voice-to-Text Interview

The platform supports answering interview questions using the microphone.

The browser's Speech Recognition API converts the candidate's speech into text.

### Flow

```text
User speaks
      ↓
Browser Speech Recognition
      ↓
Speech converted into text
      ↓
Text displayed in answer box
      ↓
Candidate submits answer
      ↓
AI evaluates response
```

This makes the platform more similar to an actual interview environment and also helps candidates practice verbal communication.

---

## 🔐 JWT Authentication

The application uses **JSON Web Tokens (JWT)** for authentication.

Users can:

* Register
* Login
* Access protected routes
* Save interviews
* View interview history
* Generate personalized reports

After login, the JWT token is stored on the client side and sent with requests to protected backend endpoints.

---

## 👤 Personalized Interview History

Each authenticated user has their own interview history.

The backend identifies the user using the JWT token and retrieves only that user's interviews.

This prevents users from accessing interview data belonging to other accounts.

Example:

```text
User A
 ├── Interview 1
 ├── Interview 2
 └── Interview 3

User B
 ├── Interview 1
 └── Interview 2
```

User A cannot access User B's interview history.

---

## 📊 Performance Analytics

The application uses **Chart.js** to visualize interview performance.

Users can track their scores across multiple interviews and identify performance trends over time.

Example:

```text
Interview 1 → 62
Interview 2 → 68
Interview 3 → 74
Interview 4 → 81
```

This allows users to monitor improvement rather than looking only at individual interview results.

---

## 📄 AI-Generated Performance Reports

After an interview is completed, the platform can generate a detailed performance report.

The report can contain:

### Overall Performance

An overall score representing the candidate's interview performance.

### Strengths

Areas where the candidate performed well.

### Weaknesses

Areas that require improvement.

### Recommendations

Actionable suggestions for improving future interview performance.

---

# 🔄 How It Works

The complete workflow is:

```text
                ┌─────────────────┐
                │     User        │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ Login/Register  │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ Select Role +   │
                │ Difficulty      │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ Generate        │
                │ Questions       │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ Answer Question │
                │ Text / Voice    │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ AI Evaluation   │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ Next Question   │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ Generate Report │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ Save Interview  │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ History +       │
                │ Analytics       │
                └─────────────────┘
```

---

# 🏗️ System Architecture

The project follows a client-server architecture.

```text
                       ┌──────────────────┐
                       │   React Frontend │
                       │      Vercel      │
                       └────────┬─────────┘
                                │
                                │ HTTP / REST API
                                ▼
                       ┌──────────────────┐
                       │ Node.js +        │
                       │ Express Backend  │
                       │     Render       │
                       └───────┬──────────┘
                               │
                ┌──────────────┼───────────────┐
                │              │               │
                ▼              ▼               ▼
        ┌────────────┐  ┌────────────┐  ┌─────────────┐
        │ MongoDB    │  │ Groq API   │  │ JWT Auth    │
        │   Atlas    │  │    LLM     │  │ Middleware  │
        └────────────┘  └────────────┘  └─────────────┘
```

The frontend communicates with the backend through REST APIs.

The backend handles:

* Authentication
* AI requests
* Interview evaluation
* Database operations
* Report generation
* Authorization

---

# 🛠️ Tech Stack

## Frontend

| Technology               | Purpose                   |
| ------------------------ | ------------------------- |
| React.js                 | UI development            |
| Vite                     | Frontend build tool       |
| Axios                    | API communication         |
| React Router             | Client-side routing       |
| Chart.js                 | Performance visualization |
| react-speech-recognition | Voice-to-text             |
| CSS                      | Styling                   |

---

## Backend

| Technology | Purpose                 |
| ---------- | ----------------------- |
| Node.js    | JavaScript runtime      |
| Express.js | REST API framework      |
| Groq SDK   | LLM API integration     |
| JWT        | Authentication          |
| bcrypt     | Password hashing        |
| MongoDB    | Data storage            |
| Mongoose   | MongoDB object modeling |

---

## AI

The platform uses the **Groq API** to interact with a large language model.

The AI is responsible for:

```text
Question Generation
       +
Answer Evaluation
       +
Performance Analysis
       +
Report Generation
```

---

# 📁 Project Structure

A simplified project structure is:

```text
AI_mock_interview/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── QuestionCard.jsx
│   │   │   └── ...
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Interview.jsx
│   │   │   ├── Result.jsx
│   │   │   └── History.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── interviewController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Interview.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── interviewRoutes.js
│   │
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# 🔐 Authentication

Authentication is implemented using JWT.

## Registration

The user provides:

```text
Name
Email
Password
```

The backend:

1. Receives the registration request.
2. Validates the user information.
3. Hashes the password using bcrypt.
4. Stores the user in MongoDB.
5. Returns an appropriate response.

Passwords are never stored as plain text.

---

## Login

During login:

```text
Email + Password
        ↓
Backend
        ↓
Find User
        ↓
Compare Password
        ↓
Generate JWT
        ↓
Return Token
```

The frontend stores the token:

```js
localStorage.setItem("token", response.data.token);
```

The token is then used when accessing protected endpoints.

---

# 🛡️ Protected Routes

Certain operations require authentication.

For example:

```text
POST /api/interview/generate-report
POST /api/interview/save-interview
GET  /api/interview/history
```

The authentication middleware:

1. Reads the JWT.
2. Verifies the token.
3. Extracts the user ID.
4. Attaches the user information to the request.
5. Allows the request to continue.

If the token is missing or invalid, the server returns an unauthorized response.

---

# 🤖 AI Question Generation

The question generation endpoint receives:

```json
{
  "role": "Data Analyst",
  "difficulty": "Medium"
}
```

The backend sends a structured prompt to the Groq API.

The prompt requests exactly five questions and requires the model to return a JSON array.

Example output:

```json
[
  "What is the difference between WHERE and HAVING in SQL?",
  "How would you handle missing values in a dataset?",
  "Explain the difference between mean and median.",
  "What is a LEFT JOIN and when would you use it?",
  "How would you identify an outlier in a dataset?"
]
```

The backend parses the AI response using:

```js
JSON.parse(completion.choices[0].message.content);
```

The resulting array is then returned to the frontend.

---

# 🧠 Answer Evaluation

Once the candidate submits an answer, the frontend sends the answer to the backend.

The backend creates an AI evaluation prompt containing:

```text
Interview Question
+
Candidate Answer
```

The AI analyzes the response and returns structured feedback.

The evaluation can consider:

* Accuracy
* Relevance
* Completeness
* Explanation quality
* Technical understanding

The result is then displayed to the candidate.

---

# 🎤 Voice Interview

The platform uses browser speech recognition to provide voice-based answering.

The main component responsible for this functionality is:

```text
QuestionCard.jsx
```

The process is:

```text
Click microphone
       ↓
SpeechRecognition.startListening()
       ↓
Browser listens to microphone
       ↓
Speech converted to text
       ↓
Transcript displayed
       ↓
Stop microphone
       ↓
Submit answer
```

The implementation supports continuous listening using:

```js
SpeechRecognition.startListening({
  continuous: true,
  language: "en-US",
});
```

This feature is particularly useful for practicing actual spoken interview responses.

---

# 📊 Interview History

Every completed interview can be stored in MongoDB.

An interview record can contain information such as:

```text
User ID
Role
Difficulty
Questions
Answers
Scores
Average Score
Feedback
Date
```

The authenticated user's ID is associated with each interview.

When history is requested:

```text
JWT
 ↓
User ID
 ↓
MongoDB Query
 ↓
User's Interviews
```

This ensures interview history remains personalized.

---

# 📈 Performance Analytics

Chart.js is used to display performance trends.

The application converts interview records into chart data.

For example:

```text
Interview 1 → 60
Interview 2 → 67
Interview 3 → 73
Interview 4 → 79
```

The chart provides a visual representation of progress across interviews.

This makes it easier for users to identify whether their interview performance is improving over time.

---

# 📄 Interview Reports

After completing an interview, the application can generate a consolidated report.

A report can include:

```text
Overall Score
     ↓
Question-wise Scores
     ↓
Strengths
     ↓
Weaknesses
     ↓
Improvement Suggestions
```

The report generation process uses the candidate's interview responses as context for the AI.

---

# 🔌 API Endpoints

## Authentication

### Register

```http
POST /api/auth/register
```

Request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

---

### Login

```http
POST /api/auth/login
```

Request:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response contains a JWT token.

---

# Interview APIs

### Generate Questions

```http
POST /api/interview/generate-questions
```

Request:

```json
{
  "role": "Software Engineer",
  "difficulty": "Hard"
}
```

Response:

```json
{
  "success": true,
  "questions": [
    "Question 1",
    "Question 2",
    "Question 3",
    "Question 4",
    "Question 5"
  ]
}
```

---

### Evaluate Answer

```http
POST /api/interview/evaluate-answer
```

Used to send a candidate's answer to the AI evaluation service.

---

### Generate Report

```http
POST /api/interview/generate-report
```

Authentication required.

---

### Save Interview

```http
POST /api/interview/save-interview
```

Authentication required.

---

### Get Interview History

```http
GET /api/interview/history
```

Authentication required.

Returns interviews belonging to the authenticated user.

---

# 🗄️ Database

The project uses **MongoDB Atlas**.

MongoDB provides persistent storage for:

### Users

```text
User
 ├── name
 ├── email
 ├── password
 └── createdAt
```

### Interviews

```text
Interview
 ├── userId
 ├── role
 ├── difficulty
 ├── questions
 ├── answers
 ├── scores
 ├── averageScore
 ├── feedback
 └── createdAt
```

The `userId` creates the relationship between an interview and its owner.

---

# 🔑 Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GROQ_API_KEY=your_groq_api_key
```

### Important

Never commit `.env` to GitHub.

Add it to `.gitignore`:

```gitignore
.env
node_modules/
```

For production deployment, these environment variables should be configured through the hosting provider.

---

# 💻 Installation

## 1. Clone the Repository

```bash
git clone https://github.com/vishalms9410/AI_mock_interview.git
```

```bash
cd AI_mock_interview
```

---

# ⚙️ Backend Setup

Navigate to the backend:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create:

```text
server/.env
```

Add:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
GROQ_API_KEY=your_groq_api_key
```

Start the server:

```bash
npm start
```

The backend should run on:

```text
http://localhost:5000
```

---

# 🎨 Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will usually be available at:

```text
http://localhost:5173
```

---

# ▶️ Running the Complete Application

Start the backend:

```bash
cd server
npm start
```

Then start the frontend:

```bash
cd frontend
npm run dev
```

Open the frontend URL in your browser.

---

# ☁️ Deployment

The project is deployed using:

```text
Frontend → Vercel
Backend  → Render
Database → MongoDB Atlas
AI       → Groq API
```

Architecture:

```text
                   Internet
                      │
                      ▼
             ┌─────────────────┐
             │     Vercel      │
             │ React Frontend  │
             └────────┬────────┘
                      │
                      ▼
             ┌─────────────────┐
             │     Render      │
             │ Node + Express  │
             └──────┬───┬──────┘
                    │   │
          ┌─────────┘   └──────────┐
          ▼                        ▼
   ┌──────────────┐        ┌──────────────┐
   │ MongoDB Atlas│        │   Groq API   │
   └──────────────┘        └──────────────┘
```

---

# 🚧 Technical Challenges

## 1. Integrating Generative AI

One of the major challenges was integrating an LLM into the application while ensuring that its output could be reliably consumed by the backend.

The model was instructed to return structured JSON rather than natural-language explanations.

This allowed the frontend to process the generated questions programmatically.

---

## 2. Handling Unstructured AI Output

LLMs can sometimes produce unexpected formatting.

For example, instead of:

```json
[
  "Question 1",
  "Question 2"
]
```

a model may return additional text or Markdown.

The application therefore needs strict prompts and error handling around JSON parsing.

---

## 3. Authentication and Authorization

Implementing authentication required coordinating:

```text
React
 ↓
Login API
 ↓
JWT
 ↓
localStorage
 ↓
Protected API
 ↓
JWT Middleware
 ↓
MongoDB
```

Authorization was particularly important for interview history because users should only access their own interview records.

---

## 4. Voice Recognition

Browser speech recognition introduces additional considerations such as:

* Browser support
* Microphone permissions
* Listening state
* Transcript management
* Starting/stopping recognition
* Handling empty transcripts

The application uses `react-speech-recognition` to simplify interaction with the browser Speech Recognition API.

---

## 5. AI Response Reliability

AI-generated content is probabilistic, whereas application logic expects predictable structures.

For example, the application expects exactly five questions.

Therefore, prompts need to clearly define:

```text
Required number of questions
+
Required output format
+
No additional text
```

---

## 6. Personalized Data

The application needed to ensure that interview data was associated with the correct user.

JWT authentication provides the user identity, which is then used when saving and retrieving interview records.

---

## 7. Deployment

Deploying a full-stack application required configuring multiple services:

```text
Vercel
Render
MongoDB Atlas
Groq
```

Each service requires separate environment variables and configuration.

CORS also needs to be configured correctly so that the deployed frontend can communicate with the backend.

---

# 🔮 Future Improvements

Potential improvements include:

### 🎯 More Interview Types

Support:

* Technical interviews
* HR interviews
* Behavioral interviews
* System design interviews
* Coding interviews

---

### 🧑‍💼 Resume-Based Interviews

Allow users to upload their resume and generate questions based specifically on their:

* Projects
* Skills
* Experience
* Education

---

### 🎥 Video Interviews

Add webcam-based mock interviews with:

* Facial expression analysis
* Eye-contact analysis
* Speaking pace
* Filler-word detection
* Confidence indicators

---

### 📚 Personalized Learning

Use previous interview performance to automatically identify weak areas.

For example:

```text
Repeated SQL mistakes
        ↓
SQL identified as weak area
        ↓
Generate SQL-focused practice
        ↓
Track improvement
```

---

### 🏆 Leaderboard

Introduce an optional leaderboard where users can compare performance metrics.

---

### 📱 Mobile Support

Improve responsive design and potentially create a dedicated mobile application.

---

### 🧠 Adaptive Interviews

Instead of generating all questions at the beginning, the AI could dynamically select the next question based on the candidate's previous answer.

Example:

```text
Candidate struggles with SQL
          ↓
AI detects weakness
          ↓
Next question focuses on SQL
```

This would make the interview more adaptive and realistic.

---

# 📸 Screenshots

Add screenshots of the major application screens here.

Recommended screenshots:

### Home Page

```text
![Home Page](screenshots/home.png)
```

### Login

```text
![Login](screenshots/login.png)
```

### Interview

```text
![Interview](screenshots/interview.png)
```

### AI Evaluation

```text
![Evaluation](screenshots/evaluation.png)
```

### Interview Report

```text
![Report](screenshots/report.png)
```

### Interview History

```text
![History](screenshots/history.png)
```

---

# 📌 Key Learning Outcomes

This project provided practical experience with:

* Full-stack application development
* React.js
* REST API development
* Node.js
* Express.js
* MongoDB
* JWT authentication
* Password hashing
* Generative AI integration
* Prompt engineering
* Structured AI responses
* Speech Recognition API
* Data visualization
* API error handling
* Environment variables
* CORS
* Cloud deployment
* Vercel
* Render
* MongoDB Atlas

---

# 👨‍💻 Author

**Vishal Chaudhary**

B.Tech Electrical Engineering
NIT Raipur

### Profiles

* GitHub: https://github.com/vishalms9410
* LeetCode: https://leetcode.com/u/vishalms9410/
* CodeChef: https://www.codechef.com/users/vishalms9410

---

# ⭐ If You Like This Project

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

---

# 📄 License

This project is intended for educational and portfolio purposes.
