import { useEffect, useRef } from "react";
import SearchBar from "./components/SearchBar";
import PokemonCard from "./components/PokemonCard";
import { usePokemon } from "./hooks/usePokemon";

function App() {
  const { pokemon, loading, error, searchPokemon, getRandomPokemon } =
    usePokemon();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    getRandomPokemon();
  }, [getRandomPokemon]);

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">Pokédex</h1>

      <SearchBar onSearch={searchPokemon} />

      <button
        onClick={getRandomPokemon}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Random Pokémon
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {pokemon && <PokemonCard pokemon={pokemon} />}
    </div>
  );
}

export default App;
