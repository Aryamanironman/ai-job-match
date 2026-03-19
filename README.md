# 🧠 AI Job Match & Skill Gap Analyzer

An AI-powered web application that analyzes your resume against any job description and provides actionable insights to improve your chances of landing the job.

![Screenshot Placeholder](./screenshots/dashboard.png)

---

## ✨ Features

- **Resume Upload** — Paste text or upload a PDF resume
- **Job Description Input** — Paste any job listing
- **AI-Powered Match Score** — Get a 0–100% compatibility rating
- **Skills Gap Analysis** — See which skills you have vs. which you need
- **Strengths & Weaknesses** — Understand your competitive advantages
- **Resume Feedback** — Section-by-section improvement suggestions
- **Learning Roadmap** — Prioritized plan with resources and time estimates

---

## 🛠 Tech Stack

| Layer     | Technology                       |
| --------- | -------------------------------- |
| Frontend  | React (Vite) + Tailwind CSS v4  |
| Backend   | Node.js + Express               |
| AI Engine | Google Gemini 2.0 Flash          |
| PDF Parse | pdf-parse                        |

---

## 📁 Project Structure

```
ai-job-analyzer/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ResumeUpload.jsx
│   │   │   ├── JobInput.jsx
│   │   │   ├── MatchScore.jsx
│   │   │   ├── SkillsGap.jsx
│   │   │   ├── ResumeFeedback.jsx
│   │   │   └── LearningPlan.jsx
│   │   ├── utils/
│   │   │   ├── api.js
│   │   │   ├── parser.js
│   │   │   └── scoring.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A [Google Gemini API key](https://aistudio.google.com/apikey)

### 1. Clone

```bash
git clone https://github.com/your-username/ai-job-analyzer.git
cd ai-job-analyzer
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file (or edit the existing one):

```env
GEMINI_API_KEY=your_api_key_here
PORT=3001
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will be available at **http://localhost:5173**.

---

## 📸 Screenshots

> Screenshots will be added after the UI is finalized.

| Dashboard | Results |
| --------- | ------- |
| _placeholder_ | _placeholder_ |

---

## 🗺 Roadmap

- [x] Text resume input + analysis
- [x] PDF upload & parsing
- [x] Match score with animated progress ring
- [x] Skills gap analysis with tags
- [x] Resume improvement suggestions
- [x] Learning roadmap with priorities
- [ ] Save analysis history (localStorage)
- [ ] Export results as PDF
- [ ] Multi-language support
- [ ] Side-by-side resume comparison
- [ ] Chrome extension for job boards

---

## 📄 License

MIT — feel free to use, modify, and share.

---

Built with ❤️ using React, Express, and Google Gemini AI.
