import React, { useContext } from 'react';
// prop types
import PropTypes from 'prop-types';
// hook
import { useFetch } from './hooks/fetch-list';
// data
import { pokeapiPokemonList } from '../../data/api';

const LoadContext = React.createContext();

const List = () => {
  const { loading, pokemon, next } = useFetch(pokeapiPokemonList)

  return (
    <React.Fragment>
      <h3>List</h3>
      <section>
        {
          loading ? 'loading...' :
            pokemon.map(
              (pokemon) => {
                return <Pokemon key={pokemon.id} {...pokemon} />
              }
            )
        }
      </section>

      <LoadContext.Provider value={{ loading, pokemon, next, useFetch }}>
        <Load />
      </LoadContext.Provider>

    </React.Fragment>
  )
}

const Pokemon = (pokemon) => {
  const { id, name, sprites, types } = pokemon;
  const image = (sprites && sprites.other["official-artwork"].front_default);

  return (
    <div className="card" style={{ width: "18rem" }}>
      <h6>#{id}</h6>
      <h4>{name}</h4>
      <ul>
        {
          types.map(
            (type) => {
              return (
                <li key={type.slot}>{type.type.name}</li>
              )
            }
          )
        }
      </ul>
      <img src={image} alt={name} />
    </div>
  )
}

Pokemon.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  sprites: PropTypes.object,
  types: PropTypes.array,
}

// TO FIX
const Load = () => {
  const next = useContext(LoadContext);
  const { useFetch } = useContext(LoadContext);

  return (
    <button >Next</button>
  )
}

export default List;
