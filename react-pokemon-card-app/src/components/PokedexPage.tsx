import React, { useState, useEffect } from "react";
import styles from "../components/PokedexPage.module.css";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import useFetch from "../hooks/useFetch";

type Pokemon = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
};

type PokedexProps = {
  searchValue?: string;
};

const Pokedex: React.FC<PokedexProps> = ({ searchValue = "" }) => {
  const [search, setSearch] = useState(searchValue);
  const [inputValue, setInputValue] = useState(searchValue);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  const {
    data: pokemon,
    isLoading: isLoadingPokemon,
    error: errorPokemon,
  } = useFetch<Pokemon>(
    search ? `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}` : "",
  );

  const {
    data: initialPokemonData,
    isLoading: isLoadingList,
    error: errorList,
  } = useFetch<{ results: { name: string }[] }>(
    search ? "" : "https://pokeapi.co/api/v2/pokemon?limit=151",
  );

  useEffect(() => {
    if (!search && initialPokemonData) {
      const fetchAllPokemon = async () => {
        const promises = initialPokemonData.results.map(({ name }) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) =>
            res.json(),
          ),
        );
        const results = await Promise.all(promises);
        setPokemonList(results);
        console.log(results);
      };

      fetchAllPokemon();
    }
  }, [initialPokemonData, search]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearch(inputValue);
  };

  const clearSearch = () => {
    setInputValue("");
    setSearch("");
  };

  return (
    <div className={styles.pokedexContainer}>
      <form onSubmit={handleSearchSubmit}>
        <InputGroup>
          <Input
            size="lg"
            type="text"
            value={inputValue}
            onChange={handleSearchChange}
            placeholder="Search Pokémon"
          />
          {inputValue && (
            <InputRightElement onClick={clearSearch} cursor="pointer">
              <CloseIcon />
            </InputRightElement>
          )}
        </InputGroup>
      </form>
      {isLoadingPokemon || isLoadingList ? (
        <div className="modal">
          <div className="modal-content">
            <div className="spinner"></div>
          </div>
        </div>
      ) : errorPokemon || errorList ? (
        <div className="error">{errorPokemon || errorList}</div>
      ) : pokemon ? (
        <div className={styles.pokemonList}>
          <div key={pokemon.id} className={styles.pokemonListItem}>
            {pokemon.sprites && pokemon.sprites.front_default && (
              <img
                className={styles.pokemonImage}
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
              />
            )}
            <div className={styles.pokedexListText}>
              <div>
                <h2>{pokemon.name}</h2>
                {pokemon.types && pokemon.types[0] && (
                  <p>{pokemon.types[0].type.name}</p>
                )}
              </div>
              <h3>#{("00" + pokemon.id).slice(-3)}</h3>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.pokemonList}>
          {pokemonList.map((pokemon) => (
            <div key={pokemon.id} className={styles.pokemonListItem}>
              {pokemon.sprites && pokemon.sprites.front_default && (
                <img
                  className={styles.pokemonImage}
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                />
              )}
              <div className={styles.pokedexListText}>
                <div>
                  <h2>{pokemon.name.toUpperCase()}</h2>
                  {pokemon.types && pokemon.types[0] && (
                    <p>{pokemon.types[0].type.name}</p>
                  )}
                </div>
                <h3>#{("00" + pokemon.id).slice(-3)}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Pokedex;
