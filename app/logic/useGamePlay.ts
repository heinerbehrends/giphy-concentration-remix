import { useEffect, useState } from 'react';
import { Cards, CardT, flipOrRemove, isPair } from './logic';

export function useGamePlay(
  cards: Cards,
  setCards: React.Dispatch<React.SetStateAction<CardT[] | null>>
) {
  const [flipCount, setFlipCount] = useState(0);
  const [timeoutObj, setTimeoutObj] = useState<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (flipCount === 2) {
      const nextCards = flipOrRemove(cards, isPair(cards));
      const timeout = setTimeout(() => {
        setFlipCount(0);
        setCards(nextCards);
      }, 2500);
      setTimeoutObj(timeout);
    }
  }, [flipCount]);
  return { flipCount, setFlipCount, timeoutObj };
}
