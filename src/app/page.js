'use client';
import React, { useState, useEffect } from 'react';
import GameBoard from '../components/GameBoard';
import ScoreBoard from '../components/ScoreBoard';
import Lobby from '../components/Lobby';
import FinishPage from '../components/FinishPage';
import { GiCardJoker } from 'react-icons/gi';
import { FaAppleAlt, FaLemon, FaHeart, FaStar, FaBolt, FaLeaf, FaFire, FaGem } from 'react-icons/fa';

const ICONS = [
  { icon: FaAppleAlt, color: '#ef4444' },
  { icon: FaLemon, color: '#eab308' },
  { icon: FaHeart, color: '#ec4899' },
  { icon: FaStar, color: '#f97316' },
  { icon: FaBolt, color: '#a855f7' },
  { icon: FaLeaf, color: '#22c55e' },
  { icon: FaFire, color: '#f43f5e' },
  { icon: FaGem, color: '#06b6d4' },
];

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const createCards = (difficulty) => {
  const selectedIcons = ICONS.slice(0, difficulty);
  const paired = selectedIcons.flatMap((item, index) => [
    { id: index * 2, icon: item.icon, color: item.color, pairId: index },
    { id: index * 2 + 1, icon: item.icon, color: item.color, pairId: index },
  ]);
  return shuffleArray(paired);
};

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [difficulty, setDifficulty] = useState(4);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [stars, setStars] = useState([]);
  const [pageVisible, setPageVisible] = useState(false);

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

  useEffect(() => {
    if (isStarted) {
      setPageVisible(false);
      setTimeout(() => setPageVisible(true), 50);
    }
  }, [isStarted]);

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  useEffect(() => {
    if (isStarted) {
      setCards(createCards(difficulty));
      setTimer(0);
      setIsTimerRunning(false);
      setIsFinished(false);
    }
  }, [isStarted, difficulty]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstId, secondId] = flippedCards;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);
      setMoves(prev => prev + 1);
      if (firstCard.pairId === secondCard.pairId) {
        setMatchedCards(prev => [...prev, firstId, secondId]);
        setFlippedCards([]);
      } else {
        const t = setTimeout(() => {
          setFlippedCards([]);
        }, 800);
        return () => clearTimeout(t);
      }
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (cards.length > 0 && matchedCards.length === cards.length) {
      setIsTimerRunning(false);
      setTimeout(() => setIsFinished(true), 1000);
    }
  }, [matchedCards, cards]);

  const handleCardFlip = (id) => {
    if (flippedCards.length < 2 && !flippedCards.includes(id)) {
      if (!isTimerRunning) setIsTimerRunning(true);
      setFlippedCards(prev => [...prev, id]);
    }
  };

  const resetGame = () => {
    setCards(createCards(difficulty));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTimer(0);
    setIsTimerRunning(false);
    setIsFinished(false);
    setPageVisible(false);
    setTimeout(() => setPageVisible(true), 50);
  };

  const backToLobby = () => {
    setIsStarted(false);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTimer(0);
    setIsTimerRunning(false);
    setIsFinished(false);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (!isStarted) {
    return (
      <Lobby
        onStart={() => setIsStarted(true)}
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
      />
    );
  }

  if (isFinished) {
    return (
      <FinishPage
        timer={formatTime(timer)}
        moves={moves}
        difficulty={difficulty}
        onPlayAgain={resetGame}
        onBackToLobby={backToLobby}
      />
    );
  }

  
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

      {/* Content dengan animasi slide up */}
      <div className={`relative z-10 w-full flex flex-col items-center transition-all duration-500 ${pageVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>

        <h1 className="text-4xl font-bold mb-6 text-white drop-shadow-lg flex items-center gap-3">
          <GiCardJoker className="text-cyan-300 text-4xl" />
          Memory Card
        </h1>

        <ScoreBoard
          moves={moves}
          matchedCount={matchedCards.length / 2}
          totalPairs={difficulty}
          onReset={resetGame}
          onBack={backToLobby}
          timer={formatTime(timer)}
        />

        {/* GUI pembungkus game board */}
        <div className="bg-gradient-to-b from-slate-900/80 to-[#0f0c29]/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/10">
          <GameBoard
            cards={cards}
            flippedCards={flippedCards}
            matchedCards={matchedCards}
            onFlip={handleCardFlip}
            isFinished={isFinished}
          />
        </div>

      </div>
    </div>
  );
}