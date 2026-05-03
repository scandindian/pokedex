import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchPokemon, fetchPokemonNames } from "../../src/api/pokemonApi";

const jsonResponse = (body: unknown, ok = true) =>
  new Response(JSON.stringify(body), {
    status: ok ? 200 : 404,
    headers: { "Content-Type": "application/json" },
  });

afterEach(() => {
  vi.restoreAllMocks();
});

describe("pokemonApi", () => {
  it("maps pokemon details from the PokeAPI response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        jsonResponse({
          id: 25,
          name: "pikachu",
          sprites: {
            front_default: "fallback.png",
            other: {
              "official-artwork": {
                front_default: "pikachu.png",
              },
            },
          },
          types: [{ type: { name: "electric", url: "/type/electric" } }],
          moves: [
            { move: { name: "thunder-shock" } },
            { move: { name: "quick-attack" } },
            { move: { name: "iron-tail" } },
            { move: { name: "electro-ball" } },
            { move: { name: "thunderbolt" } },
            { move: { name: "agility" } },
          ],
        }),
      ),
    );

    const pokemon = await fetchPokemon("pikachu");

    expect(pokemon).toEqual({
      id: 25,
      name: "pikachu",
      image: "pikachu.png",
      types: [{ name: "electric", icon: "/type-icons/electric.png" }],
      moves: [
        "thunder-shock",
        "quick-attack",
        "iron-tail",
        "electro-ball",
        "thunderbolt",
      ],
    });
  });

  it("returns pokemon names from the list endpoint", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        jsonResponse({
          results: [
            { name: "bulbasaur", url: "/pokemon/1" },
            { name: "ivysaur", url: "/pokemon/2" },
          ],
        }),
      ),
    );

    await expect(fetchPokemonNames()).resolves.toEqual([
      "bulbasaur",
      "ivysaur",
    ]);
  });
});
