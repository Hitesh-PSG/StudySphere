import React from 'react';

const PostSkeleton = () => {
  return (
    <div className="bg-gray-800/70 border border-gray-700/50 rounded-lg shadow-md p-4 animate-pulse">
      <div className="flex items-start space-x-4">
        {/* Avatar Placeholder */}
        <div className="w-11 h-11 rounded-full bg-gray-700"></div>
        <div className="flex-1 space-y-3">
          {/* Author and Time Placeholder */}
          <div className="space-y-1">
            <div className="h-4 bg-gray-700 rounded w-1/4"></div>
            <div className="h-3 bg-gray-700 rounded w-1/5"></div>
          </div>
          {/* Post Text Placeholder */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;