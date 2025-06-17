import React, { useState, useEffect, useRef } from 'react';
import { db } from '../Login/firebase';
import { useAuth } from '../Login/AuthContext';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import PostItem from './PostItem';
import PostSkeleton from './PostSkeleton';
import { Send } from 'lucide-react';
import toast from 'react-hot-toast';

const DiscussionPage = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const isInitialLoad = useRef(true);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postsData);
      
      if (isInitialLoad.current) {
        isInitialLoad.current = false;
      } else {
        querySnapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const newPostData = change.doc.data();
            if (currentUser && newPostData.authorId !== currentUser.uid) {
              toast.success(`New post from ${newPostData.authorName}!`, {
                id: change.doc.id,
              });
            }
          }
        });
      }

      setIsLoading(false);
    }, (err) => {
      setError('Failed to load posts.');
      console.error(err);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim() || !currentUser) return;
    const originalNewPost = newPost;
    setNewPost('');
    try {
      await addDoc(collection(db, 'posts'), {
        text: originalNewPost,
        authorName: currentUser.displayName,
        authorId: currentUser.uid,
        authorPhotoURL: currentUser.photoURL,
        createdAt: serverTimestamp(),
        likes: [],
      });
    } catch (err) {
      setError("Couldn't send message.");
      setNewPost(originalNewPost);
      console.error("Error adding document: ", err);
    }
  };

  return (
    // --- CHANGE #1: Removed `h-full` to allow the container to grow with content ---
    <div className="flex flex-col max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">Community Discussion</h1>
      
      {currentUser ? (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Ask a question or start a discussion..."
            className="flex-grow p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
          />
          <button type="submit" disabled={!newPost.trim()} className="bg-yellow-500 text-black font-bold px-4 py-3 sm:py-2 rounded-lg hover:bg-yellow-400 flex items-center justify-center gap-2 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed">
            <Send size={18} />
            <span className="sm:hidden lg:inline">Post Discussion</span>
            <span className="hidden sm:inline lg:hidden">Post</span>
          </button>
        </form>
      ) : (
        <p className="text-center text-gray-500 mb-6">Please log in to join the discussion.</p>
      )}

      {/* --- CHANGE #2: Removed `flex-grow` and `overflow-hidden` --- */}
      {/* This div no longer needs to manage scrolling; the main page layout will handle it. */}
      <div className="rounded-lg">
        {isLoading && (
          <div className="space-y-4">
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </div>
        )}
        {error && <p className="text-center p-8 text-red-500">{error}</p>}
        {!isLoading && posts.length === 0 && (
          <div className="text-center p-8 bg-gray-800/50 rounded-lg">
            <p className="text-gray-400">No discussions yet. Be the first to post!</p>
          </div>
        )}
        <div className="space-y-4">
          {posts.map(post => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscussionPage;