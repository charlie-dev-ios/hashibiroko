import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TopNav from "@/components/navigation/top-nav";

describe("TopNav", () => {
  it("should render all 6 content section cards", () => {
    render(<TopNav />);

    expect(screen.getByText("ポケモン図鑑")).toBeInTheDocument();
    expect(screen.getByText("ゲームメカニクス")).toBeInTheDocument();
    expect(screen.getByText("睡眠戦略")).toBeInTheDocument();
    expect(screen.getByText("チーム編成")).toBeInTheDocument();
    expect(screen.getByText("料理情報")).toBeInTheDocument();
    expect(screen.getByText("島ガイド")).toBeInTheDocument();
  });

  it("should render cards with correct links", () => {
    render(<TopNav />);

    const pokemonLink = screen.getByRole("link", { name: /ポケモン図鑑/i });
    expect(pokemonLink).toHaveAttribute("href", "/pokemon");

    const mechanicsLink = screen.getByRole("link", {
      name: /ゲームメカニクス/i,
    });
    expect(mechanicsLink).toHaveAttribute("href", "/mechanics");

    const strategiesLink = screen.getByRole("link", { name: /睡眠戦略/i });
    expect(strategiesLink).toHaveAttribute("href", "/strategies");

    const teamsLink = screen.getByRole("link", { name: /チーム編成/i });
    expect(teamsLink).toHaveAttribute("href", "/teams");

    const recipesLink = screen.getByRole("link", { name: /料理情報/i });
    expect(recipesLink).toHaveAttribute("href", "/recipes");

    const islandsLink = screen.getByRole("link", { name: /島ガイド/i });
    expect(islandsLink).toHaveAttribute("href", "/islands");
  });

  it("should render card descriptions", () => {
    render(<TopNav />);

    expect(screen.getByText(/ポケモンの詳細情報を検索/i)).toBeInTheDocument();
    expect(
      screen.getByText(/睡眠タイプやゲームシステムの解説/i),
    ).toBeInTheDocument();
  });
});
