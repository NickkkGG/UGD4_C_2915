import React, { useEffect, useState } from 'react';
import { FaTrophy, FaClock, FaMousePointer, FaRedo, FaHome, FaMedal } from 'react-icons/fa';
import { GiCardJoker } from 'react-icons/gi';

function FinishPage({ timer, moves, difficulty, onPlayAgain, onBackToLobby }) {

  const [stars, setStars] = useState([]);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const generated = [...Array(30)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 35 + 15}px`,
      duration: `${Math.random() * 10 + 8}s`,
      delay: `${Math.random() * 5}s`,
    }));
    setStars(generated);
    setTimeout(() => setShowContent(true), 100);
  }, []);

  const getRating = () => {
    if (moves <= difficulty * 2) return { stars: 3, text: 'Luar Biasa!', color: 'text-yellow-400' };
    if (moves <= difficulty * 3) return { stars: 2, text: 'Bagus!', color: 'text-cyan-400' };
    return { stars: 1, text: 'Terus Berlatih!', color: 'text-purple-400' };
  };

  const rating = getRating();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4 relative overflow-hidden">

      {/* Bintang bergerak background */}
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

      {/* Window container */}
      <div className={`relative z-10 w-full max-w-md transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

        {/* Window body */}
        <div className="bg-gradient-to-b from-slate-900 to-[#0f0c29] rounded-2xl border border-white/10 p-8">

          {/* Trophy & title */}
          <div className="text-center mb-6">
            <div className="relative inline-block mb-4">
              <FaTrophy className="text-yellow-400 text-7xl mx-auto drop-shadow-2xl" />
              <div className="absolute inset-0 bg-yellow-400/20 blur-2xl rounded-full"></div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-1">Selesai! 🎉</h1>
            <p className={`text-xl font-semibold ${rating.color}`}>{rating.text}</p>
          </div>

          {/* Bintang rating */}
          <div className="flex justify-center gap-3 mb-8">
            {[1, 2, 3].map((star) => (
              <span
                key={star}
                className={`text-5xl transition-all duration-500 ${star <= rating.stars ? 'text-yellow-400 drop-shadow-lg' : 'text-white/15'}`}
                style={{ transitionDelay: `${star * 150}ms` }}
              >
                ★
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 mb-6"></div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-2 text-cyan-300 text-sm mb-2 justify-center">
                <FaClock />
                <span>Waktu</span>
              </div>
              <p className="text-3xl font-bold text-white">{timer}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-2 text-cyan-300 text-sm mb-2 justify-center">
                <FaMousePointer />
                <span>Percobaan</span>
              </div>
              <p className="text-3xl font-bold text-white">{moves}</p>
            </div>
          </div>

          {/* Difficulty badge */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">
              <FaMedal className="text-yellow-400" />
              <span className="text-white/70 text-sm">
                Difficulty: <span className="text-white font-bold">
                  {difficulty === 4 ? 'Easy' : difficulty === 6 ? 'Medium' : 'Hard'}
                </span>
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onBackToLobby}
              className="flex-1 py-3 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <FaHome />
              Lobby
            </button>
            <button
              onClick={onPlayAgain}
              className="flex-1 py-3 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-300 hover:to-blue-500 hover:scale-105 transition-all duration-200 shadow-lg shadow-cyan-500/30 btn-shine flex items-center justify-center gap-2"
            >
              <FaRedo />
              Main Lagi
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default FinishPage;