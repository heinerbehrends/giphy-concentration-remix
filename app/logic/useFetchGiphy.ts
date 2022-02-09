import { useState, useEffect } from 'react';
import { CardT } from './logic';

export function useFetchGiphy(searchTerm: string) {
  const [cards, setCards] = useState<CardT[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function fetchGifs() {
      await fetch('./api/giphy-fetch', {
        body: JSON.stringify({ searchTerm }),
        method: 'POST',
      })
        .then((response) => response.json())
        .then(({ data }) => {
          if (data.error) {
            setError(data.error);
            console.log(data);
          }
          setCards(data.cards);
        });
    }
    if (!!searchTerm && searchTerm !== 'undefined') {
      fetchGifs();
    }
  }, [searchTerm]);
  return { cards, error, setCards };
}
