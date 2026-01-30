import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RecipesPageContent from "@/components/recipes/recipes-page-content";
import type { Recipe } from "@/lib/schemas/recipe";

describe("RecipesPageContent", () => {
  const mockRecipes: Recipe[] = [
    {
      id: 1,
      name: "とくせんリンゴジュース",
      type: "デザート",
      ingredientCount: 7,
      energy: 85,
      power: 85,
      ingredients: [{ name: "あまいミツ", quantity: 7 }],
    },
    {
      id: 2,
      name: "マメバーグカレー",
      type: "カレー",
      ingredientCount: 11,
      energy: 1560,
      power: 1560,
      ingredients: [
        { name: "マメミート", quantity: 7 },
        { name: "とくせんエッグ", quantity: 4 },
      ],
    },
    {
      id: 3,
      name: "ニンジャカレー",
      type: "カレー",
      ingredientCount: 50,
      energy: 9445,
      power: 9445,
      ingredients: [
        { name: "ワカクサ大豆", quantity: 24 },
        { name: "マメミート", quantity: 9 },
        { name: "ふといながねぎ", quantity: 12 },
        { name: "あじわいキノコ", quantity: 5 },
      ],
    },
  ];

  describe("Pot Capacity Filtering", () => {
    it("should display all recipes when no pot capacity filter is set", () => {
      render(<RecipesPageContent initialRecipes={mockRecipes} />);

      expect(screen.getByText("とくせんリンゴジュース")).toBeInTheDocument();
      expect(screen.getByText("マメバーグカレー")).toBeInTheDocument();
      expect(screen.getByText("ニンジャカレー")).toBeInTheDocument();
    });

    it("should filter recipes by pot capacity when Lv.1 preset is clicked", () => {
      render(<RecipesPageContent initialRecipes={mockRecipes} />);

      // Click Lv.1 preset (capacity: 15)
      const lv1Button = screen.getByRole("button", { name: /Lv\.1/ });
      fireEvent.click(lv1Button);

      // Only recipes with ingredientCount <= 15 should be visible
      expect(screen.getByText("とくせんリンゴジュース")).toBeInTheDocument(); // 7
      expect(screen.getByText("マメバーグカレー")).toBeInTheDocument(); // 11
      expect(screen.queryByText("ニンジャカレー")).not.toBeInTheDocument(); // 50
    });

    it("should show all recipes when すべて button is clicked", () => {
      render(<RecipesPageContent initialRecipes={mockRecipes} />);

      // Set pot capacity with Lv.1
      const lv1Button = screen.getByRole("button", { name: /Lv\.1/ });
      fireEvent.click(lv1Button);

      // Click すべて to clear
      const allButton = screen.getByRole("button", {
        name: "鍋容量フィルターを解除",
      });
      fireEvent.click(allButton);

      // All recipes should be visible again
      expect(screen.getByText("とくせんリンゴジュース")).toBeInTheDocument();
      expect(screen.getByText("マメバーグカレー")).toBeInTheDocument();
      expect(screen.getByText("ニンジャカレー")).toBeInTheDocument();
    });

    it("should update displayed count when pot capacity filter is applied", () => {
      render(<RecipesPageContent initialRecipes={mockRecipes} />);

      // Click Lv.1 preset (capacity: 15)
      const lv1Button = screen.getByRole("button", { name: /Lv\.1/ });
      fireEvent.click(lv1Button);

      // Should show filtered count (7 and 11 are both <= 15)
      expect(screen.getByText(/2件表示中/)).toBeInTheDocument();
    });
  });

  describe("Combined Filters", () => {
    it("should filter by both pot capacity and type (AND condition)", () => {
      render(<RecipesPageContent initialRecipes={mockRecipes} />);

      // Set pot capacity to Lv.2 (capacity: 21)
      const lv2Button = screen.getByRole("button", { name: /Lv\.2/ });
      fireEvent.click(lv2Button);

      // Select カレー type
      const curryButton = screen.getByRole("button", {
        name: /カレー・シチュー/,
      });
      fireEvent.click(curryButton);

      // Only カレー with ingredientCount <= 21 should show
      expect(screen.getByText("マメバーグカレー")).toBeInTheDocument(); // カレー, 11
      expect(
        screen.queryByText("とくせんリンゴジュース"),
      ).not.toBeInTheDocument(); // デザート
      expect(screen.queryByText("ニンジャカレー")).not.toBeInTheDocument(); // 50 > 21
    });

    it("should maintain type filter when pot capacity is cleared", () => {
      render(<RecipesPageContent initialRecipes={mockRecipes} />);

      // Set filters
      const lv1Button = screen.getByRole("button", { name: /Lv\.1/ });
      fireEvent.click(lv1Button);

      const curryButton = screen.getByRole("button", {
        name: /カレー・シチュー/,
      });
      fireEvent.click(curryButton);

      // Clear pot capacity
      const allButton = screen.getByRole("button", {
        name: "鍋容量フィルターを解除",
      });
      fireEvent.click(allButton);

      // Type filter should still be active - only カレー recipes
      expect(screen.getByText("マメバーグカレー")).toBeInTheDocument();
      expect(screen.getByText("ニンジャカレー")).toBeInTheDocument();
      expect(
        screen.queryByText("とくせんリンゴジュース"),
      ).not.toBeInTheDocument();
    });
  });
});
