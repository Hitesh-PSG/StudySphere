// src/Discover/SearchAndFilter.jsx
import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

const SearchAndFilter = ({ onSearch, onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({ domain: '', difficulty: '', type: '', tags: [] });

  const domains = ['Web Development', 'DevOps', 'Backend Development', 'Data Science', 'Software Engineering', 'Mobile Development', 'Artificial Intelligence', 'Computer Science'];
  const difficulties = ['beginner', 'intermediate', 'advanced'];
  const types = ['video', 'article', 'course', 'book'];
  const popularTags = ['React', 'JavaScript', 'Python', 'Node.js', 'CSS', 'DSA', 'Docker', 'Kubernetes', 'Flutter', 'NLP'];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleFilter = (filterKey, value) => {
    const newFilters = { ...activeFilters, [filterKey]: value };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleTagToggle = (tag) => {
    const newTags = activeFilters.tags.includes(tag) ? activeFilters.tags.filter(t => t !== tag) : [...activeFilters.tags, tag];
    handleFilter('tags', newTags);
  };
  
  const hasActiveFilters = activeFilters.domain || activeFilters.difficulty || activeFilters.type || activeFilters.tags.length > 0;

  const clearFilters = () => {
    const emptyFilters = { domain: '', difficulty: '', type: '', tags: [] };
    setActiveFilters(emptyFilters);
    onFilterChange(emptyFilters);
    setSearchQuery('');
    onSearch('');
  };

  const FilterSelect = ({ label, value, options, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
        <select value={value} onChange={e => onChange(e.target.value)} className="w-full p-2 bg-slate-700 text-slate-100 border border-slate-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-500">
            <option value="">All</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
  );

  return (
    <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-4 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search for 'React', 'DSA', 'Python'..." className="w-full pl-12 pr-4 py-3 bg-slate-700 text-slate-100 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" />
        </div>
        <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-colors ${showFilters || hasActiveFilters ? 'bg-yellow-500 text-slate-900 border-yellow-500' : 'bg-slate-700 text-slate-300 border-slate-600 hover:bg-slate-600'}`}>
          <Filter size={18} />
          <span>Filters</span>
          {hasActiveFilters && (<span className="bg-slate-900 text-yellow-400 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">{[activeFilters.domain, activeFilters.difficulty, activeFilters.type, ...activeFilters.tags].filter(Boolean).length}</span>)}
        </button>
      </div>
      
      {showFilters && (
        <div className="mt-4 pt-4 border-t border-slate-700 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FilterSelect label="Domain" value={activeFilters.domain} options={domains} onChange={(v) => handleFilter('domain', v)} />
            <FilterSelect label="Difficulty" value={activeFilters.difficulty} options={difficulties} onChange={(v) => handleFilter('difficulty', v)} />
            <FilterSelect label="Type" value={activeFilters.type} options={types} onChange={(v) => handleFilter('type', v)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Popular Tags</label>
            <div className="flex flex-wrap gap-2">
              {popularTags.map(tag => (
                <button key={tag} onClick={() => handleTagToggle(tag)} className={`px-3 py-1 rounded-full text-sm transition-colors ${activeFilters.tags.includes(tag) ? 'bg-yellow-500 text-slate-900 font-semibold' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
                  {tag}
                </button>
              ))}
            </div>
          </div>
          {hasActiveFilters && (
            <div className="flex justify-end pt-2">
              <button onClick={clearFilters} className="flex items-center gap-1 px-3 py-1 text-slate-400 hover:text-white transition-colors text-sm"><X size={16} /><span>Clear All Filters</span></button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;