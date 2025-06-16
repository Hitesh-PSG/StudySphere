import React, { createContext, useContext, useState, useEffect } from 'react';

// --- YOUR LOCAL DATA SOURCES ---
// Make sure the paths are correct for your project structure.
import { projects as localProjects } from './Dashboard/projects.js';
import { educators as localEducators } from './Dashboard/educators.js';
import { resources as localResources } from './Discover/resources.js';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

const NotificationProvider = ({ children }) => {
  // We will have two separate states for our two sources
  const [backendNotifications, setBackendNotifications] = useState([]);
  const [localFileNotifications, setLocalFileNotifications] = useState([]);

  // --- 1. LOGIC FOR BACKEND NOTIFICATIONS (POLLING) ---
  useEffect(() => {
    const fetchBackendNotifications = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/notifications');
        if (response.ok) {
          setBackendNotifications(await response.json());
        }
      } catch (error) {
        console.error("Failed to fetch backend notifications:", error);
      }
    };

    fetchBackendNotifications(); // Fetch immediately
    const intervalId = setInterval(fetchBackendNotifications, 15000); // Poll every 15 seconds
    return () => clearInterval(intervalId);
  }, []);

  // --- 2. LOGIC FOR LOCAL FILE NOTIFICATIONS ---
  useEffect(() => {
    // This is your original logic for checking local files against localStorage
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
  }, []); // This runs once when the app loads

  // --- 3. COMBINE BOTH NOTIFICATION LISTS ---
  const allNotifications = [...backendNotifications, ...localFileNotifications];
  const notificationCount = allNotifications.length;

  // This function now needs to handle both types of "seen" actions
  const markAllAsSeen = async () => {
    // Action 1: Tell the backend to mark its notifications as read
    try {
      await fetch('http://localhost:8000/api/notifications/mark-read', { method: 'POST' });
    } catch (error) {
      console.error("Failed to mark backend notifications as read:", error);
    }

    // Action 2: Update localStorage for the local file notifications
    const allContentIds = [ 
      ...localProjects.map(p => p.id), 
      ...localEducators.map(e => e.id),
      ...localResources.map(r => r.id)
    ].filter(Boolean);
    localStorage.setItem('seenContentIds', JSON.stringify(allContentIds));

    // Action 3: Clear all notifications from the UI
    setBackendNotifications([]);
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