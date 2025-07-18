import React, { useState, useMemo, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

// --- FIXED IMPORTS ---
import { resources } from '../features/discover/resources';
import ResourceCard from '../features/discover/ResourceCard';
import ResourceDetailModal from '../features/discover/ResourceDetailModal';
import VideoPlayerModal from '../features/discover/VideoPlayerModal';
import SearchAndFilter from '../features/discover/SearchAndFilter';

const DiscoverPage = () => {
  const { setIsSidebarVisible } = useOutletContext();
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({ domain: '', difficulty: '', type: '', tags: [] });

  useEffect(() => {
    if (isVideoModalOpen) {
      setIsSidebarVisible(false);
    } else {
      setIsSidebarVisible(true);
    }
    return () => {
      setIsSidebarVisible(true);
    };
  }, [isVideoModalOpen, setIsSidebarVisible]);

  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = query === '' || 
        resource.title.toLowerCase().includes(query) ||
        resource.author.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query) ||
        (resource.tags && resource.tags.some(tag => tag.toLowerCase().includes(query)));
      const matchesDomain = activeFilters.domain ? resource.domain === activeFilters.domain : true;
      const matchesDifficulty = activeFilters.difficulty ? resource.difficulty === activeFilters.difficulty : true;
      const matchesType = activeFilters.type ? resource.type === activeFilters.type : true;
      const matchesTags = activeFilters.tags.length > 0
        ? activeFilters.tags.every(filterTag => resource.tags.includes(filterTag))
        : true;
      return matchesSearch && matchesDomain && matchesDifficulty && matchesType && matchesTags;
    });
  }, [searchQuery, activeFilters]);

  const handleCardClick = (resource) => {
    setSelectedResource(resource);
    setIsDetailModalOpen(true);
  };
  
  const handleOpenVideoPlayer = () => {
    if (selectedResource?.youtubeId) {
      setIsDetailModalOpen(false);
      setIsVideoModalOpen(true);
    }
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedResource(null);
  };
  
  const handleCloseVideoPlayer = () => {
    setIsVideoModalOpen(false);
    setSelectedResource(null);
  };

  const handleAddToCollection = (resourceId) => {
    const resource = resources.find(r => r.id === resourceId);
    alert(`Resource "${resource.title}" added to your collection!`);
  };

  return (
    <div id="discover-section" className="bg-slate-900 min-h-screen text-slate-200">
      <div className="container mx-auto p-4 md:p-8">
        <div className="text-center mb-10"><h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Resource Hub</h1><p className="text-lg text-slate-400">Explore our curated list of courses, videos, and articles.</p></div>
        <SearchAndFilter onSearch={setSearchQuery} onFilterChange={setActiveFilters} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{filteredResources.map(resource => ( <ResourceCard key={resource.id} resource={resource} onCardClick={handleCardClick} onAddToCollection={handleAddToCollection} /> ))}</div>
        {filteredResources.length === 0 && ( <div className="text-center py-20"><h3 className="text-2xl font-semibold text-white">No Results Found</h3><p className="text-slate-400 mt-2">Try adjusting your search or clearing some filters.</p></div> )}
        <ResourceDetailModal isOpen={isDetailModalOpen} resource={selectedResource} onClose={handleCloseDetailModal} onAddToCollection={handleAddToCollection} onOpenVideoPlayer={handleOpenVideoPlayer} />
        {isVideoModalOpen && ( <VideoPlayerModal resource={selectedResource} onClose={handleCloseVideoPlayer} /> )}
      </div>
    </div>
  );
};
export default DiscoverPage;