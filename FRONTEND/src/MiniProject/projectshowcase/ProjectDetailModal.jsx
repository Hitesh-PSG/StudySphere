// FRONTEND/src/MiniProject/projectshowcase/ProjectDetailModal.jsx

import React from 'react';
import { X, Github, ExternalLink } from 'lucide-react';

const ProjectDetailModal = ({ isOpen, onClose, project }) => {
  if (!isOpen || !project) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-lg flex justify-center items-center z-50 p-4 transition-opacity duration-300" 
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 border border-gray-700/50 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl shadow-black/50"
        onClick={e => e.stopPropagation()}
      >
        {/* --- NEW DEDICATED HEADER SECTION --- */}
        <div className="p-6 md:p-8 border-b border-gray-700/50 relative">
          <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-400">
            {project.title || "Untitled Project"}
          </h2>
          {/* We can now display the user's name, which adds a great touch! */}
          {project.userName && (
            <p className="text-gray-400 mt-2">A project by {project.userName}</p>
          )}
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-400 hover:text-white bg-gray-800/50 rounded-full p-1.5 transition-colors z-10"
            aria-label="Close modal"
          >
            <X size={22} />
          </button>
        </div>

        {/* --- MAIN CONTENT (Scrollable) --- */}
        <div className="overflow-y-auto p-6 md:p-8">
          {project.techStack && project.techStack.length > 0 && (
            <div className="flex flex-wrap gap-2.5 mb-6">
              {project.techStack.map((tech, index) => (
                <span key={index} className="bg-orange-500/10 text-orange-300 text-sm font-semibold px-3 py-1 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          )}
          
          <h3 className="text-lg font-semibold text-white mb-2">About this project</h3>
          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
            {project.fullDescription || project.shortDescription || "No detailed description was provided."}
          </p>

          <div className="mt-8 pt-6 border-t border-gray-700/50 flex flex-col sm:flex-row gap-4">
            {project.demoLink && (
              <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-400 transition-all">
                <ExternalLink size={20} /> View Live Demo
              </a>
            )}
             {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-gray-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-600 transition-all">
                <Github size={20} /> View on GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;