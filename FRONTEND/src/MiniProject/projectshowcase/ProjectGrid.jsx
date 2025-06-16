import React from 'react';
import ProjectCard from './ProjectCard';

const ProjectGrid = ({ projects, onProjectClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {projects.map(project => (
        <ProjectCard
          key={project._id}
          project={project}
          onProjectClick={onProjectClick}
        />
      ))}
    </div>
  );
};

export default ProjectGrid;