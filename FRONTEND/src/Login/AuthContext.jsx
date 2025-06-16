// src/Login/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from './firebase'; // Ensure this path is correct
import { onAuthStateChanged, signOut } from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // This is correct

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const logout = () => {
    return signOut(auth);
  }

  // --- THIS IS THE ONLY CHANGE ---
  // We need to add 'loading' here so other components can use it.
  const value = {
    currentUser,
    logout,
    loading, // <-- ADD THIS LINE
  };

  // This part is perfect. It prevents rendering before the auth check is done.
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}