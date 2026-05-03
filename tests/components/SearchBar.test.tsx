import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import SearchBar from "../../src/components/SearchBar";

describe("SearchBar", () => {
  it("filters pokemon names as the user types", async () => {
    const user = userEvent.setup();

    render(
      <SearchBar
        onSearch={vi.fn()}
        pokemonNames={["bulbasaur", "charmander", "charmeleon"]}
        loadingNames={false}
      />,
    );

    await user.type(screen.getByPlaceholderText("Search Pokémon..."), "char");

    expect(screen.getByText("charmander")).toBeInTheDocument();
    expect(screen.getByText("charmeleon")).toBeInTheDocument();
    expect(screen.queryByText("bulbasaur")).not.toBeInTheDocument();
  });

  it("selects the highlighted pokemon with arrow keys and Enter", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(
      <SearchBar
        onSearch={onSearch}
        pokemonNames={["charmander", "charmeleon"]}
        loadingNames={false}
      />,
    );

    const input = screen.getByPlaceholderText("Search Pokémon...");

    await user.type(input, "char");
    await user.keyboard("{ArrowDown}{Enter}");

    expect(onSearch).toHaveBeenCalledWith("charmander");
    expect(input).toHaveValue("charmander");
    expect(screen.queryByText("charmeleon")).not.toBeInTheDocument();
  });
});
