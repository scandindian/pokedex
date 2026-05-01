// src/hooks/usePokemon.ts
import { useState } from "react";
import { fetchPokemon, fetchRandomPokemon } from "../api/pokemonApi";
import type { Pokemon } from "../types/pokemon";

export const usePokemon = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchPokemon = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPokemon(query.toLowerCase());
      setPokemon(data);
    } catch (err) {
      setError("Pokemon not found");
    } finally {
      setLoading(false);
    }
  };

  const getRandomPokemon = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchRandomPokemon();
      setPokemon(data);
    } catch (err) {
      setError("Failed to fetch pokemon");
    } finally {
      setLoading(false);
    }
  };

  return {
    pokemon,
    loading,
    error,
    searchPokemon,
    getRandomPokemon,
  };
};
