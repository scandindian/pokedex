import { useEffect, useRef } from "react";
import { usePokemon } from "./hooks/usePokemon";
import PokemonCard from "./components/PokemonCard";

const App = () => {
  const { pokemon, getRandomPokemon } = usePokemon();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    getRandomPokemon();
  }, [getRandomPokemon]);

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      {pokemon && <PokemonCard pokemon={pokemon} />}
    </div>
  );
};

export default App;
