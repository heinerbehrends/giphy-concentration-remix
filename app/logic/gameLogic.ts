import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'remix';
import { Cards, countCards } from './logic';

export function useParseSearchTerm() {
  let [searchParams] = useSearchParams();
  console.log(searchParams);
  const [searchTerm, setSearchTerm] = useState('');
}

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
