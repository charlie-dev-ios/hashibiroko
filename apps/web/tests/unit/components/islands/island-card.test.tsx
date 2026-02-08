import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import IslandCard from "@/components/islands/island-card";
import type { Island } from "@/lib/schemas/island";

const mockIsland: Island = {
  id: 1,
  name: "ワカクサ本島",
  description: "最初に訪れるフィールド。",
  specialtyBerry: "ランダム",
  snorlaxRanks: [
    { rank: "ノーマル", requiredEnergy: 0, newPokemonIds: [172] },
    { rank: "いいかんじ", requiredEnergy: 16089, newPokemonIds: [25] },
    { rank: "すごいぞ", requiredEnergy: 33526, newPokemonIds: [39] },
    { rank: "とてもすごい", requiredEnergy: 65764, newPokemonIds: [133] },
    { rank: "ハイパー", requiredEnergy: 117524, newPokemonIds: [] },
    { rank: "マスター", requiredEnergy: 206474, newPokemonIds: [] },
  ],
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
