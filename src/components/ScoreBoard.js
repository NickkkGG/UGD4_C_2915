import React from 'react';
import { FaMousePointer, FaCheck, FaSyncAlt, FaRedo, FaClock, FaArrowLeft } from 'react-icons/fa';

function ScoreBoard({ moves, matchedCount, totalPairs, onReset, onBack, timer }) {
  return (
    <div className="text-center mb-6">
      <div className="flex justify-center gap-4 mb-4">

        <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
          <p className="text-sm text-cyan-300 flex items-center gap-1 justify-center">
            <FaClock className="text-cyan-400" /> Waktu
          </p>
          <p className="text-2xl font-bold text-white">{timer}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
          <p className="text-sm text-cyan-300 flex items-center gap-1 justify-center">
            <FaMousePointer className="text-cyan-400" /> Percobaan
          </p>
          <p className="text-2xl font-bold text-white">{moves}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
          <p className="text-sm text-cyan-300 flex items-center gap-1 justify-center">
            <FaCheck className="text-cyan-400" /> Ditemukan
          </p>
          <p className="text-2xl font-bold text-white">{matchedCount}/{totalPairs}</p>
        </div>

      </div>

      <div className="flex gap-3 justify-center">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-white/10 text-white font-bold rounded-full border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-200 flex items-center gap-2"
        >
          <FaArrowLeft />
          Lobby
        </button>
        <button
          onClick={onReset}
          className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold rounded-full hover:from-cyan-300 hover:to-blue-500 hover:scale-105 transition-all duration-200 shadow-lg shadow-cyan-500/30 flex items-center gap-2"
        >
          <FaSyncAlt />
          Acak Ulang
        </button>
      </div>
    </div>
  );
}

export default ScoreBoard;