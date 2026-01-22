import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PokemonList from "@/components/pokemon/pokemon-list";
import type { Pokemon } from "@/lib/schemas/pokemon";

const mockPokemon: Pokemon[] = [
  {
    id: 25,
    name: "ピカチュウ",
    sleepType: "すやすや",
    specialty: "スキル",
    berry: {
      type: "オレンのみ",
      baseYield: 5,
    },
    skill: {
      name: "エナジーチャージS",
      description: "げんきを回復する",
      maxLevel: 7,
    },
    islands: ["ワカクサ本島"],
  },
  {
    id: 133,
    name: "イーブイ",
    sleepType: "うとうと",
    specialty: "きのみ",
    berry: {
      type: "モモンのみ",
      baseYield: 4,
    },
    skill: {
      name: "エナジーチャージS",
      description: "エナジーを回復する",
      maxLevel: 7,
    },
    islands: ["ワカクサ本島"],
  },
];

describe("PokemonList", () => {
  it("should render all pokemon cards", () => {
    render(<PokemonList pokemon={mockPokemon} />);

    expect(screen.getByText("ピカチュウ")).toBeInTheDocument();
    expect(screen.getByText("イーブイ")).toBeInTheDocument();
  });

  it("should render empty message when no pokemon", () => {
    render(<PokemonList pokemon={[]} />);

    expect(
      screen.getByText(/ポケモンが見つかりませんでした/),
    ).toBeInTheDocument();
  });

  it("should render pokemon in grid layout", () => {
    const { container } = render(<PokemonList pokemon={mockPokemon} />);

    const grid = container.querySelector(".grid");
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass("grid-cols-1");
  });
});
