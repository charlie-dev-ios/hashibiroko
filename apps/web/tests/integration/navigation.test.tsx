import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import IslandsPage from "@/app/islands/page";
import MechanicsPage from "@/app/mechanics/page";
import HomePage from "@/app/page";
import RecipesPage from "@/app/recipes/page";
import StrategiesPage from "@/app/strategies/page";
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
      expect(screen.getByText("ポケモン図鑑")).toBeInTheDocument();
      expect(screen.getByText("ゲームメカニクス")).toBeInTheDocument();
      expect(screen.getByText("睡眠戦略")).toBeInTheDocument();
      expect(screen.getByText("チーム編成")).toBeInTheDocument();
      expect(screen.getByText("料理情報")).toBeInTheDocument();
      expect(screen.getByText("島ガイド")).toBeInTheDocument();
    });

    it("should have correct href attributes for navigation links", () => {
      render(<HomePage />);

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
  });

  describe("Content Pages", () => {
    it("should render Mechanics page with breadcrumb", async () => {
      const page = await MechanicsPage();
      render(page);

      expect(
        screen.getByRole("heading", { name: "ゲームメカニクス", level: 1 }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("navigation", { name: "パンくずリスト" }),
      ).toBeInTheDocument();
      expect(screen.getByText("ホーム")).toBeInTheDocument();
    });

    it("should render Strategies page with breadcrumb", async () => {
      const page = await StrategiesPage();
      render(page);

      expect(
        screen.getByRole("heading", { name: "睡眠戦略", level: 1 }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("navigation", { name: "パンくずリスト" }),
      ).toBeInTheDocument();
      expect(screen.getByText("ホーム")).toBeInTheDocument();
    });

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
  });

  describe("Breadcrumb Navigation", () => {
    it("should have home link in breadcrumbs on content pages", async () => {
      const page = await MechanicsPage();
      render(page);

      const homeLink = screen.getByRole("link", { name: "ホーム" });
      expect(homeLink).toHaveAttribute("href", "/");
    });
  });
});
