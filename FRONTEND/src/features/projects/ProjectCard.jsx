// FRONTEND/src/MiniProject/projectshowcase/ProjectCard.jsx

import React from 'react';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';

const ProjectCard = ({ project, onProjectClick }) => {
  if (!project) return null;

  return (
    <div 
      onClick={() => onProjectClick(project)}
      className="bg-gradient-to-br from-gray-900 to-gray-800/70 border border-gray-700/50 rounded-2xl
                 group flex flex-col h-full p-6
                 transform hover:-translate-y-2 transition-all duration-300 
                 hover:shadow-2xl hover:shadow-yellow-500/10 hover:border-yellow-500/30 cursor-pointer"
    >
      {/* --- The Image section has been completely removed --- */}
      
      {/* --- MAIN CONTENT AREA --- */}
      {/* We use flex-grow to push the footer to the bottom */}
      <div className="flex flex-col flex-grow">
        <h3 
          className="text-xl font-bold text-gray-100 transition-all duration-300 
                     group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-orange-400 group-hover:bg-clip-text group-hover:text-transparent"
        >
          {project.title || "Untitled Project"}
        </h3>
        
        <p className="text-gray-400 mt-2 text-sm flex-grow min-h-[60px]">
          {project.shortDescription || "No description provided."}
        </p>

        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {project.techStack.slice(0, 3).map((tech, index) => (
              <span key={index} className="bg-orange-500/10 text-orange-300 text-xs font-semibold px-3 py-1 rounded-full">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {/* --- FOOTER SECTION --- */}
      {/* This section is now visually separated by a border-top */}
      <div className="mt-6 pt-4 border-t border-gray-700/50 flex justify-between items-center">
        <span className="text-sm font-semibold text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5">
          View Details
          <ArrowRight size={16} className="transform -translate-x-1 group-hover:translate-x-0 transition-transform duration-300"/>
        </span>
        <div className="flex items-center space-x-4">
          {project.githubLink && (
            <a 
              href={project.githubLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={(e) => e.stopPropagation()} 
              className="text-gray-400 hover:text-white transition-colors" 
              aria-label="GitHub Repository"
            >
              <Github size={20} />
            </a>
          )}
          {project.demoLink && (
            <a 
              href={project.demoLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={(e) => e.stopPropagation()} 
              className="text-gray-400 hover:text-white transition-colors" 
              aria-label="Live Demo"
            >
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;