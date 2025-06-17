// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// --- THIS IS THE REQUIRED ADDITION FOR THE DISCUSSION PANEL ---
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgJg5_73BV5LteRx3X3O3QhnSfZ1p30lY",
  authDomain: "studyhub-2da9d.firebaseapp.com",
  projectId: "studyhub-2da9d",
  storageBucket: "studyhub-2da9d.appspot.com",
  messagingSenderId: "491142925403",
  appId: "1:491142925403:web:c7287b2a3760d0d0f0c37e",
  measurementId: "G-XKBYV6V3EM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// --- EXPORT BOTH AUTH AND FIRESTORE ---
// Export the auth service for user login/logout
export const auth = getAuth(app);

// Export the Firestore database service so the discussion panel can use it
export const db = getFirestore(app);

export default app;