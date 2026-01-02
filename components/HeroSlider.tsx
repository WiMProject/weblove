
import React, { useState, useEffect } from 'react';
import { HERO_IMAGES } from '../constants';
import { Sparkles } from 'lucide-react';

const HeroSlider: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative group px-4 py-8">
      {/* Decorative Glow Background */}
      <div className="absolute -inset-10 md:-inset-20 bg-gradient-to-tr from-pink-300 via-rose-200 to-yellow-100 rounded-full blur-[100px] opacity-40 group-hover:opacity-60 transition-opacity animate-pulse"></div>
      
      {/* Main Image Container - Enlarge and Thinner Border */}
      <div className="relative w-64 h-64 sm:w-96 sm:h-96 md:w-[32rem] md:h-[32rem] mx-auto rounded-[3rem] md:rounded-[4rem] border-2 md:border-4 border-white shadow-[0_30px_100px_rgba(255,182,193,0.3)] overflow-hidden ring-1 ring-pink-100/50 transform hover:scale-[1.02] transition-transform duration-700">
        {HERO_IMAGES.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="Kenangan Kita"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${i === index ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
          />
        ))}
        
        {/* Soft Aesthetic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 via-transparent to-transparent"></div>
        
        {/* Washi Tape Effect - Aesthetic Scrapbook detail */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-10 bg-white/40 backdrop-blur-md -rotate-3 border-x-4 border-dashed border-pink-200 shadow-sm z-20 flex items-center justify-center">
          <span className="text-[10px] font-black text-pink-400 uppercase tracking-[0.3em]">Forever</span>
        </div>
      </div>

      {/* Floating Sparkles around the image */}
      <div className="absolute top-10 right-0 md:-right-10 animate-bounce pointer-events-none">
        <Sparkles className="text-yellow-400 w-8 h-8 md:w-12 md:h-12" />
      </div>
      <div className="absolute bottom-10 left-0 md:-left-10 animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}>
        <div className="text-4xl md:text-6xl">✨</div>
      </div>

      {/* Pagination Dots - Clean & Minimal */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${i === index ? 'w-10 md:w-14 bg-pink-500 shadow-sm' : 'w-1.5 md:w-2 bg-pink-200'}`} 
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
