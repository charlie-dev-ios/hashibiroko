import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NatureStatDetails from "@/components/natures/nature-stat-details";
import type { StatEffect } from "@/lib/schemas/nature";

const mockStatEffects: StatEffect[] = [
  {
    stat: "helpingSpeed",
    label: "おてつだいスピード",
    increasedEffect: "おてつだい時間が約2%短縮",
    decreasedEffect: "おてつだい時間が約2%延長",
  },
  {
    stat: "ingredientRate",
    label: "食材お手伝い確率",
    increasedEffect: "食材を見つける確率が約18%上昇",
    decreasedEffect: "食材を見つける確率が約18%下降",
  },
  {
    stat: "mainSkillRate",
    label: "メインスキル発動確率",
    increasedEffect: "メインスキルの発動確率が約18%上昇",
    decreasedEffect: "メインスキルの発動確率が約18%下降",
  },
  {
    stat: "expGain",
    label: "EXP獲得量",
    increasedEffect: "獲得EXPが約18%増加",
    decreasedEffect: "獲得EXPが約18%減少",
  },
  {
    stat: "energyRecovery",
    label: "げんき回復量",
    increasedEffect: "げんき回復量が約18%増加",
    decreasedEffect: "げんき回復量が約18%減少",
  },
];

describe("NatureStatDetails", () => {
  it("should render all 5 stat labels", () => {
    render(<NatureStatDetails statEffects={mockStatEffects} />);
    expect(screen.getByText("おてつだいスピード")).toBeInTheDocument();
    expect(screen.getByText("食材お手伝い確率")).toBeInTheDocument();
    expect(screen.getByText("メインスキル発動確率")).toBeInTheDocument();
    expect(screen.getByText("EXP獲得量")).toBeInTheDocument();
    expect(screen.getByText("げんき回復量")).toBeInTheDocument();
  });

  it("should render increased effects for all stats", () => {
    render(<NatureStatDetails statEffects={mockStatEffects} />);
    expect(screen.getByText("おてつだい時間が約2%短縮")).toBeInTheDocument();
    expect(
      screen.getByText("食材を見つける確率が約18%上昇"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("メインスキルの発動確率が約18%上昇"),
    ).toBeInTheDocument();
    expect(screen.getByText("獲得EXPが約18%増加")).toBeInTheDocument();
    expect(screen.getByText("げんき回復量が約18%増加")).toBeInTheDocument();
  });

  it("should render decreased effects for all stats", () => {
    render(<NatureStatDetails statEffects={mockStatEffects} />);
    expect(screen.getByText("おてつだい時間が約2%延長")).toBeInTheDocument();
    expect(
      screen.getByText("食材を見つける確率が約18%下降"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("メインスキルの発動確率が約18%下降"),
    ).toBeInTheDocument();
    expect(screen.getByText("獲得EXPが約18%減少")).toBeInTheDocument();
    expect(screen.getByText("げんき回復量が約18%減少")).toBeInTheDocument();
  });

  it("should render 5 stat sections", () => {
    const { container } = render(
      <NatureStatDetails statEffects={mockStatEffects} />,
    );
    const sections = container.querySelectorAll("[data-stat]");
    expect(sections).toHaveLength(5);
  });
});
