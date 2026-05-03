import { useState, useCallback } from "react";
import {
  fetchPokemon,
  fetchPokemonNames,
  fetchRandomPokemon,
} from "../api/pokemonApi";
import type { Pokemon } from "../types/pokemon";

export const usePokemon = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [pokemonNames, setPokemonNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load pokemon names, to be used in search option for search bar
  const loadPokemonNames = useCallback(async () => {
    try {
      setListLoading(true);
      const names = await fetchPokemonNames();
      setPokemonNames(names);
    } catch (err) {
      setError(`Failed to fetch pokemon list: ${err}`);
    } finally {
      setListLoading(false);
    }
  }, []);

  // Search pokemon with the given name
  const searchPokemon = useCallback(async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPokemon(query.toLowerCase());
      setPokemon(data);
    } catch (err) {
      setError(`Pokemon not found: ${err}`);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get random pokemon when the button is clicked and page is loaded
  const getRandomPokemon = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchRandomPokemon();
      setPokemon(data);
    } catch (err) {
      setError(`Failed to fetch pokemon: ${err}`);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    pokemon,
    pokemonNames,
    loading,
    listLoading,
    error,
    searchPokemon,
    getRandomPokemon,
    loadPokemonNames,
  };
};
