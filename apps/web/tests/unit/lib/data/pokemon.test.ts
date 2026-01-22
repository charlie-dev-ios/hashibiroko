import { describe, expect, it } from "vitest";
import {
  getAllPokemon,
  getEvolutionChain,
  getPokemonById,
  getPokemonByName,
} from "@/lib/data/pokemon";

describe("getAllPokemon", () => {
  it("should return all pokemon from the data file", async () => {
    const pokemon = await getAllPokemon();

    expect(pokemon).toBeDefined();
    expect(Array.isArray(pokemon)).toBe(true);
    expect(pokemon.length).toBeGreaterThan(0);
  });

  it("should validate pokemon data with Zod schema", async () => {
    const pokemon = await getAllPokemon();

    // Check first pokemon has required fields
    expect(pokemon[0]).toHaveProperty("id");
    expect(pokemon[0]).toHaveProperty("name");
    expect(pokemon[0]).toHaveProperty("sleepType");
    expect(pokemon[0]).toHaveProperty("specialty");
    expect(pokemon[0]).toHaveProperty("berry");
    expect(pokemon[0]).toHaveProperty("skill");
    expect(pokemon[0]).toHaveProperty("islands");
  });

  it("should return pokemon with valid sleep types", async () => {
    const pokemon = await getAllPokemon();
    const validSleepTypes = ["うとうと", "すやすや", "ぐっすり"];

    pokemon.forEach((p) => {
      expect(validSleepTypes).toContain(p.sleepType);
    });
  });

  it("should return pokemon with valid specialties", async () => {
    const pokemon = await getAllPokemon();
    const validSpecialties = ["きのみ", "食材", "スキル"];

    pokemon.forEach((p) => {
      expect(validSpecialties).toContain(p.specialty);
    });
  });
});

describe("getPokemonById", () => {
  it("should return a pokemon by id", async () => {
    const pokemon = await getPokemonById(25); // Pikachu

    expect(pokemon).toBeDefined();
    expect(pokemon?.id).toBe(25);
    expect(pokemon?.name).toBe("ピカチュウ");
  });

  it("should return null for non-existent id", async () => {
    const pokemon = await getPokemonById(99999);

    expect(pokemon).toBeNull();
  });

  it("should return pokemon with complete data structure", async () => {
    const pokemon = await getPokemonById(25);

    expect(pokemon).toHaveProperty("berry");
    expect(pokemon?.berry).toHaveProperty("type");
    expect(pokemon?.berry).toHaveProperty("baseYield");

    expect(pokemon).toHaveProperty("skill");
    expect(pokemon?.skill).toHaveProperty("name");
    expect(pokemon?.skill).toHaveProperty("description");
  });
});

describe("getPokemonByName", () => {
  it("should return a pokemon by name", async () => {
    const pokemon = await getPokemonByName("ピカチュウ");

    expect(pokemon).toBeDefined();
    expect(pokemon?.name).toBe("ピカチュウ");
    expect(pokemon?.id).toBe(25);
  });

  it("should return null for non-existent name", async () => {
    const pokemon = await getPokemonByName("存在しないポケモン");

    expect(pokemon).toBeNull();
  });
});

describe("getEvolutionChain", () => {
  it("should return evolution chain for a pokemon", async () => {
    const chain = await getEvolutionChain(25); // Pikachu

    expect(chain).toBeDefined();
    expect(Array.isArray(chain)).toBe(true);
    expect(chain.length).toBeGreaterThan(0);
  });

  it("should include the pokemon itself in the chain", async () => {
    const chain = await getEvolutionChain(25);
    const pikachu = chain.find((p) => p.id === 25);

    expect(pikachu).toBeDefined();
    expect(pikachu?.name).toBe("ピカチュウ");
  });
});
