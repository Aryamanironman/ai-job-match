/**
 * parser.js — Client-side text utilities for resume/job description.
 */

/**
 * Clean and normalize pasted text.
 * Removes excessive whitespace and trims.
 */
export function cleanText(text) {
  if (!text) return "";
  return text
    .replace(/\r\n/g, "\n")       // Normalize line endings
    .replace(/\t/g, " ")          // Replace tabs with spaces
    .replace(/ {2,}/g, " ")       // Collapse multiple spaces
    .replace(/\n{3,}/g, "\n\n")   // Collapse 3+ newlines into 2
    .trim();
}

/**
 * Estimate rough word count.
 */
export function wordCount(text) {
  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
}

/**
 * Check if text has reasonable content for analysis.
 */
export function isValidInput(text, minWords = 10) {
  return wordCount(text) >= minWords;
}
