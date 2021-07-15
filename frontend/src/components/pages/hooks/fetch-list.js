import { useState, useEffect, useCallback } from 'react';

export const useFetch = (raw_api, init_url) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const [next, setNext] = useState('');
  const [prev, setPrev] = useState('');

  const getPokemon = useCallback(async () => {
    const response = await fetch(init_url);
    
    if (response.status >= 200 && response.status <= 299) {
      const data = await response.json();
      setNext(data.next);
      setPrev(data.previous);

      const pokemonObject = (result) => {
        setPokemon([]);
        result.forEach(
          async (pokemon) => {
            const response = await fetch(`${raw_api}${pokemon.name}`);

            if (response.status >= 200 && response.status <= 299) {
              const data = await response.json();

              setPokemon(
                currentList => [...currentList, data]
              );
              
            }

            else {
              setError(true);
            }
            
            setLoading(false);
          }
        )
      }

      pokemonObject(data.results);
    }

    else {
      setLoading(false);
      setError(true);
    }


  }, [raw_api, init_url]);


  useEffect(() => {
    if (!error) {
      return getPokemon([]);
    }

  }, [init_url, getPokemon, error]);

  return { loading, error, pokemon, next, prev };
};
