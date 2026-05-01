import { useState } from "react";

interface Props {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: Props) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search Pokémon..."
        className="border p-2 rounded w-full"
      />
      <button className="bg-blue-500 text-white px-4 rounded">Search</button>
    </form>
  );
};

export default SearchBar;
