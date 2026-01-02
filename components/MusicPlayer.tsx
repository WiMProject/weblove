
import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Square, 
  Heart, 
  ChevronDown, 
  Repeat, 
  Shuffle, 
  Volume2, 
  ListMusic, 
  Sparkles,
  Music2,
  Check
} from 'lucide-react';
import { SONGS } from '../constants';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'none' | 'all' | 'one'>('none');
  const [isLiked, setIsLiked] = useState<boolean[]>(new Array(SONGS.length).fill(false));
  
  const progressInterval = useRef<any>(null);
  const currentSong = SONGS[currentSongIndex];
  
  const albumArts = [
    'https://images.unsplash.com/photo-1516589174184-c68d8e5f0b4a?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518199266791-7399494a6788?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=500&auto=format&fit=crop'
  ];

  const getArt = (idx: number) => albumArts[idx % albumArts.length];

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            handleAutoNext();
            return 0;
          }
          return prev + 0.2;
        });
      }, 500);
    } else {
      if (progressInterval.current) clearInterval(progressInterval.current);
    }
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [isPlaying, currentSongIndex, repeatMode]);

  const handleAutoNext = () => {
    if (repeatMode === 'one') {
      setProgress(0);
      return;
    }
    handleNext();
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (isShuffle) {
      let nextIdx;
      do {
        nextIdx = Math.floor(Math.random() * SONGS.length);
      } while (nextIdx === currentSongIndex && SONGS.length > 1);
      setCurrentSongIndex(nextIdx);
    } else {
      setCurrentSongIndex((prev) => (prev + 1) % SONGS.length);
    }
    setProgress(0);
    setIsPlaying(true);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentSongIndex((prev) => (prev - 1 + SONGS.length) % SONGS.length);
    setProgress(0);
    setIsPlaying(true);
  };

  const handleStop = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(false);
    setProgress(0);
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newLiked = [...isLiked];
    newLiked[currentSongIndex] = !newLiked[currentSongIndex];
    setIsLiked(newLiked);
  };

  const selectSong = (idx: number) => {
    setCurrentSongIndex(idx);
    setProgress(0);
    setIsPlaying(true);
    setShowPlaylist(false);
  };

  return (
    <>
      {/* Mini Player - More Compact & Elegant */}
      {!isExpanded && (
        <div 
          onClick={() => setIsExpanded(true)}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[90] w-[92%] max-w-sm cursor-pointer animate-fade-in group"
        >
          <div className="bg-white/80 backdrop-blur-2xl border border-white/50 rounded-2xl p-2.5 shadow-[0_15px_40px_-5px_rgba(255,182,193,0.3)] flex items-center gap-3 transition-all hover:scale-[1.02] active:scale-95">
            <div className={`relative w-11 h-11 rounded-xl overflow-hidden shadow-sm shrink-0 ${isPlaying ? 'animate-vinyl' : ''}`}>
              <img src={getArt(currentSongIndex)} alt="Art" className="w-full h-full object-cover" />
            </div>

            <div className="flex-grow min-w-0">
              <h4 className="text-xs font-black text-gray-800 truncate leading-tight">{currentSong.title}</h4>
              <p className="text-[9px] font-bold text-pink-400 uppercase tracking-widest">{currentSong.artist}</p>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button 
                onClick={togglePlay} 
                className="w-9 h-9 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-md active:scale-90 transition-all"
              >
                {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} className="ml-0.5" fill="currentColor" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Screen Player */}
      <div 
        className={`fixed inset-0 z-[100] bg-white transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}`}
      >
        {/* Dynamic Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[130%] h-[130%] opacity-30 blur-[100px] animate-pulse">
            <img src={getArt(currentSongIndex)} className="w-full h-full object-cover scale-150" alt="" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/70 to-white"></div>
        </div>

        <div className="relative h-full flex flex-col max-w-md mx-auto px-6 pt-10 pb-12 z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={() => { setIsExpanded(false); setShowPlaylist(false); }} 
              className="p-2.5 bg-gray-50/50 backdrop-blur-md rounded-xl text-gray-500 hover:bg-pink-50 transition-all active:scale-90"
            >
              <ChevronDown size={20} />
            </button>
            <div className="text-center">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.5em] block mb-0.5">Now Playing</span>
              <span className="text-pink-500 font-pacifico text-sm">Hanya Untukmu ✨</span>
            </div>
            <button 
              onClick={() => setShowPlaylist(!showPlaylist)}
              className={`p-2.5 rounded-xl transition-all active:scale-90 ${showPlaylist ? 'bg-pink-500 text-white' : 'bg-gray-50/50 text-gray-500'}`}
            >
              <ListMusic size={20} />
            </button>
          </div>

          <div className="flex-grow flex flex-col items-center justify-center relative">
            {/* Playlist View Overlay */}
            <div className={`absolute inset-0 z-30 bg-white/95 backdrop-blur-2xl rounded-[2.5rem] p-6 transition-all duration-500 flex flex-col shadow-2xl border border-pink-50 ${showPlaylist ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95 pointer-events-none'}`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-black text-gray-800 flex items-center gap-2">
                  <Music2 size={18} className="text-pink-500" /> Playlist
                </h3>
                <span className="text-[10px] font-black text-pink-300 uppercase tracking-widest">{SONGS.length} Songs</span>
              </div>
              <div className="flex-grow overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {SONGS.map((song, i) => (
                  <button
                    key={i}
                    onClick={() => selectSong(i)}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all ${i === currentSongIndex ? 'bg-pink-50 border border-pink-100' : 'hover:bg-gray-50'}`}
                  >
                    <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                      <img src={getArt(i)} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow text-left overflow-hidden">
                      <h4 className={`text-xs font-black truncate ${i === currentSongIndex ? 'text-pink-600' : 'text-gray-700'}`}>{song.title}</h4>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{song.artist}</p>
                    </div>
                    {i === currentSongIndex && <Check size={14} className="text-pink-500" strokeWidth={3} />}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setShowPlaylist(false)}
                className="mt-6 w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest"
              >
                Back To Player
              </button>
            </div>

            {/* Artwork Container */}
            <div className={`flex flex-col items-center transition-all duration-700 w-full ${showPlaylist ? 'blur-md grayscale opacity-30' : ''}`}>
              <div className={`relative w-64 h-64 rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-10px_rgba(255,105,180,0.3)] transform transition-transform duration-1000 ring-2 ring-white ${isPlaying ? 'scale-105' : 'scale-90 rotate-[-1deg]'}`}>
                <img src={getArt(currentSongIndex)} alt="Art" className="w-full h-full object-cover" />
                {isPlaying && <div className="absolute inset-0 bg-pink-500/10 animate-pulse" />}
              </div>

              <div className="mt-8 text-center space-y-2 w-full px-4">
                <div className="flex items-center justify-center gap-3">
                  <h2 className="text-2xl font-black text-gray-800 tracking-tight truncate">{currentSong.title}</h2>
                  <button onClick={toggleLike} className="text-pink-500 active:scale-125 transition-transform">
                    <Heart fill={isLiked[currentSongIndex] ? "currentColor" : "none"} size={20} />
                  </button>
                </div>
                <p className="text-lg font-handwritten text-pink-400 font-bold italic">
                  {currentSong.artist}
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className={`mt-auto space-y-8 pt-6 transition-all duration-500 ${showPlaylist ? 'opacity-30 blur-sm pointer-events-none' : ''}`}>
            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="relative h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-pink-400 to-rose-500 rounded-full transition-all duration-700 relative" style={{ width: `${progress}%` }}>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md"></div>
                </div>
              </div>
              <div className="flex justify-between text-[9px] font-black text-gray-400 tracking-widest uppercase">
                <span>0:{String(Math.floor(progress * 0.6)).padStart(2, '0')}</span>
                <span>{currentSong.duration}</span>
              </div>
            </div>

            {/* Main Control Group */}
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center justify-between w-full">
                <button 
                  onClick={() => setIsShuffle(!isShuffle)}
                  className={`p-2 rounded-xl transition-all ${isShuffle ? 'text-pink-500 bg-pink-50' : 'text-gray-300'}`}
                >
                  <Shuffle size={18} />
                </button>
                
                <div className="flex items-center gap-3">
                  <button onClick={handlePrev} className="p-3 text-gray-800 hover:text-pink-500 active:scale-90 transition-all">
                    <SkipBack size={26} fill="currentColor" />
                  </button>

                  <div className="flex items-center gap-3">
                    <button 
                      onClick={handleStop}
                      className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center border border-white shadow-sm active:scale-90"
                    >
                      <Square size={16} fill="currentColor" />
                    </button>
                    
                    <button 
                      onClick={togglePlay}
                      className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-pink-500 to-rose-500 text-white flex items-center justify-center shadow-lg active:scale-90 transition-all ring-4 ring-pink-50/50"
                    >
                      {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} className="ml-1" fill="currentColor" />}
                    </button>
                  </div>

                  <button onClick={handleNext} className="p-3 text-gray-800 hover:text-pink-500 active:scale-90 transition-all">
                    <SkipForward size={26} fill="currentColor" />
                  </button>
                </div>

                <button 
                  onClick={() => setRepeatMode(prev => prev === 'none' ? 'all' : prev === 'all' ? 'one' : 'none')}
                  className={`p-2 rounded-xl transition-all relative ${repeatMode !== 'none' ? 'text-pink-500 bg-pink-50' : 'text-gray-300'}`}
                >
                  <Repeat size={18} />
                  {repeatMode === 'one' && <span className="absolute top-1 right-1 bg-pink-500 text-white text-[6px] w-3 h-3 rounded-full flex items-center justify-center font-black border border-white">1</span>}
                </button>
              </div>

              {/* Extras */}
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3 bg-gray-50/50 px-4 py-2 rounded-full border border-white flex-grow mr-4">
                  <Volume2 size={14} className="text-gray-400" />
                  <div className="h-1 flex-grow bg-white rounded-full overflow-hidden">
                    <div className="h-full bg-pink-200 w-3/4 rounded-full"></div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-amber-500 bg-amber-50 px-3 py-2 rounded-xl border border-amber-100">
                  <Sparkles size={14} className="animate-pulse" />
                  <span className="text-[8px] font-black uppercase tracking-widest">Lo-Fi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;
