
import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

const VirtualHug: React.FC = () => {
  const [isSending, setIsSending] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const sendHug = () => {
    setIsSending(true);
    setIsDone(false);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSending(false);
          setIsDone(true);
          setTimeout(() => setIsDone(false), 4000);
          return 100;
        }
        return prev + 4;
      });
    }, 60);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-8">
      <div className="relative">
        {isDone && (
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 text-center animate-pop z-20">
            <div className="bg-pink-500 text-white px-4 py-2 rounded-2xl shadow-xl text-sm font-black whitespace-nowrap">
              PELUKAN TERKIRIM! 🤗💖
            </div>
            <div className="w-3 h-3 bg-pink-500 rotate-45 mx-auto -mt-1.5 shadow-xl"></div>
          </div>
        )}

        <button
          onClick={sendHug}
          disabled={isSending}
          className={`group relative p-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 text-white shadow-[0_20px_40px_rgba(244,63,94,0.3)] transition-all active:scale-90 ${isSending ? 'opacity-50' : 'hover:scale-110'}`}
        >
          <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-20 group-hover:opacity-40"></div>
          <Heart className={`w-16 h-16 fill-current relative z-10 ${isSending ? 'animate-pulse' : 'group-hover:animate-[bounce_1s_infinite]'}`} />
          {isDone && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Sparkles className="text-yellow-300 w-24 h-24 animate-spin-slow opacity-50" />
            </div>
          )}
        </button>
      </div>
      
      <div className="w-full max-w-[240px]">
        {isSending ? (
          <div className="space-y-3">
            <p className="text-pink-500 font-black text-[10px] uppercase tracking-[0.2em] text-center animate-pulse">Menghangatkan Pelukan...</p>
            <div className="w-full bg-pink-50 rounded-full h-3 border-2 border-pink-100 p-0.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-pink-400 to-rose-500 h-full rounded-full transition-all duration-150 shadow-sm" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-xs text-center italic font-medium">Klik jantung hati ini untuk mengirim pelukan hangat!</p>
        )}
      </div>
    </div>
  );
};

export default VirtualHug;
