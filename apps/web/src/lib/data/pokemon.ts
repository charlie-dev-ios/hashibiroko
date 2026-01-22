import { z } from "zod";
import pokemonData from "@/content/pokemon/pokemon.json";
import { type Pokemon, PokemonSchema } from "@/lib/schemas/pokemon";

const PokemonArraySchema = z.object({
  pokemon: z.array(PokemonSchema),
});

/**
 * Get all pokemon from the data file with Zod validation
 * @returns Promise<Pokemon[]> - Array of all pokemon
 */
export async function getAllPokemon(): Promise<Pokemon[]> {
  // Validate the entire data structure
  const validated = PokemonArraySchema.parse(pokemonData);
  return validated.pokemon;
}

/**
 * Get a specific pokemon by ID
 * @param id - Pokemon ID
 * @returns Promise<Pokemon | null> - Pokemon if found, null otherwise
 */
export async function getPokemonById(id: number): Promise<Pokemon | null> {
  const allPokemon = await getAllPokemon();
  const pokemon = allPokemon.find((p) => p.id === id);
  return pokemon || null;
}

/**
 * Get a pokemon by name
 * @param name - Pokemon name (exact match)
 * @returns Promise<Pokemon | null> - Pokemon if found, null otherwise
 */
export async function getPokemonByName(name: string): Promise<Pokemon | null> {
  const allPokemon = await getAllPokemon();
  const pokemon = allPokemon.find((p) => p.name === name);
  return pokemon || null;
}

/**
 * Get evolution chain for a pokemon
 * @param id - Pokemon ID
 * @returns Promise<Pokemon[]> - Array of pokemon in evolution chain
 */
export async function getEvolutionChain(id: number): Promise<Pokemon[]> {
  const allPokemon = await getAllPokemon();
  const pokemon = await getPokemonById(id);

  if (!pokemon) {
    return [];
  }

  const chain: Pokemon[] = [pokemon];

  // Find previous evolution(s)
  let currentPrevId = pokemon.evolution?.prevId;
  while (currentPrevId) {
    const prevPokemon = allPokemon.find((p) => p.id === currentPrevId);
    if (prevPokemon) {
      chain.unshift(prevPokemon);
      currentPrevId = prevPokemon.evolution?.prevId;
    } else {
      break;
    }
  }

  // Find next evolution(s)
  const currentNextIds = pokemon.evolution?.nextIds || [];
  for (const nextId of currentNextIds) {
    const nextPokemon = allPokemon.find((p) => p.id === nextId);
    if (nextPokemon) {
      chain.push(nextPokemon);
    }
  }

  return chain;
}
