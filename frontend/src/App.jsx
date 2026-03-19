import { useState } from "react";
import ResumeUpload from "./components/ResumeUpload";
import JobInput from "./components/JobInput";
import MatchScore from "./components/MatchScore";
import SkillsGap from "./components/SkillsGap";
import ResumeFeedback from "./components/ResumeFeedback";
import LearningPlan from "./components/LearningPlan";
import { analyzeResume } from "./utils/api";
import { cleanText, isValidInput } from "./utils/parser";

/**
 * App — Root component for AI Job Match & Skill Gap Analyzer.
 */
export default function App() {
  // ── State ──
  const [resumeText, setResumeText] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("skills");

  // ── Handlers ──
  const handleAnalyze = async () => {
    setError("");

    // Validate inputs
    const hasResume = resumeFile || isValidInput(resumeText);
    if (!hasResume) {
      setError("Please provide your resume (at least 10 words or upload a PDF).");
      return;
    }
    if (!isValidInput(jobDescription)) {
      setError("Please provide a job description (at least 10 words).");
      return;
    }

    setLoading(true);
    setAnalysis(null);

    try {
      const result = await analyzeResume({
        resumeText: cleanText(resumeText),
        resumeFile,
        jobDescription: cleanText(jobDescription),
      });
      setAnalysis(result);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Tab definitions
  const tabs = [
    { id: "skills", label: "Skills Gap", icon: "🎯" },
    { id: "feedback", label: "Resume Feedback", icon: "📝" },
    { id: "learning", label: "Learning Plan", icon: "📚" },
  ];

  return (
    <div className="min-h-screen bg-dark-900">
      {/* ── Header ── */}
      <header className="border-b border-border/30 bg-dark-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-center">
          <div className="flex items-center gap-3 group cursor-default">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center shadow-[0_0_20px_rgba(108,92,231,0.3)] group-hover:shadow-[0_0_25px_rgba(108,92,231,0.5)] transition-all duration-300">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-text-primary to-text-secondary tracking-tight">AI Job Match</h1>
              <p className="text-[11px] font-medium text-accent-secondary uppercase tracking-widest mt-0.5">Skill Gap Analyzer</p>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="max-w-6xl mx-auto px-6 py-8">

        {/* ── Input Section ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ResumeUpload
            resumeText={resumeText}
            onTextChange={setResumeText}
            onFileSelect={setResumeFile}
            selectedFile={resumeFile}
          />
          <JobInput
            jobDescription={jobDescription}
            onChange={setJobDescription}
          />
        </div>

        {/* ── Analyze Button ── */}
        <div className="flex flex-col items-center mb-10">
          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm max-w-md text-center animate-fade-in-up">
              {error}
            </div>
          )}

          <button
            className="btn-glow text-base px-10 py-3.5 flex items-center gap-3"
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="loader !w-5 !h-5 !border-2" />
                Analyzing...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Analyze Match
              </>
            )}
          </button>
        </div>

        {/* ── Loading State ── */}
        {loading && (
          <div className="flex flex-col items-center py-16 animate-fade-in-up">
            <div className="loader mb-4" />
            <p className="text-text-secondary text-sm">Analyzing your resume against the job description...</p>
            <p className="text-text-muted text-xs mt-1">This may take a few seconds</p>
          </div>
        )}

        {/* ── Results ── */}
        {analysis && !loading && (
          <div className="space-y-8 animate-fade-in-up">
            {/* Match Score */}
            <MatchScore
              score={analysis.matchScore}
              summary={analysis.summary}
            />

            {/* Tabs */}
            <div className="flex items-center gap-2 justify-center flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="pb-12">
              {activeTab === "skills" && (
                <SkillsGap
                  presentSkills={analysis.presentSkills}
                  missingSkills={analysis.missingSkills}
                  strengths={analysis.strengths}
                  weaknesses={analysis.weaknesses}
                />
              )}
              {activeTab === "feedback" && (
                <ResumeFeedback improvements={analysis.resumeImprovements} />
              )}
              {activeTab === "learning" && (
                <LearningPlan roadmap={analysis.learningRoadmap} />
              )}
            </div>
          </div>
        )}

        {/* ── Empty State ── */}
        {!analysis && !loading && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-dark-700 flex items-center justify-center animate-pulse-glow">
              <svg className="w-10 h-10 text-accent-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">Ready to Analyze</h3>
            <p className="text-text-muted text-sm max-w-sm mx-auto">
              Paste your resume and a job description above, then click <strong className="text-accent-secondary">Analyze Match</strong> to get started.
            </p>
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-border/30 py-6 mt-8">
        <p className="text-center text-xs text-text-muted">
          AI Job Match & Skill Gap Analyzer
        </p>
      </footer>
    </div>
  );
}
