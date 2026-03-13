'use client';
import React from 'react';
import { FaQuestion } from 'react-icons/fa';

function Card({ card, isFlipped, isMatched, isFinished, onFlip }) {
  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onFlip(card.id);
    }
  };

  const isOpen = isFlipped || isMatched;
  const IconComponent = card.icon;

  return (
    <div
      className={`card-scene ${isMatched && !isFinished ? 'card-matched' : ''} ${isFinished ? 'card-finish' : ''}`}
      onClick={handleClick}
    >
      <div className={`card-body ${isOpen ? 'is-flipped' : ''}`}>
        <div className="card-face card-face--front">
          <FaQuestion style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.5rem' }} />
        </div>
        <div className="card-face card-face--back">
          {isOpen && (
            <span className="animate-bounce-once">
              <IconComponent style={{ color: card.color, fontSize: '2.5rem' }} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;