import type { Pokemon } from "@/lib/schemas/pokemon";

export interface SearchOptions {
  keyword?: string;
  sleepType?: string;
  specialty?: string;
  sortBy?: "id" | "name";
  sortOrder?: "asc" | "desc";
}

/**
 * Search and filter pokemon based on various criteria
 * @param pokemon - Array of pokemon to search
 * @param options - Search options (keyword, filters, sort)
 * @returns Filtered and sorted array of pokemon
 */
export function searchPokemon(
  pokemon: Pokemon[],
  options: SearchOptions,
): Pokemon[] {
  let results = [...pokemon];

  // Filter by keyword (search in name)
  if (options.keyword) {
    const keyword = options.keyword.toLowerCase();
    results = results.filter((p) => p.name.toLowerCase().includes(keyword));
  }

  // Filter by sleep type
  if (options.sleepType) {
    results = results.filter((p) => p.sleepType === options.sleepType);
  }

  // Filter by specialty
  if (options.specialty) {
    results = results.filter((p) => p.specialty === options.specialty);
  }

  // Sort results
  if (options.sortBy) {
    results.sort((a, b) => {
      let comparison = 0;

      if (options.sortBy === "name") {
        comparison = a.name.localeCompare(b.name, "ja");
      } else if (options.sortBy === "id") {
        comparison = a.id - b.id;
      }

      return options.sortOrder === "desc" ? -comparison : comparison;
    });
  }

  return results;
}
