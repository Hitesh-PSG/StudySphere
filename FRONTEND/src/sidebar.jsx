import React from 'react';
import { NavLink, Link } from 'react-router-dom'; // --- CHANGE: Imported Link for the logo ---
import { Home, Search, BookOpen, Users, Bot, Layers } from 'lucide-react';

const Sidebar = ({ isAiPanelOpen, onToggleAiPanel, isMobileOpen, onMobileClose }) => {
  
  // --- CHANGE: AI Assistant is removed from this list for cleaner mapping ---
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/app/dashboard' },
    { id: 'discover', label: 'Discover', icon: Search, path: '/app/discover' },
    { id: 'articles', label: 'Articles', icon: BookOpen, path: '/app/articles' },
    { id: 'discussions', label: 'Discussions', icon: Users, path: '/app/discussions' },
    { id: 'projects', label: 'Projects', icon: Layers, path: '/app/projects' },
  ];
  
  // --- CHANGE: Consolidated styles for maintainability (DRY principle) ---
  const activeClasses = 'bg-yellow-500 text-black shadow-lg shadow-yellow-600/60';
  const inactiveClasses = 'text-yellow-400 hover:bg-orange-500/30 hover:text-orange-300';

  const getNavLinkClass = ({ isActive }) =>
    `w-full flex items-center space-x-4 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
      isActive ? activeClasses : inactiveClasses
    }`;

  const handleMobileLinkClick = () => {
    if (isMobileOpen) {
      onMobileClose();
    }
  };
  
  return (
    <>
      <div className={`
        fixed inset-y-0 left-0 w-64 lg:static lg:block
        z-50 border-r border-gray-800 shadow-lg
        transition-transform duration-300 ease-in-out lg:transform-none
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-gray-300
      `}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-6 flex-shrink-0">
            {/* --- CHANGE: Logo is now a clickable link to the dashboard --- */}
            <Link to="/app/dashboard" className="text-2xl font-bold text-yellow-400 tracking-wide drop-shadow-md transition-opacity hover:opacity-80">
              StudyHub
            </Link>
          </div>

          <div className="px-6">
            <hr className="mb-10 border-yellow-700" />
          </div>
          
          <nav className="px-6 flex-1">
            <ul className="space-y-2">
              {/* --- CHANGE: This map is now cleaner, only handling NavLinks --- */}
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <NavLink
                      to={item.path}
                      className={getNavLinkClass}
                      onClick={handleMobileLinkClick}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                );
              })}
              {/* --- CHANGE: AI Assistant button is handled separately for clarity --- */}
              <li key="ai-assistant">
                <button
                  onClick={() => { onToggleAiPanel(); handleMobileLinkClick(); }}
                  className={`w-full flex items-center space-x-4 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                    isAiPanelOpen ? activeClasses : inactiveClasses
                  }`}
                >
                  <Bot size={20} />
                  <span>AI Assistant</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      
      {isMobileOpen && (
        <div onClick={onMobileClose} className="fixed inset-0 bg-black/60 z-40 lg:hidden"></div>
      )}
    </>
  );
};

export default Sidebar;