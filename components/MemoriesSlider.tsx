
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Camera, Heart, Sparkles } from 'lucide-react';
import { INITIAL_MEMORIES } from '../constants';

interface MemoriesSliderProps {
  onOpenGallery: (images: string[]) => void;
}

const MemoriesSlider: React.FC<MemoriesSliderProps> = ({ onOpenGallery }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  const handleNext = () => {
    setIsChanging(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % INITIAL_MEMORIES.length);
      setIsChanging(false);
    }, 300);
  };

  const handlePrev = () => {
    setIsChanging(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + INITIAL_MEMORIES.length) % INITIAL_MEMORIES.length);
      setIsChanging(false);
    }, 300);
  };

  const current = INITIAL_MEMORIES[currentIndex];

  return (
    <div className="space-y-12 md:space-y-16 py-10 overflow-visible">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-3 bg-white px-8 py-4 rounded-full shadow-md border border-pink-100 animate-fade-in group hover:scale-105 transition-transform">
          <Camera className="text-pink-500 group-hover:rotate-12 transition-transform" size={24} />
          <h3 className="text-2xl md:text-3xl font-black text-gray-800 tracking-tight font-pacifico">Klip Kenangan Kita</h3>
        </div>
        <p className="text-gray-400 text-base md:text-lg italic font-handwritten font-bold animate-pulse">Setiap foto punya cerita tersendiri... ✨</p>
      </div>

      <div className="relative max-w-2xl mx-auto px-8 md:px-12">
        {/* Scrapbook Decorations with specific animations */}
        <div className="absolute -top-12 -left-4 md:-left-12 text-5xl opacity-80 select-none animate-bounce z-20">🎀</div>
        <div className="absolute -bottom-12 -right-4 md:-right-12 text-5xl opacity-80 select-none animate-[spin_4s_linear_infinite] z-20">⭐</div>
        <Sparkles className="absolute top-1/4 -right-8 md:-right-16 text-yellow-300 animate-pulse w-8 h-8 opacity-40" />
        <Heart className="absolute bottom-1/4 -left-8 md:-left-16 text-pink-300 animate-bounce w-8 h-8 opacity-40" />

        <div className={`polaroid-tilt photo-stack bg-white p-5 md:p-8 shadow-[0_20px_50px_rgba(255,182,193,0.3)] border-b-[30px] md:border-b-[50px] border-white relative transition-all duration-300 ${isChanging ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          
          {/* Tape Effect at corners */}
          <div className="absolute -top-6 left-10 w-20 h-8 bg-pink-100/40 backdrop-blur-sm -rotate-12 z-10 shadow-sm border border-white/40"></div>
          <div className="absolute -top-6 right-10 w-20 h-8 bg-pink-100/40 backdrop-blur-sm rotate-12 z-10 shadow-sm border border-white/40"></div>
          
          <div 
            className="relative aspect-square md:aspect-[4/5] overflow-hidden bg-gray-50 mb-8 group cursor-pointer rounded-sm" 
            onClick={() => current.gallery && onOpenGallery(current.gallery)}
          >
            <img 
              src={current.image} 
              alt={current.title} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            
            {/* Overlay sparkle effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-pink-500/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4">
              <div className="bg-white/90 p-4 rounded-full shadow-2xl scale-0 group-hover:scale-110 transition-transform duration-500 border-2 border-pink-100">
                <Heart size={32} className="text-pink-500 fill-pink-500 animate-pulse" />
              </div>
              <span className="bg-white/95 px-6 py-2.5 rounded-full text-pink-600 font-black text-xs uppercase tracking-[0.2em] shadow-xl border border-pink-50">
                Lihat Semua Momen ✨
              </span>
            </div>
          </div>

          <div className="text-center space-y-3 py-6 relative">
            <h4 className="text-3xl md:text-4xl font-handwritten font-black text-gray-800 tracking-wide drop-shadow-sm">
              {current.title}
            </h4>
            <div className="h-0.5 w-16 bg-pink-100 mx-auto rounded-full"></div>
            <p className="text-gray-500 font-handwritten text-xl md:text-2xl leading-relaxed max-w-sm mx-auto italic px-4">
              "{current.description}"
            </p>
          </div>

          {/* Navigation Controls - Positioned outside for better desktop view, and overlay for mobile */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-12 md:-left-20 -right-12 md:-right-20 flex justify-between pointer-events-none">
            <button 
              onClick={handlePrev}
              disabled={isChanging}
              className="p-4 md:p-6 rounded-full bg-white shadow-2xl text-pink-500 hover:bg-pink-500 hover:text-white transition-all pointer-events-auto border-2 border-pink-50 hover:scale-110 active:scale-90 disabled:opacity-0"
            >
              <ChevronLeft size={28} strokeWidth={3} />
            </button>
            <button 
              onClick={handleNext}
              disabled={isChanging}
              className="p-4 md:p-6 rounded-full bg-white shadow-2xl text-pink-500 hover:bg-pink-500 hover:text-white transition-all pointer-events-auto border-2 border-pink-50 hover:scale-110 active:scale-90 disabled:opacity-0"
            >
              <ChevronRight size={28} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Visual Indicator Dots */}
      <div className="flex justify-center gap-4">
        {INITIAL_MEMORIES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (i !== currentIndex) {
                setIsChanging(true);
                setTimeout(() => {
                  setCurrentIndex(i);
                  setIsChanging(false);
                }, 300);
              }
            }}
            className={`h-2.5 rounded-full transition-all duration-700 ${i === currentIndex ? 'w-12 bg-pink-500 shadow-md shadow-pink-200' : 'w-2.5 bg-pink-200 hover:bg-pink-300'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MemoriesSlider;
