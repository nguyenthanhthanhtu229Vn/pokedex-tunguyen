import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { LinkContainer } from "react-router-bootstrap";
import "./styles/style.css";
const Header = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [nameSearchInput, setNameSearchInput] = useState("");
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
    setNameSearchInput(e.target.value);
    nameSuggest.length = 0;
    const data = await getNamePoke();
    data.results.map((item) => {
      // console.log(e.target.value.toLowerCase());
      if (
        item.name.includes(e.target.value.toLowerCase()) &&
        e.target.value.trim().toLowerCase() !== ""
      ) {
        nameSuggest.push(item.name);
      }
    });
    setPokeomon(e.target.value.toLowerCase());
  };

  const choose = (e) => {
    if (e.key === "Enter") {
      navigate(`/pokemon/${pokemon}`);
      setNameSearchInput("");
      setNameSuggest([]);
    }
  };
  const clickEvent = () => {
    navigate(`/pokemon/${pokemon}`);
    setNameSearchInput("");
    setNameSuggest([]);
  };
  const selectSuggestInput = (item) => {
    setNameSearchInput(item.charAt(0).toUpperCase() + item.slice(1));
    setPokeomon(item);
  };
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, [visible]);

  const handleKeyDown = (event) => {
    // Handle keyboard navigation and selection
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault(); // Prevent scrolling
      const currentIdx = nameSuggest.indexOf(pokemon);
      let nextIdx;
      if (event.key === "ArrowDown") {
        nextIdx = Math.min(currentIdx + 1, nameSuggest.length - 1);
        document.querySelectorAll(".suggest div").forEach((item) => {
          item.classList.remove("active");
        });
        document
          .querySelector(`.${nameSuggest[nextIdx]}`)
          .classList.add("active");
      } else {
        nextIdx = Math.max(currentIdx - 1, 0);
        document.querySelectorAll(".suggest div").forEach((item) => {
          item.classList.remove("active");
        });
        document
          .querySelector(`.${nameSuggest[nextIdx]}`)
          .classList.add("active");
      }
      setNameSearchInput(
        nameSuggest[nextIdx].charAt(0).toUpperCase() +
          nameSuggest[nextIdx].slice(1)
      );

      setPokeomon(nameSuggest[nextIdx]);
    } else if (event.key === "Enter") {
      setNameSuggest([]);
    }
  };
  return (
    <header className={`${visible}`}>
      <LinkContainer to="/">
        <h1>React Pokédex</h1>
      </LinkContainer>
      <div className="search">
        <div className="search_input">
          <input
            type="text"
            value={nameSearchInput}
            onChange={searchPokemon}
            onKeyPress={choose}
            onKeyDown={handleKeyDown}
            placeholder="Input ID or Name"
          />
          {nameSuggest?.length !== 0 ? (
            <div className="suggest">
              {nameSuggest.map((item) => (
                <div
                  onClick={() => selectSuggestInput(item)}
                  key={item}
                  className={item}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div onClick={clickEvent}>
          <div className="search-icon">
            <img src="/search.png" alt="search" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
