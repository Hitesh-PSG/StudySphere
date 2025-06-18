import React, { createContext, useContext, useState, useEffect } from 'react';
// --- 1. ADD THESE IMPORTS ---
import { io } from 'socket.io-client';
import { projects as localProjects } from './Dashboard/projects.js';
import { educators as localEducators } from './Dashboard/educators.js';
import { resources as localResources } from './Discover/resources.js';

// --- 2. CREATE THE SOCKET CONNECTION ---
// Connect to your backend. The URL comes from your .env file.
// This is created once and reused across the app.
const socket = io(import.meta.env.VITE_API_URL);

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

const NotificationProvider = ({ children }) => {
  const [backendNotifications, setBackendNotifications] = useState([]);
  const [localFileNotifications, setLocalFileNotifications] = useState([]);

  // --- 3. THIS IS THE NEW REAL-TIME LOGIC ---
  useEffect(() => {
    // A) Fetch the initial list of notifications when the app loads
    const fetchInitialNotifications = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/notifications`);
        if (response.ok) {
          setBackendNotifications(await response.json());
        }
      } catch (error) {
        console.error("Failed to fetch initial notifications:", error);
      }
    };

    fetchInitialNotifications();

    // B) Set up the listener for new notifications from the server
    // This is the core of the real-time update.
    socket.on('new_notification', (newNotification) => {
      // Add the new notification to the top of the list
      console.log('Received new notification via WebSocket!', newNotification);
      setBackendNotifications(prevNotifications => [newNotification, ...prevNotifications]);
    });

    // C) Clean up the listener when the component unmounts to prevent memory leaks
    return () => {
      socket.off('new_notification');
    };
  }, []); // The empty dependency array ensures this runs only once.


  // --- Logic for local file notifications (No changes needed here) ---
  useEffect(() => {
    const seenIds = JSON.parse(localStorage.getItem('seenContentIds')) || [];
    const newProjectIds = localProjects.map(p => p.id).filter(id => id && !seenIds.includes(id));
    const newEducatorIds = localEducators.map(e => e.id).filter(id => id && !seenIds.includes(id));
    const newResourceIds = localResources.map(r => r.id).filter(id => id && !seenIds.includes(id));

    const generatedNotifications = [];
    if (newProjectIds.length > 0) {
      generatedNotifications.push({ _id: 'local-projects', message: `${newProjectIds.length} new project(s) are available to view.` });
    }
    if (newEducatorIds.length > 0) {
      generatedNotifications.push({ _id: 'local-educators', message: `${newEducatorIds.length} new educator(s) have been featured.` });
    }
    if (newResourceIds.length > 0) {
      generatedNotifications.push({ _id: 'local-resources', message: `${newResourceIds.length} new resource(s) added to Discover.` });
    }

    setLocalFileNotifications(generatedNotifications);
  }, []);

  const allNotifications = [...backendNotifications, ...localFileNotifications];
  const notificationCount = allNotifications.filter(n => !n.isRead).length; // Let's count only unread ones

  const markAllAsSeen = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/notifications/mark-read`, { method: 'POST' });
      // After marking them as read on the backend, update the frontend state
      setBackendNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (error) {
      console.error("Failed to mark backend notifications as read:", error);
    }

    const allContentIds = [ 
      ...localProjects.map(p => p.id), 
      ...localEducators.map(e => e.id),
      ...localResources.map(r => r.id)
    ].filter(Boolean);
    localStorage.setItem('seenContentIds', JSON.stringify(allContentIds));
    setLocalFileNotifications([]);
  };

  const value = {
    notifications: allNotifications,
    notificationCount,
    markAllAsSeen,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;