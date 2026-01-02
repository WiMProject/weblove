
import React, { useState, useEffect } from 'react';
import { Heart, Volume2, VolumeX, Sparkles, Stars, Calendar, Flower2, Pin } from 'lucide-react';
import FloatingHearts from './components/FloatingHearts';
import LoveAssistant from './components/LoveAssistant';
import NaughtyButton from './components/NaughtyButton';
import LoveGacha from './components/LoveGacha';
import VirtualHug from './components/VirtualHug';
import LoadingScreen from './components/LoadingScreen';
import PhotoSlider from './components/PhotoSlider';
import HeroSlider from './components/HeroSlider';
import LoveBattery from './components/LoveBattery';
import MemoriesSlider from './components/MemoriesSlider';
import MusicPlayer from './components/MusicPlayer';
import SharedNotes from './components/SharedNotes';
import { CUTE_PHRASES, RELATIONSHIP_START_DATE } from './constants';
import { recordActionToBackend } from './services/geminiService';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loveLevel, setLoveLevel] = useState(25);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [activeGallery, setActiveGallery] = useState<string[] | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const start = new Date(RELATIONSHIP_START_DATE).getTime();
      const now = new Date().getTime();
      const diff = now - start;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / 1000 / 60) % 60),
        secs: Math.floor((diff / 1000) % 60)
      });
    }, 1000);

    const phraseTimer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % CUTE_PHRASES.length);
    }, 6000);

    return () => {
      clearInterval(timer);
      clearInterval(phraseTimer);
    };
  }, []);

  const handleCharge = () => {
    const nextLevel = Math.min(loveLevel + 5, 100);
    setLoveLevel(nextLevel);
  };

  const handleDecision = async (accepted: boolean) => {
    if (accepted) {
      await recordActionToBackend('MESSAGE', { type: 'DECISION', answer: 'MAU BANGET' });
      alert("Yeay! Janji ya selamanya milik aku! I love you! ❤️✨");
    } else {
      alert("Gak bisa klik 'Enggak' kan? Hehehe");
    }
  };

  if (isLoading) return <LoadingScreen onComplete={() => setIsLoading(false)} />;

  return (
    <div className="min-h-screen relative flex flex-col selection:bg-pink-200 overflow-x-hidden">
      <FloatingHearts />
      <MusicPlayer />
      
      {activeGallery && <PhotoSlider images={activeGallery} onClose={() => setActiveGallery(null)} />}

      {/* Navigation */}
      <nav className="p-4 md:p-6 flex justify-between items-center fixed top-0 w-full z-50">
        <div className="bg-white/60 backdrop-blur-xl border border-white px-5 py-2.5 rounded-full flex items-center gap-3 shadow-sm scale-90 md:scale-100 origin-left transition-all hover:bg-white/80 cursor-default">
           <Heart size={18} className="text-pink-500 fill-pink-500 animate-heart-pulse" />
           <h1 className="font-pacifico text-base md:text-xl text-pink-600">Our Space</h1>
        </div>
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="p-3 rounded-full bg-white/70 backdrop-blur-md shadow-md text-pink-500 hover:scale-110 active:scale-95 transition-all"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-5xl mx-auto px-4 pt-24 pb-48 space-y-24 md:space-y-40">
        
        {/* Hero Section */}
        <section className="relative flex flex-col items-center text-center pt-8 md:pt-12 animate-[fadeIn_1s_ease-out]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-full bg-gradient-to-b from-pink-100/30 via-transparent to-transparent blur-[120px] -z-10 pointer-events-none"></div>
          
          {/* Main Photo Slider */}
          <div className="relative mb-6 md:mb-10 scale-95 md:scale-100 animate-[float-slow_6s_infinite_ease-in-out]">
            <HeroSlider />
            <Flower2 className="absolute -top-10 -right-10 text-pink-300 w-12 h-12 animate-float-slow opacity-60" />
            <Flower2 className="absolute -bottom-10 -left-10 text-pink-200 w-10 h-10 animate-float-slow opacity-40" style={{ animationDelay: '2s' }} />
          </div>
          
          <div className="space-y-8 md:space-y-12 w-full max-w-3xl">
            {/* Symmetrical Hero Title */}
            <div className="flex flex-col items-center justify-center gap-2 group">
              <div className="space-y-3 relative">
                <h2 className="text-5xl md:text-8xl font-black text-gray-800 font-pacifico drop-shadow-sm leading-tight">
                  Hai <span className="text-pink-500 relative inline-block">
                    Cantikku!
                    <span className="absolute bottom-0 left-0 w-full h-2 bg-pink-200/50 -z-10 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></span>
                  </span>
                </h2>
                <div className="flex items-center justify-center gap-4">
                  <div className="h-0.5 w-16 bg-gradient-to-l from-pink-200 to-transparent rounded-full"></div>
                  <Stars className="text-yellow-400 animate-pulse" size={24} />
                  <div className="h-0.5 w-16 bg-gradient-to-r from-pink-200 to-transparent rounded-full"></div>
                </div>
              </div>
            </div>
            
            {/* Cute Phrase Card */}
            <div className="px-2 animate-[slideUp_1s_ease-out_0.5s_both]">
              <div className="bg-white/40 backdrop-blur-xl p-10 md:p-14 rounded-[3rem] md:rounded-[5rem] relative overflow-hidden border border-white shadow-[0_30px_70px_rgba(255,182,193,0.2)] group hover:shadow-pink-200/50 transition-all duration-700">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/30 to-transparent"></div>
                <Sparkles className="absolute top-8 left-8 text-yellow-300 w-8 h-8 animate-pulse opacity-60" />
                <Stars className="absolute bottom-8 right-8 text-pink-200 w-10 h-10 animate-spin-slow opacity-60" />
                
                <p className="text-pink-600 font-bold text-3xl md:text-6xl italic leading-tight font-handwritten px-4 drop-shadow-sm">
                  "{CUTE_PHRASES[phraseIndex]}"
                </p>
                
                <div className="mt-10 md:mt-14 flex justify-center gap-3">
                  {CUTE_PHRASES.map((_, i) => (
                    <div key={i} className={`h-2 md:h-2.5 rounded-full transition-all duration-700 ${i === phraseIndex % CUTE_PHRASES.length ? 'w-10 md:w-16 bg-pink-500 shadow-md' : 'w-2 md:w-2.5 bg-pink-100'}`}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Relationship Counter */}
        <section className="space-y-10">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="bg-pink-100 text-pink-500 px-5 py-1.5 rounded-full text-[10px] font-black tracking-[0.4em] uppercase border border-pink-200 shadow-sm">Timeless Love</span>
            <h3 className="text-4xl md:text-6xl font-pacifico text-gray-800">Kenangan Kita</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="md:col-span-2 bg-white rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-16 shadow-xl border-t-8 border-pink-400 text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-full bg-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="space-y-6 md:space-y-8 relative z-10">
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-pink-50 rounded-2xl shadow-inner border border-white"><Calendar className="text-pink-500 w-8 h-8 md:w-10 md:h-10" /></div>
                  <p className="text-gray-400 font-black text-[10px] md:text-xs uppercase tracking-[0.2em]">Bersama Selamanya Sejak</p>
                  <span className="text-3xl md:text-6xl font-black text-pink-600 font-handwritten">28 November 2023</span>
                </div>
                <div className="h-0.5 w-24 bg-pink-100 mx-auto rounded-full"></div>
                <p className="text-gray-500 text-xl md:text-3xl italic font-medium max-w-2xl mx-auto leading-relaxed font-handwritten px-4">
                  "Setiap detiknya adalah hadiah terindah yang pernah aku terima."
                </p>
              </div>
            </div>
            
            <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { val: timeLeft.days, label: 'Hari Bahagia', emoji: '📅', color: 'bg-rose-50' },
                { val: timeLeft.hours, label: 'Jam Rindu', emoji: '⏰', color: 'bg-pink-50' },
                { val: timeLeft.mins, label: 'Menit Sayang', emoji: '⏳', color: 'bg-orange-50' },
                { val: timeLeft.secs, label: 'Detik Cinta', emoji: '💓', color: 'bg-yellow-50' }
              ].map((unit, i) => (
                <div key={i} className={`${unit.color} p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-white hover:scale-[1.03] transition-all shadow-md flex flex-col items-center justify-center text-center group`}>
                  <div className="text-3xl md:text-5xl mb-4 group-hover:scale-110 transition-transform">{unit.emoji}</div>
                  <div className="text-3xl md:text-6xl font-black text-pink-600 font-pacifico leading-none">{unit.val}</div>
                  <div className="text-[8px] md:text-[10px] uppercase font-black text-pink-300 tracking-[0.3em] mt-5">{unit.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Notes Section */}
        <SharedNotes />

        {/* Interaction Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
          <LoveGacha />
          <div className="bg-white rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-16 shadow-xl border-x-8 border-pink-50 flex flex-col items-center justify-center space-y-10 md:space-y-16 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-rose-100/20 to-transparent pointer-events-none"></div>
            <div className="text-center space-y-4 relative z-10">
              <h3 className="text-3xl md:text-5xl font-black text-gray-800 font-pacifico">Kirim Pelukan</h3>
              <div className="h-1.5 w-16 bg-pink-400 mx-auto rounded-full"></div>
            </div>
            <VirtualHug />
          </div>
        </section>

        {/* Love Battery */}
        <LoveBattery level={loveLevel} onCharge={handleCharge} />

        {/* AI Love Assistant */}
        <section className="space-y-10">
          <div className="text-center space-y-4">
            <h3 className="text-4xl md:text-7xl font-black text-gray-800 tracking-tight font-pacifico px-4 uppercase">Magic Letter</h3>
            <div className="h-1 w-20 bg-pink-300 mx-auto rounded-full opacity-50"></div>
            <p className="text-lg md:text-2xl px-8 italic font-handwritten text-gray-400 font-bold">Biarkan pena ajaib menuliskan perasaanmu...</p>
          </div>
          <LoveAssistant />
        </section>

        {/* Memories Slider */}
        <MemoriesSlider onOpenGallery={(imgs) => setActiveGallery(imgs)} />

        {/* Final Decision */}
        <section className="relative group pt-12 md:pt-20 px-4">
          <div className="absolute -inset-10 bg-gradient-to-r from-rose-100 via-pink-100 to-rose-100 rounded-[3rem] md:rounded-[6rem] blur-[80px] opacity-20 -z-10"></div>
          <div className="relative bg-white rounded-[3rem] md:rounded-[6rem] p-10 md:p-20 text-center shadow-xl border-b-[15px] border-pink-50 overflow-hidden">
            <div className="absolute top-6 right-6 text-pink-100/40 animate-pulse scale-75 md:scale-100"><Stars size={80} /></div>
            <div className="inline-flex items-center justify-center p-6 md:p-10 bg-pink-50 rounded-full mb-10 md:mb-16 shadow-inner border-2 border-white">
              <Heart fill="#ec4899" stroke="none" className="w-12 h-12 md:w-20 md:h-20 animate-pop" />
            </div>
            <div className="space-y-6 md:space-y-8 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-7xl font-black text-gray-800 leading-tight font-pacifico">
                Sama Aku Terus <br className="hidden md:block" /> Ya Sayang? 💍🥰
              </h2>
              <div className="h-1 w-32 bg-pink-100 mx-auto rounded-full"></div>
              <p className="text-gray-400 text-xl md:text-3xl font-handwritten font-bold tracking-wide italic px-4 leading-relaxed">
                "Duniaku jauh lebih berwarna sejak ada kamu di dalamnya."
              </p>
              <div className="flex flex-col items-center justify-center gap-6 md:gap-8 pt-8 md:pt-10">
                <button 
                  onClick={() => handleDecision(true)}
                  className="w-full md:w-auto bg-gradient-to-br from-pink-500 to-rose-500 text-white font-black py-5 md:py-8 px-10 md:px-24 rounded-[2rem] shadow-lg text-xl md:text-3xl hover:scale-105 active:scale-95 transition-all border-b-8 border-pink-700 hover:border-b-0"
                >
                  MAU BANGET! ❤️
                </button>
                <NaughtyButton label="Enggak..." onClick={() => handleDecision(false)} />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-16 md:py-20 text-center bg-white/30 backdrop-blur-2xl border-t border-white/50 relative z-30">
        <div className="inline-flex flex-col items-center gap-6 px-4">
          <div className="flex items-center gap-4">
            <Heart className="text-pink-400 fill-pink-400 animate-pulse w-6 h-6 md:w-8 md:h-8" />
            <p className="text-gray-600 text-lg md:text-2xl font-black tracking-[0.4em] uppercase font-handwritten">Milik Sayang Seutuhnya</p>
            <Heart className="text-pink-400 fill-pink-400 animate-pulse w-6 h-6 md:w-8 md:h-8" />
          </div>
          <div className="text-[10px] md:text-sm text-gray-400 font-medium font-pacifico opacity-50 tracking-[0.2em]">Designed with Lots of Love for My Princess 🌸</div>
        </div>
      </footer>
    </div>
  );
};

export default App;
