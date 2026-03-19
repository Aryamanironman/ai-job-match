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
const PORT = process.env.PORT || 3001;

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

/**
 * Build a structured prompt that instructs Groq to return JSON.
 */
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

Return ONLY valid JSON (no markdown, no code fences) with this exact structure:
{
  "matchScore": <number 0-100>,
  "summary": "<2-3 sentence overall assessment>",
  "strengths": ["<strength 1>", "<strength 2>", ...],
  "weaknesses": ["<weakness 1>", "<weakness 2>", ...],
  "missingSkills": ["<skill 1>", "<skill 2>", ...],
  "presentSkills": ["<skill 1>", "<skill 2>", ...],
  "resumeImprovements": [
    { "section": "<section name>", "suggestion": "<what to improve>" },
    ...
  ],
  "learningRoadmap": [
    {
      "skill": "<skill to learn>",
      "priority": "<high|medium|low>",
      "resources": ["<resource 1>", "<resource 2>"],
      "timeEstimate": "<e.g. 2-4 weeks>"
    },
    ...
  ]
}

Be specific, actionable, and honest. Base the match score on how well the resume demonstrates the skills, experience, and qualifications asked for in the job description.
`;
}

/**
 * Extract text from an uploaded PDF buffer.
 */
async function extractPdfText(buffer) {
  const data = await pdf(buffer);
  return data.text;
}

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

/**
 * POST /api/analyze
 * Body (JSON):  { resumeText: string, jobDescription: string }
 * OR multipart: resume (file), jobDescription (field)
 */
app.post("/api/analyze", upload.single("resume"), async (req, res) => {
  try {
    let resumeText = "";
    const jobDescription = req.body.jobDescription;

    // Validate job description
    if (!jobDescription || jobDescription.trim().length === 0) {
      return res.status(400).json({ error: "Job description is required." });
    }

    // Get resume text — either from uploaded PDF or from text field
    if (req.file) {
      // PDF was uploaded
      resumeText = await extractPdfText(req.file.buffer);
    } else if (req.body.resumeText) {
      resumeText = req.body.resumeText;
    } else {
      return res.status(400).json({ error: "Resume text or PDF file is required." });
    }

    if (resumeText.trim().length === 0) {
      return res.status(400).json({ error: "Resume appears to be empty." });
    }

    // Call Groq
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: buildPrompt(resumeText, jobDescription) }],
      model: MODEL,
      response_format: { type: "json_object" },
    });

    const responseContent = chatCompletion.choices[0]?.message?.content;
    const analysis = JSON.parse(responseContent);

    return res.json({ success: true, analysis });
  } catch (error) {
    console.error("Analysis error:", error);

    // Specific error handling
    if (error instanceof SyntaxError) {
      return res.status(500).json({ error: "Failed to parse AI response. Please try again." });
    }

    return res.status(500).json({ error: error.message || "Internal server error." });
  }
});

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`✅ Backend running (Groq Mode) at http://localhost:${PORT}`);
});
