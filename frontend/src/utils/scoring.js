/**
 * scoring.js — Helpers for displaying scores and colors.
 */

/**
 * Get color class based on match score.
 */
export function getScoreColor(score) {
  if (score >= 80) return { text: "text-green-400", bg: "bg-green-400", stroke: "#00cec9" };
  if (score >= 60) return { text: "text-yellow-400", bg: "bg-yellow-400", stroke: "#fdcb6e" };
  if (score >= 40) return { text: "text-orange-400", bg: "bg-orange-400", stroke: "#e17055" };
  return { text: "text-red-400", bg: "bg-red-400", stroke: "#ff7675" };
}

/**
 * Get a label for the match quality.
 */
export function getScoreLabel(score) {
  if (score >= 85) return "Excellent Match";
  if (score >= 70) return "Strong Match";
  if (score >= 55) return "Good Match";
  if (score >= 40) return "Moderate Match";
  if (score >= 25) return "Partial Match";
  return "Low Match";
}

/**
 * Get priority badge color.
 */
export function getPriorityColor(priority) {
  switch (priority?.toLowerCase()) {
    case "high":   return "text-red-400 bg-red-400/15 border-red-400/30";
    case "medium": return "text-yellow-400 bg-yellow-400/15 border-yellow-400/30";
    case "low":    return "text-green-400 bg-green-400/15 border-green-400/30";
    default:       return "text-gray-400 bg-gray-400/15 border-gray-400/30";
  }
}
