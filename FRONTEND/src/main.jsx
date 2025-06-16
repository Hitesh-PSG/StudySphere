// src/main.jsx

import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import NotificationProvider from './NotificationContext.jsx';
// --- KEY CHANGE: Import BrowserRouter ---
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    {/* --- KEY CHANGE: Wrap everything in BrowserRouter --- */}
    <BrowserRouter>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </BrowserRouter>
  </StrictMode>
);