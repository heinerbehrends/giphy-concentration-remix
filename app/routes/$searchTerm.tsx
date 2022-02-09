import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { isGameOver, useParseSearchTerm } from '../logic/gameLogic';
import Board from '../components/Board';
import Confetti from '../components/Confetti';
import { useOnClickCard } from '../logic/useOnClickCard';
import { useShowConfetti } from '../logic/useShowConfetti';
import { useGamePlay } from '../logic/useGamePlay';
import { CardT } from '../logic/logic';

import styles from '~/styles/game.css';

import { LoaderFunction, useLoaderData } from 'remix';
import { getCards } from '~/logic/getGiphys';

type GameProps = {
  nrOfCardsTurned: number;
  setNrOfCardsTurned: Dispatch<SetStateAction<number>>;
};

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const loader: LoaderFunction = async ({ params }) => {
  const cards = await getCards(params.searchTerm!);
  return cards;
};

function Game() {
  // reset the number of cards turned, once and not on rerender
  const [nrOfCardsTurned, setNrOfCardsTurned] = useState(0);
  useEffect(() => setNrOfCardsTurned(0), []);
  const navigate = useNavigate();
  const { error, cards: initialCards } = useLoaderData();
  const [cards, setCards] = useState(initialCards);
  const { flipCount, setFlipCount, timeoutObj } = useGamePlay(cards!, setCards);
  const { onClickCard } = useOnClickCard(
    cards! as CardT[],
    setCards,
    setFlipCount,
    timeoutObj!,
    nrOfCardsTurned,
    setNrOfCardsTurned
  );
  const { showConfetti } = useShowConfetti(flipCount, cards!);
  const gameIsOver = isGameOver(cards!);
  if (gameIsOver) {
    setTimeout(() => navigate('/'), 4000);
  }
  if (error) {
    setTimeout(() => navigate('/'), 3000);
  }
  return (
    <>
      {error ? <p className="message-section">{error}</p> : null}
      {showConfetti > 0 ? (
        <Confetti
          // if a confetti starts while there's still confetti falling
          // shouldRecycle gets set to true so that confetti continues
          shouldRecycle={showConfetti > 1}
        />
      ) : null}
      {gameIsOver ? (
        <p className="message-section">
          It took you {nrOfCardsTurned} moves to finish the game
        </p>
      ) : null}
      <Board
        cards={cards}
        flipCount={flipCount}
        handleCardClick={onClickCard}
      ></Board>
    </>
  );
}

export default Game;
