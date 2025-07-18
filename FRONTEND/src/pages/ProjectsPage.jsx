import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

// --- FIXED IMPORTS ---
import ProjectGrid from '../features/projects/ProjectGrid';
import ProjectUploadModal from '../features/projects/ProjectUploadModal';
import ProjectDetailModal from '../features/projects/ProjectDetailModal';
import { useAuth } from '../contexts/AuthContext';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser, loading: authLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndShowProject = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`);
        if (!response.ok) throw new Error('Could not connect to the backend.');
        const data = await response.json();
        setProjects(data);

        const projectIdToOpen = location.state?.openProjectWithId;
        if (projectIdToOpen) {
          const projectToShow = data.find(p => p._id === projectIdToOpen);
          if (projectToShow) {
            setSelectedProject(projectToShow);
            navigate(location.pathname, { replace: true, state: {} });
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAndShowProject();
  }, [location.state, navigate]);

  const handleProjectSubmitted = (newProject) => {
    setProjects(prev => [newProject, ...prev]);
  };

  const renderContent = () => {
    if (isLoading) return <div className="text-center py-10 text-yellow-400">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;
    return <ProjectGrid projects={projects} onProjectClick={setSelectedProject} />;
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div><h1 className="text-3xl md:text-4xl font-extrabold text-white">Project Showcase</h1><p className="text-gray-400 mt-1">Discover and share community projects.</p></div>
          <button onClick={() => setIsUploadModalOpen(true)} disabled={authLoading || !currentUser} className="w-full sm:w-auto bg-yellow-500 text-black font-bold py-2.5 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-400 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"><Plus size={20} />Upload Project</button>
        </header>
        <main>{renderContent()}</main>
      </div>
      <ProjectUploadModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} onProjectSubmitted={handleProjectSubmitted} />
      <ProjectDetailModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
};
export default ProjectsPage;