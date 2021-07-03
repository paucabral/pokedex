import { useState, useEffect, useCallback } from 'react';

export const useFetch = (raw_api, init_url) => {
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState([]);
  const [next, setNext] = useState('');
  const [prev, setPrev] = useState('');

  const getPokemon = useCallback(async () => {
    const response = await fetch(init_url);
    const data = await response.json();

    setNext(data.next);
    setPrev(data.prev);

    const pokemonObject = (result) => {
      result.forEach(
        async (pokemon) => {
          const response = await fetch(`${raw_api}${pokemon.name}`);
          const data = await response.json();

          setPokemon(
            currentList => [...currentList, data]
          );

          setLoading(false);
        }
      )
    }

    pokemonObject(data.results);


  }, [init_url]);


  useEffect(() => {
    getPokemon();
  }, [init_url, getPokemon]);

  return { loading, pokemon, next, prev };
};
