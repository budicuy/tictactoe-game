
import React from 'react';
import { Player } from '../types';

interface SquareProps {
  value: Player;
  onClick: () => void;
  isWinningSquare: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, isWinningSquare }) => {
  const textColor = value === 'X' ? 'text-blue-400' : 'text-pink-400';
  const winningBg = isWinningSquare ? 'bg-green-500/50' : '';

  return (
    <button
      className={`w-24 h-24 md:w-32 md:h-32 m-1 flex items-center justify-center bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200 ease-in-out ${winningBg}`}
      onClick={onClick}
      disabled={!!value}
    >
      <span className={`text-6xl md:text-7xl font-bold ${textColor}`}>
        {value}
      </span>
    </button>
  );
};

export default Square;
