import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { db } from '../Login/firebase';
import { useAuth } from '../Login/AuthContext';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, doc, updateDoc, arrayUnion, arrayRemove, deleteDoc } from 'firebase/firestore';
import { MessageSquare, Send, CornerDownRight, Heart, Trash2 } from 'lucide-react';

const Comment = ({ comment }) => (
  // --- MOBILE FIX: Reduced horizontal padding on comments for small screens ---
  <div className="flex items-start space-x-3 pl-4 sm:pl-8 py-2 border-t border-gray-700/30">
    <img src={comment.authorPhotoURL || 'https://i.pravatar.cc/150'} alt={comment.authorName} className="w-8 h-8 rounded-full object-cover mt-1" />
    <div className="flex-1">
      <div className="flex items-baseline space-x-2">
        <p className="font-semibold text-gray-300">{comment.authorName}</p>
        <p className="text-xs text-gray-500">
          {comment.createdAt ? formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true }) : '...'}
        </p>
      </div>
      <p className="text-gray-300 mt-1 break-words">{comment.text}</p>
    </div>
  </div>
);

const PostItem = ({ post }) => {
  const { currentUser } = useAuth();
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  
  const postRef = doc(db, 'posts', post.id);
  const isLiked = post.likes?.includes(currentUser?.uid);
  const isAuthor = post.authorId === currentUser?.uid;

  const handleLike = async () => {
    if (!currentUser) return;
    await updateDoc(postRef, {
      likes: isLiked ? arrayRemove(currentUser.uid) : arrayUnion(currentUser.uid)
    });
  };

  const handleDelete = async () => {
    if (!isAuthor) return;
    if (window.confirm('Are you sure you want to delete this post? This cannot be undone.')) {
      try {
        await deleteDoc(postRef);
      } catch (error) {
        console.error("Error deleting post: ", error);
        alert("Could not delete the post. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (!isCommentsOpen) return;
    const commentsRef = collection(db, 'posts', post.id, 'comments');
    const q = query(commentsRef, orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [isCommentsOpen, post.id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser) return;
    const commentsRef = collection(db, 'posts', post.id, 'comments');
    await addDoc(commentsRef, {
      text: newComment,
      authorId: currentUser.uid,
      authorName: currentUser.displayName,
      authorPhotoURL: currentUser.photoURL,
      createdAt: serverTimestamp(),
    });
    setNewComment('');
  };

  return (
    <div className="bg-gray-800/70 border border-gray-700/50 rounded-lg shadow-md transition-all duration-300">
      {/* --- MOBILE FIX: Reduced padding and spacing for small screens --- */}
      <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4">
        <img src={post.authorPhotoURL || 'https://i.pravatar.cc/150'} alt={post.authorName} className="w-11 h-11 rounded-full object-cover" />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-bold text-yellow-400">{post.authorName || 'Anonymous'}</p>
              <p className="text-xs text-gray-500">
                {post.createdAt ? formatDistanceToNow(post.createdAt.toDate(), { addSuffix: true }) : '...'}
              </p>
            </div>
            {isAuthor && (
              <button onClick={handleDelete} className="p-1.5 rounded-full hover:bg-red-900/50 text-gray-500 hover:text-red-400 transition-colors">
                <Trash2 size={16} />
              </button>
            )}
          </div>
          {/* --- MOBILE FIX: Added `break-words` to prevent long text from overflowing --- */}
          <p className="text-gray-200 mt-2 whitespace-pre-wrap break-words">{post.text}</p>
        </div>
      </div>

      {/* --- MOBILE FIX: Reduced horizontal padding for action bar --- */}
      <div className="flex items-center gap-2 sm:gap-4 px-3 sm:px-4 pb-2">
        <button
          onClick={handleLike}
          disabled={!currentUser}
          className={`flex items-center gap-1.5 text-sm transition-colors py-2 px-3 rounded-lg disabled:cursor-not-allowed ${isLiked ? 'text-red-500 hover:bg-red-900/30' : 'text-gray-400 hover:text-red-500 hover:bg-gray-700/50'}`}
        >
          <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
          <span>{post.likes?.length || 0}</span>
        </button>
        <button
          onClick={() => setIsCommentsOpen(!isCommentsOpen)}
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-yellow-400 transition-colors py-2 px-3 rounded-lg hover:bg-gray-700/50"
        >
          <MessageSquare size={16} />
          {/* --- MOBILE FIX: Hide text on extra-small screens --- */}
          <span>{comments.length > 0 ? comments.length : ''}</span>
          <span className="hidden sm:inline">Comment{comments.length !== 1 ? 's' : ''}</span>
        </button>
      </div>

      {isCommentsOpen && (
        <div className="border-t border-gray-700/50 bg-gray-800/50 pt-2">
          {/* --- MOBILE FIX: Add padding for the scrollbar --- */}
          <div className="max-h-60 overflow-y-auto px-1">
            {comments.length > 0 ? (
              comments.map(comment => <Comment key={comment.id} comment={comment} />)
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No comments yet.</p>
            )}
          </div>
          {currentUser && (
            <form onSubmit={handleCommentSubmit} className="flex items-center gap-2 sm:gap-3 p-3 border-t border-gray-700/30">
              <CornerDownRight size={20} className="text-gray-500 flex-shrink-0 ml-2 sm:ml-4" />
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-grow p-2 text-sm rounded-lg bg-gray-700 border border-gray-600 focus:ring-1 focus:ring-yellow-500 focus:outline-none"
              />
              <button type="submit" disabled={!newComment.trim()} className="p-2 rounded-full bg-yellow-500 text-black disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-yellow-400 transition-colors">
                <Send size={16} />
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default PostItem;