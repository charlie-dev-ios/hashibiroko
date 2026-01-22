import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Pokemon } from "@/lib/schemas/pokemon";

export interface PokemonDetailProps {
  pokemon: Pokemon;
  evolutionChain?: Pokemon[];
}

export default function PokemonDetail({
  pokemon,
  evolutionChain = [],
}: PokemonDetailProps) {
  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">
            {pokemon.name}
            <span className="ml-4 text-xl font-normal text-muted-foreground">
              No.{pokemon.id}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">基本情報</h3>
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="inline font-medium">睡眠タイプ: </dt>
                  <dd className="inline">{pokemon.sleepType}</dd>
                </div>
                <div>
                  <dt className="inline font-medium">とくい: </dt>
                  <dd className="inline">{pokemon.specialty}</dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="font-semibold mb-2">出現フィールド</h3>
              <ul className="space-y-1 text-sm">
                {pokemon.islands.map((island) => (
                  <li key={island}>{island}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Berry Info */}
      <Card>
        <CardHeader>
          <CardTitle>きのみ情報</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-2">
            <div>
              <dt className="inline font-medium">タイプ: </dt>
              <dd className="inline">{pokemon.berry.type}</dd>
            </div>
            <div>
              <dt className="inline font-medium">基礎収集数: </dt>
              <dd className="inline">{pokemon.berry.baseYield}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      {/* Skill Info */}
      <Card>
        <CardHeader>
          <CardTitle>スキル情報</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-2">
            <div>
              <dt className="inline font-medium">名前: </dt>
              <dd className="inline">{pokemon.skill.name}</dd>
            </div>
            <div>
              <dt className="font-medium">説明:</dt>
              <dd className="mt-1">{pokemon.skill.description}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      {/* Evolution Chain */}
      {evolutionChain.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle>進化系統</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {evolutionChain.map((evo, index) => (
                <div key={evo.id} className="flex items-center">
                  {index > 0 && <span className="mx-2">→</span>}
                  <Link
                    href={`/pokemon/${evo.id}`}
                    className={`text-sm ${
                      evo.id === pokemon.id
                        ? "font-bold text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {evo.name}
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
