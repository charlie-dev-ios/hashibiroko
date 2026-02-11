import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import IslandList from "@/components/islands/island-list";
import type { Island } from "@/lib/schemas/island";

function generateSnorlaxRanks(): Island["snorlaxRanks"] {
  const tiers = [
    { tier: "ノーマル" as const, count: 5 },
    { tier: "スーパー" as const, count: 5 },
    { tier: "ハイパー" as const, count: 5 },
    { tier: "マスター" as const, count: 20 },
  ];
  const ranks: Island["snorlaxRanks"] = [];
  for (const { tier, count } of tiers) {
    for (let i = 1; i <= count; i++) {
      ranks.push({
        rankTier: tier,
        rankNumber: i,
        requiredEnergy: ranks.length * 10000,
        dreamShards: ranks.length * 10,
        newPokemonIds: [],
      });
    }
  }
  return ranks;
}

const snorlaxRanks = generateSnorlaxRanks();

const mockIslands: Island[] = [
  {
    id: 1,
    name: "ワカクサ本島",
    description: "最初に訪れるフィールド。",
    specialtyBerries: ["ランダム"],
    snorlaxRanks,
  },
  {
    id: 2,
    name: "シアンの砂浜",
    description: "美しい砂浜が広がるフィールド。",
    specialtyBerries: ["オレンのみ", "モモンのみ", "シーヤのみ"],
    snorlaxRanks,
  },
];

describe("IslandList", () => {
  it("should render empty message when no islands", () => {
    render(<IslandList islands={[]} />);

    expect(
      screen.getByText(/フィールドが見つかりませんでした/),
    ).toBeInTheDocument();
  });

  it("should render all island cards", () => {
    render(<IslandList islands={mockIslands} />);

    expect(screen.getByText("ワカクサ本島")).toBeInTheDocument();
    expect(screen.getByText("シアンの砂浜")).toBeInTheDocument();
  });

  it("should render islands in grid layout", () => {
    const { container } = render(<IslandList islands={mockIslands} />);

    const grid = container.querySelector(".grid");
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass("grid-cols-1");
  });

  it("should render single island", () => {
    render(<IslandList islands={[mockIslands[0]]} />);

    expect(screen.getByText("ワカクサ本島")).toBeInTheDocument();
  });
});
