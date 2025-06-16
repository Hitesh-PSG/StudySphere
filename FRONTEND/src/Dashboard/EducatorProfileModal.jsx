// src/Dashboard/EducatorProfileModal.jsx

import React, { useEffect } from 'react';
import { X, Youtube, Linkedin, Twitter, Users, Video, Calendar } from 'lucide-react';

const EducatorProfileModal = ({ educator, onClose }) => {
  // Effect to handle the 'Escape' key press to close the modal
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!educator) return null;

  return (
    // The Modal Backdrop
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose} // Close modal on backdrop click
    >
      {/* The Modal Content */}
      <div 
        className="relative bg-slate-800 text-slate-300 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700"
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
          <X size={24} />
        </button>

        {/* Modal Header */}
        <div className="p-6 sm:p-8 border-b border-slate-700">
          <div className="flex items-start sm:items-center gap-5 flex-col sm:flex-row">
            <img src={educator.avatarUrl} alt={educator.name} className="w-24 h-24 rounded-full border-4 border-slate-600" />
            <div>
              <h2 className="text-2xl font-bold text-slate-100">{educator.name}</h2>
              <p className="text-yellow-400 font-semibold">{educator.specialty}</p>
              <div className="flex items-center gap-4 mt-3">
                 <a href={educator.channelUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-900 bg-red-500 rounded-md hover:bg-red-400 transition-colors">
                    <Youtube size={16} />
                    Visit Channel
                  </a>
                  <a href={educator.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400"><Linkedin size={20} /></a>
                  <a href={educator.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400"><Twitter size={20} /></a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Description */}
          <div>
            <h3 className="font-semibold text-slate-200 mb-2">About</h3>
            <p className="text-slate-400 leading-relaxed">{educator.description}</p>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-slate-700/50 p-3 rounded-lg">
              <Users size={20} className="mx-auto text-slate-400 mb-1" />
              <p className="font-bold text-lg text-slate-100">{educator.stats.subscribers}</p>
              <p className="text-xs text-slate-400">Subscribers</p>
            </div>
            <div className="bg-slate-700/50 p-3 rounded-lg">
              <Video size={20} className="mx-auto text-slate-400 mb-1" />
              <p className="font-bold text-lg text-slate-100">{educator.stats.videos}</p>
              <p className="text-xs text-slate-400">Videos</p>
            </div>
            <div className="bg-slate-700/50 p-3 rounded-lg">
              <Calendar size={20} className="mx-auto text-slate-400 mb-1" />
              <p className="font-bold text-lg text-slate-100">{educator.stats.joined}</p>
              <p className="text-xs text-slate-400">Joined</p>
            </div>
          </div>

          {/* Popular Topics */}
          <div>
            <h3 className="font-semibold text-slate-200 mb-3">Known For</h3>
            <div className="flex flex-wrap gap-2">
              {educator.popularTopics.map(topic => (
                <span key={topic} className="bg-slate-700 text-slate-300 px-3 py-1.5 rounded-full text-sm font-medium">
                  {topic}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EducatorProfileModal;