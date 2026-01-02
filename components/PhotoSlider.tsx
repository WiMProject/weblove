
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface PhotoSliderProps {
  images: string[];
  onClose: () => void;
}

const PhotoSlider: React.FC<PhotoSliderProps> = ({ images, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 animate-fade-in">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-pink-400 transition-colors z-[70]"
      >
        <X size={40} />
      </button>

      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <button 
          onClick={prev}
          className="absolute left-0 text-white bg-white/10 p-4 rounded-full hover:bg-white/20 transition-all z-[70]"
        >
          <ChevronLeft size={30} />
        </button>

        <div className="w-full h-[70vh] flex items-center justify-center">
          <img 
            src={images[currentIndex]} 
            alt="Kenangan" 
            className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl animate-pop"
          />
        </div>

        <button 
          onClick={next}
          className="absolute right-0 text-white bg-white/10 p-4 rounded-full hover:bg-white/20 transition-all z-[70]"
        >
          <ChevronRight size={30} />
        </button>

        <div className="absolute bottom-4 flex gap-2">
          {images.map((_, i) => (
            <div 
              key={i}
              className={`w-3 h-3 rounded-full transition-all ${i === currentIndex ? 'bg-pink-500 w-8' : 'bg-white/30'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoSlider;
