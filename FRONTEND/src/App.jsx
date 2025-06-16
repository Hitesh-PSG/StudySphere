import React, { useState, useEffect } from "react";
import { Routes, Route, Outlet } from 'react-router-dom';

// --- CONTEXT IMPORTS ---
import { AuthProvider, useAuth } from './Login/AuthContext';
import NotificationProvider from './NotificationContext.jsx';
import { ThemeProvider } from './ThemeContext.jsx';
import { LoginModalProvider, useLoginModal } from './Login/LoginModalContext';

// --- COMPONENT IMPORTS ---
import Header from "./header.jsx";
import Footer from "./footer.jsx";
import Sidebar from "./sidebar.jsx";
import AIassistant from "./AI/AIasssistant.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import Discover from "./Discover/Discover.jsx";
import ArticlesPage from "./Articles/ArticlesPage.jsx";
import LoginModal from "./Login/LoginModal.jsx";
import Projects from './MiniProject/projectshowcase/Projects.jsx'; // Correct import
import { Menu } from 'lucide-react';

// --- REFORMATTED FOR READABILITY ---
// This component defines the main structure of your application (Sidebar, Header, etc.)
const MainLayout = () => {
    // State for the AI Assistant panel
    const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);
    // State for the mobile sidebar
    const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    // Toggles the AI panel and closes the mobile sidebar if it's open
    const toggleAiPanel = () => {
        setIsAiPanelOpen(prev => !prev);
        setMobileSidebarOpen(false); // Ensure mobile menu closes
    };

    // Toggles the mobile sidebar
    const toggleMobileSidebar = () => {
        setMobileSidebarOpen(prev => !prev);
    };

    // A side effect to prevent background scrolling when a modal or overlay is open
    useEffect(() => {
        if (isAiPanelOpen || isMobileSidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isAiPanelOpen, isMobileSidebarOpen]);

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-100">
            <Sidebar
                isAiPanelOpen={isAiPanelOpen}
                onToggleAiPanel={toggleAiPanel}
                isMobileOpen={isMobileSidebarOpen}
                onMobileClose={() => setMobileSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col overflow-hidden relative">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto">
                    {/* The <Outlet> is where your page components (Dashboard, Projects, etc.) will be rendered */}
                    <Outlet />
                </main>
                <Footer />
            </div>
            
            {/* Mobile "Hamburger" Menu Button */}
            {!isMobileSidebarOpen && (
                <button
                    onClick={toggleMobileSidebar}
                    className="lg:hidden fixed top-3 left-4 z-50 p-2 rounded-md text-gray-400 bg-gray-900/50 backdrop-blur-sm hover:text-white hover:bg-gray-700"
                    aria-label="Open sidebar"
                >
                    <Menu size={24} />
                </button>
            )}

            {/* AI Panel Overlay */}
            {isAiPanelOpen && (
                <div className="fixed inset-0 bg-black/60 z-40" onClick={toggleAiPanel}></div>
            )}
            
            <AIassistant isOpen={isAiPanelOpen} onClose={toggleAiPanel} />
        </div>
    );
};

// This component handles the core application logic and routing
const AppLogic = () => {
  const { currentUser } = useAuth();
  const { openModal } = useLoginModal();

  // Effect to prompt login for non-authenticated users
  useEffect(() => {
    if (!currentUser) {
      const timer = setTimeout(() => {
        openModal();
      }, 4000); 

      return () => clearTimeout(timer);
    }
  }, [currentUser, openModal]);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Nested routes are rendered inside MainLayout's <Outlet> */}
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="discover" element={<Discover />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="collections" element={<div className="p-8"><h1 className="text-3xl font-bold">Collections</h1></div>} />
          <Route path="discussions" element={<div className="p-8"><h1 className="text-3xl font-bold">Discussions</h1></div>} />
          
          {/* --- THIS ROUTE IS CORRECT --- */}
          {/* It matches the '/projects' link in your sidebar */}
          <Route path="projects" element={<Projects />} />

        </Route>
      </Routes>
      <LoginModal />
    </>
  );
};

// The top-level component that wraps everything in context providers
const App = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <LoginModalProvider>
            <AppLogic />
          </LoginModalProvider>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;