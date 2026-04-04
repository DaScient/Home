/**
 * formatter — Cleans and formats LLM output for display
 *
 * Utility functions to sanitise, truncate, and format text
 * returned from AI/LLM backends before rendering.
 */

/** Strip excessive whitespace and normalise line breaks */
export function cleanWhitespace(text: string): string {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Truncate text to a max length with an ellipsis */
export function truncate(text: string, maxLength: number = 500): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

/** Extract a plain-text summary from potentially formatted LLM output */
export function extractSummary(text: string, sentenceCount: number = 2): string {
  const sentences = text.split(/(?<=[.!?])\s+/);
  return sentences.slice(0, sentenceCount).join(" ");
}

/** Escape HTML entities for safe rendering in non-React contexts */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
