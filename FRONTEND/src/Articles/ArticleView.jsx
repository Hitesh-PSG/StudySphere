// src/Articles/ArticleView.jsx

import React from 'react';
import { X, ExternalLink } from 'lucide-react';

// The component receives the 'onClose' function as a prop.
const ArticleView = ({ article, onClose }) => {
  // This 'useEffect' hook prevents the main page from scrolling while the overlay is open.
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-sm flex flex-col p-4">
      {/* Header with Close Button and Title */}
      <header className="flex items-center justify-between p-2 bg-slate-900/80 rounded-t-lg border-b border-slate-700 w-full flex-shrink-0">
        {/* The onClick event calls the 'onClose' function we received from the parent. */}
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white rounded-full p-2 transition-colors"
          aria-label="Close article"
        >
          <X size={24} />
        </button>
        <h2 className="text-lg font-bold text-white truncate px-4">{article.title}</h2>
        <a
          href={article.articleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sm text-slate-400 hover:text-yellow-400 p-2"
          aria-label="Open in new tab"
        >
          <ExternalLink size={18} />
        </a>
      </header>

      {/* The Iframe to embed the external content */}
      <div className="w-full flex-grow bg-white rounded-b-lg overflow-hidden">
        <iframe
          src={article.articleUrl}
          title={article.title}
          className="w-full h-full border-0"
        ></iframe>
      </div>
    </div>
  );
};

export default ArticleView;