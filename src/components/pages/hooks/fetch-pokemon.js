import { useState, useEffect, useCallback } from 'react';

export const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const [info, setInfo] = useState('');

  const getPokemon = useCallback(async () => {
    const response = await fetch(url);

    if (response.status >= 200 && response.status <= 299) {
      const data = await response.json();

      setPokemon(data);

      const pokemonObject = async (pokemon) => {
        const response = await fetch(pokemon.species.url);

        if (response.status >= 200 && response.status <= 299) {
          const data = await response.json();

          // console.log(data.flavor_text_entries[0].flavor_text);
          setInfo(data);
          setLoading(false);
        }
        else {
          setLoading(false);
          setError(true);
        }
        
      }

      pokemonObject(data);

      setLoading(false);
    }
    else {
      setLoading(false);
      setError(true);
    }
    


  }, [url]);


  useEffect(() => {
    if (!error) {
      return getPokemon([]);
    }
  }, [url, getPokemon, error]);

  return { loading, error, pokemon, info };
};
