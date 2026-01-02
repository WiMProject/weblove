
import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  left: number;
  size: number;
  duration: number;
  type: string;
  delay: number;
  blur: string;
}

const FloatingHearts: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const types = ['❤️', '💖', '✨', '🌸', '🍓', '☁️'];
    const interval = setInterval(() => {
      const newParticle: Particle = {
        id: Math.random(),
        left: Math.random() * 100,
        size: Math.random() * (40 - 15) + 15,
        duration: Math.random() * (12 - 7) + 7, // Lebih lambat agar tidak pusing
        type: types[Math.floor(Math.random() * types.length)],
        delay: Math.random() * 2,
        blur: Math.random() > 0.7 ? 'blur(1px)' : 'none' // Efek depth of field
      };
      setParticles((prev) => [...prev, newParticle].slice(-30)); // Batasi jumlah agar tidak lag

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, newParticle.duration * 1000);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
      {particles.map((p) => (
        <div
          key={p.id}
          className="heart-particle"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            bottom: '-10%',
            filter: p.blur,
          }}
        >
          {p.type}
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
