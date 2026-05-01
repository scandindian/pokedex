import { useState } from "react";

interface Props {
  onSearch: (query: string) => void;
  pokemonNames: string[];
  loadingNames: boolean;
}

const SearchBar = ({ onSearch, pokemonNames, loadingNames }: Props) => {
  const [value, setValue] = useState("");
  const trimmedValue = value.trim().toLowerCase();
  const matchedPokemon = trimmedValue
    ? pokemonNames.filter((name) => name.includes(trimmedValue))
    : [];

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!trimmedValue) return;
    onSearch(trimmedValue);
  };

  const handleSuggestionClick = (name: string) => {
    setValue(name);
    onSearch(name);
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex gap-2">
      <div className="relative w-full">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search Pokémon..."
          className="w-full rounded border p-2"
        />

        {trimmedValue && (
          <div className="absolute left-0 right-0 top-full z-10 mt-1 max-h-64 overflow-y-auto rounded border bg-white text-left shadow-lg">
            {loadingNames && (
              <div className="px-3 py-2 text-sm text-gray-500">Loading...</div>
            )}

            {!loadingNames && matchedPokemon.length === 0 && (
              <div className="px-3 py-2 text-sm text-gray-500">
                No matches found
              </div>
            )}

            {!loadingNames &&
              matchedPokemon.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => handleSuggestionClick(name)}
                  className="block w-full truncate px-3 py-2 text-left capitalize hover:bg-gray-100"
                >
                  {name}
                </button>
              ))}
          </div>
        )}
      </div>
      <button className="rounded bg-blue-500 px-4 text-white">Search</button>
    </form>
  );
};

export default SearchBar;
