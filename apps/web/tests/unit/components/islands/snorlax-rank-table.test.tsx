import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SnorlaxRankTable from "@/components/islands/snorlax-rank-table";
import type { SnorlaxRank } from "@/lib/schemas/island";

const mockRanks: SnorlaxRank[] = [
  {
    rankTier: "ノーマル",
    rankNumber: 1,
    requiredEnergy: 0,
    dreamShards: 24,
    newPokemonIds: [],
  },
  {
    rankTier: "ノーマル",
    rankNumber: 2,
    requiredEnergy: 3118,
    dreamShards: 35,
    newPokemonIds: [],
  },
  {
    rankTier: "スーパー",
    rankNumber: 1,
    requiredEnergy: 23385,
    dreamShards: 69,
    newPokemonIds: [],
  },
];

describe("SnorlaxRankTable", () => {
  it("should render rank names in tier+number format", () => {
    render(<SnorlaxRankTable ranks={mockRanks} />);

    expect(screen.getByText("ノーマル 1")).toBeInTheDocument();
    expect(screen.getByText("ノーマル 2")).toBeInTheDocument();
    expect(screen.getByText("スーパー 1")).toBeInTheDocument();
  });

  it("should display energy values with comma formatting", () => {
    render(<SnorlaxRankTable ranks={mockRanks} />);

    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("3,118")).toBeInTheDocument();
    expect(screen.getByText("23,385")).toBeInTheDocument();
  });

  it("should display dreamShards column with values", () => {
    render(<SnorlaxRankTable ranks={mockRanks} />);

    expect(screen.getByText("報酬")).toBeInTheDocument();
    expect(screen.getByText("24")).toBeInTheDocument();
    expect(screen.getByText("35")).toBeInTheDocument();
    expect(screen.getByText("69")).toBeInTheDocument();
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
    expect(screen.getByText("報酬")).toBeInTheDocument();
  });

  it("should render all rows", () => {
    const { container } = render(<SnorlaxRankTable ranks={mockRanks} />);

    const rows = container.querySelectorAll("tbody tr");
    expect(rows).toHaveLength(3);

    const rankCells = Array.from(rows).map(
      (row) => row.querySelector("td")?.textContent,
    );
    expect(rankCells).toEqual(["ノーマル 1", "ノーマル 2", "スーパー 1"]);
  });
});
