// src/Discover/VideoPlayerModal.jsx
import React, { useState, useEffect, useRef } from 'react';

// --- Helper Components (Themed and correct) ---
const PlaylistLoader = () => ( <div className="flex flex-col items-center justify-center h-full p-4 text-gray-400 dark:text-slate-400"> <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-500 dark:text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle> <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> </svg> <p className="mt-3 text-sm">Fetching playlist...</p> </div> );
const PlaylistError = ({ message }) => ( <div className="flex flex-col items-center justify-center h-full p-4 text-red-500"> <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor"> <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /> </svg> <p className="mt-3 text-center text-sm font-semibold">Could not load playlist</p> <p className="text-center text-xs text-gray-500 dark:text-slate-400 mt-1 px-2">{message}</p> </div> );
const PlaylistItem = ({ video, index, isActive, onClick }) => ( <button onClick={onClick} className={`flex items-start text-left w-full gap-3 p-3 rounded-lg cursor-pointer transition-all duration-300 group ${isActive ? 'bg-blue-500/10 dark:bg-sky-500/10' : 'hover:bg-gray-100 dark:hover:bg-slate-700/50'}`}> <div className="relative flex-shrink-0"> <img src={video.thumbnail} alt={video.title} className="w-24 h-14 object-cover rounded-md shadow-md bg-gray-200 dark:bg-slate-700" /> {isActive && (<div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-md"><div className="w-2.5 h-2.5 rounded-full bg-blue-400 dark:bg-sky-400 animate-pulse"></div></div>)}</div> <div className="flex-1"> <p className={`font-semibold text-sm leading-tight ${isActive ? 'text-blue-600 dark:text-sky-300' : 'text-gray-800 dark:text-slate-200 group-hover:text-black dark:group-hover:text-white'}`}>{video.title}</p> <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Video {index + 1}</p> </div> </button> );

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const VideoPlayerModal = ({ resource, onClose }) => {
  // Central state management
  const [currentVideoId, setCurrentVideoId] = useState(resource?.youtubeId);
  const [playlist, setPlaylist] = useState({
    status: 'loading', // 'loading', 'success', 'error'
    items: [],
    errorMessage: ''
  });
  
  const [isApiReady, setIsApiReady] = useState(!!window.YT?.Player);
  const playerRef = useRef(null);

  // --- Master Effect: This runs ONCE when the modal opens with a new resource ---
  useEffect(() => {
    // 1. Reset all state to ensure a clean slate
    setCurrentVideoId(resource.youtubeId);
    setPlaylist({ status: 'loading', items: [], errorMessage: '' });
    
    // 2. Function to set up the video player
    const setupPlayer = () => {
      if (playerRef.current) playerRef.current.destroy();
      playerRef.current = new window.YT.Player('youtube-player-mount', {
        videoId: resource.youtubeId,
        playerVars: { 'playsinline': 1, 'rel': 0, 'modestbranding': 1, 'autoplay': 1 },
        events: { 'onReady': (event) => event.target.playVideo() }
      });
    };

    // 3. Load the YT API script if needed, otherwise just set up the player
    if (!isApiReady) {
      window.onYouTubeIframeAPIReady = () => {
        setIsApiReady(true);
        setupPlayer();
      };
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
    } else {
      setupPlayer();
    }
    
    // 4. Function to fetch the playlist
    const fetchFullPlaylist = async (playlistId) => {
      if (!API_KEY) {
        setPlaylist({ status: 'error', items: [], errorMessage: 'YouTube API key is missing.' });
        return;
      }
      
      try {
        let allItems = [], nextPageToken = null;
        do {
          const pageTokenQuery = nextPageToken ? `&pageToken=${nextPageToken}` : '';
          const API_URL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${API_KEY}${pageTokenQuery}`;
          const response = await fetch(API_URL);
          const data = await response.json();
          if (!response.ok) throw new Error(data.error?.message || 'Failed to fetch playlist.');
          allItems = [...allItems, ...data.items];
          nextPageToken = data.nextPageToken;
        } while (nextPageToken);

        const formattedItems = allItems
          .map(item => {
            if (!item.snippet?.resourceId?.videoId) return null;
            return {
              videoId: item.snippet.resourceId.videoId,
              title: item.snippet.title || 'Untitled Video',
              thumbnail: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url || `https://via.placeholder.com/120x90.png?text=No+Image`,
            };
          }).filter(Boolean);
        
        setPlaylist({ status: 'success', items: formattedItems, errorMessage: '' });
      } catch (err) {
        console.error("Playlist fetch failed:", err);
        setPlaylist({ status: 'error', items: [], errorMessage: err.message });
      }
    };

    // 5. Trigger the playlist fetch if an ID exists
    if (resource.playlistId) {
      fetchFullPlaylist(resource.playlistId);
    } else {
      setPlaylist({ status: 'success', items: [], errorMessage: '' }); // No playlist to load
    }
    
    // 6. Cleanup function on unmount
    return () => {
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
      }
      window.onYouTubeIframeAPIReady = undefined;
    };
  }, [resource]); // This is the key: The entire logic re-runs when the resource prop changes.

  // Function to load a video from the playlist
  const loadVideo = (videoId) => {
    setCurrentVideoId(videoId);
    if (playerRef.current?.loadVideoById) {
      playerRef.current.loadVideoById(videoId);
    }
  };

  if (!resource) return null;
  const currentVideoInfo = playlist.items.find(v => v.videoId === currentVideoId) || { title: resource.title };
  const hasPlaylistData = resource?.playlistId;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-slate-100 rounded-2xl w-full max-w-7xl h-full md:h-auto md:max-h-[90vh] flex flex-col relative overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700 flex-shrink-0 gap-4">
          <div className="flex-1 min-w-0"><h2 className="text-lg font-bold text-gray-900 dark:text-white truncate" title={resource.title}>{resource.title}</h2><p className="text-xs text-gray-500 dark:text-slate-400">{resource.author}</p></div>
          <button onClick={onClose} className="p-2 rounded-full text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700 flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
        </div>
        <div className="flex flex-col md:flex-row p-4 gap-6 flex-1 min-h-0">
          <div className={`w-full ${hasPlaylistData ? 'md:w-2/3 lg:w-3/4' : 'md:w-full'} flex flex-col flex-shrink-0`}>
            <div className="aspect-video w-full rounded-lg bg-black overflow-hidden flex-shrink-0 shadow-lg"><div id="youtube-player-mount" className="w-full h-full"></div></div>
            <div className="mt-4"><h3 className="text-xl font-semibold text-gray-900 dark:text-white">{currentVideoInfo.title}</h3></div>
          </div>
          {hasPlaylistData && (
            <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col flex-1 min-h-0 bg-gray-50 dark:bg-slate-900/60 rounded-xl">
              <div className="flex items-center gap-2 p-3 border-b border-gray-200 dark:border-slate-700/50 flex-shrink-0"><h4 className="font-semibold text-gray-700 dark:text-slate-200">Up Next</h4></div>
              <div className="overflow-y-auto p-2">
                {playlist.status === 'loading' && <PlaylistLoader />}
                {playlist.status === 'error' && <PlaylistError message={playlist.errorMessage} />}
                {playlist.status === 'success' && (
                  <ul className="space-y-1">
                    {playlist.items.map((video, index) => (<li key={video.videoId}><PlaylistItem video={video} index={index} isActive={currentVideoId === video.videoId} onClick={() => loadVideo(video.videoId)} /></li>))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerModal;