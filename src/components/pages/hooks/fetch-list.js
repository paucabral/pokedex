import { useState, useEffect, useCallback } from 'react';

export const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState([]);
  const [next, setNext] = useState(url);

  const getPokemon = useCallback(async () => {
    const response = await fetch(url);
    const data = await response.json();

    setNext(data.next);

    const pokemonObject = (result) => {
      result.forEach(
        async (pokemon) => {
          const response = await fetch(`${url}${pokemon.name}`);
          const data = await response.json();

          setPokemon(
            currentList => [...currentList, data]
          );

          setLoading(false);
        }
      )
    }

    pokemonObject(data.results);


  }, [url]);


  useEffect(() => {
    getPokemon();
  }, [url, getPokemon]);

  return { loading, pokemon, next };
};
