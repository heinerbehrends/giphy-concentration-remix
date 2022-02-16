import {
  Cards,
  shouldFlip,
  flipCard,
  shouldTriggerFlipBack,
  flipOrRemove,
  isPair,
} from './gameLogic';

export function useOnClickCard(
  cards: Cards,
  setCards: React.Dispatch<React.SetStateAction<Cards>>,
  setFlipCount: React.Dispatch<React.SetStateAction<number>>,
  timeoutObj: NodeJS.Timeout,
  nrOfCardsTurned: number,
  setNrOfCardsTurned: React.Dispatch<React.SetStateAction<number>>
) {
  function onClickCard(key: number, flipCount: number, progress: number) {
    if (progress < 24) return;
    setNrOfCardsTurned(nrOfCardsTurned + 1);
    if (shouldFlip(cards, key, flipCount)) {
      setFlipCount(flipCount + 1);
      setCards(flipCard(cards, key));
    }
    if (shouldTriggerFlipBack(cards, key, flipCount)) {
      clearTimeout(timeoutObj);
      setCards(flipCard(flipOrRemove(cards, isPair(cards)), key));
      setFlipCount(1);
    }
  }
  return { onClickCard };
}
