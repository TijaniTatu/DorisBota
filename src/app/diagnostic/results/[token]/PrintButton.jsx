'use client';

import { Printer } from 'lucide-react';

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-3 border border-white/45 px-7 py-4 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-deep"
    >
      <Printer size={17} strokeWidth={1.5} aria-hidden="true" />
      Print or save as PDF
    </button>
  );
}
