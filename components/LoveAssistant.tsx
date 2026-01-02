
import React, { useState } from 'react';
import { generateLoveMessage } from '../services/geminiService';
import { Send, Heart, Sparkles, Feather, Copy, Check } from 'lucide-react';

const LoveAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    const result = await generateLoveMessage(`Buatkan kata-kata romantis/lucu/bucin untuk kekasihku tentang: ${input}`);
    setResponse(result);
    setLoading(false);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative max-w-2xl mx-auto px-4">
      {/* Decorative Icons */}
      <div className="absolute -top-6 -right-2 bg-yellow-400 p-3 rounded-full shadow-xl z-20 animate-bounce hidden md:block">
        <Feather className="text-white w-5 h-5" />
      </div>

      <div className="bg-[#fffdfa] rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-10 shadow-[20px_20px_60px_rgba(0,0,0,0.05)] border-2 border-orange-50 relative overflow-hidden">
        {/* Aesthetic Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-pink-100 p-3 rounded-xl shadow-inner">
            <Sparkles className="text-pink-500 w-5 h-5" />
          </div>
          <div>
            <h3 className="font-pacifico text-2xl text-gray-800">Pena Ajaib</h3>
            <p className="text-[9px] uppercase font-black text-pink-300 tracking-[0.2em]">Asisten Cinta Pintar</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-100 to-orange-100 rounded-[1.8rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Misal: 'minta maaf', 'ucapan selamat pagi'..."
              className="relative w-full bg-white border border-orange-100 rounded-[1.5rem] p-6 focus:ring-4 focus:ring-pink-50 focus:border-pink-200 outline-none resize-none transition-all h-32 md:h-40 font-handwritten text-xl text-gray-800 placeholder:text-gray-300 shadow-sm"
            />
          </div>
          
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-rose-500 hover:to-pink-600 text-white font-black py-5 rounded-[1.5rem] shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95 text-sm tracking-[0.1em] group"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                KIRIM SINYAL CINTA <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {response && (
          <div className="mt-10 animate-pop relative">
            {/* Stationery Background */}
            <div className="absolute inset-0 bg-white rotate-1 rounded-[1.5rem] shadow-sm border border-gray-100"></div>
            <div className="relative p-6 md:p-10 bg-white border border-pink-100 rounded-[1.5rem] shadow-lg overflow-hidden flex flex-col items-center">
              {/* Paper Lines Effect */}
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(white, white 29px, #f472b6 30px)' }}></div>
              
              <Heart className="absolute -top-2 -right-2 text-pink-200 fill-pink-200 w-8 h-8 animate-pulse hidden md:block" />
              
              <div className="w-full max-h-60 overflow-y-auto relative z-10 scrollbar-hide">
                <p className="text-gray-700 font-handwritten text-xl md:text-2xl leading-relaxed italic text-center font-bold">
                  "{response}"
                </p>
              </div>

              <div className="mt-8 flex justify-center relative z-10 w-full">
                <button 
                  onClick={copyToClipboard}
                  className="flex items-center justify-center gap-2 w-full max-w-[240px] py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full font-black text-[12px] uppercase tracking-widest hover:brightness-110 transition-all active:scale-95 shadow-lg"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? 'BERHASIL DISALIN!' : 'SALIN SURAT CINTA'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">Powered by Gemini AI Technology</p>
      </div>
    </div>
  );
};

export default LoveAssistant;
