import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import BerriesPage from "@/app/berries/page";
import IngredientsPage from "@/app/ingredients/page";
import IslandsPage from "@/app/islands/page";
import HomePage from "@/app/page";
import RecipesPage from "@/app/recipes/page";
import TeamsPage from "@/app/teams/page";

// Mock Next.js router
vi.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    };
  },
  usePathname() {
    return "/";
  },
}));

describe("Navigation Integration Tests", () => {
  describe("Home Page", () => {
    it("should render the top page with all navigation cards", () => {
      render(<HomePage />);

      expect(
        screen.getByText("ポケモンスリープ攻略サイト"),
      ).toBeInTheDocument();
      expect(screen.getByText("ポケモン")).toBeInTheDocument();
      expect(screen.getByText("チーム編成")).toBeInTheDocument();
      expect(screen.getByText("料理")).toBeInTheDocument();
      expect(screen.getByText("フィールド")).toBeInTheDocument();
      expect(screen.getByText("きのみ")).toBeInTheDocument();
      expect(screen.getByText("食材")).toBeInTheDocument();
      // 削除された項目が表示されないこと
      expect(screen.queryByText("ゲームメカニクス")).not.toBeInTheDocument();
      expect(screen.queryByText("睡眠戦略")).not.toBeInTheDocument();
      expect(screen.queryByText("島ガイド")).not.toBeInTheDocument();
    });

    it("should have correct href attributes for navigation links", () => {
      render(<HomePage />);

      // Use exact text matching to avoid partial matches with descriptions
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
  });

  describe("Content Pages", () => {
    it("should render Teams page with breadcrumb", async () => {
      const page = await TeamsPage();
      render(page);

      expect(
        screen.getByRole("heading", { name: "チーム編成", level: 1 }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("navigation", { name: "パンくずリスト" }),
      ).toBeInTheDocument();
      expect(screen.getByText("ホーム")).toBeInTheDocument();
    });

    it("should render Recipes page with breadcrumb", async () => {
      const page = await RecipesPage();
      render(page);

      expect(
        screen.getByRole("heading", { name: "料理一覧", level: 1 }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("navigation", { name: "パンくずリスト" }),
      ).toBeInTheDocument();
      expect(screen.getByText("ホーム")).toBeInTheDocument();
    });

    it("should render Islands page with placeholder", () => {
      render(<IslandsPage />);

      expect(
        screen.getByRole("heading", { name: "島ガイド", level: 1 }),
      ).toBeInTheDocument();
      expect(screen.getByText(/コンテンツは準備中です/i)).toBeInTheDocument();
    });

    it("should render Berries page with placeholder", () => {
      render(<BerriesPage />);

      expect(
        screen.getByRole("heading", { name: "きのみ情報", level: 1 }),
      ).toBeInTheDocument();
      expect(screen.getByText(/準備中です/i)).toBeInTheDocument();
    });

    it("should render Ingredients page with content", async () => {
      const page = await IngredientsPage();
      render(page);

      expect(
        screen.getByRole("heading", { name: "食材一覧", level: 1 }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("navigation", { name: "パンくずリスト" }),
      ).toBeInTheDocument();
      expect(screen.getByText("ホーム")).toBeInTheDocument();
    });
  });

  describe("Breadcrumb Navigation", () => {
    it("should have home link in breadcrumbs on content pages", async () => {
      const page = await TeamsPage();
      render(page);

      const homeLink = screen.getByRole("link", { name: "ホーム" });
      expect(homeLink).toHaveAttribute("href", "/");
    });
  });
});
