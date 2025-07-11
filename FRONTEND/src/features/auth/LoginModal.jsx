import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Sparkles } from 'lucide-react';

// --- FIXED IMPORTS ---
import { useLoginModal } from '../../contexts/LoginModalContext';
import { useAuth } from '../../contexts/AuthContext';
import { auth } from "../../lib/firebase";

const LoginModal = () => {
  const { isOpen, closeModal } = useLoginModal();
  const { currentUser } = useAuth();
  
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    if (currentUser) {
      closeModal();
    }
  }, [currentUser, closeModal]);

  const handleAuthAction = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isSigningUp) await createUserWithEmailAndPassword(auth, email, password);
      else await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    }
  };

  if (!isOpen) return null;

  const inputStyles = "w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-slate-800 rounded-lg shadow-2xl p-8 border border-slate-700">
        <div className="text-center mb-8"><h1 className="text-3xl font-bold text-white flex items-center justify-center gap-2"><Sparkles className="text-yellow-400" /> Welcome!</h1><p className="text-gray-400 mt-2">Please sign in or create an account to continue.</p></div>
        {error && <p className="bg-red-500/20 text-red-300 text-sm p-3 rounded-md mb-4 text-center">{error}</p>}
        <form onSubmit={handleAuthAction} className="space-y-6">
          <div><label htmlFor="email-modal" className="block text-sm font-medium text-gray-300 mb-2">Email</label><input id="email-modal" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputStyles} placeholder="you@example.com" /></div>
          <div><label htmlFor="password-modal" className="block text-sm font-medium text-gray-300 mb-2">Password</label><input id="password-modal" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={inputStyles} placeholder="••••••••" /></div>
          <div><button type="submit" className="w-full flex justify-center py-2 px-4 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">{isSigningUp ? 'Sign Up' : 'Sign In'}</button></div>
        </form>
        <div className="mt-6"><div className="relative"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-600" /></div><div className="relative flex justify-center text-sm"><span className="px-2 bg-slate-800 text-gray-400">Or</span></div></div><div className="mt-6"><button onClick={handleGoogleSignIn} className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-md bg-slate-700 text-sm font-medium text-white hover:bg-slate-600">Continue with Google</button></div></div>
        <p className="mt-8 text-center text-sm text-gray-400">{isSigningUp ? 'Already have an account?' : "Don't have one?"}{' '}<button onClick={() => setIsSigningUp(!isSigningUp)} className="font-medium text-blue-400 hover:text-blue-300">{isSigningUp ? 'Sign In' : 'Sign Up'}</button></p>
      </div>
    </div>
  );
};
export default LoginModal;