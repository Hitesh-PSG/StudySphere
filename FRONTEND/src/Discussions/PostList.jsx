// FRONTEND/src/Discussions/PostList.jsx

import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
// This path is correct based on your file tree (Discussions -> src -> Login -> firebase)
import { db } from '../Login/firebase'; 

// These paths are correct because the files are in the same folder
import PostItem from './PostItem.jsx';
import PostSkeleton from './PostSkeleton.jsx';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const postsCollectionRef = collection(db, 'posts');
    const q = query(postsCollectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching posts: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    // Show a few skeleton placeholders while loading data
    return (
      <div className="space-y-4">
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.length > 0 ? (
        posts.map(post => (
          <PostItem key={post.id} post={post} />
        ))
      ) : (
        <div className="text-center text-gray-400 p-8 bg-gray-800/50 rounded-lg">
          <h3 className="text-lg font-semibold">No posts yet!</h3>
          <p>Be the first to share something with the community.</p>
        </div>
      )}
    </div>
  );
};

export default PostList;