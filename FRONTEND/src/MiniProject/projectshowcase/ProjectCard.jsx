import React from 'react';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';

const ProjectCard = ({ project, onProjectClick }) => {
  if (!project) return null;

  return (
    <div 
      onClick={() => onProjectClick(project)}
      className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden
                 group flex flex-col h-full
                 transform hover:-translate-y-2 transition-all duration-300 
                 hover:shadow-2xl hover:shadow-yellow-500/10 hover:border-yellow-500/30 cursor-pointer"
    >
      <div className="relative overflow-hidden">
        <img 
          src={project.thumbnail || `https://source.unsplash.com/random/400x225?abstract,dark,${project.title}`} 
          alt={`${project.title || 'Project'} thumbnail`}
          className="w-full h-48 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 
          className="text-xl font-bold text-gray-100 transition-all duration-300 
                     group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-orange-400 group-hover:bg-clip-text group-hover:text-transparent"
        >
          {project.title || "Untitled Project"}
        </h3>
        
        <p className="text-gray-400 mt-2 text-sm flex-grow min-h-[40px]">
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
        
        <div className="mt-6 pt-4 border-t border-gray-700/50 flex justify-between items-center">
          <span className="text-sm font-semibold text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5">
            View Project
            <ArrowRight size={16} className="transform -translate-x-1 group-hover:translate-x-0 transition-transform duration-30á00"/>
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
    </div>
  );
};

export default ProjectCard;