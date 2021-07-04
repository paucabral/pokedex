import React, { useState, useContext } from 'react';
// react router dom
import { Link } from 'react-router-dom';
// prop types
import PropTypes from 'prop-types';
// hook
import { useFetch } from './hooks/fetch-list';
// data
import { pokeapi_pokemon_list, pokeapi_complete_pokemon_list } from '../../data/api';

const LoadContext = React.createContext();

const List = () => {
  const [url, setUrl] = useState(pokeapi_pokemon_list);

  const { loading, pokemon, next, prev } = useFetch(pokeapi_pokemon_list, url)

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

      <LoadContext.Provider value={{ next, prev, useFetch, setUrl }}>
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
      <img src={image} alt={name} />
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
      <Link to={`/pokemon/${id}`}><h4>{name}</h4></Link>
    </div>
  )
}

Pokemon.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  sprites: PropTypes.object,
  types: PropTypes.array,
}

Pokemon.defaultProps = {
  id: 0,
  name: "Does not exist",
  sprites: PropTypes.object,
  types: PropTypes.array,
}

// TO FIX
const Load = () => {
  const buttons = useContext(LoadContext);
  
  const handleSubmitPrev = (e) => {
    e.preventDefault();
    
    buttons.setUrl(buttons.prev);
  }
  
  const handleSubmitNext = (e) => {
    e.preventDefault();
    
    buttons.setUrl(buttons.next);
  }

  return (
    <React.Fragment>
      {
        buttons.prev ? <button onClick={handleSubmitPrev}>Prev</button> :
          <div></div>
      }   
      {
        buttons.next ? <button onClick={handleSubmitNext}>Next</button> :
          <div></div>
      }

    </React.Fragment>
  )
}

export default List;
