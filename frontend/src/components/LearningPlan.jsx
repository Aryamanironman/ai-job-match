import { getPriorityColor } from "../utils/scoring";

/**
 * LearningPlan — Step-by-step learning roadmap with priorities and resources.
 */
export default function LearningPlan({ roadmap = [] }) {
  if (roadmap.length === 0) {
    return (
      <div className="glass-card p-8 text-center animate-fade-in-up">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-primary/15 flex items-center justify-center">
          <svg className="w-8 h-8 text-accent-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h4 className="text-lg font-semibold text-text-primary mb-1">All Caught Up!</h4>
        <p className="text-sm text-text-muted">No learning recommendations at this time.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in-up">
      {roadmap.map((item, i) => (
        <div key={i} className="glass-card p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              {/* Step number */}
              <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-accent-secondary">{i + 1}</span>
              </div>
              <h4 className="text-sm font-semibold text-text-primary">{item.skill}</h4>
            </div>

            {/* Priority badge */}
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${getPriorityColor(item.priority)}`}>
              {item.priority}
            </span>
          </div>

          {/* Time estimate */}
          {item.timeEstimate && (
            <div className="flex items-center gap-2 mb-3 ml-11">
              <svg className="w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs text-text-muted">{item.timeEstimate}</span>
            </div>
          )}

          {/* Resources */}
          {item.resources && item.resources.length > 0 && (
            <div className="ml-11">
              <p className="text-xs text-text-muted mb-2 font-medium">Recommended Resources:</p>
              <ul className="space-y-1.5">
                {item.resources.map((resource, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-text-secondary">
                    <span className="w-1 h-1 rounded-full bg-accent-secondary flex-shrink-0" />
                    {resource}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
