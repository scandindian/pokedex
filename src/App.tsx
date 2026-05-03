import { useEffect } from "react";
import { Shuffle } from "lucide-react";
import SearchBar from "./components/SearchBar";
import PokemonCard from "./components/PokemonCard";
import Loader from "./components/Loader";
import { usePokemon } from "./hooks/usePokemon";

function App() {
  const {
    pokemon,
    pokemonNames,
    loading,
    listLoading,
    error,
    searchPokemon,
    getRandomPokemon,
    loadPokemonNames,
  } = usePokemon();

  useEffect(() => {
    getRandomPokemon();
    loadPokemonNames();
  }, [getRandomPokemon, loadPokemonNames]);

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">Pokédex</h1>

      <SearchBar
        onSearch={searchPokemon}
        pokemonNames={pokemonNames}
        loadingNames={listLoading}
      />

      <div className="flex justify-end">
        <button
          onClick={getRandomPokemon}
          className="inline-flex items-center gap-2 rounded bg-green-500 px-4 py-2 text-white"
        >
          <Shuffle className="h-4 w-4" aria-hidden="true" />
          Random Pokémon
        </button>
      </div>

      {loading && <Loader />}
      {error && <p className="text-red-500">{error}</p>}
      {pokemon && <PokemonCard pokemon={pokemon} />}
    </div>
  );
}

export default App;
