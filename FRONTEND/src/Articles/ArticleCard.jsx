// src/Articles/ArticleCard.jsx

import React from 'react';
import { Star, Clock, ExternalLink } from 'lucide-react';

const ArticleCard = ({ article, onArticleSelect }) => {
  const { isFeatured, category, title, description, author, readTime, tags, imageUrl, isEmbeddable } = article;

  const cardClasses = 'bg-slate-800 border-slate-700/60';

  return (
    <button
      onClick={() => onArticleSelect(article)}
      className={`rounded-lg flex flex-col text-left transition-all duration-300 overflow-hidden border ${cardClasses} hover:border-yellow-500/50 hover:scale-[1.03] hover:shadow-lg hover:shadow-yellow-500/10 relative group`}
    >
      {!isEmbeddable && (
        <div className="absolute top-3 right-3 bg-slate-900/50 backdrop-blur-sm rounded-full p-1.5 text-slate-300 z-10" title="Opens in new tab">
          <ExternalLink size={16} />
        </div>
      )}

      {/* --- THIS IS THE CORRECTED IMAGE CONTAINER --- */}
      {/*
        - We give it a fixed height (h-40) for consistency.
        - We use flexbox to perfectly center the logo inside.
        - A slightly lighter background makes logos with transparency look clean.
      */}
      <div className="h-40 w-full flex items-center justify-center bg-slate-900/50 p-4 overflow-hidden border-b border-slate-700/60">
        <img 
          src={imageUrl} 
          alt={`${title} Logo`} 
          // 'object-contain' is the key change. It ensures the entire logo is visible.
          className="max-h-full max-w-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-110" 
        />
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-wrap gap-x-2 gap-y-1">
            {Array.isArray(category) ? (
              category.map(cat => (
                <span key={cat} className="text-sm font-semibold text-yellow-400">{cat}</span>
              ))
            ) : (
              <span className="text-sm font-semibold text-yellow-400">{category}</span>
            )}
          </div>
          
          {isFeatured && (
            <div className="flex items-center text-xs font-bold text-yellow-300 bg-yellow-500/10 px-2 py-1 rounded-full flex-shrink-0 ml-2">
              <Star size={14} className="mr-1 fill-yellow-400" />
              Featured
            </div>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-slate-400 mb-6 flex-grow">{description}</p>
        
        <div className="mt-auto">
          <div className="flex items-center text-sm text-slate-500 mb-4">
            <span>By {author}</span>
            <span className="mx-2">•</span>
            <Clock size={14} className="mr-1" />
            <span>{readTime}</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <span key={tag} className="text-xs text-slate-300 bg-slate-700 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
};

export default ArticleCard;