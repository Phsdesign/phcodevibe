'use client';

import { useEffect, useState } from 'react';
import { prepare, layout } from '@chenglou/pretext';

export default function PretextExample() {
  const [measurement, setMeasurement] = useState<{ height: number; lineCount: number } | null>(null);
  const text = "Pretext is a pure JavaScript/TypeScript library for multiline text measurement & layout. It's fast, accurate and supports all languages.";
  const font = "16px Inter, system-ui, sans-serif";
  const maxWidth = 300;
  const lineHeight = 24;

  useEffect(() => {
    // 1. Prepare the text (one-time work)
    const prepared = prepare(text, font);
    
    // 2. Layout (cheap hot path)
    const result = layout(prepared, maxWidth, lineHeight);
    
    setMeasurement(result);
  }, []);

  return (
    <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800 max-w-md">
      <h2 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white">Pretext Integration</h2>
      
      <div className="mb-4">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">Text being measured:</p>
        <p className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg text-zinc-800 dark:text-zinc-200" style={{ width: maxWidth, fontSize: '16px', lineHeight: `${lineHeight}px` }}>
          {text}
        </p>
      </div>

      {measurement && (
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30">
            <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase">Calculated Height</p>
            <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{measurement.height.toFixed(2)}px</p>
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800/30">
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold uppercase">Line Count</p>
            <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{measurement.lineCount}</p>
          </div>
        </div>
      )}
      
      <p className="mt-4 text-xs text-zinc-400 dark:text-zinc-500 italic">
        * Measured using pretext without DOM reflow for maximum performance.
      </p>
    </div>
  );
}
