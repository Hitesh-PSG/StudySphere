// src/ThemeContext.jsx

import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Read from localStorage to remember the user's choice, default to 'dark'
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = theme === 'dark';

    // This adds/removes the 'dark' class from the main <html> tag
    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(theme);

    // Save the user's choice
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// A simple hook to easily access the theme state and toggle function
export const useTheme = () => useContext(ThemeContext);