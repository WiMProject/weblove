
import React, { useState } from 'react';

interface NaughtyButtonProps {
  label: string;
  onClick: () => void;
}

const NaughtyButton: React.FC<NaughtyButtonProps> = ({ label, onClick }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => {
    // Random move range
    const newX = (Math.random() - 0.5) * 250;
    const newY = (Math.random() - 0.5) * 150;
    setPosition({ x: newX, y: newY });
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
      className="bg-white text-gray-400 px-8 py-4 rounded-full font-bold shadow-md hover:shadow-lg border-2 border-gray-100 hover:border-pink-100 active:scale-95 transition-colors text-sm md:text-base"
    >
      {label}
    </button>
  );
};

export default NaughtyButton;
