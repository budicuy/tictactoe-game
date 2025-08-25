
import React, { useState, useEffect } from 'react';
import { Player } from './types';
import Square from './components/Square';
import { SparklesCore } from './components/Sparkles';

// Helper function to calculate winner, outside the component to prevent recreation on re-renders
const calculateWinner = (squares: Player[]): { winner: Player; line: number[] | null } => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return { winner: null, line: null };
};

const App: React.FC = () => {
  const [squares, setSquares] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [winnerInfo, setWinnerInfo] = useState<{ winner: Player; line: number[] | null }>({ winner: null, line: null });
  const [isDraw, setIsDraw] = useState<boolean>(false);

  useEffect(() => {
    const newWinnerInfo = calculateWinner(squares);
    if (newWinnerInfo.winner) {
      setWinnerInfo(newWinnerInfo);
    } else if (squares.every(square => square !== null)) {
      setIsDraw(true);
    }
  }, [squares]);

  const handleSquareClick = (index: number) => {
    if (winnerInfo.winner || squares[index]) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinnerInfo({ winner: null, line: null });
    setIsDraw(false);
  };

  const renderStatus = () => {
    if (winnerInfo.winner) {
      return (
        <span className="text-3xl text-green-400">
          Pemain {winnerInfo.winner} Menang!
        </span>
      );
    }
    if (isDraw) {
      return <span className="text-3xl text-yellow-400">Seri!</span>;
    }
    const nextPlayer = isXNext ? 'X' : 'O';
    const playerColor = isXNext ? 'text-blue-400' : 'text-pink-400';
    return (
      <span className="text-3xl">
        Giliran: <span className={`font-bold ${playerColor}`}>{nextPlayer}</span>
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
            <SparklesCore
                id="tsparticles"
                background="transparent"
                minSize={0.6}
                maxSize={1.4}
                particleDensity={50}
                className="w-full h-full"
                particleColor="#FFFFFF"
            />
        </div>

      <main className="z-10 flex flex-col items-center bg-black bg-opacity-50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700">
        <h1 className="text-5xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-pink-500 to-yellow-300">
          Tic Tac Toe
        </h1>
        <div className="mb-6 h-10 flex items-center justify-center">
            {renderStatus()}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {squares.map((square, i) => (
            <Square
              key={i}
              value={square}
              onClick={() => handleSquareClick(i)}
              isWinningSquare={winnerInfo.line?.includes(i) ?? false}
            />
          ))}
        </div>

        <button
          onClick={handleReset}
          className="mt-8 px-8 py-3 bg-indigo-600 rounded-lg text-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105"
        >
          Mulai Ulang
        </button>
      </main>
    </div>
  );
};

export default App;
