import React, { useState, useContext } from 'react';
// react router dom
import { Link } from 'react-router-dom';
// prop types
import PropTypes from 'prop-types';
// hook
import { useFetch } from './hooks/fetch-list';
// data
import { pokeapi_pokemon_list, pokeapi_pokemon_info, pokeapi_complete_pokemon_list } from '../../data/api';

const LoadContext = React.createContext();

const List = () => {
  const info = pokeapi_pokemon_info;
  const [url, setUrl] = useState(pokeapi_pokemon_list);

  const { loading, error, pokemon, next, prev } = useFetch(info, url)
  return (
    <React.Fragment>
      <button onClick={() => setUrl(pokeapi_complete_pokemon_list)}>Render All</button>
      <section className="container-fluid">
        <div className="row">
          {
            error && <Error />
          }
          {
            loading ? 'loading...' :
              pokemon.map(
                (pokemon) => {
                  return (
                    <div key={pokemon.id} className="col container-fluid col-md-4">
                      <Pokemon key={pokemon.id} {...pokemon} />
                    </div>  
                  )
                }
              )
          }
        </div>
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
    <div className="card mainCard mb-3">
      <div className="card upperCard">
        <h6 className="cardID">ID: {id}</h6>
        <img src={image} alt={name} />
      </div>
      <div className="card lowerCard">
        <ul className="noBullet">
          {
            types &&
            types.map(
              (type) => {
                return (
                  <li key={type.slot} className={`label ${type.type.name}`}>
                    {type.type.name}
                  </li>
                )
              }
            )
          }
        </ul>
        <Link to={`/pokemon/${id}`} className="name clickName btn btn-dark"><h4 className="name" style={{ alignContent: 'center'}}>{name}</h4></Link>
      </div>
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
        buttons.prev ? <button type="button" style={{ color: 'white', borderRadius: "5px", margin: "1rem" }} className="btn btn-secondary" onClick={handleSubmitPrev}>Prev</button> :
          <button type="button" style={{ color: 'white', borderRadius: "5px", margin: "1rem" }} className="btn btn-secondary" disabled>Prev</button>
      }   
      {
        buttons.next ? <button type="button" style={{ color: 'white', borderRadius: "5px", margin: "1rem" }} className="btn btn-primary" onClick={handleSubmitNext}>Next</button> :
          <button type="button" style={{ color: 'white', borderRadius: "5px", margin: "1rem" }} className="btn btn-primary" disabled>Next</button>
      }

    </React.Fragment>
  )
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

export default List;
