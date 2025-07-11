// src/main.jsx

import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';

// --- FIXED PATHS ---
import "./styles/index.css"; // Correct path to global styles
import { NotificationProvider } from './contexts/NotificationContext.jsx'; // Correct path to context
import App from "./App.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <BrowserRouter>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </BrowserRouter>
  </StrictMode>
);