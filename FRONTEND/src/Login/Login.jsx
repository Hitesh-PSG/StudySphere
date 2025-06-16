// src/Login/Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase'; // Make sure this path is correct
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { Sparkles } from 'lucide-react';

const Login = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const handleAuthAction = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isSigningUp) {
        // Sign Up
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // Sign In
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/'); // Redirect to homepage/dashboard on success
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/'); // Redirect to homepage/dashboard on success
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    }
  };

  const inputStyles = "w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800 rounded-lg shadow-2xl p-8 border border-slate-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center justify-center gap-2">
            <Sparkles className="text-yellow-400" /> StudySphere
          </h1>
          <p className="text-gray-400 mt-2">
            {isSigningUp ? 'Create an account to get started' : 'Welcome back! Please sign in.'}
          </p>
        </div>

        {error && <p className="bg-red-500/20 text-red-300 text-sm p-3 rounded-md mb-4 text-center">{error}</p>}

        <form onSubmit={handleAuthAction} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputStyles}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputStyles}
              placeholder="••••••••"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900 transition-colors"
            >
              {isSigningUp ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-800 text-gray-400">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoogleSignIn}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-slate-700 text-sm font-medium text-white hover:bg-slate-600 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.418 2.865 8.166 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0020 10c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
              </svg>
              Sign in with Google
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-400">
          {isSigningUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button onClick={() => setIsSigningUp(!isSigningUp)} className="font-medium text-blue-400 hover:text-blue-300">
            {isSigningUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;