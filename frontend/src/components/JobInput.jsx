/**
 * JobInput — Textarea for pasting a job description.
 */
export default function JobInput({ jobDescription, onChange }) {
  return (
    <div className="glass-card p-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
          <svg className="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Job Description</h2>
          <p className="text-sm text-text-muted">Paste the target job listing</p>
        </div>
      </div>

      <textarea
        value={jobDescription}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the job description here...&#10;&#10;Include requirements, responsibilities, and qualifications."
        className="w-full h-48 bg-dark-800 border border-border rounded-xl p-4 text-sm text-text-primary placeholder-text-muted resize-none focus:outline-none focus:border-success/50 focus:ring-1 focus:ring-success/25 transition-all"
      />

      {/* Word count */}
      {jobDescription && (
        <div className="mt-2 flex justify-end">
          <span className="text-xs text-text-muted">
            {jobDescription.split(/\s+/).filter(Boolean).length} words
          </span>
        </div>
      )}
    </div>
  );
}
