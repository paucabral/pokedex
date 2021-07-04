import React, { useContext } from 'react';
// react router dom
import { useParams } from 'react-router-dom';
// prop types
import PropTypes from 'prop-types';
// hook
import { useFetch } from './hooks/fetch-pokemon';
// data
import { pokeapi_pokemon_info } from '../../data/api';

const InfoContext = React.createContext();

const Pokemon = () => {
  const { id } = useParams();
  const url = `${pokeapi_pokemon_info}${id}`;
  const { loading, error, pokemon, info } = useFetch(url);
  
  return (
    <React.Fragment>
      <InfoContext.Provider value={{ pokemon }}>
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
      </InfoContext.Provider>
    </React.Fragment>
  );
}

const Img = (pokemon) => {
  const { id, name, sprites } = pokemon;
  const image = (sprites && sprites.other["official-artwork"].front_default);

  // console.log(pokemon);

  return (
    <React.Fragment>
      <div className="card" style={{ width: "18rem" }}>
        <h6>#{id}</h6>
        <img src={image} alt={name} />
      </div>
    </React.Fragment>
  )
}

const Info = (info) => {
  const { flavor_text_entries, habitat, generation } = info;
  const text_entry = (flavor_text_entries && flavor_text_entries[1].flavor_text);
  const place = (habitat && habitat.name);
  let gen = (generation && generation.name);

  const pokemon = useContext(InfoContext);
  const details = pokemon.pokemon;

  const name = details.name;
  const stats = details.stats;
  const types = details.types;

  console.log(details);
  console.log(info);

  const genNum = (num) => {
    if (num === "generation-i") {
      gen = 1;
      
    }
    else if (num === "generation-ii") {
      gen = 2;
    }
    else if (num === "generation-iii") {
      gen = 3;
    }
    else if (num === "generation-iv") {
      gen = 4;
    }
    else if (num === "generation-v") {
      gen = 5;
    }
    else if (num === "generation-vi") {
      gen = 6;
    }
    else if (num === "generation-vii") {
      gen = 7;
    }
    else if (num === "generation-viii") {
      gen = 8;
    }
    else {
      gen = "N/A";
    }
  }

  genNum(gen);

  return (
    <React.Fragment>
      <div className="card" style={{ width: "18rem" }}>
        <h3>{name}</h3>

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

        <p>{text_entry}</p>

        <p>Generation: {gen ? gen : "N/A"}</p>
        
        <p>Habitat: {place ? place : "N/A"}</p>
        
        <div>
          <h5>Base Stat</h5>
          <ul>
            {
              stats &&
              stats.map(
                (stat) => {
                  return (
                    <li key={stat.stat.name}>
                      {stat.stat.name}: {stat.base_stat}
                    </li>
                  )
                }
            )
            }
          </ul>
        </div>
      </div>
    </React.Fragment>
  )
}

Pokemon.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  sprites: PropTypes.object,
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
