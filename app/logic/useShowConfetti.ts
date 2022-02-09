import { useState, useEffect } from 'react';
import { Cards, isPair, CardT } from './logic';

export function useShowConfetti(flipCount: number, cards: Cards) {
  const [showConfetti, setShowConfetti] = useState(0);
  useEffect(() => {
    // sets showConfetti back to stop the recycle loop
    if (showConfetti > 1) {
      setTimeout(() => setShowConfetti(showConfetti - 1), 1000);
    }
    if (flipCount === 2 && isPair(cards as CardT[])) {
      setShowConfetti(showConfetti + 1);
    }
  }, [cards, flipCount]);
  return { showConfetti, setShowConfetti };
}
