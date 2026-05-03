import type {
  Pokemon,
  PokemonListItem,
  PokemonMove,
  PokemonType,
} from "../types/pokemon";
import { LOCAL_TYPE_ICONS } from "../utilities/icons";
import { BASE_URL } from "../utilities/urls";

const getTypeIconPath = (name: string): string | null => {
  if (!LOCAL_TYPE_ICONS.has(name)) return null;

  return `/type-icons/${name}.png`;
};

// Fetch Pokemon from the name or could also be ID
export const fetchPokemon = async (
  nameOrId: string | number,
): Promise<Pokemon> => {
  const res = await fetch(`${BASE_URL}/${nameOrId}`);

  if (!res.ok) {
    throw new Error("Pokemon not found");
  }

  const data = await res.json();
  const types = data.types.map((t: PokemonType) => ({
    name: t.type.name,
    icon: getTypeIconPath(t.type.name),
  }));

  return {
    id: data.id,
    name: data.name,
    image:
      data.sprites.other["official-artwork"].front_default ??
      data.sprites.front_default,
    types,
    moves: data.moves.slice(0, 5).map((m: PokemonMove) => m.move.name),
  };
};

// Fetch random pokemon
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
