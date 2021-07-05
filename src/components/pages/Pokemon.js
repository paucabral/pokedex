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
  const { id, name, sprites, types } = pokemon;
  const image = (sprites && sprites.other["official-artwork"].front_default);

  let type_bg;
  const typeDisplay = (type) => {
    if (type === "bug") {
      type_bg = "rgb(144, 193, 44, .8)";
    }
    else if (type === "dark") {
      type_bg = "rgba(90, 83, 102, .8)";
    }
    else if (type === "dragon") {
      type_bg = "rgba(9, 109, 196, .8)";
    }
    else if (type === "electric") {
      type_bg = "rgba(243, 210, 59, .8)";
    }
    else if (type === "fairy") {
      type_bg = "rgba(236, 143, 230, .8)";
    }
    else if (type === "fighting") {
      type_bg = "rgba(206, 64, 105, .8)";
    }
    else if (type === "fire") {
      type_bg = "rgba(255, 156, 84, .8)";
    }
    else if (type === "flying") {
      type_bg = "rgba(146, 170, 222, .8)";
    }
    else if (type === "ghost") {
      type_bg = "rgba(82, 105, 172, .8)";
    }
    else if (type === "grass") {
      type_bg = "rgba(99, 187, 91, .8)";
    }
    else if (type === "ground") {
      type_bg = "rgba(217, 119, 70, .8)";
    }
    else if (type === "ice") {
      type_bg = "rgba(116, 206, 192, .8)";
    }
    else if (type === "normal") {
      type_bg = "rgba(144, 153, 161, .8)";
    }
    else if (type === "poison") {
      type_bg = "rgba(171, 106, 200, .8)";
    }
    else if (type === "psychic") {
      type_bg = "rgba(249, 113, 118, .8)";
    }
    else if (type === "rock") {
      type_bg = "rgba(199, 183, 139, .8)";
    }
    else if (type === "steel") {
      type_bg = "rgba(90, 142, 161, .8)";
    }
    else if (type === "water") {
      type_bg = "rgba(77, 144, 213, .8)";
    }
    else {
      type_bg = "rgba(93, 84, 118, .8)";
    }
  }

  return (
    <React.Fragment>
      {types && typeDisplay(types[0].type.name)}
      <div className="card" style={{ width: "20rem", backgroundColor: type_bg }}>
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
  const typeDisplay = (type) => {
    if (type === "bug") {
      type_img = bug;
    }
    else if (type === "dark") {
      type_img = dark;
    }
    else if (type === "dragon") {
      type_img = dragon;
    }
    else if (type === "electric") {
      type_img = electric;
    }
    else if (type === "fairy") {
      type_img = fairy;
    }
    else if (type === "fighting") {
      type_img = fighting;
    }
    else if (type === "fire") {
      type_img = fire;
    }
    else if (type === "flying") {
      type_img = flying;
    }
    else if (type === "ghost") {
      type_img = ghost;
    }
    else if (type === "grass") {
      type_img = grass;
    }
    else if (type === "ground") {
      type_img = ground;
    }
    else if (type === "ice") {
      type_img = ice;
    }
    else if (type === "normal") {
      type_img = normal;
    }
    else if (type === "poison") {
      type_img = poison;
    }
    else if (type === "psychic") {
      type_img = psychic;
    }
    else if (type === "rock") {
      type_img = rock;
    }
    else if (type === "steel") {
      type_img = steel;
    }
    else if (type === "water") {
      type_img = water;
    }
    else {
    }
  }

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
      <div className="card" style={{ width: "20rem", display: "flex", justifyContent: "center" }}>
        <h3>{name}</h3>

        <ul className="noBullet">
          {
            types &&
            types.map(
              (type) => {
                typeDisplay(type.type.name);
                return (
                  <li key={type.slot} className="label">
                    <div className="icon">
                      <img width="35%" src={type_img} alt={type.type.name}/>
                    </div>
                    <span className={`label ${type.type.name}`}>{type.type.name}</span>
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
  types: PropTypes.array,
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
