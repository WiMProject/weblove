
import React, { useState } from 'react';
import { GACHA_MESSAGES } from '../constants';
import { Sparkles, RefreshCw, Star } from 'lucide-react';

const LoveGacha: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const pullGacha = () => {
    setIsSpinning(true);
    setResult(null);
    setTimeout(() => {
      const random = GACHA_MESSAGES[Math.floor(Math.random() * GACHA_MESSAGES.length)];
      setResult(random);
      setIsSpinning(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-[3.5rem] p-1 shadow-[0_20px_50px_rgba(255,215,0,0.15)] border-4 border-yellow-100 overflow-hidden h-full flex flex-col group">
      <div className="bg-gradient-to-b from-yellow-50 to-white p-6 md:p-8 flex-grow flex flex-col items-center justify-center space-y-6">
        <div className="relative">
          <div className="text-5xl md:text-6xl animate-bounce">🎁</div>
          <Star className="absolute -top-2 -right-2 text-yellow-400 fill-yellow-400 animate-pulse" size={24} />
        </div>

        <div className="text-center">
          <h3 className="font-pacifico text-2xl md:text-3xl text-gray-800">Hadiah Kejutan</h3>
          <div className="h-1 w-12 bg-yellow-300 mx-auto rounded-full mt-2"></div>
        </div>
        
        <div className="w-full aspect-square md:aspect-video flex items-center justify-center bg-white rounded-[2rem] border-4 border-dashed border-yellow-200 relative overflow-hidden p-6 shadow-inner">
          {isSpinning ? (
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-3">
                <span className="text-3xl animate-[bounce_0.5s_infinite]">💖</span>
                <span className="text-3xl animate-[bounce_0.5s_infinite_0.1s]">✨</span>
                <span className="text-3xl animate-[bounce_0.5s_infinite_0.2s]">🌈</span>
              </div>
              <p className="text-[10px] font-black text-yellow-500 tracking-widest animate-pulse">MENGUNDI KEBERUNTUNGAN...</p>
            </div>
          ) : result ? (
            <div className="animate-pop text-center">
              <p className="text-yellow-600 font-handwritten text-xl md:text-2xl leading-tight">
                "{result}"
              </p>
            </div>
          ) : (
            <div className="text-center space-y-2 opacity-30">
              <Sparkles className="w-12 h-12 text-yellow-400 mx-auto" />
              <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Klik tombol di bawah!</p>
            </div>
          )}
        </div>

        <button
          onClick={pullGacha}
          disabled={isSpinning}
          className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-400 text-white font-black py-5 rounded-2xl shadow-[0_10px_20px_rgba(251,191,36,0.3)] transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95 group-hover:scale-[1.02]"
        >
          {isSpinning ? <RefreshCw className="animate-spin" /> : <Sparkles />}
          <span className="tracking-widest">AMBIL HADIAHMU!</span>
        </button>
      </div>
    </div>
  );
};

export default LoveGacha;
