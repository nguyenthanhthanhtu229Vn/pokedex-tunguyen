import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { LinkContainer } from "react-router-bootstrap";
import "./styles/style.css";
const Header = () => {
  const navigate = useNavigate();
  const [ahi, setValue] = useState("");
  const [pokemon, setPokeomon] = useState("");
  const [visible, setVisible] = useState(false);
  const [nameSuggest, setNameSuggest] = useState(Array);
  const chooseValue = (item) => {
    setValue(item.charAt(0).toUpperCase() + item.slice(1));
  };
  const getNamePoke = async () => {
    const res = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898"
    );
    return res.data;
  };
  var prevScrollpos = window.pageYOffset;
  const toggleVisibility = () => {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      setVisible(true);
    } else {
      setVisible(false);
    }
    prevScrollpos = currentScrollPos;
  };
  const searchPokemon = async (e) => {
    nameSuggest.length = 0;
    const data = await getNamePoke();
    data.results.map((item) => {
      // console.log(e.target.value.toLowerCase());
      if (
        item.name.includes(e.target.value.toLowerCase()) &&
        e.target.value.trim().toLowerCase() !== ""
      ) {
        console.log("!");
        nameSuggest.push(item.name);
      }
    });
    setPokeomon(e.target.value.toLowerCase());
  };

  const choose = (e) => {
    if (e.key === "Enter") {
      navigate(`/pokemon/${pokemon}`);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, [visible]);
  return (
    <header className={`${visible}`}>
      <LinkContainer to="/">
        <h1>React Pokédex</h1>
      </LinkContainer>
      <div className="search">
        <div className="search_input">
          <input
            type="text"
            onChange={searchPokemon}
            onKeyPress={choose}
            placeholder="Input ID or Name"
          />
          {nameSuggest.length !== 0 ? (
            <div className="suggest">
              {nameSuggest.map((item) => (
                <div>{item.charAt(0).toUpperCase() + item.slice(1)}</div>
              ))}
            </div>
          ) : null}
        </div>
        <LinkContainer to={`/pokemon/${pokemon}`}>
          <div className="search-icon">
            <img src="/search.png" alt="search" />
          </div>
        </LinkContainer>
      </div>
    </header>
  );
};

export default Header;
