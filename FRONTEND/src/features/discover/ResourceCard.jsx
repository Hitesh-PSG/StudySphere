// src/Discover/ResourceCard.jsx
import React from 'react';
import { ExternalLink, Clock, Star, User, Bookmark } from 'lucide-react';

const ResourceCard = ({ resource, onCardClick, onAddToCollection }) => {
  const getTypeColor = (type) => {
    switch (type) {
      case 'video': return 'bg-red-100 text-red-700';
      case 'article': return 'bg-green-100 text-green-700';
      case 'github': return 'bg-gray-200 text-gray-800';
      case 'course': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-transparent hover:border-blue-500 cursor-pointer flex flex-col h-full"
      onClick={() => onCardClick?.(resource)}
    >
      <img src={resource.imageUrl} alt={resource.title} className="w-full h-40 object-cover rounded-t-xl" />
      <div className="p-4 flex flex-col flex-grow">
        <span className={`px-3 py-1 mb-2 rounded-full text-xs font-medium self-start ${getTypeColor(resource.type)}`}>
            {resource.type.toUpperCase()}
        </span>
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 h-14">
          {resource.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {resource.description}
        </p>
        <div className="border-t border-gray-100 pt-3 mt-auto">
             <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-2 truncate">
                    <User size={14} />
                    <span className="truncate" title={resource.author}>{resource.author}</span>
                </div>
                <div className="flex items-center space-x-1 text-yellow-500 flex-shrink-0">
                    <Star size={16} fill="currentColor" />
                    <span className="text-sm text-gray-600 font-semibold">{resource.rating}</span>
                </div>
            </div>
        </div>
      </div>
      <div 
        className="bg-gray-50 p-3 flex items-center justify-end gap-2 border-t border-gray-100 rounded-b-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* <button
          onClick={() => onAddToCollection?.(resource.id)}
          title="Save to collection"
          className="p-2 text-gray-500 hover:text-white rounded-md hover:bg-blue-500 transition-colors"
        > */}
          {/* <Bookmark size={18} /> */}
        {/* </button> */}
        {/* <a
          href={resource.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm font-semibold"
        >
          <ExternalLink size={16} />
          <span>View</span>
        </a> */}
      </div>
    </div>
  );
};

export default ResourceCard;