import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SnorlaxRankTable from "@/components/islands/snorlax-rank-table";
import type { SnorlaxRank } from "@/lib/schemas/island";

const mockRanks: SnorlaxRank[] = [
  { rank: "ノーマル", requiredEnergy: 0, newPokemonIds: [172] },
  { rank: "いいかんじ", requiredEnergy: 16089, newPokemonIds: [25] },
  { rank: "すごいぞ", requiredEnergy: 33526, newPokemonIds: [39] },
  { rank: "とてもすごい", requiredEnergy: 65764, newPokemonIds: [133] },
  { rank: "ハイパー", requiredEnergy: 117524, newPokemonIds: [] },
  { rank: "マスター", requiredEnergy: 206474, newPokemonIds: [] },
];

describe("SnorlaxRankTable", () => {
  it("should render all 6 ranks", () => {
    render(<SnorlaxRankTable ranks={mockRanks} />);

    expect(screen.getByText("ノーマル")).toBeInTheDocument();
    expect(screen.getByText("いいかんじ")).toBeInTheDocument();
    expect(screen.getByText("すごいぞ")).toBeInTheDocument();
    expect(screen.getByText("とてもすごい")).toBeInTheDocument();
    expect(screen.getByText("ハイパー")).toBeInTheDocument();
    expect(screen.getByText("マスター")).toBeInTheDocument();
  });

  it("should display energy values with comma formatting", () => {
    render(<SnorlaxRankTable ranks={mockRanks} />);

    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("16,089")).toBeInTheDocument();
    expect(screen.getByText("33,526")).toBeInTheDocument();
    expect(screen.getByText("65,764")).toBeInTheDocument();
    expect(screen.getByText("117,524")).toBeInTheDocument();
    expect(screen.getByText("206,474")).toBeInTheDocument();
  });

  it("should render table structure with thead and tbody", () => {
    const { container } = render(<SnorlaxRankTable ranks={mockRanks} />);

    expect(container.querySelector("table")).toBeInTheDocument();
    expect(container.querySelector("thead")).toBeInTheDocument();
    expect(container.querySelector("tbody")).toBeInTheDocument();
  });

  it("should have correct column headers", () => {
    render(<SnorlaxRankTable ranks={mockRanks} />);

    expect(screen.getByText("ランク")).toBeInTheDocument();
    expect(screen.getByText("必要エナジー")).toBeInTheDocument();
  });

  it("should render ranks in correct order", () => {
    const { container } = render(<SnorlaxRankTable ranks={mockRanks} />);

    const rows = container.querySelectorAll("tbody tr");
    expect(rows).toHaveLength(6);

    const rankCells = Array.from(rows).map(
      (row) => row.querySelector("td")?.textContent,
    );
    expect(rankCells).toEqual([
      "ノーマル",
      "いいかんじ",
      "すごいぞ",
      "とてもすごい",
      "ハイパー",
      "マスター",
    ]);
  });
});
