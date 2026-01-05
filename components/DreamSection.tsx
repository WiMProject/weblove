
import React, { useState } from 'react';
import { ListTodo, PiggyBank, Image as ImageIcon, Plus, Check, Trash2, TrendingUp, Sparkles, Star, Wallet, Target, X } from 'lucide-react';

// --- Interfaces ---
interface Wish {
  id: number;
  text: string;
  completed: boolean;
}

interface SavingGoal {
  id: number;
  title: string;
  target: number;
  current: number;
  emoji: string;
}

interface Vision {
  id: number;
  url: string;
  caption: string;
}

const DreamSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'wishlist' | 'savings' | 'vision'>('wishlist');
  
  // --- Wishlist State ---
  const [wishes, setWishes] = useState<Wish[]>([
    { id: 1, text: "Nonton Konser Berdua 🎤", completed: false },
    { id: 2, text: "Punya Kucing Lucu 🐱", completed: true },
    { id: 3, text: "Dinner di Rooftop 🌃", completed: false }
  ]);
  const [wishInput, setWishInput] = useState("");

  // --- Savings State (New Multi-Goal) ---
  const [savingGoals, setSavingGoals] = useState<SavingGoal[]>([
    { id: 1, title: "Tabungan Nikah 💍", target: 50000000, current: 5000000, emoji: "💒" },
    { id: 2, title: "Jalan-jalan ke Jepang 🌸", target: 30000000, current: 2500000, emoji: "✈️" }
  ]);
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [newGoalTarget, setNewGoalTarget] = useState("");
  const [topUpAmounts, setTopUpAmounts] = useState<{ [key: number]: string }>({});

  // --- Vision Board State ---
  const [visions, setVisions] = useState<Vision[]>([
    { id: 1, url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=500&auto=format&fit=crop', caption: 'Rumah Impian Kita 🏡' },
    { id: 2, url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=500&auto=format&fit=crop', caption: 'Trip ke Swiss 🏔️' }
  ]);
  const [visionUrl, setVisionUrl] = useState("");
  const [visionCaption, setVisionCaption] = useState("");

  // --- Helper Functions ---
  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  // --- Wishlist Logic ---
  const addWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishInput.trim()) return;
    setWishes([...wishes, { id: Date.now(), text: wishInput, completed: false }]);
    setWishInput("");
  };

  const toggleWish = (id: number) => {
    setWishes(wishes.map(w => w.id === id ? { ...w, completed: !w.completed } : w));
  };

  const deleteWish = (id: number) => {
    setWishes(wishes.filter(w => w.id !== id));
  };

  // --- Savings Logic ---
  const addNewGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalTitle.trim() || !newGoalTarget) return;
    const target = parseInt(newGoalTarget.replace(/\D/g, ''));
    
    setSavingGoals([...savingGoals, {
      id: Date.now(),
      title: newGoalTitle,
      target: target,
      current: 0,
      emoji: "💰"
    }]);
    setNewGoalTitle("");
    setNewGoalTarget("");
    setIsAddingGoal(false);
  };

  const deleteGoal = (id: number) => {
    setSavingGoals(savingGoals.filter(g => g.id !== id));
  };

  const handleTopUpChange = (id: number, value: string) => {
    setTopUpAmounts(prev => ({ ...prev, [id]: value }));
  };

  const submitTopUp = (id: number) => {
    const amountStr = topUpAmounts[id];
    if (!amountStr) return;
    const amount = parseInt(amountStr.replace(/\D/g, ''));
    if (!amount) return;

    setSavingGoals(savingGoals.map(g => 
      g.id === id ? { ...g, current: g.current + amount } : g
    ));
    setTopUpAmounts(prev => ({ ...prev, [id]: "" }));
  };

  const totalSavings = savingGoals.reduce((acc, curr) => acc + curr.current, 0);

  // --- Vision Board Logic ---
  const addVision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visionUrl.trim()) return;
    setVisions([...visions, { id: Date.now(), url: visionUrl, caption: visionCaption || 'Goal Kita ✨' }]);
    setVisionUrl("");
    setVisionCaption("");
  };

  const deleteVision = (id: number) => {
    setVisions(visions.filter(v => v.id !== id));
  };

  return (
    <section className="space-y-8 py-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-20 right-0 -mr-20 w-80 h-80 bg-gradient-to-br from-yellow-200 to-orange-100 rounded-full blur-[100px] opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-20 left-0 -ml-20 w-80 h-80 bg-gradient-to-tr from-pink-200 to-purple-100 rounded-full blur-[100px] opacity-40 pointer-events-none"></div>
      
      <div className="text-center space-y-4 relative z-10 px-4">
        <div className="inline-block p-3 bg-white rounded-2xl shadow-sm mb-2 rotate-3 border border-pink-100">
          <Sparkles className="text-yellow-400 w-8 h-8 animate-pulse" />
        </div>
        <h3 className="text-3xl md:text-5xl font-black text-gray-800 font-pacifico drop-shadow-sm">Masa Depan Kita</h3>
        <p className="text-gray-500 font-handwritten text-lg md:text-2xl italic font-medium">
          "Satu demi satu mimpi, kita wujudkan bersama." ✨
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] md:rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border-2 border-white overflow-hidden ring-1 ring-pink-50">
          
          {/* Custom Tabs Navigation */}
          <div className="p-4 md:p-6 bg-gray-50/50 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row p-1 bg-gray-200/50 rounded-[1.5rem] relative gap-1 sm:gap-0">
              <button 
                onClick={() => setActiveTab('wishlist')}
                className={`flex-1 py-3 md:py-4 rounded-[1.2rem] flex items-center justify-center gap-2 font-bold text-sm md:text-base transition-all duration-500 ${activeTab === 'wishlist' ? 'bg-white text-pink-600 shadow-md scale-100' : 'text-gray-400 hover:text-gray-600 hover:bg-white/50'}`}
              >
                <ListTodo size={18} className={activeTab === 'wishlist' ? 'animate-bounce' : ''} /> Wishlist
              </button>
              <button 
                onClick={() => setActiveTab('savings')}
                className={`flex-1 py-3 md:py-4 rounded-[1.2rem] flex items-center justify-center gap-2 font-bold text-sm md:text-base transition-all duration-500 ${activeTab === 'savings' ? 'bg-white text-green-600 shadow-md scale-100' : 'text-gray-400 hover:text-gray-600 hover:bg-white/50'}`}
              >
                <PiggyBank size={18} className={activeTab === 'savings' ? 'animate-bounce' : ''} /> Tabungan
              </button>
              <button 
                onClick={() => setActiveTab('vision')}
                className={`flex-1 py-3 md:py-4 rounded-[1.2rem] flex items-center justify-center gap-2 font-bold text-sm md:text-base transition-all duration-500 ${activeTab === 'vision' ? 'bg-white text-purple-600 shadow-md scale-100' : 'text-gray-400 hover:text-gray-600 hover:bg-white/50'}`}
              >
                <ImageIcon size={18} className={activeTab === 'vision' ? 'animate-bounce' : ''} /> Vision Board
              </button>
            </div>
          </div>

          <div className="p-4 md:p-10 min-h-[400px]">
            {/* --- WISHLIST TAB --- */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="relative group">
                  <div className="absolute inset-0 bg-pink-200 blur-xl opacity-20 rounded-full group-hover:opacity-30 transition-opacity"></div>
                  <form onSubmit={addWish} className="relative flex flex-col sm:flex-row gap-3 bg-white p-2 rounded-[2rem] border-2 border-pink-100 shadow-lg focus-within:border-pink-300 focus-within:ring-4 focus-within:ring-pink-50 transition-all">
                    <input 
                      type="text" 
                      value={wishInput}
                      onChange={(e) => setWishInput(e.target.value)}
                      placeholder="Tulis harapan baru..."
                      className="flex-grow bg-transparent border-none rounded-xl px-4 py-3 sm:px-6 sm:py-4 outline-none font-handwritten text-xl md:text-2xl text-gray-700 placeholder:text-gray-300 font-bold"
                    />
                    <button type="submit" className="bg-gradient-to-tr from-pink-500 to-rose-400 hover:from-rose-500 hover:to-pink-500 text-white w-full sm:w-auto px-6 py-3 sm:py-0 h-12 sm:h-auto rounded-[1.5rem] transition-all shadow-md active:scale-90 flex items-center justify-center gap-2 font-bold">
                      <Plus size={24} /> <span className="sm:hidden">Tambah</span>
                    </button>
                  </form>
                </div>

                <div className="grid gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar pb-4">
                  {wishes.map((wish) => (
                    <div 
                      key={wish.id}
                      className={`group flex items-center justify-between p-4 md:p-5 rounded-[2rem] border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${wish.completed ? 'bg-pink-50/50 border-pink-200 shadow-inner opacity-80' : 'bg-white border-gray-100 hover:border-pink-200 shadow-sm'}`}
                    >
                      <div className="flex items-center gap-4 cursor-pointer flex-grow" onClick={() => toggleWish(wish.id)}>
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${wish.completed ? 'bg-pink-500 border-pink-500 text-white rotate-0' : 'border-gray-200 text-transparent hover:border-pink-400 rotate-12 group-hover:rotate-0'}`}>
                          <Check size={16} strokeWidth={4} />
                        </div>
                        <span className={`font-handwritten text-lg md:text-xl font-bold transition-colors ${wish.completed ? 'text-pink-300 line-through decoration-pink-300 decoration-2' : 'text-gray-700 group-hover:text-pink-500'}`}>
                          {wish.text}
                        </span>
                      </div>
                      <button 
                        onClick={() => deleteWish(wish.id)} 
                        className="text-gray-300 hover:text-red-400 hover:bg-red-50 p-2 rounded-xl transition-all flex-shrink-0"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                  {wishes.length === 0 && (
                    <div className="text-center py-16 opacity-50">
                      <Star size={48} className="mx-auto text-yellow-400 mb-3 animate-spin-slow" />
                      <p className="text-gray-400 font-handwritten text-xl">Belum ada wishlist. Ayo bermimpi bareng! ☁️</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* --- SAVINGS TAB (MULTI-GOAL) --- */}
            {activeTab === 'savings' && (
              <div className="space-y-8 animate-fadeIn">
                {/* Total Summary */}
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-[2.5rem] p-6 md:p-8 text-white shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-1/2 -translate-y-1/2 group-hover:rotate-12 transition-transform duration-700">
                    <Wallet size={150} fill="currentColor" />
                  </div>
                  <div className="relative z-10">
                    <p className="text-emerald-100 font-bold uppercase tracking-widest text-xs md:text-sm mb-1">Total Aset Kita</p>
                    <h3 className="text-4xl md:text-5xl font-black font-pacifico tracking-wide drop-shadow-md">{formatRupiah(totalSavings)}</h3>
                    <p className="mt-4 text-sm font-medium opacity-90 flex items-center gap-2">
                      <Sparkles size={16} className="text-yellow-300 animate-pulse" /> Semangat nabung buat masa depan!
                    </p>
                  </div>
                </div>

                {/* Add New Goal Button / Form */}
                {!isAddingGoal ? (
                  <button 
                    onClick={() => setIsAddingGoal(true)}
                    className="w-full py-4 border-2 border-dashed border-gray-300 rounded-[2rem] text-gray-400 font-bold hover:border-green-400 hover:text-green-500 hover:bg-green-50 transition-all flex items-center justify-center gap-2 group"
                  >
                    <div className="bg-gray-100 group-hover:bg-green-200 p-1 rounded-full text-gray-400 group-hover:text-green-600 transition-colors">
                      <Plus size={20} />
                    </div>
                    Tambah Tujuan Baru
                  </button>
                ) : (
                  <form onSubmit={addNewGoal} className="bg-green-50 p-6 rounded-[2rem] border border-green-200 shadow-sm space-y-4 relative">
                    <button type="button" onClick={() => setIsAddingGoal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500"><X size={20} /></button>
                    <h4 className="font-bold text-green-700 text-center uppercase tracking-widest text-xs">Target Baru</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        placeholder="Nama Tabungan (Misal: Nikah)" 
                        value={newGoalTitle}
                        onChange={(e) => setNewGoalTitle(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-green-200 focus:ring-2 focus:ring-green-300 outline-none text-sm"
                        autoFocus
                      />
                      <input 
                        type="number" 
                        placeholder="Target Nominal (Rp)" 
                        value={newGoalTarget}
                        onChange={(e) => setNewGoalTarget(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-green-200 focus:ring-2 focus:ring-green-300 outline-none text-sm"
                      />
                    </div>
                    <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl shadow-md active:scale-95 transition-all">Simpan Target</button>
                  </form>
                )}

                {/* Goals Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {savingGoals.map((goal) => {
                    const percentage = Math.min((goal.current / goal.target) * 100, 100);
                    return (
                      <div key={goal.id} className="bg-white border border-gray-100 p-6 rounded-[2.5rem] shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 relative group overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-bl-[100%] -mr-4 -mt-4 transition-all group-hover:scale-110"></div>
                        <div className="absolute top-4 right-4 text-2xl">{goal.emoji}</div>
                        
                        <div className="relative z-10">
                          <h4 className="font-black text-gray-700 text-lg md:text-xl truncate pr-8">{goal.title}</h4>
                          <div className="flex items-end gap-2 mt-1">
                            <span className="text-2xl md:text-3xl font-black text-green-600 font-pacifico">{formatRupiah(goal.current)}</span>
                          </div>
                          <p className="text-xs text-gray-400 font-bold mb-4">Target: {formatRupiah(goal.target)}</p>

                          {/* Progress Bar */}
                          <div className="relative h-4 w-full bg-gray-100 rounded-full overflow-hidden mb-1">
                            <div 
                              className="h-full bg-gradient-to-r from-green-400 to-teal-500 rounded-full transition-all duration-1000 relative"
                              style={{ width: `${percentage}%` }}
                            >
                              <div className="absolute inset-0 bg-white/20 animate-[shine_2s_infinite]"></div>
                            </div>
                          </div>
                          <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-6">
                            <span>Mulai</span>
                            <span className={percentage >= 100 ? "text-green-500" : "text-gray-400"}>{Math.floor(percentage)}%</span>
                          </div>

                          {/* Add Funds Input */}
                          {percentage < 100 && (
                            <div className="flex gap-2">
                              <div className="relative flex-grow">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">Rp</span>
                                <input 
                                  type="number" 
                                  value={topUpAmounts[goal.id] || ""}
                                  onChange={(e) => handleTopUpChange(goal.id, e.target.value)}
                                  placeholder="0"
                                  className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 outline-none focus:border-green-400"
                                />
                              </div>
                              <button 
                                onClick={() => submitTopUp(goal.id)}
                                className="bg-green-100 text-green-600 p-2 rounded-xl hover:bg-green-500 hover:text-white transition-colors"
                              >
                                <Plus size={20} />
                              </button>
                            </div>
                          )}
                          
                          <button 
                            onClick={() => deleteGoal(goal.id)}
                            className="absolute bottom-6 right-6 text-gray-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* --- VISION BOARD TAB --- */}
            {activeTab === 'vision' && (
              <div className="space-y-8 animate-fadeIn">
                <form onSubmit={addVision} className="bg-purple-50/80 p-4 md:p-6 rounded-[2rem] flex flex-col md:flex-row gap-4 border-2 border-purple-100/50 shadow-sm backdrop-blur-sm">
                  <div className="flex-grow space-y-3">
                    <input 
                      type="text" 
                      value={visionUrl}
                      onChange={(e) => setVisionUrl(e.target.value)}
                      placeholder="Tempel Link Gambar (URL)..."
                      className="w-full px-4 py-3 rounded-2xl border border-purple-200 focus:ring-2 focus:ring-purple-300 outline-none text-sm font-medium bg-white text-gray-700"
                    />
                    <input 
                      type="text" 
                      value={visionCaption}
                      onChange={(e) => setVisionCaption(e.target.value)}
                      placeholder="Caption impian..."
                      className="w-full px-4 py-3 rounded-2xl border border-purple-200 focus:ring-2 focus:ring-purple-300 outline-none text-sm font-medium bg-white text-gray-700"
                    />
                  </div>
                  <button type="submit" className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 md:py-0 md:w-32 rounded-[1.5rem] font-black text-sm shadow-lg shadow-purple-200 transition-all active:scale-95 flex flex-row md:flex-col items-center justify-center gap-2">
                    <ImageIcon size={20} />
                    <span>PIN IT!</span>
                  </button>
                </form>

                <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4 pb-4">
                  {visions.map((vision) => (
                    <div key={vision.id} className="relative group break-inside-avoid animate-scaleIn">
                      {/* Frame effect */}
                      <div className="absolute -inset-2 bg-white border border-gray-100 shadow-md rounded-xl -z-10 rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
                      
                      <div className="relative overflow-hidden rounded-lg bg-gray-100">
                        <img 
                          src={vision.url} 
                          alt={vision.caption} 
                          className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
                          onError={(e: any) => e.target.src = "https://via.placeholder.com/400x300?text=Image+Error"}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                          <p className="text-white font-handwritten font-bold text-lg leading-tight drop-shadow-md translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{vision.caption}</p>
                        </div>
                        <button 
                          onClick={() => deleteVision(vision.id)}
                          className="absolute top-2 right-2 bg-white/90 backdrop-blur-md p-1.5 rounded-full text-red-500 opacity-0 group-hover:opacity-100 shadow-md transform scale-50 group-hover:scale-100 transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      
                      {/* Tape */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/40 backdrop-blur-sm border-x-2 border-white/60 shadow-sm opacity-80 rotate-[-2deg]"></div>
                    </div>
                  ))}
                </div>
                
                {visions.length === 0 && (
                  <div className="text-center py-16 border-4 border-dashed border-purple-100 rounded-[3rem] bg-purple-50/30">
                    <ImageIcon size={64} className="mx-auto text-purple-200 mb-4" />
                    <p className="text-gray-400 font-bold text-lg">Mading Impian Masih Kosong...</p>
                    <p className="text-purple-300 text-sm mt-2">Tempel foto rumah, liburan, atau goal kita disini!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DreamSection;
