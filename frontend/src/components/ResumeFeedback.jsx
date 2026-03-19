/**
 * ResumeFeedback — Displays section-by-section resume improvement suggestions.
 */
export default function ResumeFeedback({ improvements = [] }) {
  if (improvements.length === 0) {
    return (
      <div className="glass-card p-8 text-center animate-fade-in-up">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success/15 flex items-center justify-center">
          <svg className="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h4 className="text-lg font-semibold text-text-primary mb-1">Resume Looks Great!</h4>
        <p className="text-sm text-text-muted">No major improvements suggested for this job.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 animate-fade-in-up">
      {improvements.map((item, i) => (
        <div key={i} className="glass-card p-5 flex gap-4">
          {/* Number badge */}
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent-primary/20 flex items-center justify-center">
            <span className="text-xs font-bold text-accent-secondary">{i + 1}</span>
          </div>

          <div className="flex-1 min-w-0">
            {/* Section name */}
            <h4 className="text-sm font-semibold text-accent-secondary mb-1">
              {item.section}
            </h4>
            {/* Suggestion */}
            <p className="text-sm text-text-secondary leading-relaxed">
              {item.suggestion}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
