import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CollapsibleSection from "@/components/islands/collapsible-section";
import RankPokemonList from "@/components/islands/rank-pokemon-list";
import SnorlaxRankTable from "@/components/islands/snorlax-rank-table";
import Breadcrumb from "@/components/navigation/breadcrumb";
import { getAllIslands, getIslandById } from "@/lib/data/islands";
import { getAllPokemon } from "@/lib/data/pokemon";

interface IslandDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: IslandDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const islandId = Number.parseInt(id, 10);
  const island = await getIslandById(islandId);

  if (!island) {
    return {
      title: "フィールドが見つかりません",
    };
  }

  return {
    title: `${island.name} | フィールド | ポケモンスリープ攻略サイト`,
    description: `${island.name}の詳細情報。とくいきのみ: ${island.specialtyBerries.join("、")}。カビゴン評価ごとの必要エナジーと出現ポケモンを確認できます。`,
  };
}

export async function generateStaticParams() {
  const islands = await getAllIslands();

  return islands.map((island) => ({
    id: String(island.id),
  }));
}

export default async function IslandDetailPage({
  params,
}: IslandDetailPageProps) {
  const { id } = await params;
  const islandId = Number.parseInt(id, 10);

  if (Number.isNaN(islandId)) {
    notFound();
  }

  const island = await getIslandById(islandId);

  if (!island) {
    notFound();
  }

  const allPokemon = await getAllPokemon();
  const pokemonMap = new Map(
    allPokemon.map((p) => [p.id, { id: p.id, name: p.name }]),
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: "フィールド", href: "/islands" },
          { label: island.name },
        ]}
      />

      <h1 className="text-4xl font-bold mb-4">{island.name}</h1>

      <p className="text-muted-foreground mb-8">{island.description}</p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">基本情報</h2>
          <div className="text-sm">
            <span className="font-medium">とくいきのみ:</span>{" "}
            {island.specialtyBerries.join("、")}
          </div>
        </section>

        <section>
          <CollapsibleSection title="出現ポケモン">
            <RankPokemonList
              ranks={island.snorlaxRanks}
              pokemonMap={pokemonMap}
            />
          </CollapsibleSection>
        </section>

        <section>
          <CollapsibleSection title="カビゴン評価">
            <SnorlaxRankTable ranks={island.snorlaxRanks} />
          </CollapsibleSection>
        </section>
      </div>
    </div>
  );
}
