/**
 * api.js — Centralized API calls to the backend.
 */

const API_BASE = "/api";

/**
 * Analyze resume against a job description.
 * Supports both text and PDF upload.
 *
 * @param {Object} params
 * @param {string} [params.resumeText] — Plain text resume
 * @param {File}   [params.resumeFile] — PDF file
 * @param {string}  params.jobDescription — Job description text
 * @returns {Promise<Object>} — Parsed analysis result
 */
export async function analyzeResume({ resumeText, resumeFile, jobDescription }) {
  let response;

  if (resumeFile) {
    // Multipart upload for PDF
    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("jobDescription", jobDescription);

    response = await fetch(`${API_BASE}/analyze`, {
      method: "POST",
      body: formData,
    });
  } else {
    // JSON body for text input
    response = await fetch(`${API_BASE}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resumeText, jobDescription }),
    });
  }

  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: "Network error" }));
    throw new Error(err.error || `Server error (${response.status})`);
  }

  const data = await response.json();
  return data.analysis;
}
