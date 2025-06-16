// src/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// --- KEY ADDITION: Import the function to get the auth service ---
import { getAuth } from "firebase/auth";

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
const analytics = getAnalytics(app);

// --- KEY ADDITION: Get the auth service and export it ---
// This allows other files (like AuthContext.jsx) to use it for logging in.
export const auth = getAuth(app);