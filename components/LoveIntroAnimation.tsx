import React from 'react';

const LoveIntroAnimation: React.FC = () => {
  // Path file JSON Lottie yang diberikan user
  const lottiePath = "assets/dudu-love1767357110.json";
  
  // Fallback Lottie Dudu Love yang super stabil dan smooth
  const fallbackLottie = "https://lottie.host/80145694-811c-4b53-9388-348e65893111/4G6g2Nn2D8.json";

  return (
    <div className="relative flex items-center justify-center w-64 h-64 md:w-80 md:h-80">
      {/* Glow Effect di belakang Lottie */}
      <div className="absolute inset-0 bg-pink-200 blur-[80px] opacity-30 rounded-full animate-pulse"></div>
      
      {/* Lottie Animation Container */}
      <div className="relative z-10 w-full h-full flex items-center justify-center scale-110 md:scale-125">
        {/* @ts-ignore */}
        <lottie-player
          src={lottiePath}
          background="transparent"
          speed="1"
          style={{ width: '100%', height: '100%' }}
          loop
          autoplay
          onError={(e: any) => {
            console.warn("Lottie lokal gagal dimuat, menggunakan fallback CDN...");
            e.target.src = fallbackLottie;
          }}
        ></lottie-player>
      </div>

      {/* Elemen Dekoratif Floating */}
      <div className="absolute -top-6 -right-6 text-pink-400 animate-bounce text-4xl">✨</div>
      <div className="absolute -bottom-6 -left-6 text-rose-400 animate-pulse text-5xl">❤️</div>
      <div className="absolute top-1/2 -left-16 text-yellow-400 animate-float-slow text-3xl">⭐</div>
      
      {/* Ring Decoration */}
      <div className="absolute inset-0 border-4 border-pink-100/30 rounded-full scale-110 animate-ping opacity-20"></div>
    </div>
  );
};

export default LoveIntroAnimation;