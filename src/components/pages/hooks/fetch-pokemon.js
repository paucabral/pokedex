import { useState, useEffect, useCallback } from 'react';

export const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState([]);
  const [info, setInfo] = useState('');

  const getPokemon = useCallback(async () => {
    const response = await fetch(url);
    const data = await response.json();

    setPokemon(data);

    const pokemonObject = async (pokemon) => {
      const response = await fetch(pokemon.species.url);
      const data = await response.json();

      // console.log(data.flavor_text_entries[0].flavor_text);
      setInfo(data);

      setLoading(false);
    }

    pokemonObject(data);

    setLoading(false);


  }, [url]);


  useEffect(() => {
    getPokemon();
  }, [url, getPokemon]);

  return { loading, pokemon, info };
};
