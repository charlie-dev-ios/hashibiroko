import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import LoadingIndicator from "@/components/common/loading-indicator";
import Breadcrumb from "@/components/navigation/breadcrumb";
import PokemonDetail from "@/components/pokemon/pokemon-detail";
import {
  getAllPokemon,
  getEvolutionChain,
  getPokemonById,
} from "@/lib/data/pokemon";

interface PokemonDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: PokemonDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const pokemonId = Number.parseInt(id, 10);
  const pokemon = await getPokemonById(pokemonId);

  if (!pokemon) {
    return {
      title: "ポケモンが見つかりません",
    };
  }

  return {
    title: `${pokemon.name} | ポケモン図鑑 | ポケモンスリープ攻略サイト`,
    description: `${pokemon.name}の詳細情報。睡眠タイプ: ${pokemon.sleepType}、とくい: ${pokemon.specialty}、きのみ: ${pokemon.berry.type}`,
  };
}

export async function generateStaticParams() {
  const pokemon = await getAllPokemon();

  return pokemon.map((p) => ({
    id: String(p.id),
  }));
}

export default async function PokemonDetailPage({
  params,
}: PokemonDetailPageProps) {
  const { id } = await params;
  const pokemonId = Number.parseInt(id, 10);

  if (Number.isNaN(pokemonId)) {
    notFound();
  }

  const pokemon = await getPokemonById(pokemonId);

  if (!pokemon) {
    notFound();
  }

  const evolutionChain = await getEvolutionChain(pokemonId);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: "ポケモン図鑑", href: "/pokemon" },
          { label: pokemon.name },
        ]}
      />

      <Suspense fallback={<LoadingIndicator />}>
        <PokemonDetail pokemon={pokemon} evolutionChain={evolutionChain} />
      </Suspense>
    </div>
  );
}
