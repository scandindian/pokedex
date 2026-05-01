import { useState, useCallback } from "react";
import { fetchPokemon, fetchRandomPokemon } from "../api/pokemonApi";
import type { Pokemon } from "../types/pokemon";

export const usePokemon = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    loading,
    error,
    searchPokemon,
    getRandomPokemon,
  };
};
