import React, { useEffect } from 'react';
import { Cards, countCards } from './logic';

export function useCheckLoadedImages(
  progress: number,
  setProgress: React.Dispatch<React.SetStateAction<number>>
) {
  useEffect(() => {
    const images = document.querySelectorAll('[data-name]');
    Array.from(images).forEach((image) => {
      if (image instanceof HTMLImageElement) {
        if (image.complete) {
          setProgress((progress) => progress + 1);
        }
      }
    });
  }, []);
}

export function isGameOver(cards: Cards) {
  if (cards) {
    return cards.length && !countCards(cards);
  }
  return false;
}
