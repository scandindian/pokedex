import { useEffect, useRef } from "react";
import { usePokemon } from "./hooks/usePokemon";

const App = () => {
  const { pokemon, getRandomPokemon } = usePokemon();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    getRandomPokemon();
  }, [getRandomPokemon]);

  return <div>{JSON.stringify(pokemon)}</div>;
};

export default App;
