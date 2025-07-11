import React, { createContext, useContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { projects as localProjects } from '../features/dashboard/projects.js';
import { educators as localEducators } from '../features/dashboard/educators.js';
import { resources as localResources } from '../features/discover/resources.js';

const socket = io(import.meta.env.VITE_API_URL);
const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [backendNotifications, setBackendNotifications] = useState([]);
  const [localFileNotifications, setLocalFileNotifications] = useState([]);

  useEffect(() => {
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

    socket.on('new_notification', (newNotification) => {
      setBackendNotifications(prevNotifications => [newNotification, ...prevNotifications]);
    });

    return () => {
      socket.off('new_notification');
    };
  }, []);

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
  const notificationCount = allNotifications.filter(n => !n.isRead).length;

  const markAllAsSeen = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/notifications/mark-read`, { method: 'POST' });
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

// Exporting NotificationProvider as default for consistency
export default NotificationProvider;