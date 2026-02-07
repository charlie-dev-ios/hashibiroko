import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import IslandList from "@/components/islands/island-list";
import type { Island } from "@/lib/schemas/island";

const snorlaxRanks: Island["snorlaxRanks"] = [
  { rank: "ノーマル", requiredEnergy: 0, newPokemonIds: [] },
  { rank: "いいかんじ", requiredEnergy: 16089, newPokemonIds: [] },
  { rank: "すごいぞ", requiredEnergy: 33526, newPokemonIds: [] },
  { rank: "とてもすごい", requiredEnergy: 65764, newPokemonIds: [] },
  { rank: "ハイパー", requiredEnergy: 117524, newPokemonIds: [] },
  { rank: "マスター", requiredEnergy: 206474, newPokemonIds: [] },
];

const mockIslands: Island[] = [
  {
    id: 1,
    name: "ワカクサ本島",
    description: "最初に訪れるフィールド。",
    specialtyBerry: "ランダム",
    snorlaxRanks,
  },
  {
    id: 2,
    name: "シアンの砂浜",
    description: "美しい砂浜が広がるフィールド。",
    specialtyBerry: "オレンのみ",
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
