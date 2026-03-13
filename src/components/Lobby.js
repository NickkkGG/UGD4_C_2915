import React, { useEffect, useState } from 'react';
import { GiCardJoker } from 'react-icons/gi';
import { FaPlay, FaTrophy, FaSkull } from 'react-icons/fa';

function Lobby({ onStart, difficulty, onDifficultyChange }) {
  const [stars, setStars] = useState([]);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const generated = [...Array(35)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 40 + 20}px`,
      duration: `${Math.random() * 10 + 8}s`,
      delay: `${Math.random() * 5}s`,
    }));
    setStars(generated);
  }, []);

  const handleStart = () => {
    setIsLeaving(true);
    setTimeout(() => onStart(), 400);
  };

  const difficulties = [
    {
      label: 'Easy',
      value: 4,
      icon: <FaPlay className="text-green-400 text-xl" />,
      desc: '4 Pasang Kartu',
      active: 'border-green-400 bg-green-400/20 text-green-300 scale-105 shadow-lg shadow-green-500/20',
      inactive: 'border-white/20 text-white/50 hover:border-green-400/50 hover:bg-green-400/10 hover:scale-105',
    },
    {
      label: 'Medium',
      value: 6,
      icon: <FaTrophy className="text-yellow-400 text-xl" />,
      desc: '6 Pasang Kartu',
      active: 'border-yellow-400 bg-yellow-400/20 text-yellow-300 scale-105 shadow-lg shadow-yellow-500/20',
      inactive: 'border-white/20 text-white/50 hover:border-yellow-400/50 hover:bg-yellow-400/10 hover:scale-105',
    },
    {
      label: 'Hard',
      value: 8,
      icon: <FaSkull className="text-red-400 text-xl" />,
      desc: '8 Pasang Kartu',
      active: 'border-red-400 bg-red-400/20 text-red-300 scale-105 shadow-lg shadow-red-500/20',
      inactive: 'border-white/20 text-white/50 hover:border-red-400/50 hover:bg-red-400/10 hover:scale-105',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4 relative overflow-hidden">

      {/* Bintang bergerak */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute text-yellow-300 star-float pointer-events-none"
          style={{
            left: star.left,
            top: star.top,
            fontSize: star.size,
            animationDuration: star.duration,
            animationDelay: star.delay,
            opacity: 0.15,
          }}
        >
          ★
        </div>
      ))}

      {/* Content */}
      <div className={`relative z-10 flex flex-col items-center ${isLeaving ? 'animate-slide-down' : 'animate-slide-up'}`}>

        <div className="text-center mb-12">
          <GiCardJoker className="text-cyan-300 text-9xl mx-auto mb-4 drop-shadow-2xl" />
          <h1 className="text-7xl font-bold text-white drop-shadow-lg mb-3 tracking-tight">
            Memory Card
          </h1>
          <p className="text-cyan-300/70 text-xl">Uji kemampuan memori kamu!</p>
        </div>

        <div className="mb-12">
          <p className="text-center text-cyan-300/70 text-sm font-semibold mb-5 uppercase tracking-widest">
            ✦ Pilih Kesulitan ✦
          </p>
          <div className="flex gap-4">
            {difficulties.map((d) => (
              <button
                key={d.value}
                onClick={() => onDifficultyChange(d.value)}
                className={`flex flex-col items-center gap-2 px-8 py-5 rounded-2xl border-2 transition-all duration-300
                  ${difficulty === d.value ? d.active : d.inactive}`}
              >
                {d.icon}
                <span className="font-bold text-lg">{d.label}</span>
                <span className="text-xs opacity-80">{d.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleStart}
          className="px-14 py-5 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold text-2xl rounded-full hover:from-cyan-300 hover:to-blue-500 hover:scale-105 active:scale-95 transition-all duration-200 shadow-2xl shadow-cyan-500/30 btn-shine flex items-center gap-3"
        >
          <FaPlay />
          Start Game
        </button>

      </div>
    </div>
  );
}

export default Lobby;