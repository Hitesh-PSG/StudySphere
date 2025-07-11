import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Sparkles, CheckCheck, LogOut } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';
import { useAuth } from '../../contexts/AuthContext';
import { useLoginModal } from '../../contexts/LoginModalContext';

const Header = () => {
  const { notifications, notificationCount, markAllAsSeen } = useNotifications();
  const { currentUser, logout, loading } = useAuth();
  const { openModal } = useLoginModal();
  const navigate = useNavigate();
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => { setImageError(false); }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      setProfileOpen(false);
      navigate('/');
    } catch (error) { console.error("Failed to log out", error); }
  };

  const handleMarkAllAndClose = () => {
    markAllAsSeen();
    setNotificationOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) setNotificationOpen(false);
      if (profileRef.current && !profileRef.current.contains(event.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (email) => {
    if (!email) return 'U';
    return email.substring(0, 1).toUpperCase();
  };

  const handleNotificationClick = (notification) => {
    setNotificationOpen(false);
    if (notification.projectId) {
      navigate('/projects', { state: { openProjectWithId: notification.projectId } });
    }
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 h-16 flex items-center justify-between px-4 sm:px-6">
      <Link to="/" className="flex items-center gap-2"></Link>
      <div className="flex items-center gap-4">
        <div className="relative" ref={notificationRef}>
          <button onClick={() => setNotificationOpen(prev => !prev)} className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700">
            <Bell size={22} />
            {notificationCount > 0 && (<span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-gray-900"></span>)}
          </button>
          {isNotificationOpen && (
            <div className="fixed top-20 inset-x-4 max-w-md mx-auto z-50 sm:absolute sm:top-full sm:right-0 sm:left-auto sm:w-80 sm:mt-2 sm:mx-0 bg-slate-800 border border-slate-700 rounded-lg shadow-2xl">
              <div className="p-3 border-b border-slate-700 flex justify-between items-center">
                <h3 className="font-semibold text-slate-200">Notifications</h3>
                {notificationCount > 0 && <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded-full">{notificationCount} New</span>}
              </div>
              <div className="max-h-[70vh] sm:max-h-80 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map(notif => (
                    <div key={notif._id} onClick={() => handleNotificationClick(notif)} className="p-3 flex items-start gap-3 hover:bg-slate-700/50 border-b border-slate-700/50 cursor-pointer">
                      <div className="mt-1 flex-shrink-0"><Sparkles className="text-yellow-400" size={18} /></div>
                      <div>
                        <p className="text-sm font-medium text-slate-200">{notif.message}</p>
                        <p className="text-xs text-slate-400 mt-1">{new Date(notif.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                  ))
                ) : (<p className="text-center text-slate-400 text-sm py-8">No new notifications</p>)}
              </div>
              {notificationCount > 0 && (
                <div className="p-2 border-t border-slate-700">
                  <button onClick={handleMarkAllAndClose} className="w-full text-center text-sm text-yellow-400 font-semibold hover:bg-slate-700/50 p-2 rounded-md flex items-center justify-center gap-2">
                    <CheckCheck size={16} /> Mark all as read
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="relative" ref={profileRef}>
          {loading ? (<div className="h-9 w-9 rounded-full bg-gray-700 animate-pulse"></div>) : currentUser ? (
            <>
              <button onClick={() => setProfileOpen(prev => !prev)} className="h-9 w-9 rounded-full flex items-center justify-center overflow-hidden bg-yellow-500 text-black font-bold text-lg">
                {currentUser.photoURL && !imageError ? (
                  <img className="h-full w-full object-cover" src={currentUser.photoURL} alt="User avatar" onError={() => setImageError(true)} />
                ) : (<span>{getInitials(currentUser.email)}</span>)}
              </button>
              {isProfileOpen && (
                <div className="absolute top-full right-0 w-60 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-2xl z-50">
                  <div className="p-3 border-b border-slate-700">
                    <p className="text-sm font-semibold text-slate-200 truncate">{currentUser.displayName || 'User'}</p>
                    <p className="text-xs text-slate-400 truncate">{currentUser.email}</p>
                  </div>
                  <div className="p-2">
                    <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-slate-700/50 rounded-md mt-1">
                      <LogOut size={16} /> Log Out
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <button onClick={openModal} className="px-4 py-1.5 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;