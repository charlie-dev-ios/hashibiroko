"use client";

import { useEffect, useState } from "react";
import LoadingIndicator from "@/components/common/loading-indicator";
import Breadcrumb from "@/components/navigation/breadcrumb";
import PokemonList from "@/components/pokemon/pokemon-list";
import PokemonSearch, {
  type SearchFilters,
} from "@/components/pokemon/pokemon-search";
import { searchPokemon } from "@/lib/data/search";
import type { Pokemon } from "@/lib/schemas/pokemon";

export default function PokemonPage() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPokemon() {
      try {
        const response = await fetch("/api/pokemon");
        const data = await response.json();
        setPokemon(data);
        setFilteredPokemon(data);
      } catch (error) {
        console.error("Failed to load pokemon:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPokemon();
  }, []);

  const handleSearch = (filters: SearchFilters) => {
    const results = searchPokemon(pokemon, {
      keyword: filters.keyword || undefined,
      sleepType: filters.sleepType || undefined,
      specialty: filters.specialty || undefined,
      sortBy: filters.sortBy as "id" | "name",
      sortOrder: filters.sortOrder,
    });
    setFilteredPokemon(results);
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <Breadcrumb items={[{ label: "ポケモン図鑑" }]} />

      <h1 className="mb-6 text-3xl font-bold sm:mb-8 sm:text-4xl">
        ポケモン図鑑
      </h1>

      <div className="space-y-8">
        <PokemonSearch onSearch={handleSearch} />

        {loading ? (
          <LoadingIndicator />
        ) : (
          <>
            <div className="text-sm text-muted-foreground">
              {filteredPokemon.length}件のポケモンが見つかりました
            </div>
            <PokemonList pokemon={filteredPokemon} />
          </>
        )}
      </div>
    </div>
  );
}
