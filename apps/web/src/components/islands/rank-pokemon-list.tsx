import Link from "next/link";
import type { SnorlaxRank } from "@/lib/schemas/island";

export interface RankPokemonListProps {
  ranks: SnorlaxRank[];
  pokemonMap: Map<number, { id: number; name: string }>;
}

export default function RankPokemonList({
  ranks,
  pokemonMap,
}: RankPokemonListProps) {
  return (
    <div className="space-y-4">
      {ranks.map((rank) => (
        <div key={rank.rank}>
          <h3 className="font-semibold mb-2">{rank.rank}</h3>
          {rank.newPokemonIds.length === 0 ? (
            <p className="text-sm text-muted-foreground">なし</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {rank.newPokemonIds.map((pokemonId) => {
                const pokemon = pokemonMap.get(pokemonId);
                return (
                  <Link
                    key={pokemonId}
                    href={`/pokemon/${pokemonId}`}
                    className="text-sm px-2 py-1 rounded-md bg-muted hover:bg-accent transition-colors"
                  >
                    {pokemon?.name ?? `#${pokemonId}`}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
