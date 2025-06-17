import React, { useState, useEffect } from "react";
import { Routes, Route, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // --- ADD THIS IMPORT for notifications

// --- CONTEXT IMPORTS ---
import { AuthProvider, useAuth } from './Login/AuthContext';
import NotificationProvider from './NotificationContext.jsx';
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
import Projects from './MiniProject/projectshowcase/Projects.jsx';
import { Menu } from 'lucide-react';

// --- IMPORT YOUR NEW DISCUSSION PAGE ---
import DiscussionPage from './Discussions/DiscussionPage'; // Assuming files are in src/Discussions/

// This component defines the main structure of your application
const MainLayout = () => {
    const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);
    const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const toggleAiPanel = () => {
        setIsAiPanelOpen(prev => !prev);
        setMobileSidebarOpen(false);
    };

    const toggleMobileSidebar = () => {
        setMobileSidebarOpen(prev => !prev);
    };

    useEffect(() => {
        if (isAiPanelOpen || isMobileSidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isAiPanelOpen, isMobileSidebarOpen]);

    return (
        <div className="flex h-screen bg-slate-900 text-slate-100">
            <Sidebar
                isAiPanelOpen={isAiPanelOpen}
                onToggleAiPanel={toggleAiPanel}
                isMobileOpen={isMobileSidebarOpen}
                onMobileClose={() => setMobileSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col overflow-hidden relative">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
                    {/* --- ADD THE TOASTER COMPONENT HERE --- */}
                    <Toaster
                        position="top-center"
                        reverseOrder={false}
                        toastOptions={{
                            className: '',
                            style: {
                                background: '#334155', // slate-700
                                color: '#f1f5f9', // slate-100
                            },
                        }}
                    />
                    <Outlet />
                </main>
                <Footer />
            </div>
            
            {!isMobileSidebarOpen && (
                <button
                    onClick={toggleMobileSidebar}
                    className="lg:hidden fixed top-3 left-4 z-50 p-2 rounded-md text-gray-400 bg-gray-900/50 backdrop-blur-sm hover:text-white hover:bg-gray-700"
                    aria-label="Open sidebar"
                >
                    <Menu size={24} />
                </button>
            )}

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
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="discover" element={<Discover />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="collections" element={<div className="p-8"><h1 className="text-3xl font-bold">Collections</h1></div>} />
          
          {/* --- UPDATE THIS ROUTE --- */}
          <Route path="discussions" element={<DiscussionPage />} />
          
          <Route path="projects" element={<Projects />} />
        </Route>
      </Routes>
      <LoginModal />
    </>
  );
};

const App = () => {
  return (
    <NotificationProvider>
      <AuthProvider>
        <LoginModalProvider>
          <AppLogic />
        </LoginModalProvider>
      </AuthProvider>
    </NotificationProvider>
  );
};

export default App;