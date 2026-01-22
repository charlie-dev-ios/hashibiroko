import type { Pokemon } from "@/lib/schemas/pokemon";
import PokemonCard from "./pokemon-card";

export interface PokemonListProps {
  pokemon: Pokemon[];
}

export default function PokemonList({ pokemon }: PokemonListProps) {
  if (pokemon.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        ポケモンが見つかりませんでした
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
      {pokemon.map((p) => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}
    </div>
  );
}
