"use client";

export function PrintButton() {
  return (
    <button
      className="resume-print-button print-hidden"
      type="button"
      onClick={() => window.print()}
      title="Open the print dialog to print or save this résumé as a PDF"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 8V3.5h10V8M7 17H5.5A2.5 2.5 0 0 1 3 14.5v-4A2.5 2.5 0 0 1 5.5 8h13a2.5 2.5 0 0 1 2.5 2.5v4a2.5 2.5 0 0 1-2.5 2.5H17" />
        <path d="M7 14h10v6.5H7zM17.5 11.5h.01" />
      </svg>
      <span>
        <strong>Print résumé</strong>
        <small>or save as PDF</small>
      </span>
      <span aria-hidden="true">↗</span>
    </button>
  );
}
