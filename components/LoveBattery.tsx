
import React, { useState } from 'react';
import { Heart, Sparkles, X, Stars, Trophy } from 'lucide-react';
import { recordActionToBackend } from '../services/geminiService';

const LoveBattery: React.FC<{ level: number; onCharge: () => void }> = ({ level, onCharge }) => {
  const [isCharging, setIsCharging] = useState(false);
  const [showFullCelebration, setShowFullCelebration] = useState(false);

  const handleCharge = async () => {
    if (level >= 100) {
      setShowFullCelebration(true);
      return;
    }

    setIsCharging(true);
    onCharge();
    await recordActionToBackend('CHARGE', { level: level + 5 });
    
    if (level + 5 >= 100) {
      setTimeout(() => setShowFullCelebration(true), 1000);
    }
    
    setTimeout(() => {
      setIsCharging(false);
    }, 800);
  };

  return (
    <>
      <div className="relative max-w-2xl mx-auto px-4">
        <div className="bg-white/95 backdrop-blur-2xl rounded-[4rem] p-12 md:p-20 shadow-[0_40px_100px_rgba(255,105,180,0.1)] border-2 border-white text-center space-y-12 overflow-hidden group">
          
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-32 h-8 bg-pink-100/40 -rotate-2 backdrop-blur-sm shadow-sm flex items-center justify-center font-bold text-[9px] uppercase tracking-widest text-pink-400 border border-pink-50">Heart Power Core</div>

          <div className="space-y-4 relative z-10 pt-4">
            <h3 className="text-4xl md:text-6xl font-black text-gray-800 font-pacifico leading-tight">Tangki Cinta Kita</h3>
            <p className="text-gray-400 font-handwritten text-2xl italic">Isi terus sampai meluap ya sayang! ✨</p>
          </div>

          <div className="relative mx-auto w-56 h-80 md:w-64 md:h-[28rem]">
            <div 
              className="absolute inset-4 rounded-[4.5rem] bg-pink-400 blur-[40px] opacity-20 transition-all duration-1000"
              style={{ opacity: level / 180 }}
            ></div>

            <div className="absolute inset-0 rounded-[4rem] border-[12px] border-white bg-white/30 backdrop-blur-[4px] shadow-[inset_0_0_30px_rgba(255,255,255,0.8),0_20px_60px_rgba(0,0,0,0.06)] z-20 overflow-hidden">
              <div 
                className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-pink-600 via-rose-400 to-pink-300 transition-all duration-1000 ease-out"
                style={{ height: `${level}%` }}
              >
                <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                <div className="absolute -top-8 left-1/2 w-[350%] h-16 bg-white/40 rounded-[38%] animate-wave"></div>
                <div className="absolute -top-10 left-1/2 w-[370%] h-16 bg-white/20 rounded-[42%] animate-wave" style={{ animationDelay: '1.5s' }}></div>
              </div>
            </div>
            
            <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
              <div className="bg-white/50 backdrop-blur-lg px-8 py-4 rounded-full border border-white/60 shadow-2xl scale-125 group-hover:scale-150 transition-transform duration-700 ring-4 ring-pink-50/30">
                <span className="text-4xl md:text-6xl font-black text-pink-600 font-pacifico drop-shadow-sm">{level}%</span>
              </div>
            </div>

            {isCharging && (
              <div className="absolute inset-0 z-[60] pointer-events-none">
                {[...Array(15)].map((_, i) => (
                  <Sparkles 
                    key={i}
                    className="absolute text-yellow-300 animate-bounce"
                    style={{ 
                      top: `${Math.random() * 100}%`, 
                      left: `${Math.random() * 100}%`,
                      animationDuration: `${0.3 + Math.random()}s`,
                      scale: 0.5 + Math.random()
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="relative z-10 pt-6">
            <button 
              onClick={handleCharge}
              disabled={isCharging}
              className={`group relative overflow-hidden font-black py-8 px-14 rounded-[3rem] shadow-2xl transition-all hover:scale-105 active:scale-95 disabled:opacity-80 ${level >= 100 ? 'bg-gradient-to-r from-yellow-400 to-amber-500' : 'bg-gradient-to-br from-pink-500 to-rose-400'} text-white`}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <span className="relative z-10 flex items-center justify-center gap-4 text-2xl tracking-[0.15em]">
                {level >= 100 ? 'FULL POWER! 👑' : 'CAS CINTA!'} <Heart className={`fill-current w-8 h-8 ${level < 100 ? 'animate-heart-pulse' : ''}`} />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Full Battery Celebration Overlay */}
      <div className={`fixed inset-0 z-[300] bg-white transition-all duration-700 flex items-center justify-center px-6 ${showFullCelebration ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-rose-500 to-orange-400 opacity-90"></div>
        
        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
           {[...Array(20)].map((_, i) => (
             <Stars 
              key={i}
              className="absolute text-white animate-pulse opacity-40"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
              size={Math.random() * 40 + 20}
             />
           ))}
        </div>

        <div className="relative bg-white/20 backdrop-blur-xl p-12 md:p-24 rounded-[4rem] md:rounded-[6rem] border-2 border-white/50 shadow-2xl text-center max-w-4xl space-y-12 animate-pop">
          <button 
            onClick={() => setShowFullCelebration(false)}
            className="absolute top-8 right-8 text-white hover:scale-110 transition-transform"
          >
            <X size={32} strokeWidth={3} />
          </button>

          <div className="inline-flex items-center justify-center w-32 h-32 md:w-48 md:h-48 bg-white rounded-full shadow-2xl mb-8 border-8 border-pink-100">
            <Trophy size={60} className="text-yellow-500 drop-shadow-lg md:scale-150" />
          </div>

          <div className="space-y-6">
            <h2 className="text-5xl md:text-8xl font-black text-white font-pacifico tracking-tight">100% CINTA!</h2>
            <div className="h-2 w-32 bg-white/60 mx-auto rounded-full"></div>
            <p className="text-white text-2xl md:text-5xl font-handwritten font-bold leading-relaxed px-4">
              "Terima kasih sudah mencintaiku sepenuh hati. Tangki ini penuh, tapi kasih sayangku padamu akan selalu bertambah tanpa batas!"
            </p>
          </div>

          <div className="pt-10">
            <button 
              onClick={() => setShowFullCelebration(false)}
              className="bg-white text-pink-600 font-black py-6 px-16 rounded-full text-xl md:text-2xl shadow-xl hover:scale-105 active:scale-95 transition-all tracking-[0.2em]"
            >
              I LOVE YOU TOO! ❤️
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoveBattery;
