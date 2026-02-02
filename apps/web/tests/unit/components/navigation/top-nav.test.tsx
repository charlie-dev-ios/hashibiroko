import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TopNav from "@/components/navigation/top-nav";

describe("TopNav", () => {
  it("should render navigation items without removed items", () => {
    render(<TopNav />);

    expect(screen.getByText("ポケモン")).toBeInTheDocument();
    expect(screen.getByText("チーム編成")).toBeInTheDocument();
    expect(screen.getByText("料理")).toBeInTheDocument();
    // 削除された項目が表示されないこと
    expect(screen.queryByText("睡眠戦略")).not.toBeInTheDocument();
    expect(screen.queryByText("ゲームメカニクス")).not.toBeInTheDocument();
  });

  it("should render フィールド instead of 島ガイド", () => {
    render(<TopNav />);

    expect(screen.getByText("フィールド")).toBeInTheDocument();
    expect(screen.queryByText("島ガイド")).not.toBeInTheDocument();
  });

  it("should render new navigation items きのみ and 食材", () => {
    render(<TopNav />);

    expect(screen.getByText("きのみ")).toBeInTheDocument();
    expect(screen.getByText("食材")).toBeInTheDocument();
  });

  it("should render cards with correct links", () => {
    render(<TopNav />);

    // Use more specific patterns to avoid partial matches with descriptions
    const pokemonLink = screen.getByRole("link", {
      name: /^ポケモン ポケモンの詳細情報/i,
    });
    expect(pokemonLink).toHaveAttribute("href", "/pokemon");

    const teamsLink = screen.getByRole("link", { name: /チーム編成/i });
    expect(teamsLink).toHaveAttribute("href", "/teams");

    const recipesLink = screen.getByRole("link", {
      name: /^料理 レシピときのみ/i,
    });
    expect(recipesLink).toHaveAttribute("href", "/recipes");

    const fieldsLink = screen.getByRole("link", {
      name: /^フィールド 各フィールド/i,
    });
    expect(fieldsLink).toHaveAttribute("href", "/islands");

    const berriesLink = screen.getByRole("link", {
      name: /^きのみ きのみの種類/i,
    });
    expect(berriesLink).toHaveAttribute("href", "/berries");

    const ingredientsLink = screen.getByRole("link", {
      name: /^食材 食材の入手方法/i,
    });
    expect(ingredientsLink).toHaveAttribute("href", "/ingredients");
  });

  it("should render card descriptions", () => {
    render(<TopNav />);

    expect(screen.getByText(/ポケモンの詳細情報を検索/i)).toBeInTheDocument();
    expect(screen.getByText(/フィールドの特徴/i)).toBeInTheDocument();
  });
});
