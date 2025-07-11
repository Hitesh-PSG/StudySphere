// src/AIMarkdownComponents.jsx
import React, { useState } from 'react';
import { Clipboard } from 'lucide-react';

// This object holds all the styling rules for the DETAILED view of the AI's message.
export const AIMarkdownComponents = {
  h2: ({ node, ...props }) => <h2 className="text-xl font-bold mt-4 mb-2 border-b border-slate-700 pb-2" {...props} />,
  h3: ({ node, ...props }) => <h3 className="text-lg font-semibold mt-4 mb-2" {...props} />,
  ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-2 mb-4" {...props} />,
  strong: ({ node, ...props }) => <strong className="font-semibold text-yellow-400" {...props} />,
  code({ node, inline, className, children, ...props }) {
    const [copied, setCopied] = useState(false);
    const match = /language-(\w+)/.exec(className || '');
    const handleCopy = () => {
      navigator.clipboard.writeText(String(children));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };
    return !inline && match ? (
      <div className="bg-slate-800 rounded-md my-4 relative">
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-700">
          <span className="text-xs font-sans text-slate-400">{match[1]}</span>
          <button onClick={handleCopy} className="text-xs text-slate-400 hover:text-white flex items-center">
            <Clipboard size={14} className="mr-1" />
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <pre className="p-4 overflow-x-auto"><code className={`font-mono text-sm ${className}`} {...props}>{children}</code></pre>
      </div>
    ) : (
      <code className="bg-slate-800 text-yellow-400 font-mono px-1.5 py-0.5 rounded-sm" {...props}>{children}</code>
    );
  },
};