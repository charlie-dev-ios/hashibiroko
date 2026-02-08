import { z } from "zod";
import islandData from "@/content/islands/islands.json";
import { type Island, IslandSchema } from "@/lib/schemas/island";

const IslandArraySchema = z.object({
  islands: z.array(IslandSchema),
});

/**
 * Get all islands from the data file with Zod validation
 * @returns Promise<Island[]> - Array of all islands (sorted by ID)
 */
export async function getAllIslands(): Promise<Island[]> {
  const validated = IslandArraySchema.parse(islandData);
  return validated.islands;
}

/**
 * Get a specific island by ID
 * @param id - Island ID
 * @returns Promise<Island | undefined> - Island if found, undefined otherwise
 */
export async function getIslandById(id: number): Promise<Island | undefined> {
  const allIslands = await getAllIslands();
  return allIslands.find((island) => island.id === id);
}

/**
 * Get an island by name
 * @param name - Island name (exact match)
 * @returns Promise<Island | undefined> - Island if found, undefined otherwise
 */
export async function getIslandByName(
  name: string,
): Promise<Island | undefined> {
  const allIslands = await getAllIslands();
  return allIslands.find((island) => island.name === name);
}
