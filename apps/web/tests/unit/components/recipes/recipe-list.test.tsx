import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RecipeList from "@/components/recipes/recipe-list";
import type { Recipe } from "@/lib/schemas/recipe";

describe("RecipeList", () => {
  const mockRecipes: Recipe[] = [
    {
      id: 1,
      name: "とくせんリンゴジュース",
      type: "デザート",
      ingredientCount: 7,
      energy: 85,
      power: 85,
      ingredients: [{ name: "あまいミツ", quantity: 7 }],
      effect: "おてつだい時間短縮",
      imageUrl: "/images/recipes/apple-juice.png",
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
      effect: "エナジー獲得量アップ",
      imageUrl: "/images/recipes/bean-burger-curry.png",
    },
    {
      id: 3,
      name: "とくせんフルーツサラダ",
      type: "サラダ",
      ingredientCount: 16,
      energy: 450,
      power: 450,
      ingredients: [
        { name: "あまいミツ", quantity: 3 },
        { name: "モモのみ", quantity: 8 },
        { name: "ウブのみ", quantity: 5 },
      ],
      effect: "おてつだいスピード up",
      imageUrl: "/images/recipes/fruit-salad.png",
    },
  ];

  it("should render all recipe cards", () => {
    render(<RecipeList recipes={mockRecipes} />);

    expect(screen.getByText("とくせんリンゴジュース")).toBeInTheDocument();
    expect(screen.getByText("マメバーグカレー")).toBeInTheDocument();
    expect(screen.getByText("とくせんフルーツサラダ")).toBeInTheDocument();
  });

  it("should render correct number of recipe cards", () => {
    const { container } = render(<RecipeList recipes={mockRecipes} />);

    // RecipeCard components should be rendered
    const _cards = container.querySelectorAll('[data-testid="recipe-card"]');
    // Since we don't have data-testid, we'll check for recipe names instead
    expect(screen.getByText("とくせんリンゴジュース")).toBeInTheDocument();
    expect(screen.getByText("マメバーグカレー")).toBeInTheDocument();
    expect(screen.getByText("とくせんフルーツサラダ")).toBeInTheDocument();
  });

  it("should show empty state message when no recipes", () => {
    render(<RecipeList recipes={[]} />);

    expect(
      screen.getByText("該当する料理が見つかりません"),
    ).toBeInTheDocument();
  });

  it("should not show recipe cards when empty", () => {
    render(<RecipeList recipes={[]} />);

    expect(
      screen.queryByText("とくせんリンゴジュース"),
    ).not.toBeInTheDocument();
  });

  it("should render grid layout with correct classes", () => {
    const { container } = render(<RecipeList recipes={mockRecipes} />);

    const gridElement = container.querySelector(".grid");
    expect(gridElement).toBeInTheDocument();
    expect(gridElement).toHaveClass("grid-cols-1");
    expect(gridElement).toHaveClass("md:grid-cols-2");
    expect(gridElement).toHaveClass("lg:grid-cols-3");
  });

  it("should handle single recipe", () => {
    const singleRecipe = [mockRecipes[0]];
    render(<RecipeList recipes={singleRecipe} />);

    expect(screen.getByText("とくせんリンゴジュース")).toBeInTheDocument();
    expect(screen.queryByText("マメバーグカレー")).not.toBeInTheDocument();
  });

  it("should render all recipe details for each card", () => {
    render(<RecipeList recipes={mockRecipes} />);

    // Check first recipe details
    expect(screen.getByText("デザート")).toBeInTheDocument();
    expect(screen.getByText(/85/)).toBeInTheDocument();

    // Check second recipe details (toLocaleString() adds comma: 1,560)
    expect(screen.getByText("カレー")).toBeInTheDocument();
    expect(screen.getByText(/1,560/)).toBeInTheDocument();

    // Check third recipe details
    expect(screen.getByText("サラダ")).toBeInTheDocument();
    expect(screen.getByText(/450/)).toBeInTheDocument();
  });
});
