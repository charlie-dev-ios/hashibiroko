import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PokemonCard from "@/components/pokemon/pokemon-card";
import type { Pokemon } from "@/lib/schemas/pokemon";

const mockPokemon: Pokemon = {
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
  evolution: {
    prevId: 172,
    nextIds: [26],
  },
  islands: ["ワカクサ本島", "シアンの砂浜"],
};

describe("PokemonCard", () => {
  it("should render pokemon name and number", () => {
    render(<PokemonCard pokemon={mockPokemon} />);

    expect(screen.getByText("ピカチュウ")).toBeInTheDocument();
    expect(screen.getByText(/No\.25/)).toBeInTheDocument();
  });

  it("should render sleep type and specialty", () => {
    render(<PokemonCard pokemon={mockPokemon} />);

    expect(screen.getByText("すやすや | スキル")).toBeInTheDocument();
  });

  it("should render berry and skill names", () => {
    render(<PokemonCard pokemon={mockPokemon} />);

    expect(screen.getByText(/オレンのみ/)).toBeInTheDocument();
    expect(screen.getByText(/エナジーチャージS/)).toBeInTheDocument();
  });

  it("should have link to pokemon detail page", () => {
    render(<PokemonCard pokemon={mockPokemon} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/pokemon/25");
  });
});
