import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../components/loader/Loader";
import swal from "sweetalert";
const PokemonPage = () => {
  const { id } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [pokemonWeakness, setPokemonWeakness] = useState([]);
  const [pokemonStrongness, setPokemonStrongness] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gender, setGender] = useState(Array);

  const getPokemonGender = async (name) => {
    gender.length = 0;
    for (let i = 1; i <= 3; i++) {
      const res = await axios.get(`https://pokeapi.co/api/v2/gender/${i}/`);
      for (let j = 0; j < res.data.pokemon_species_details.length; j++) {
        if (res.data.pokemon_species_details[j].pokemon_species.name === name) {
          gender.push(res.data.name);
          break;
        }
      }
    }
  };

  const getTypeData = async (type) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
    setPokemonStrongness(res.data.damage_relations.double_damage_to);
    setPokemonWeakness(res.data.damage_relations.double_damage_from);
  };

  const getPokemonData = async (id) => {
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (res.status === 200) {
        setPokemonDetails(res.data);
        if (res.data != null) {
          await getPokemonGender(res.data.name);
          await getTypeData(res.data.types[0].type.name);
        }
        setLoading(false);
      }
    } catch (error) {
      swal("No pokémon matched your search!", "Try again", "error").then(
        (e) => {
          window.history.go(-1);
        }
      );
    }
  };

  useEffect(() => {
    getPokemonData(id);
  }, [id]);
  // <Link to={`/pokemon/${pokemonDetails.id}`}></Link>;
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="pokemon_detail">
          <div className="name">
            <span>
              {pokemonDetails.name.charAt(0).toUpperCase() +
                pokemonDetails.name.slice(1)}
            </span>
            <span> #{pokemonDetails.id.toString().padStart(3, "0")}</span>
          </div>
          <div className="pokemon_desc">
            <div className="pokemon_img">
              <img
                src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${(
                  "00" + pokemonDetails.id
                ).slice(-3)}.png`}
                // src={pokemonDetails.sprites.other.dream_world.front_default}
                alt={pokemonDetails.name}
              />
            </div>
            <div>
              <div className="pokemon_info">
                <div>
                  <p className="title">height</p>
                  <div className="pokemon_info-item">
                    <p className="title_sub">{pokemonDetails.height}m</p>
                  </div>
                </div>
                <div>
                  <p className="title">weight</p>
                  <div className="pokemon_info-item">
                    <p className="title_sub">{pokemonDetails.weight}kg</p>
                  </div>
                </div>
                <div>
                  <p className="title">abilities</p>
                  <div className="pokemon_info-item">
                    {pokemonDetails.abilities.map((item, i) => (
                      <p className="title_sub" key={i}>
                        {item.ability.name.charAt(0).toUpperCase() +
                          item.ability.name.slice(1)}
                      </p>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="title">gender</p>
                  <div className="pokemon_info-item">
                    {gender.map((item, i) => (
                      <p className="title_sub" key={i}>
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="type-list">
                <p>type</p>
                {pokemonDetails.types.map((item, i) => (
                  <small className={`type ${item.type.name}1`} key={i}>
                    <span>
                      {item.type.name.charAt(0).toUpperCase() +
                        item.type.name.slice(1)}
                    </span>
                  </small>
                ))}
              </div>
              <div className="weaknesses-list">
                <p>weaknesses</p>
                {pokemonWeakness.map((item, i) => (
                  <small className={`type ${item.name}1`} key={i}>
                    <span>
                      {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                    </span>
                  </small>
                ))}
              </div>
              <div className="strongness-list">
                <p>strongness</p>
                {pokemonStrongness.map((item, i) => (
                  <small className={`type ${item.name}1`} key={i}>
                    <span>
                      {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                    </span>
                  </small>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PokemonPage;
