import type { Pokemon } from "../types/pokemon";

interface Props {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: Props) => {
  const displayedMoves = pokemon.moves.slice(0, 5);

  return (
    <div className="flex flex-col gap-4 rounded border p-4 shadow-md sm:flex-row sm:items-center">
      <div className="rounded border bg-gray-50 p-4 text-center sm:w-48">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="mx-auto h-40 w-40"
        />
        <h2 className="mt-2 text-xl font-bold capitalize">{pokemon.name} #{pokemon.id}</h2>
      </div>

      <div className="flex-1 space-y-3 capitalize">
        <div>
          <strong>Types:</strong>
          <div className="mt-2 flex flex-wrap gap-2">
            {pokemon.types.map((type) => (
              <span
                key={type.name}
                className="inline-flex items-center gap-2 rounded border px-2 py-1 text-sm"
              >
                {type.icon ? (
                  <img
                    src={type.icon}
                    alt=""
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="h-3 w-3 rounded-full bg-gray-400"
                  />
                )}
                {type.name}
              </span>
            ))}
          </div>
        </div>

        <div>
          <strong>Moves:</strong> {displayedMoves.join(", ")}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
