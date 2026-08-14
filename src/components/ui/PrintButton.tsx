"use client";

export function PrintButton() {
  return (
    <button
      className="button button-primary print-hidden"
      type="button"
      onClick={() => window.print()}
    >
      Print or save PDF
    </button>
  );
}
