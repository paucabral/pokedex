import React from 'react';
// react router dom
import { useParams } from 'react-router-dom';
// prop types
import PropTypes from 'prop-types';
// hook
import { useFetch } from './hooks/fetch-pokemon';
// data
import { pokeapi_pokemon_info } from '../../data/api';

const Pokemon = () => {
  const { id } = useParams();
  const url = `${pokeapi_pokemon_info}${id}`;
  const { loading, error, pokemon, info } = useFetch(url);
  
  return (
    <React.Fragment>
      <section>
        {
          error ? <Error /> : loading ? 'loading...' :
            (
              <div>
                <Img {...pokemon} />
                <Info {...info} />
              </div>
            )
        }
      </section>
    </React.Fragment>
  );
}

const Img = (pokemon) => {
  const { id, name, sprites, types } = pokemon;
  const image = (sprites && sprites.other["official-artwork"].front_default);

  // console.log(pokemon);

  return (
    <React.Fragment>
      <div className="card" style={{ width: "18rem" }}>
        <h6>#{id}</h6>
        <img src={image} alt={name} />
        <ul>
          {
            types &&
            types.map(
              (type) => {
                return (
                  <li key={type.slot}>{type.type.name}</li>
                )
              }
            )
          }
        </ul>
      </div>
    </React.Fragment>
  )
}

const Info = (info) => {
  const { flavor_text_entries } = info;
  const text_entry = (flavor_text_entries && flavor_text_entries[0].flavor_text);

  return (
    <React.Fragment>
      <div className="card" style={{ width: "18rem" }}>
        <p>{text_entry}</p>
      </div>
    </React.Fragment>
  )
}

Pokemon.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  sprites: PropTypes.object,
  types: PropTypes.array,
  flavor_text_entries: PropTypes.array,
}

const Error = () => {
  return (
    <React.Fragment>
      <div>
        <p>There was an error.</p>
      </div>
    </React.Fragment>
  );
}

export default Pokemon
