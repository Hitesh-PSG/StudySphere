import React, { useState, useEffect, useRef } from 'react';
import { db } from '../Login/firebase';
import { useAuth } from '../Login/AuthContext';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import PostItem from './PostItem';
import PostSkeleton from './PostSkeleton';
import { Send, MessageSquarePlus } from 'lucide-react'; // Added an icon for the empty state
import toast from 'react-hot-toast';

// Self-contained component for our custom animations
const AnimationStyles = () => (
  <style>{`
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes postEnter {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }
    .animate-fade-in-up {
      animation: fadeInUp 0.7s ease-out forwards;
    }
    .animate-post-enter {
      animation: postEnter 0.5s ease-out forwards;
    }
  `}</style>
);

const DiscussionPage = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isInitialLoad = useRef(true);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postsData);
      if (isInitialLoad.current) { isInitialLoad.current = false; }
      setIsLoading(false);
    }, (err) => {
      setError('Failed to load posts. Please check your connection and try again.');
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim() || !currentUser || isSubmitting) return;
    setIsSubmitting(true);
    const loadingToast = toast.loading('Posting...');
    try {
      await addDoc(collection(db, 'posts'), {
        text: newPost,
        authorName: currentUser.displayName,
        authorId: currentUser.uid,
        authorPhotoURL: currentUser.photoURL,
        createdAt: serverTimestamp(),
        likes: [],
        comments: [],
      });
      setNewPost('');
      toast.success('Posted successfully!', { id: loadingToast });
    } catch (err) {
      toast.error("Couldn't send post. Please try again.", { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          <PostSkeleton /><PostSkeleton /><PostSkeleton />
        </div>
      );
    }
    if (error) {
      return <p className="text-center p-8 text-red-400 bg-red-900/20 rounded-lg">{error}</p>;
    }
    if (posts.length === 0) {
      // MODIFIED: A much more visually appealing empty state.
      return (
        <div className="text-center p-12 bg-slate-900/40 rounded-2xl border border-slate-800/50 flex flex-col items-center gap-4">
          <MessageSquarePlus className="text-slate-600" size={48} strokeWidth={1.5} />
          <h3 className="text-xl font-bold text-slate-300">It's quiet in here...</h3>
          <p className="text-slate-400 max-w-xs">Be the first to start a discussion and get the conversation rolling!</p>
        </div>
      );
    }
    return (
      <div className="space-y-6">
        {/* MODIFIED: Posts now stagger in with a subtle animation */}
        {posts.map((post, index) => (
          <div
            key={post.id}
            className="animate-post-enter"
            style={{ animationDelay: `${index * 80}ms`, opacity: 0 /* Initial state for animation */ }}
          >
            <PostItem post={post} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <AnimationStyles />
      {/* MODIFIED: The whole container now fades in and slides up */}
      <div className="max-w-3xl mx-auto py-6 px-4 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-slate-100 tracking-tight">
          Community Discussions
        </h1>
        
        {currentUser ? (
          // MODIFIED: The form is restyled to match the theme.
          <form onSubmit={handleSubmit} className="flex items-start gap-4 mb-8">
            <input
              type="text"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Ask a question or start a discussion..."
              className="flex-grow p-4 h-14 rounded-lg bg-slate-900/80 border border-slate-700/50 focus:border-yellow-500/50 focus:ring-0 focus:outline-none focus:shadow-[0_0_15px_rgba(255,214,10,0.2)] transition-all duration-300"
              disabled={isSubmitting}
            />
            <button 
              type="submit" 
              disabled={!newPost.trim() || isSubmitting} 
              className="h-14 bg-yellow-500 text-black font-bold px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-600 hover:-translate-y-0.5"
            >
              <Send size={18} />
              <span>{isSubmitting ? "..." : "Post"}</span>
            </button>
          </form>
        ) : (
          <p className="text-center text-slate-500 mb-8 bg-slate-900/50 p-4 rounded-lg">
            Please log in to join the discussion.
          </p>
        )}

        {renderContent()}
      </div>
    </>
  );
};

export default DiscussionPage;