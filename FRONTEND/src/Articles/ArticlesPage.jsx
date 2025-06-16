// src/Articles/ArticlesPage.jsx

import React, { useState } from 'react';
import { articles } from './article';
import ArticleView from './ArticleView';
import { Star, Clock, ExternalLink } from 'lucide-react';

const filterCategories = ['All Articles', 'DSA', 'Web Development', 'System Design', 'Interview Prep', 'Data Science', 'CS Core'];

const ArticlesPage = () => {
  const [activeFilter, setActiveFilter] = useState('All Articles');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const featuredArticles = articles.filter(article => article.isFeatured);

  const filteredList = activeFilter === 'All Articles'
    ? articles
    : articles.filter(article => {
        if (Array.isArray(article.category)) {
          return article.category.includes(activeFilter);
        }
        return article.category === activeFilter;
      });

  const handleArticleSelect = (article) => {
    if (article.isEmbeddable) {
      setSelectedArticle(article);
    } else {
      window.open(article.articleUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
  };
  
  const renderArticleCard = (article) => {
    const { isFeatured, category, title, description, author, readTime, tags, imageUrl, isEmbeddable } = article;

    return (
      <button
        key={article.id}
        onClick={() => handleArticleSelect(article)}
        className="h-full rounded-lg flex flex-col text-left transition-all duration-300 overflow-hidden border border-slate-700/60 bg-slate-800 hover:border-yellow-500/50 hover:scale-[1.03] hover:shadow-lg hover:shadow-yellow-500/10 relative group"
      >
        {!isEmbeddable && (
          <div className="absolute top-2 right-2 bg-slate-900/50 backdrop-blur-sm rounded-full p-1.5 text-slate-300 z-10" title="Opens in new tab">
            <ExternalLink size={14} />
          </div>
        )}
        <div className="h-28 w-full flex items-center justify-center bg-slate-900/50 p-3 overflow-hidden border-b border-slate-700/60">
          <img
            src={imageUrl}
            alt={`${title} Logo`}
            className="max-h-full max-w-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">
              {Array.isArray(category) ? category.join(' / ') : category}
            </span>
            {isFeatured && (
              <div className="flex items-center text-[11px] font-bold text-yellow-300 bg-yellow-500/10 px-2 py-0.5 rounded-full flex-shrink-0 ml-2">
                <Star size={12} className="mr-1 fill-yellow-400" />
                Featured
              </div>
            )}
          </div>
          <h3 className="text-base font-bold text-white mb-2 line-clamp-2">{title}</h3>
          <p className="text-sm text-slate-400 mb-4 flex-grow line-clamp-2">{description}</p>
          <div className="mt-auto pt-3 border-t border-slate-700/50">
            <div className="flex items-center text-xs text-slate-500">
              <span>By {author}</span>
              <span className="mx-1.5">•</span>
              <Clock size={12} className="mr-1" />
              <span>{readTime}</span>
            </div>
          </div>
        </div>
      </button>
    );
  };

  return (
    <>
      {selectedArticle ? (
        <ArticleView article={selectedArticle} onClose={handleCloseArticle} />
      ) : (
        <div className="text-white p-4 md:p-6 max-w-7xl mx-auto">
          <header className="mb-10 text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">Articles & Blogs</h1>
            <p className="text-base text-slate-400">Discover in-depth articles and tutorials from top educators</p>
            <p className="text-sm text-yellow-400 mt-2">{articles.length} articles available</p>
          </header>

          {/* --- THIS IS THE CORRECTED SECTION --- */}
          <section className="mb-12">
            {/* CHANGE 1: Title is now centered to match the constrained grid below it. */}
            <h2 className="text-2xl font-bold mb-4 text-center">Featured Articles</h2>
            <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>

            {/* CHANGE 2: A wrapper div that limits the width and centers the grid. */}
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredArticles.map(renderArticleCard)}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-5 border-l-4 border-yellow-400 pl-3">All Articles</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {filterCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-colors ${
                    activeFilter === category
                      ? 'bg-yellow-500 text-black'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredList.map(renderArticleCard)}
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default ArticlesPage;