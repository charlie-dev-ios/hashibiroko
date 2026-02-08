import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RankPokemonList from "@/components/islands/rank-pokemon-list";
import type { SnorlaxRank } from "@/lib/schemas/island";

const mockRanks: SnorlaxRank[] = [
  { rank: "ノーマル", requiredEnergy: 0, newPokemonIds: [172, 25] },
  { rank: "いいかんじ", requiredEnergy: 16089, newPokemonIds: [39] },
  { rank: "すごいぞ", requiredEnergy: 33526, newPokemonIds: [] },
  { rank: "とてもすごい", requiredEnergy: 65764, newPokemonIds: [133] },
  { rank: "ハイパー", requiredEnergy: 117524, newPokemonIds: [] },
  { rank: "マスター", requiredEnergy: 206474, newPokemonIds: [] },
];

const mockPokemonMap = new Map([
  [172, { id: 172, name: "ピチュー" }],
  [25, { id: 25, name: "ピカチュウ" }],
  [39, { id: 39, name: "プリン" }],
  [133, { id: 133, name: "イーブイ" }],
]);

describe("RankPokemonList", () => {
  it("should render all rank sections", () => {
    render(<RankPokemonList ranks={mockRanks} pokemonMap={mockPokemonMap} />);

    expect(screen.getByText("ノーマル")).toBeInTheDocument();
    expect(screen.getByText("いいかんじ")).toBeInTheDocument();
    expect(screen.getByText("すごいぞ")).toBeInTheDocument();
    expect(screen.getByText("とてもすごい")).toBeInTheDocument();
    expect(screen.getByText("ハイパー")).toBeInTheDocument();
    expect(screen.getByText("マスター")).toBeInTheDocument();
  });

  it("should display pokemon names", () => {
    render(<RankPokemonList ranks={mockRanks} pokemonMap={mockPokemonMap} />);

    expect(screen.getByText("ピチュー")).toBeInTheDocument();
    expect(screen.getByText("ピカチュウ")).toBeInTheDocument();
    expect(screen.getByText("プリン")).toBeInTheDocument();
    expect(screen.getByText("イーブイ")).toBeInTheDocument();
  });

  it("should link pokemon names to pokemon detail pages", () => {
    render(<RankPokemonList ranks={mockRanks} pokemonMap={mockPokemonMap} />);

    const links = screen.getAllByRole("link");
    const hrefs = links.map((link) => link.getAttribute("href"));

    expect(hrefs).toContain("/pokemon/172");
    expect(hrefs).toContain("/pokemon/25");
    expect(hrefs).toContain("/pokemon/39");
    expect(hrefs).toContain("/pokemon/133");
  });

  it("should show 'なし' for ranks with no new pokemon", () => {
    render(<RankPokemonList ranks={mockRanks} pokemonMap={mockPokemonMap} />);

    const noneTexts = screen.getAllByText("なし");
    expect(noneTexts.length).toBe(3); // すごいぞ, ハイパー, マスター
  });
});
