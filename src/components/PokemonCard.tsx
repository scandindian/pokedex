import type { Pokemon } from "../types/pokemon";

interface Props {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: Props) => {
  return (
    <div className="border rounded p-4 shadow-md text-center">
      <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>

      <img src={pokemon.image} alt={pokemon.name} className="mx-auto" />

      <div>
        <strong>Types:</strong> {pokemon.types.join(", ")}
      </div>

      <div>
        <strong>Moves:</strong> {pokemon.moves.join(", ")}
      </div>
    </div>
  );
};

export default PokemonCard;
