import type { Island } from "@/lib/schemas/island";
import IslandCard from "./island-card";

export interface IslandListProps {
  islands: Island[];
}

export default function IslandList({ islands }: IslandListProps) {
  if (islands.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        フィールドが見つかりませんでした
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
      {islands.map((island) => (
        <IslandCard key={island.id} island={island} />
      ))}
    </div>
  );
}
