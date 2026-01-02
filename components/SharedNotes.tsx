
import React, { useState, useEffect } from 'react';
import { Pin, Plus, Trash2, StickyNote, Sparkles } from 'lucide-react';

interface Note {
  id: number;
  text: string;
  color: string;
  rotation: number;
}

const COLORS = ['bg-pink-100', 'bg-yellow-100', 'bg-blue-100', 'bg-green-100', 'bg-purple-100'];

const SharedNotes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('love_notes');
    if (saved) {
      setNotes(JSON.parse(saved));
    } else {
      setNotes([
        { id: 1, text: "Jangan lupa makan ya sayang! ❤️", color: 'bg-pink-100', rotation: -2 },
        { id: 2, text: "I love you more than yesterday! ✨", color: 'bg-yellow-100', rotation: 3 }
      ]);
    }
  }, []);

  const saveNotes = (newNotes: Note[]) => {
    setNotes(newNotes);
    localStorage.setItem('love_notes', JSON.stringify(newNotes));
  };

  const addNote = () => {
    if (!inputText.trim()) return;
    const newNote: Note = {
      id: Date.now(),
      text: inputText,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: (Math.random() * 6) - 3
    };
    saveNotes([newNote, ...notes]);
    setInputText('');
  };

  const deleteNote = (id: number) => {
    saveNotes(notes.filter(n => n.id !== id));
  };

  return (
    <section className="space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-3 bg-white px-8 py-4 rounded-full shadow-sm border border-pink-50">
          <StickyNote className="text-pink-500" />
          <h3 className="text-2xl md:text-4xl font-black text-gray-800 font-pacifico">Papan Cerita Kita</h3>
        </div>
        <p className="text-gray-400 font-handwritten text-xl italic px-4">Tuliskan janji kecil atau pesan singkat untuk kita berdua...</p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Input Area */}
        <div className="mb-12 flex gap-4 px-4">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addNote()}
            placeholder="Ketik pesan manis di sini..."
            className="flex-grow bg-white border-2 border-pink-200 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-pink-50 transition-all font-handwritten text-2xl text-gray-900 placeholder:text-gray-300 shadow-inner"
          />
          <button
            onClick={addNote}
            className="bg-pink-500 hover:bg-pink-600 text-white p-5 rounded-2xl shadow-lg active:scale-95 transition-all shrink-0"
          >
            <Plus size={28} strokeWidth={3} />
          </button>
        </div>

        {/* Board */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-6 min-h-[400px] relative">
          <div className="absolute inset-0 bg-[#fdf8f5] opacity-50 rounded-[3rem] -z-10 border-4 border-dashed border-pink-100"></div>
          
          {notes.map((note) => (
            <div
              key={note.id}
              style={{ transform: `rotate(${note.rotation}deg)` }}
              className={`${note.color} p-6 pt-10 rounded-sm shadow-md relative group hover:shadow-xl hover:scale-105 transition-all`}
            >
              {/* Washi Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/60 backdrop-blur-sm border-x-2 border-dashed border-pink-200/50 shadow-sm"></div>
              
              <p className="font-handwritten text-xl text-gray-800 leading-tight font-bold">
                {note.text}
              </p>
              
              <button
                onClick={() => deleteNote(note.id)}
                className="absolute bottom-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-white/50 rounded-full"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}

          {notes.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center text-gray-300 py-20">
              <Sparkles size={48} className="mb-4 opacity-20" />
              <p className="font-handwritten text-2xl">Belum ada note manis hari ini...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SharedNotes;
