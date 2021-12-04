import React from "react";
import { Link } from "react-router-dom";
import "./styles/style.css";
const Pokemon = ({ pokemon }) => {
  return (
    <>
      <Link to={`/pokemon/${pokemon.id}`}>
        <div className={`pokemon ${pokemon.types[0].type.name}`}>
          <div className="img-container">
            <img
              src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${(
                "00" + pokemon.id
              ).slice(-3)}.png`}
              alt={pokemon.name}
            />
          </div>
          <div className="info">
            <span className="number">
              #{pokemon.id.toString().padStart(3, "0")}
            </span>
            <h3 className="name">
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </h3>
            <div className="type-list">
              {pokemon.types.map((item, i) => (
                <small className={`type ${item.type.name}1`} key={i}>
                  <span>
                    {item.type.name.charAt(0).toUpperCase() +
                      item.type.name.slice(1)}
                  </span>
                </small>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Pokemon;
