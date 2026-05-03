import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PokemonCard from "../../src/components/PokemonCard";

describe("PokemonCard", () => {
  it("renders pokemon artwork, id, types, and moves", () => {
    render(
      <PokemonCard
        pokemon={{
          id: 4,
          name: "charmander",
          image: "charmander.png",
          types: [{ name: "fire", icon: "/type-icons/fire.png" }],
          moves: ["scratch", "ember"],
        }}
      />,
    );

    expect(screen.getByRole("img", { name: "charmander" })).toHaveAttribute(
      "src",
      "charmander.png",
    );
    expect(screen.getByText("charmander #4")).toBeInTheDocument();
    expect(screen.getByText("fire")).toBeInTheDocument();
    expect(screen.getByText(/scratch, ember/i)).toBeInTheDocument();
  });
});
