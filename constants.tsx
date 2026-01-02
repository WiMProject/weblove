
import { Memory } from './types';

export const RELATIONSHIP_START_DATE = '2023-11-28T00:00:00';

export const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1518199266791-7399494a6788?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1516589174184-c68d8e5f0b4a?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1000&auto=format&fit=crop'
];

export const INITIAL_MEMORIES: Memory[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=1000&auto=format&fit=crop',
    title: 'Momen Manis Kita',
    description: 'Klik untuk lihat koleksi foto kenangan kita. ✨',
    date: 'Kenangan',
    gallery: [
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518199266791-7399494a6788?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516589174184-c68d8e5f0b4a?q=80&w=1000&auto=format&fit=crop'
    ]
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=1000&auto=format&fit=crop',
    title: 'Tawa & Bahagia',
    description: 'Selalu suka caramu membuatku tersenyum.',
    date: 'Bahagia',
    gallery: [
      'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=1000&auto=format&fit=crop'
    ]
  }
];

export const CUTE_PHRASES = [
  "Kamu adalah alasanku tersenyum hari ini!",
  "Cintaku ke kamu itu kayak lingkaran, nggak ada ujungnya.",
  "Setiap hari bersamamu adalah petualangan favoritku.",
  "Makasih ya udah lahir ke dunia dan jadi milikku! ❤️"
];

export const MASCOT_PHRASES = [
  "Elus kepalaku dong! ✨",
  "Hehe, geli tau! 🍓",
  "I Love You 3000! 🤖",
  "Kamu adalah yang tercantik! 🌸"
];

export const GACHA_MESSAGES = [
  "Tiket Pelukan Tanpa Batas! 🤗",
  "Voucher Makan Malam Romantis (Aku yang bayar!) 🍝",
  "Kupon 'Dimaafin Secara Instan' 🎟️",
  "Pijat Kaki Gratis Selama 30 Menit! 👣",
  "Hak Istimewa Pilih Film Netflix Malam Ini 🍿",
  "Ciuman Manis di Kening 💋",
  "Satu Hari Tanpa Dimarahin (Hehe!) 😇",
  "Voucher Jalan-jalan ke Mana Saja Kamu Mau! ✈️"
];

export const SONGS = [
  { title: "Perfect - Ed Sheeran", artist: "Favorit Kita", duration: "4:23" },
  { title: "Cantik - Kahitna", artist: "Untukmu Sayang", duration: "3:45" },
  { title: "Akad - Payung Teduh", artist: "Masa Depan", duration: "4:00" }
];
