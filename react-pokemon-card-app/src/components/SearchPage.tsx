import { useEffect, useState, useCallback } from "react";
import { FilterForm } from "./FilterForm";
import { CardGrid } from "./CardGrid";
import styles from "../components/SearchPage.module.css";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import useFetch from "../hooks/useFetch";

export type PokemonCard = {
  id: string;
  images: {
    small: string;
    large: string;
  };
  name: string;
  types: string[];
  rarity: string;
  supertype: string;
};

type SearchProps = {
  searchValue: string;
};

export const Search = ({ searchValue }: SearchProps) => {
  const [filters, setFilters] = useState({
    type: "",
    rarity: "",
    supertype: "",
  });
  const [search, setSearch] = useState(searchValue);
  const [inputValue, setInputValue] = useState(searchValue);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);

  const buildQuery = useCallback(() => {
    let query = `https://api.pokemontcg.io/v2/cards?q=name:${search}*`;
    if (filters.type) query += ` types:${filters.type}`;
    if (filters.rarity) query += ` rarity:${filters.rarity}`;
    if (filters.supertype) query += ` supertype:${filters.supertype}`;
    query += `&page=${currentPage}&pageSize=${pageSize}`;
    return query;
  }, [search, filters, currentPage, pageSize]);

  const { data, isLoading, error } = useFetch<{ data: PokemonCard[] }>(
    buildQuery(),
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearch(inputValue);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setInputValue("");
    setSearch("");
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  return (
    <div className={styles.searchPageContainer}>
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
      <FilterForm onFilterChange={setFilters} />
      {isLoading ? (
        <div className="modal">
          <div className="modal-content">
            <div className="spinner"></div>
          </div>
        </div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : data && data.data.length === 0 ? (
        <div className="no-result" style={{ color: "black" }}>
          <h2>No results</h2>
        </div>
      ) : (
        <>
          <CardGrid cards={data?.data || []} />
          <div className={styles.pageButtons}>
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              isDisabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              isDisabled={!data || data.data.length < pageSize}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
