import React, { useState } from 'react';
import Card from './Card';
import { Cards } from '../logic/gameLogic';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { useCheckLoadedImages } from '~/logic/gameLogic';

type BoardProps = {
  cards: Cards | null;
  flipCount: number;
  handleCardClick: (key: number, flipCount: number, progress: number) => void;
  children?: React.ReactNode;
};

function Board({ cards, flipCount, handleCardClick, children }: BoardProps) {
  const [progress, setProgress] = useState(0);
  if (!cards) {
    return null;
  }
  // onLoad can get triggered before hydration, so we need to
  // check how many images have loaded before hydration
  useCheckLoadedImages(progress, setProgress);
  return (
    <section
      className="board-section"
      onDragStart={(event) => {
        event.preventDefault();
        return false;
      }}
    >
      <div className="board">
        {children}
        {cards.map((card) =>
          Card({ ...card, handleCardClick, flipCount, progress, setProgress })
        )}
      </div>
      {progress < 24 && (
        <>
          <span className="loading">Loading...</span>
          <ProgressPrimitive.Root
            className="progress-root"
            max={24}
            value={progress}
          >
            <ProgressPrimitive.Indicator
              className="progress-indicator"
              style={{ width: `${(progress / 24) * 100}%` }}
            />
          </ProgressPrimitive.Root>
        </>
      )}
    </section>
  );
}

export default Board;
