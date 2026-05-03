import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";

interface Props {
  onSearch: (query: string) => void;
  pokemonNames: string[];
  loadingNames: boolean;
}

const SearchBar = ({ onSearch, pokemonNames, loadingNames }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [value, setValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const trimmedValue = value.trim().toLowerCase();
  const hasExactMatch = pokemonNames.includes(trimmedValue);
  const matchedPokemon = trimmedValue
    ? pokemonNames.filter((name) => name.includes(trimmedValue))
    : [];

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!trimmedValue) return;
    setIsDropdownOpen(false);
    setHighlightedIndex(-1);
    onSearch(trimmedValue);
  };

  const handleSuggestionClick = (name: string) => {
    setValue(name);
    setIsDropdownOpen(false);
    setHighlightedIndex(-1);
    onSearch(name);
  };

  const handleClear = () => {
    setValue("");
    setIsDropdownOpen(false);
    setHighlightedIndex(-1);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!formRef.current?.contains(e.target as Node)) {
        setIsDropdownOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="relative flex gap-2">
      <div className="relative w-full">
        <input
          value={value}
          onChange={(e) => {
            const nextValue = e.target.value;
            const nextTrimmedValue = nextValue.trim().toLowerCase();

            setValue(nextValue);
            setHighlightedIndex(-1);
            setIsDropdownOpen(
              Boolean(nextTrimmedValue) &&
                !pokemonNames.includes(nextTrimmedValue),
            );
          }}
          onFocus={() =>
            setIsDropdownOpen(Boolean(trimmedValue) && !hasExactMatch)
          }
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setIsDropdownOpen(Boolean(trimmedValue) && !hasExactMatch);
              setHighlightedIndex((currentIndex) =>
                Math.min(currentIndex + 1, matchedPokemon.length - 1),
              );
            }

            if (e.key === "ArrowUp") {
              e.preventDefault();
              setHighlightedIndex((currentIndex) =>
                Math.max(currentIndex - 1, 0),
              );
            }

            if (
              e.key === "Enter" &&
              isDropdownOpen &&
              highlightedIndex >= 0
            ) {
              e.preventDefault();
              handleSuggestionClick(matchedPokemon[highlightedIndex]);
            }

            if (e.key === "Escape") {
              setIsDropdownOpen(false);
              setHighlightedIndex(-1);
            }
          }}
          placeholder="Search Pokémon..."
          className="w-full rounded border p-2 pr-10"
        />

        {value && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}

        {isDropdownOpen && (
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
              matchedPokemon.map((name, index) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => handleSuggestionClick(name)}
                  className={`block w-full truncate px-3 py-2 text-left capitalize hover:bg-gray-100 ${
                    index === highlightedIndex ? "bg-blue-50" : ""
                  }`}
                >
                  {name}
                </button>
              ))}
          </div>
        )}
      </div>
      <button className="inline-flex items-center gap-2 rounded bg-blue-500 px-4 text-white">
        <Search className="h-4 w-4" aria-hidden="true" />
        Search
      </button>
    </form>
  );
};

export default SearchBar;
