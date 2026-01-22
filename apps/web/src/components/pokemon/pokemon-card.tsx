import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Pokemon } from "@/lib/schemas/pokemon";

export interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <Card className="h-full transition-colors hover:bg-accent">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {pokemon.name}
            <span className="text-sm font-normal text-muted-foreground">
              No.{pokemon.id}
            </span>
          </CardTitle>
          <CardDescription>
            {pokemon.sleepType} | {pokemon.specialty}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">きのみ:</span> {pokemon.berry.type}
            </div>
            <div>
              <span className="font-medium">スキル:</span> {pokemon.skill.name}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
