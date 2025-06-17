import React, { createContext, useContext, useState, useEffect } from 'react';
import { projects as localProjects } from './Dashboard/projects.js';
import { educators as localEducators } from './Dashboard/educators.js';
import { resources as localResources } from './Discover/resources.js';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

const NotificationProvider = ({ children }) => {
  const [backendNotifications, setBackendNotifications] = useState([]);
  const [localFileNotifications, setLocalFileNotifications] = useState([]);

  // --- 1. LOGIC FOR BACKEND NOTIFICATIONS (POLLING) ---
  useEffect(() => {
    const fetchBackendNotifications = async () => {
      try {
        // --- THIS IS THE CORRECTED LINE ---
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/notifications`);
        
        if (response.ok) {
          setBackendNotifications(await response.json());
        }
      } catch (error) {
        console.error("Failed to fetch backend notifications:", error);
      }
    };

    fetchBackendNotifications();
    const intervalId = setInterval(fetchBackendNotifications, 15000);
    return () => clearInterval(intervalId);
  }, []);

  // --- 2. LOGIC FOR LOCAL FILE NOTIFICATIONS ---
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

  // --- 3. COMBINE BOTH NOTIFICATION LISTS ---
  const allNotifications = [...backendNotifications, ...localFileNotifications];
  const notificationCount = allNotifications.length;

  const markAllAsSeen = async () => {
    try {
      // --- THIS IS THE CORRECTED LINE ---
      await fetch(`${import.meta.env.VITE_API_URL}/api/notifications/mark-read`, { method: 'POST' });
    } catch (error) {
      console.error("Failed to mark backend notifications as read:", error);
    }

    const allContentIds = [ 
      ...localProjects.map(p => p.id), 
      ...localEducators.map(e => e.id),
      ...localResources.map(r => r.id)
    ].filter(Boolean);
    localStorage.setItem('seenContentIds', JSON.stringify(allContentIds));

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