import { useEffect, useState } from "react";
import { getScoreColor, getScoreLabel } from "../utils/scoring";

/**
 * MatchScore — Large circular score display with animated progress ring.
 */
export default function MatchScore({ score, summary }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const colors = getScoreColor(score);
  const label = getScoreLabel(score);

  // SVG circle dimensions
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;

  // Animate score counting up
  useEffect(() => {
    let frame;
    let start = 0;
    const duration = 1200; // ms
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(eased * score));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [score]);

  return (
    <div className="glass-card p-8 animate-fade-in-up flex flex-col items-center" style={{ animationDelay: "0.2s" }}>
      {/* Circular Progress */}
      <div className="relative w-48 h-48 mb-6">
        <svg className="w-48 h-48 -rotate-90" viewBox="0 0 200 200">
          {/* Background ring */}
          <circle
            cx="100" cy="100" r={radius}
            fill="none"
            stroke="rgba(42, 42, 66, 0.8)"
            strokeWidth="10"
          />
          {/* Progress ring */}
          <circle
            cx="100" cy="100" r={radius}
            fill="none"
            stroke={colors.stroke}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="progress-ring"
            style={{ filter: `drop-shadow(0 0 8px ${colors.stroke}50)` }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-5xl font-bold ${colors.text}`}>
            {animatedScore}
          </span>
          <span className="text-lg text-text-muted">/ 100</span>
        </div>
      </div>

      {/* Label */}
      <h3 className={`text-xl font-semibold mb-2 ${colors.text}`}>{label}</h3>

      {/* Summary */}
      {summary && (
        <p className="text-sm text-text-secondary text-center max-w-md leading-relaxed">
          {summary}
        </p>
      )}
    </div>
  );
}
