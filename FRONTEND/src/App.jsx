import React, { useState, useEffect } from "react";
import { Routes, Route, Outlet, Navigate, useParams, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginModalProvider, useLoginModal } from './contexts/LoginModalContext';
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import Sidebar from "./components/layout/Sidebar.jsx";
import LofiVaporwaveBackground from "./components/layout/LofiVaporwaveBackground.jsx";
import AIassistant from "./features/ai-assistant/AIasssistant.jsx";
import LoginModal from "./features/auth/LoginModal.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import DiscoverPage from "./pages/DiscoverPage.jsx";
import ArticlesPage from "./pages/ArticlesPage.jsx";
import ProjectsPage from './pages/ProjectsPage.jsx';
import DiscussionPage from './pages/DiscussionPage.jsx';
import { resources } from './features/discover/resources.js';
import { articles } from './features/articles/article.js';
import { Menu, ChevronLeft, Clock, User } from 'lucide-react';

const VideoPlayerPage = () => {
  const { videoId } = useParams();
  const resource = resources.find(r => r.id === videoId);

  if (!resource) return <div className="h-screen w-full bg-slate-950 flex items-center justify-center"><Link to="/discover" className="text-xl text-yellow-400">Video not found. Click to return.</Link></div>;

  return (
    <div className="bg-gray-950 min-h-screen w-full flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl">
        <div className="mb-4"><Link to="/discover" className="inline-flex items-center gap-2 text-slate-300 hover:text-yellow-400"><ChevronLeft size={20} />Back to Discover</Link></div>
        <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">{resource.title}</h1>
        <p className="text-slate-400 mb-6">by {resource.author}</p>
        <div className="aspect-video w-full rounded-lg overflow-hidden shadow-2xl bg-black"><iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${resource.youtubeId}?autoplay=1&rel=0`} title={resource.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div>
        <div className="mt-8 text-slate-300 bg-slate-900/50 p-6 rounded-lg"><h3 className="text-xl font-semibold text-white mb-2">Description</h3><p className="whitespace-pre-wrap">{resource.description}</p></div>
      </div>
    </div>
  );
};

const ArticleViewPage = () => {
  const { articleId } = useParams();
  const article = articles.find(a => String(a.id) === articleId);

  if (!article) return <div className="h-screen w-full bg-slate-950 flex items-center justify-center"><Link to="/articles" className="text-xl text-yellow-400">Article not found. Click to return.</Link></div>;
  
  return (
    <div className="bg-slate-950 min-h-screen py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4">
            <div className="mb-8"><Link to="/articles" className="inline-flex items-center gap-2 text-slate-300 hover:text-yellow-400"><ChevronLeft size={20} />Back to All Articles</Link></div>
            <div className="bg-slate-900/70 p-6 sm:p-10 rounded-lg shadow-xl">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{article.title}</h1>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-400 mb-8">
                    <div className="flex items-center gap-2"><User size={16} /><span>{article.author}</span></div>
                    <div className="flex items-center gap-2"><Clock size={16} /><span>{article.readTime}</span></div>
                </div>
                {article.thumbnail && <img src={article.thumbnail} alt={article.title} className="w-full h-auto max-h-96 object-cover rounded-lg mb-8" />}
                <div className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {article.content}
                </div>
            </div>
        </div>
    </div>
  );
};

const MainLayout = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const { currentUser } = useAuth();
  const { openModal } = useLoginModal();

    const toggleAiPanel = () => setIsAiPanelOpen(prev => !prev);
    const toggleMobileSidebar = () => setMobileSidebarOpen(prev => !prev);

    useEffect(() => {
        document.body.style.overflow = (isAiPanelOpen || isMobileSidebarOpen) ? 'hidden' : 'auto';
    }, [isAiPanelOpen, isMobileSidebarOpen]);
    
    return (
        <div className="flex h-screen text-slate-100">
            <LofiVaporwaveBackground />
            
            {isSidebarVisible && (
                <Sidebar isAiPanelOpen={isAiPanelOpen} onToggleAiPanel={toggleAiPanel} isMobileOpen={isMobileSidebarOpen} onMobileClose={() => setMobileSidebarOpen(false)} />
            )}
            
            <div className="flex-1 flex flex-col overflow-hidden relative z-10">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <Toaster position="top-center" reverseOrder={false} toastOptions={{ style: { background: '#334155', color: '#f1f5f9' } }} />
                    <Outlet context={{ setIsSidebarVisible }} />
                </main>
                <Footer />
            </div>
            {!isMobileSidebarOpen && (<button onClick={toggleMobileSidebar} className="lg:hidden fixed top-3 left-4 z-50 p-2 rounded-md text-gray-400 bg-gray-900/50 backdrop-blur-sm hover:text-white hover:bg-gray-700" aria-label="Open sidebar"><Menu size={24} /></button>)}
            {isAiPanelOpen && (<div className="fixed inset-0 bg-black/60 z-40" onClick={toggleAiPanel}></div>)}
            <AIassistant isOpen={isAiPanelOpen} onClose={toggleAiPanel} />
        </div>
    );
};

const AppLogic = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} /> 
          <Route path="discover" element={<DiscoverPage />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="discussions" element={<DiscussionPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="collections" element={<div className="p-8"><h1 className="text-3xl font-bold">Collections</h1></div>} />
        </Route>
        <Route path="/discover/play/:videoId" element={<VideoPlayerPage />} />
        <Route path="/articles/:articleId" element={<ArticleViewPage />} />
      </Routes>
      <LoginModal />
    </>
  );
};

const App = () => (
    <AuthProvider>
      <LoginModalProvider>
        <AppLogic />
      </LoginModalProvider>
    </AuthProvider>
);

export default App;
