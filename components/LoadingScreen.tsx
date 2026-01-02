
import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Stars, Moon, Sun } from 'lucide-react';

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);

  const messages = [
    "Membuka kunci kotak memori kita...",
    "Menghitung rindu yang tak terbatas...",
    "Menyiapkan kejutan manis untukmu...",
    "Merapikan setiap kepingan cinta...",
    "Hampir siap menyapa kesayangan...",
    "Tinggal sebentar lagi, sayang..."
  ];

  useEffect(() => {
    // Slower progress bar (roughly 6 seconds total)
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFinishing(true);
            setTimeout(onComplete, 800); // Wait for exit animation
          }, 800);
          return 100;
        }
        // Randomize increment slightly for a more "organic" feel
        const inc = Math.random() > 0.8 ? 2 : 0.6;
        return Math.min(prev + inc, 100);
      });
    }, 50);

    const msgTimer = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % messages.length);
    }, 1200);

    return () => {
      clearInterval(timer);
      clearInterval(msgTimer);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[200] bg-[#fff5f7] flex flex-col items-center justify-center p-6 text-center transition-all duration-1000 ease-in-out ${isFinishing ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100'}`}>
      {/* Background Ornaments */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[15%] text-pink-200 animate-float-slow opacity-30"><Stars size={40} /></div>
        <div className="absolute bottom-[20%] right-[10%] text-pink-200 animate-float-slow opacity-30" style={{ animationDelay: '2s' }}><Moon size={32} /></div>
        <div className="absolute top-[60%] left-[10%] text-yellow-200 animate-pulse opacity-40"><Sun size={48} /></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,182,193,0.15)_0%,transparent_70%)]"></div>
      </div>

      <div className="relative mb-16 md:mb-24 scale-110 md:scale-125">
        {/* Glowing aura */}
        <div className="absolute inset-0 bg-pink-400 blur-[80px] opacity-20 animate-pulse"></div>
        
        {/* Main Heart with complex animation */}
        <div className="relative z-10 animate-[heart-pop_2s_infinite]">
          <Heart size={120} className="text-pink-500 fill-pink-500 drop-shadow-[0_0_20px_rgba(236,72,153,0.4)]" />
          <div className="absolute -top-4 -right-4 bg-white p-2 rounded-full shadow-lg border border-pink-50 animate-bounce">
             <Sparkles className="text-yellow-400 w-6 h-6" />
          </div>
        </div>
      </div>
      
      <div className="w-full max-w-sm flex flex-col items-center space-y-10">
        <div className="space-y-4">
          <h2 className="font-pacifico text-2xl md:text-3xl text-pink-600 animate-pulse min-h-[40px]">
            {messages[messageIndex]}
          </h2>
          <div className="h-1 w-16 bg-pink-200 mx-auto rounded-full"></div>
        </div>
        
        {/* Properly Centered Progress Bar */}
        <div className="relative w-full px-4">
          <div className="relative h-6 w-full bg-white/50 backdrop-blur-md rounded-full border-2 border-white/80 p-1 overflow-hidden shadow-[0_10px_25px_-5px_rgba(255,182,193,0.2)]">
            <div 
              className="h-full bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 rounded-full transition-all duration-300 relative"
              style={{ width: `${progress}%` }}
            >
              {/* Shine effect on progress bar */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full h-full animate-shine"></div>
            </div>
          </div>
          
          <div className="mt-6 flex flex-col items-center gap-2">
            <span className="text-pink-400 font-black text-sm uppercase tracking-[0.4em] drop-shadow-sm">
              {Math.floor(progress)}%
            </span>
            <div className="flex gap-1.5">
               <div className={`w-1.5 h-1.5 rounded-full ${progress > 25 ? 'bg-pink-400' : 'bg-pink-100'} transition-colors duration-500`}></div>
               <div className={`w-1.5 h-1.5 rounded-full ${progress > 50 ? 'bg-pink-400' : 'bg-pink-100'} transition-colors duration-500`}></div>
               <div className={`w-1.5 h-1.5 rounded-full ${progress > 75 ? 'bg-pink-400' : 'bg-pink-100'} transition-colors duration-500`}></div>
               <div className={`w-1.5 h-1.5 rounded-full ${progress >= 100 ? 'bg-pink-400' : 'bg-pink-100'} transition-colors duration-500`}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 flex flex-col items-center gap-4 px-10">
        <p className="text-gray-400 text-sm italic font-medium leading-relaxed max-w-[280px]">
          "Sesuatu yang spesial sedang disiapkan hanya untukmu..."
        </p>
        <div className="flex items-center gap-2 opacity-30">
          <div className="w-8 h-[1px] bg-pink-300"></div>
          <Heart size={12} className="text-pink-400" />
          <div className="w-8 h-[1px] bg-pink-300"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
