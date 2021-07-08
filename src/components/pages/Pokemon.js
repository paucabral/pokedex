import React, { useContext } from 'react';
// react router dom
import { useParams } from 'react-router-dom';
// prop types
import PropTypes from 'prop-types';
// bootstrap
import { Container, Row, Col } from 'react-bootstrap/';

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
                <Container fluid="md" style={{ display: "flex", justifyContent: "center" }}>
                  <Row xs={1} md={2}>
                    <Col style={{ display: "flex", justifyContent: "center" }}>
                      <Img {...pokemon}/>
                    </Col>
                    <Col style={{ display: "flex", justifyContent: "center" }}>
                      <Info {...info}/>
                    </Col>
                  </Row>
                </Container>
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
      type_bg = "rgb(144, 193, 44, 1)";
    }
    else if (type === "dark") {
      type_bg = "rgba(90, 83, 102, 1)";
    }
    else if (type === "dragon") {
      type_bg = "rgba(9, 109, 196, 1)";
    }
    else if (type === "electric") {
      type_bg = "rgba(243, 210, 59, 1)";
    }
    else if (type === "fairy") {
      type_bg = "rgba(236, 143, 230, 1)";
    }
    else if (type === "fighting") {
      type_bg = "rgba(206, 64, 105, 1)";
    }
    else if (type === "fire") {
      type_bg = "rgba(255, 156, 84, 1)";
    }
    else if (type === "flying") {
      type_bg = "rgba(146, 170, 222, 1)";
    }
    else if (type === "ghost") {
      type_bg = "rgba(82, 105, 172, 1)";
    }
    else if (type === "grass") {
      type_bg = "rgba(99, 187, 91, 1)";
    }
    else if (type === "ground") {
      type_bg = "rgba(217, 119, 70, 1)";
    }
    else if (type === "ice") {
      type_bg = "rgba(116, 206, 192, 1)";
    }
    else if (type === "normal") {
      type_bg = "rgba(144, 153, 161, 1)";
    }
    else if (type === "poison") {
      type_bg = "rgba(171, 106, 200, 1)";
    }
    else if (type === "psychic") {
      type_bg = "rgba(249, 113, 118, 1)";
    }
    else if (type === "rock") {
      type_bg = "rgba(199, 183, 139, 1)";
    }
    else if (type === "steel") {
      type_bg = "rgba(90, 142, 161, 1)";
    }
    else if (type === "water") {
      type_bg = "rgba(77, 144, 213, 1)";
    }
    else {
      type_bg = "rgba(93, 84, 118, 1)";
    }
  }

  return (
    <React.Fragment>
      {types && typeDisplay(types[0].type.name)}
      <div className="card pokemonImg" style={{ backgroundColor: type_bg }}>
        <h4 className="text-white" style={{ margin: "1rem", fontWeight: "700", textShadow: "#000 0px 0px 1px, #000 0px 0px 1px, #000 0px 0px 1px, #000 0px 0px 1px, #000 0px 0px 1px, #000 0px 0px 1px" }}>ID: {id}</h4>
        <img style={{ objectFit: "cover", maxWidth: "100%", height: "auto" }} src={image} alt={name}/>
      </div>
    </React.Fragment>
  )
}

const Info = (info) => {
  const { flavor_text_entries, habitat, generation } = info;
  const text_entry = (flavor_text_entries && flavor_text_entries[1].flavor_text);
  const text_entry_cleaned = String(text_entry).replace(/[^a-zA-Z,^é,^. ]/g, " ");
  const place = (habitat && habitat.name);

  const pokemon = useContext(InfoContext);
  const details = pokemon.pokemon;

  const name = details.name;
  const stats = details.stats;
  const types = details.types;

  let type_bg;
  const typeProgress = (type) => {
    if (type === "bug") {
      type_bg = "rgb(144, 193, 44, 1)";
    }
    else if (type === "dark") {
      type_bg = "rgba(90, 83, 102, 1)";
    }
    else if (type === "dragon") {
      type_bg = "rgba(9, 109, 196, 1)";
    }
    else if (type === "electric") {
      type_bg = "rgba(243, 210, 59, 1)";
    }
    else if (type === "fairy") {
      type_bg = "rgba(236, 143, 230, 1)";
    }
    else if (type === "fighting") {
      type_bg = "rgba(206, 64, 105, 1)";
    }
    else if (type === "fire") {
      type_bg = "rgba(255, 156, 84, 1)";
    }
    else if (type === "flying") {
      type_bg = "rgba(146, 170, 222, 1)";
    }
    else if (type === "ghost") {
      type_bg = "rgba(82, 105, 172, 1)";
    }
    else if (type === "grass") {
      type_bg = "rgba(99, 187, 91, 1)";
    }
    else if (type === "ground") {
      type_bg = "rgba(217, 119, 70, 1)";
    }
    else if (type === "ice") {
      type_bg = "rgba(116, 206, 192, 1)";
    }
    else if (type === "normal") {
      type_bg = "rgba(144, 153, 161, 1)";
    }
    else if (type === "poison") {
      type_bg = "rgba(171, 106, 200, 1)";
    }
    else if (type === "psychic") {
      type_bg = "rgba(249, 113, 118, 1)";
    }
    else if (type === "rock") {
      type_bg = "rgba(199, 183, 139, 1)";
    }
    else if (type === "steel") {
      type_bg = "rgba(90, 142, 161, 1)";
    }
    else if (type === "water") {
      type_bg = "rgba(77, 144, 213, 1)";
    }
    else {
      type_bg = "rgba(93, 84, 118, 1)";
    }
  }

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

  let short_stat;
  const getShortStat = (stat) => {
    if (stat === "hp") {
      short_stat = "HP";
    }
    else if (stat === "attack") {
      short_stat = "ATK";
    }
    else if (stat === "defense") {
      short_stat = "DEF";
    }
    else if (stat === "special-attack") {
      short_stat = "SATK";
    }
    else if (stat === "special-defense") {
      short_stat = "SDEF";
    }
    else if (stat === "speed") {
      short_stat = "SPD";
    }
    else {
      short_stat = stat;
    }
  }

  let normalized_stat;
  const normalizeStat = (num, size) => {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    normalized_stat = num;
  }

  genNum(gen);

  return (
    <React.Fragment>
      <div className="card pokemonInfo" style={{ display: "flex", justifyContent: "center", backgroundColor: "#2b2c30" }}>
        <Container fluid="md">
          <Row style={{ display: "flex", justifyContent: "center", marginTop: "1.5rem" }}>
            <Col style={{ display: "flex", justifyContent: "center" }}>
              <h1 className="text-white" style={{ textTransform: "uppercase" }}>{name}</h1>
            </Col>
          </Row>
        </Container>

        <ul className="noBullet" style={{ marginTop: "0rem" }}>
          {
            types &&
            types.map(
              (type) => {
                typeDisplay(type.type.name);
                return (
                  <li key={type.slot} className="label" style={{ height: "4rem" }}>
                    <div className="icon">
                      <img width="35%" style={{ borderRadius: "50%", transition: "200ms all" }} className={`${type.type.name}Icon`} src={type_img} alt={type.type.name}/>
                    </div>
                    <span className={`label ${type.type.name}`}>{type.type.name}</span>
                  </li>
                )
              }
            )
          }
        </ul>

        <Container fluid="md">
          <Row style={{ display: "flex", justifyContent: "center", margin: "0.1em" }}>
            <Col className="textEntry" style={{ display: "flex", justifyContent: "center" }}>
              <p style={{ textAlign: "center", color: "#bbb8ca" }}>{text_entry_cleaned}</p>
            </Col>
          </Row>
          <Row xs={1} md={2} style={{ display: "flex", justifyContent: "center", margin: "0.1em" }}>
            <Col style={{ display: "flex", justifyContent: "center" }}>
              <p style={{ textTransform: "uppercase", color: "#bbb8ca" }}><b className="text-white" style={{ fontWeight: "700" }}>Generation:</b> {gen ? gen : "N/A"}</p>
            </Col>
            <Col style={{ display: "flex", justifyContent: "center" }}>
              <p style={{ textTransform: "uppercase", color: "#bbb8ca" }}><b className="text-white" style={{ fontWeight: "700" }}>Habitat:</b> {place ? place : "N/A"}</p>
            </Col>
          </Row>
        </Container>

        <Container fluid="md">
          <Row style={{ margin: "0.1em" }}>
            <Col style={{ display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
              <h5 className="text-white" style={{ fontWeight: "700" }}>BASE STATS</h5>
            </Col>
            <Col style={{ display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
              <img width="50px" src={`${pokemon_showdown_sprites_directory}${name}.gif`} alt={name}/>
            </Col>
          </Row>
          <Row style={{ margin: "0.1em" ,marginBottom: "2.5rem" }}>
            <Col>
              {
                stats &&
                stats.map(
                  (stat) => {
                    return (
                      <div className="d-flex flex-row" key={stat.stat.name} style={{ display:"flex", textTransform: "uppercase", alignContent: "center" }}>
                        <div className="statName" style={{ alignContent: "center" }}>
                          {
                            getShortStat(stat.stat.name)
                          }
                          <b className="text-white">{short_stat}</b>
                        </div>
                        <div className="statVal" style={{ alignContent: "center", color: "#bbb8ca" }}>
                          {
                            typeProgress(types[0].type.name)
                          }
                          {
                            normalizeStat(stat.base_stat,3)
                          }
                          {normalized_stat}
                        </div>
                        <div className="d-flex flex-column" style={{ alignContent: "center", width: "100%", transform: "translateY(30%)" }}>
                          <div className="progress" style={{ borderRadius: "20px", height:"0.8em", backgroundColor: "#181818" }}>
                            <div className={`progress-bar progressLevel`} role="progressbar" style={{width: `${stat.base_stat/255*100}%`, borderRadius: "20px", backgroundColor: type_bg, boxShadow: "0"}} aria-valuenow={stat.base_stat} aria-valuemin="0" aria-valuemax="255"></div>
                          </div>
                        </div>
                      </div>
                    )
                  }
                )
              }
            </Col>
          </Row>
        </Container>
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
