
import React, { useState, useEffect } from 'react';
import { MASCOT_PHRASES } from '../constants';
import { Heart } from 'lucide-react';

// Fix: Declare lottie-player for TypeScript by augmenting both global JSX and React.JSX namespaces
// to ensure compatibility with different React versions and JSX transform configurations.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lottie-player': any;
    }
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'lottie-player': any;
      }
    }
  }
}

const LoveMascot: React.FC = () => {
  const [bubbleText, setBubbleText] = useState("Hai Sayang! 👋");
  const [happiness, setHappiness] = useState(50);
  const [isAnimating, setIsAnimating] = useState(false);

  const lottiePath = "assets/dudu-love1767357110.json";
  // Fallback Lottie Beruang Gemoy pegang hati
  const fallbackLottie = "https://lottie.host/4338927e-897b-4869-959c-648171f11467/tAueFfD1n3.json"; 

  const handleClick = () => {
    setIsAnimating(true);
    setHappiness(prev => Math.min(prev + 15, 100));
    const randomPhrase = MASCOT_PHRASES[Math.floor(Math.random() * MASCOT_PHRASES.length)];
    setBubbleText(randomPhrase);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const decay = setInterval(() => {
      setHappiness(prev => Math.max(prev - 1, 0));
    }, 4000);
    return () => clearInterval(decay);
  }, []);

  return (
    <div className="fixed bottom-28 md:bottom-32 right-4 md:right-8 z-[100] flex flex-col items-end pointer-events-none transform scale-90 md:scale-100 origin-bottom-right">
      {/* Bubble Chat Balon Kata */}
      <div className="bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-2xl border-2 border-pink-50 mb-3 relative animate-bounce pointer-events-auto max-w-[180px]">
        <p className="text-xs md:text-sm font-black text-pink-600 font-handwritten text-center leading-tight">{bubbleText}</p>
        <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r-2 border-b-2 border-pink-50 rotate-45"></div>
      </div>

      {/* Happiness Meter (Mood Dudu) */}
      <div className="w-20 bg-white/40 h-2 rounded-full mb-3 border border-white overflow-hidden p-0.5 shadow-inner">
        <div 
          className="bg-gradient-to-r from-pink-400 to-rose-500 h-full rounded-full transition-all duration-700 shadow-[0_0_8px_rgba(244,114,182,0.6)]"
          style={{ width: `${happiness}%` }}
        />
      </div>

      {/* Mascot Lottie Button */}
      <button 
        onClick={handleClick}
        className={`pointer-events-auto transition-all duration-500 relative flex items-center justify-center ${isAnimating ? 'scale-125' : 'hover:scale-110 active:scale-95'}`}
      >
        <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center relative">
          <lottie-player
            src={lottiePath}
            background="transparent"
            // Semakin happy, animasi semakin cepat!
            speed={happiness > 75 ? "1.8" : happiness < 25 ? "0.6" : "1"}
            style={{ width: '100%', height: '100%' }}
            loop
            autoplay
            onError={(e: any) => {
              e.target.src = fallbackLottie;
            }}
          ></lottie-player>
          
          {happiness > 80 && (
            <div className="absolute -top-2 -left-2 text-2xl animate-ping z-20">💖</div>
          )}
          
          {/* Mood Grayscale Effect if sad */}
          <div className={`absolute inset-0 transition-opacity duration-1000 bg-blue-200/20 rounded-full pointer-events-none ${happiness < 30 ? 'opacity-100' : 'opacity-0'}`}></div>
        </div>
        
        {isAnimating && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Heart className="text-pink-400 fill-pink-400 w-16 h-16 animate-ping opacity-60" />
          </div>
        )}
      </button>
    </div>
  );
};

export default LoveMascot;
