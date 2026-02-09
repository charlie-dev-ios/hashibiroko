import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NatureMatrixTable from "@/components/natures/nature-matrix-table";
import type { Nature, NatureStat } from "@/lib/schemas/nature";

const STATS: NatureStat[] = [
  "helpingSpeed",
  "ingredientRate",
  "mainSkillRate",
  "expGain",
  "energyRecovery",
];

const STAT_LABELS: Record<NatureStat, string> = {
  helpingSpeed: "おてつだいスピード",
  ingredientRate: "食材お手伝い確率",
  mainSkillRate: "メインスキル発動確率",
  expGain: "EXP獲得量",
  energyRecovery: "げんき回復量",
};

const mockNatures: Nature[] = [
  {
    name: "さみしがり",
    increasedStat: "helpingSpeed",
    decreasedStat: "ingredientRate",
  },
  {
    name: "いじっぱり",
    increasedStat: "helpingSpeed",
    decreasedStat: "mainSkillRate",
  },
  { name: "やんちゃ", increasedStat: "helpingSpeed", decreasedStat: "expGain" },
  {
    name: "ゆうかん",
    increasedStat: "helpingSpeed",
    decreasedStat: "energyRecovery",
  },
  {
    name: "ずぶとい",
    increasedStat: "ingredientRate",
    decreasedStat: "helpingSpeed",
  },
  {
    name: "わんぱく",
    increasedStat: "ingredientRate",
    decreasedStat: "mainSkillRate",
  },
  {
    name: "のうてんき",
    increasedStat: "ingredientRate",
    decreasedStat: "expGain",
  },
  {
    name: "のんき",
    increasedStat: "ingredientRate",
    decreasedStat: "energyRecovery",
  },
  {
    name: "ひかえめ",
    increasedStat: "mainSkillRate",
    decreasedStat: "helpingSpeed",
  },
  {
    name: "おっとり",
    increasedStat: "mainSkillRate",
    decreasedStat: "ingredientRate",
  },
  {
    name: "うっかりや",
    increasedStat: "mainSkillRate",
    decreasedStat: "expGain",
  },
  {
    name: "れいせい",
    increasedStat: "mainSkillRate",
    decreasedStat: "energyRecovery",
  },
  { name: "おだやか", increasedStat: "expGain", decreasedStat: "helpingSpeed" },
  {
    name: "おとなしい",
    increasedStat: "expGain",
    decreasedStat: "ingredientRate",
  },
  {
    name: "しんちょう",
    increasedStat: "expGain",
    decreasedStat: "mainSkillRate",
  },
  {
    name: "なまいき",
    increasedStat: "expGain",
    decreasedStat: "energyRecovery",
  },
  {
    name: "おくびょう",
    increasedStat: "energyRecovery",
    decreasedStat: "helpingSpeed",
  },
  {
    name: "ようき",
    increasedStat: "energyRecovery",
    decreasedStat: "ingredientRate",
  },
  {
    name: "むじゃき",
    increasedStat: "energyRecovery",
    decreasedStat: "mainSkillRate",
  },
  {
    name: "せっかち",
    increasedStat: "energyRecovery",
    decreasedStat: "expGain",
  },
  {
    name: "がんばりや",
    increasedStat: "helpingSpeed",
    decreasedStat: "helpingSpeed",
  },
  {
    name: "すなお",
    increasedStat: "ingredientRate",
    decreasedStat: "ingredientRate",
  },
  {
    name: "てれや",
    increasedStat: "mainSkillRate",
    decreasedStat: "mainSkillRate",
  },
  { name: "きまぐれ", increasedStat: "expGain", decreasedStat: "expGain" },
  {
    name: "まじめ",
    increasedStat: "energyRecovery",
    decreasedStat: "energyRecovery",
  },
];

describe("NatureMatrixTable", () => {
  it("should render a table element", () => {
    const { container } = render(<NatureMatrixTable natures={mockNatures} />);
    expect(container.querySelector("table")).toBeInTheDocument();
  });

  it("should render all 25 nature names in the table", () => {
    render(<NatureMatrixTable natures={mockNatures} />);
    for (const nature of mockNatures) {
      expect(screen.getByText(nature.name)).toBeInTheDocument();
    }
  });

  it("should render column headers with decreased stat labels", () => {
    render(<NatureMatrixTable natures={mockNatures} />);
    for (const stat of STATS) {
      const labels = screen.getAllByText(STAT_LABELS[stat]);
      expect(labels.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("should render row headers with increased stat labels", () => {
    const { container } = render(<NatureMatrixTable natures={mockNatures} />);
    const rowHeaders = container.querySelectorAll("tbody th");
    expect(rowHeaders).toHaveLength(5);
  });

  it("should have 5 data rows", () => {
    const { container } = render(<NatureMatrixTable natures={mockNatures} />);
    const rows = container.querySelectorAll("tbody tr");
    expect(rows).toHaveLength(5);
  });

  it("should have 5 data cells per row", () => {
    const { container } = render(<NatureMatrixTable natures={mockNatures} />);
    const rows = container.querySelectorAll("tbody tr");
    for (const row of rows) {
      const cells = row.querySelectorAll("td");
      expect(cells).toHaveLength(5);
    }
  });

  it("should be wrapped in an overflow container for mobile scroll", () => {
    const { container } = render(<NatureMatrixTable natures={mockNatures} />);
    const wrapper = container.firstElementChild;
    expect(wrapper?.className).toContain("overflow");
  });
});
