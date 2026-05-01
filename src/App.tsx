import { useEffect } from "react";
import { usePokemon } from "./hooks/usePokemon";

const App = () => {
  const { pokemon, getRandomPokemon } = usePokemon();

  useEffect(() => {
    getRandomPokemon();
  }, [getRandomPokemon]);

  return <div>{JSON.stringify(pokemon)}</div>;
};

export default App;
