import { useState, useRef } from "react";

/**
 * ResumeUpload — Handles both text input and PDF file upload for resumes.
 */
export default function ResumeUpload({ resumeText, onTextChange, onFileSelect, selectedFile }) {
  const [mode, setMode] = useState("text"); // "text" or "upload"
  const fileInputRef = useRef(null);

  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    if (file && file.type === "application/pdf") {
      onFileSelect(file);
      setMode("upload");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="glass-card p-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent-primary/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-accent-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Your Resume</h2>
            <p className="text-sm text-text-muted">Paste text or upload a PDF</p>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-1 bg-dark-800 rounded-lg p-1">
          <button
            onClick={() => setMode("text")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              mode === "text"
                ? "bg-accent-primary/25 text-accent-secondary"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            Text
          </button>
          <button
            onClick={() => setMode("upload")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              mode === "upload"
                ? "bg-accent-primary/25 text-accent-secondary"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            PDF
          </button>
        </div>
      </div>

      {/* Text Mode */}
      {mode === "text" && (
        <textarea
          value={resumeText}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Paste your resume content here...&#10;&#10;Include your experience, skills, education, and certifications."
          className="w-full h-48 bg-dark-800 border border-border rounded-xl p-4 text-sm text-text-primary placeholder-text-muted resize-none focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/25 transition-all"
        />
      )}

      {/* Upload Mode */}
      {mode === "upload" && (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
          onClick={() => fileInputRef.current?.click()}
          className="w-full h-48 bg-dark-800 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-accent-primary/40 transition-all"
        >
          {selectedFile ? (
            <>
              <div className="w-12 h-12 rounded-full bg-success/15 flex items-center justify-center">
                <svg className="w-6 h-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm text-text-primary font-medium">{selectedFile.name}</p>
              <p className="text-xs text-text-muted">{(selectedFile.size / 1024).toFixed(1)} KB • Click to change</p>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-accent-primary/15 flex items-center justify-center">
                <svg className="w-6 h-6 text-accent-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p className="text-sm text-text-secondary">Drag & drop your PDF here</p>
              <p className="text-xs text-text-muted">or click to browse</p>
            </>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}

      {/* Word count indicator */}
      {mode === "text" && resumeText && (
        <div className="mt-2 flex justify-end">
          <span className="text-xs text-text-muted">
            {resumeText.split(/\s+/).filter(Boolean).length} words
          </span>
        </div>
      )}
    </div>
  );
}
