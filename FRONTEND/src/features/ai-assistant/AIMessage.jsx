// src/AIMessage.jsx

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { AIMarkdownComponents } from './AIMarkdownComponents'; // Import our styles

const AIMessage = ({ message }) => {
  // We expect the 'message' object to have a 'summary' and 'details'
  const { summary, details } = message;
  
  // This state controls whether the details are shown or hidden
  const [isExpanded, setIsExpanded] = useState(false);

  // If for some reason there are no details, just show the summary
  if (!details) {
    return <p>{summary}</p>;
  }

  return (
    // The component now has its own stylish "card" container
    <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-4">
      
      {/* 1. The Summary: Always visible */}
      <p className="text-slate-200 mb-4">{summary}</p>
      
      {/* 2. The Expander Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center text-sm text-yellow-500 hover:text-yellow-400 font-semibold transition-colors"
      >
        {isExpanded ? 'Show Less' : 'Read More'}
        {isExpanded ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
      </button>

      {/* 3. The Detailed View: Only shown when 'isExpanded' is true */}
      {isExpanded && (
        <div className="prose prose-invert max-w-none border-t border-slate-700 mt-4 pt-4">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={AIMarkdownComponents} // Use the styles from our other file
          >
            {details}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default AIMessage;