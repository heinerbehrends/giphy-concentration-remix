import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';
import { useNavigate } from 'react-router-dom';
import Board from '../components/Board';
import Confetti from '../components/Confetti';
import { isGameOver, makeCards } from '../logic/gameLogic';
import type { CardT } from '../logic/gameLogic';
import { useOnClickCard } from '../logic/useOnClickCard';
import { useShowConfetti } from '../logic/useShowConfetti';
import { useGamePlay } from '../logic/useGamePlay';
import styles from '~/styles/game.css';
import { getUrls } from '~/logic/getGiphys';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const loader: LoaderFunction = async ({ params }) => {
  const preparedUrls = await getUrls(params.searchTerm!);
  return preparedUrls;
};

function Game() {
  const { error, preparedUrls } = useLoaderData();
  const [cards, setCards] = useState(makeCards(preparedUrls));
  const { flipCount, setFlipCount, timeoutObj } = useGamePlay(cards!, setCards);
  const [nrOfCardsTurned, setNrOfCardsTurned] = React.useState<number>(0);
  // reset the number of cards turned, once and not on rerender
  useEffect(() => setNrOfCardsTurned(0), []);
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
  const navigate = useNavigate();
  return (
    <>
      {error ? <p className="message-section">{error}</p> : null}
      {gameIsOver ? (
        <p className="message-section">
          It took you {nrOfCardsTurned} moves to finish the game
        </p>
      ) : null}
      {showConfetti > 0 ? (
        <Confetti
          // if a confetti starts while there's still confetti falling
          // shouldRecycle gets set to true so that confetti continues
          shouldRecycle={showConfetti > 1}
        />
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
