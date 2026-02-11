import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Island } from "@/lib/schemas/island";

export interface IslandCardProps {
  island: Island;
}

export default function IslandCard({ island }: IslandCardProps) {
  return (
    <Link href={`/islands/${island.id}`}>
      <Card
        className="h-full transition-colors hover:bg-accent"
        role="article"
        aria-label={`${island.name}のフィールド情報`}
        data-testid={`island-card-${island.id}`}
      >
        <CardHeader>
          <CardTitle>{island.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm">
            <span className="font-medium">とくいきのみ:</span>{" "}
            {island.specialtyBerries.join("、")}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
