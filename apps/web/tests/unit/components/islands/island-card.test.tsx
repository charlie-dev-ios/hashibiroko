import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import IslandCard from "@/components/islands/island-card";
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

const mockIsland: Island = {
  id: 1,
  name: "ワカクサ本島",
  description: "最初に訪れるフィールド。",
  specialtyBerry: "ランダム",
  snorlaxRanks: generateSnorlaxRanks(),
};

const mockIslandWithFixedBerry: Island = {
  ...mockIsland,
  id: 2,
  name: "シアンの砂浜",
  specialtyBerry: "オレンのみ",
};

describe("IslandCard", () => {
  it("should render island name", () => {
    render(<IslandCard island={mockIsland} />);

    expect(screen.getByText("ワカクサ本島")).toBeInTheDocument();
  });

  it("should display 'ランダム' for random specialty berry", () => {
    render(<IslandCard island={mockIsland} />);

    expect(screen.getByText(/ランダム/)).toBeInTheDocument();
  });

  it("should display fixed berry name", () => {
    render(<IslandCard island={mockIslandWithFixedBerry} />);

    expect(screen.getByText(/オレンのみ/)).toBeInTheDocument();
  });

  it("should have link to island detail page", () => {
    render(<IslandCard island={mockIsland} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/islands/1");
  });

  it("should have appropriate data-testid", () => {
    render(<IslandCard island={mockIsland} />);

    expect(screen.getByTestId("island-card-1")).toBeInTheDocument();
  });
});
