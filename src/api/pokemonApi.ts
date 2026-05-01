import type {
  Pokemon,
  PokemonListItem,
  PokemonMove,
  PokemonType,
} from "../types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export const fetchPokemon = async (
  nameOrId: string | number,
): Promise<Pokemon> => {
  const res = await fetch(`${BASE_URL}/${nameOrId}`);

  if (!res.ok) {
    throw new Error("Pokemon not found");
  }

  const data = await res.json();

  return {
    name: data.name,
    image: data.sprites.front_default,
    types: data.types.map((t: PokemonType) => t.type.name),
    moves: data.moves.slice(0, 5).map((m: PokemonMove) => m.move.name),
  };
};

export const fetchRandomPokemon = async (): Promise<Pokemon> => {
  const randomId = Math.floor(Math.random() * 151) + 1;
  return fetchPokemon(randomId);
};

export const fetchPokemonNames = async (): Promise<string[]> => {
  const res = await fetch(`${BASE_URL}?limit=100000&offset=0`);

  if (!res.ok) {
    throw new Error("Failed to fetch pokemon list");
  }

  const data = await res.json();

  return data.results.map((pokemon: PokemonListItem) => pokemon.name);
};
