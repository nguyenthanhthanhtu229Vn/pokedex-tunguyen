import React, { useEffect, useState } from "react";
import axios from "axios";

// Components
import Pokemon from "../components/pokemon/Pokemon";
import Loader from "../components/loader/Loader";

const Homepage = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [visible, setVisible] = useState(18);
  const [limit, setLimit] = useState(0);
  const getPokemonData = async (id) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return res;
  };

  const loadMoreItem = async () => {
    setLoadingMore(true);
    setVisible((preValue) => preValue + 10);
    await getPokemonList(visible);
    setLoadingMore(false);
  };

  const getPokemonList = async (POKEMON_NUMBER) => {
    let pokemonArray = [];
    for (let i = 1; i <= POKEMON_NUMBER; i++) {
      pokemonArray.push(await getPokemonData(i));
    }
    setPokemon(pokemonArray);
    setLoading(false);
  };

  useEffect(() => {
    getPokemonList(visible);
  }, [visible]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="poke-container">
            {pokemon.map((item, i) => (
              <div key={i}>
                <Pokemon pokemon={item.data} />
              </div>
            ))}
          </div>
          {loadingMore ? <Loader /> : null}
          {visible < 898 ? (
            <button onClick={loadMoreItem} className="button_more">
              Load more pokémon
            </button>
          ) : null}
        </div>
      )}
    </>
  );
};

export default Homepage;
