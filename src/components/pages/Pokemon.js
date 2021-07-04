import React, { useContext } from 'react';
// react router dom
import { useParams } from 'react-router-dom';
// prop types
import PropTypes from 'prop-types';
// hook
import { useFetch } from './hooks/fetch-pokemon';
// data
import { pokeapi_pokemon_info, pokemon_showdown_sprites_directory } from '../../data/api';
// pokemon-types images
import bug from '../../assets/pokemon-types/bug.png';
import dark from '../../assets/pokemon-types/dark.png';
import dragon from '../../assets/pokemon-types/dragon.png';
import electric from '../../assets/pokemon-types/electric.png';
import fairy from '../../assets/pokemon-types/fairy.png';
import fighting from '../../assets/pokemon-types/fighting.png';
import fire from '../../assets/pokemon-types/fire.png';
import flying from '../../assets/pokemon-types/flying.png';
import ghost from '../../assets/pokemon-types/ghost.png';
import grass from '../../assets/pokemon-types/grass.png';
import ground from '../../assets/pokemon-types/ground.png';
import ice from '../../assets/pokemon-types/ice.png';
import normal from '../../assets/pokemon-types/normal.png';
import poison from '../../assets/pokemon-types/poison.png';
import psychic from '../../assets/pokemon-types/psychic.png';
import rock from '../../assets/pokemon-types/rock.png';
import steel from '../../assets/pokemon-types/steel.png';
import water from '../../assets/pokemon-types/water.png';

import BUG from '../../assets/pokemon-types/type_BUG.png';
import DARK from '../../assets/pokemon-types/type_DARK.png';
import DRAGON from '../../assets/pokemon-types/type_DRAGON.png';
import ELECTRIC from '../../assets/pokemon-types/type_ELECTRIC.png';
import FAIRY from '../../assets/pokemon-types/type_FAIRY.png';
import FIGHTING from '../../assets/pokemon-types/type_FIGHTING.png';
import FIRE from '../../assets/pokemon-types/type_FIRE.png';
import FLYING from '../../assets/pokemon-types/type_FLYING.png';
import GHOST from '../../assets/pokemon-types/type_GHOST.png';
import GRASS from '../../assets/pokemon-types/type_GRASS.png';
import GROUND from '../../assets/pokemon-types/type_GROUND.png';
import ICE from '../../assets/pokemon-types/type_ICE.png';
import NORMAL from '../../assets/pokemon-types/type_NORMAL.png';
import POISON from '../../assets/pokemon-types/type_POISON.png';
import PSYCHIC from '../../assets/pokemon-types/type_PSYCHIC.png';
import ROCK from '../../assets/pokemon-types/type_ROCK.png';
import STEEL from '../../assets/pokemon-types/type_STEEL.png';
import WATER from '../../assets/pokemon-types/type_WATER.png';
import UNKNOWN from '../../assets/pokemon-types/type_.png';

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

  return (
    <React.Fragment>
      <div className="card" style={{ width: "18rem" }}>
        <h6>#{id}</h6>
        <img src={image} alt={name}/>
      </div>
    </React.Fragment>
  )
}

const Info = (info) => {
  const { flavor_text_entries, habitat, generation } = info;
  const text_entry = (flavor_text_entries && flavor_text_entries[1].flavor_text);
  const place = (habitat && habitat.name);

  const pokemon = useContext(InfoContext);
  const details = pokemon.pokemon;

  const name = details.name;
  const stats = details.stats;
  const types = details.types;

  let type_img;
  let type_label;
  const typeDisplay = (type) => {
    if (type === "bug") {
      type_img = bug;
      type_label = BUG;
    }
    else if (type === "dark") {
      type_img = dark;
      type_label = DARK;
    }
    else if (type === "dragon") {
      type_img = dragon;
      type_label = DRAGON;
    }
    else if (type === "electric") {
      type_img = electric;
      type_label = ELECTRIC;
    }
    else if (type === "fairy") {
      type_img = fairy;
      type_label = FAIRY;
    }
    else if (type === "fighting") {
      type_img = fighting;
      type_label = FIGHTING;
    }
    else if (type === "fire") {
      type_img = fire;
      type_label = FIRE;
    }
    else if (type === "flying") {
      type_img = flying;
      type_label = FLYING;
    }
    else if (type === "ghost") {
      type_img = ghost;
      type_label = GHOST;
    }
    else if (type === "grass") {
      type_img = grass;
      type_label = GRASS;
    }
    else if (type === "ground") {
      type_img = ground;
      type_label = GROUND;
    }
    else if (type === "ice") {
      type_img = ice;
      type_label = ICE;
    }
    else if (type === "normal") {
      type_img = normal;
      type_label = NORMAL;
    }
    else if (type === "poison") {
      type_img = poison;
      type_label = POISON;
    }
    else if (type === "psychic") {
      type_img = psychic;
      type_label = PSYCHIC;
    }
    else if (type === "rock") {
      type_img = rock;
      type_label = ROCK;
    }
    else if (type === "steel") {
      type_img = steel;
      type_label = STEEL;
    }
    else if (type === "water") {
      type_img = water;
      type_label = WATER;
    }
    else {
      type_label = UNKNOWN;
    }
  }

  console.log(details);
  console.log(info);

  let gen = (generation && generation.name);
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
                typeDisplay(type.type.name);
                return (
                  <li key={type.slot}>
                    {type.type.name}
                    <img width="15%" src={type_img} alt={type.type.name}/>
                    <img width="25%" src={type_label} alt={type.type.name}/>
                  </li>
                )
              }
            )
          }
        </ul>

        <p>{text_entry}</p>

        <p><b>Generation:</b> {gen ? gen : "N/A"}</p>
        
        <p><b>Habitat:</b> {place ? place : "N/A"}</p>
        
        <div>
          <h5>Base Stat</h5>
          <img width="50px" src={`${pokemon_showdown_sprites_directory}${name}.gif`} alt={name}/>
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
