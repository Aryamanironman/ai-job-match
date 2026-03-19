import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import pdf from "pdf-parse/lib/pdf-parse.js";
import Groq from "groq-sdk";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
dotenv.config();

const app = express();

// Multer — store uploaded PDFs in memory (we only need the text)
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

// Middleware
app.use(cors());
app.use(express.json({ limit: "2mb" }));

// ---------------------------------------------------------------------------
// Groq AI setup
// ---------------------------------------------------------------------------
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const MODEL = "llama-3.3-70b-versatile";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildPrompt(resumeText, jobDescription) {
  return `
You are an expert career coach, recruiter, and skills analyst.
Analyze the following RESUME against the JOB DESCRIPTION and return a comprehensive JSON analysis.

RESUME:
"""
${resumeText}
"""

JOB DESCRIPTION:
"""
${jobDescription}
"""

Return ONLY valid JSON with this structure:
{
  "matchScore": <number 0-100>,
  "summary": "<assessment>",
  "strengths": [...],
  "weaknesses": [...],
  "missingSkills": [...],
  "presentSkills": [...],
  "resumeImprovements": [{ "section": "...", "suggestion": "..." }],
  "learningRoadmap": [{ "skill": "...", "priority": "...", "resources": [...], "timeEstimate": "..." }]
}
`;
}

async function extractPdfText(buffer) {
  const data = await pdf(buffer);
  return data.text;
}

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

app.post("/api/analyze", upload.single("resume"), async (req, res) => {
  try {
    let resumeText = "";
    const jobDescription = req.body.jobDescription;

    if (!jobDescription) return res.status(400).json({ error: "Job description is required." });

    if (req.file) {
      resumeText = await extractPdfText(req.file.buffer);
    } else if (req.body.resumeText) {
      resumeText = req.body.resumeText;
    } else {
      return res.status(400).json({ error: "Resume is required." });
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: buildPrompt(resumeText, jobDescription) }],
      model: MODEL,
      response_format: { type: "json_object" },
    });

    const analysis = JSON.parse(chatCompletion.choices[0]?.message?.content);
    return res.json({ success: true, analysis });
  } catch (error) {
    console.error("Analysis error:", error);
    return res.status(500).json({ error: error.message || "Internal server error." });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", mode: "serverless" });
});

// Export the app for Vercel
export default app;
