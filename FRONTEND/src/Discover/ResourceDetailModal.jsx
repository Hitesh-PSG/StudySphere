// src/Discover/ResourceDetailModal.jsx
import React from 'react';
import { X, Star, ExternalLink, Youtube, BookOpen, Code, FileText, CheckCircle, Video } from 'lucide-react';

const ResourceDetailModal = ({ resource, isOpen, onClose, onAddToCollection, onOpenVideoPlayer }) => {
  if (!isOpen || !resource) return null;

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return Youtube;
      case 'article': return FileText;
      case 'github': return Code;
      case 'course': return BookOpen;
      default: return BookOpen;
    }
  };

  const TypeIcon = getTypeIcon(resource.type);

  const handleModalContentClick = (e) => e.stopPropagation();

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
        onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in-up"
        onClick={handleModalContentClick}
      >
        <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b p-4 md:p-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0"><TypeIcon size={24} className="text-blue-600" /></div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-gray-800">{resource.title}</h2>
              <p className="text-sm text-gray-600">by {resource.author}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"><X size={24} className="text-gray-600" /></button>
        </div>
        
        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{resource.fullDescription || resource.description}</p>
              </div>
              {resource.whatYouLearn && resource.whatYouLearn.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">What You'll Learn</h3>
                  <ul className="space-y-2">
                    {resource.whatYouLearn.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4 border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2"><Star size={20} className="text-yellow-500 fill-current" /><span className="font-semibold text-gray-800 text-lg">{resource.rating}</span></div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${resource.difficulty === 'beginner' ? 'bg-green-100 text-green-800' : resource.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{resource.difficulty}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                {resource.youtubeId && (
                  <button onClick={onOpenVideoPlayer} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold">
                    <Video size={20} /><span>Open Video Player</span>
                  </button>
                )}
                
                {/* This button will now only show if resource.link exists and is not empty */}
                {resource.link && (
                  <a href={resource.link} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                    <ExternalLink size={20} /><span>Go to Resource</span>
                  </a>
                )}

                {/* <button onClick={() => onAddToCollection?.(resource.id)} className="w-full px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
                  Save to Collection
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetailModal;