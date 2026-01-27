import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RecipeCard from "@/components/recipes/recipe-card";
import type { Recipe } from "@/lib/schemas/recipe";

describe("RecipeCard", () => {
  const mockRecipe: Recipe = {
    id: 1,
    name: "とくせんリンゴジュース",
    type: "デザート",
    ingredientCount: 7,
    energy: 85,
    power: 85,
    ingredients: [{ name: "あまいミツ", quantity: 7 }],
    effect: "おてつだい時間短縮",
    imageUrl: "/images/recipes/apple-juice.png",
  };

  it("should render recipe name", () => {
    render(<RecipeCard recipe={mockRecipe} />);
    expect(screen.getByText("とくせんリンゴジュース")).toBeInTheDocument();
  });

  it("should render recipe type", () => {
    render(<RecipeCard recipe={mockRecipe} />);
    expect(screen.getByText("デザート")).toBeInTheDocument();
  });

  it("should render recipe power (energy)", () => {
    render(<RecipeCard recipe={mockRecipe} />);
    expect(screen.getByText(/85/)).toBeInTheDocument();
  });

  it("should render total ingredient count", () => {
    const multiIngredientRecipe: Recipe = {
      ...mockRecipe,
      ingredients: [
        { name: "マメミート", quantity: 7 },
        { name: "とくせんエッグ", quantity: 4 },
      ],
    };
    render(<RecipeCard recipe={multiIngredientRecipe} />);
    expect(screen.getByText(/食材11個/)).toBeInTheDocument();
  });

  it("should render recipe effect", () => {
    render(<RecipeCard recipe={mockRecipe} />);
    expect(screen.getByText("おてつだい時間短縮")).toBeInTheDocument();
  });

  it("should render image when imageUrl is provided", () => {
    render(<RecipeCard recipe={mockRecipe} />);
    const img = screen.getByAltText("とくせんリンゴジュース");
    expect(img).toBeInTheDocument();
  });

  it("should show placeholder when imageUrl is missing", () => {
    const recipeWithoutImage: Recipe = {
      ...mockRecipe,
      imageUrl: undefined,
    };
    render(<RecipeCard recipe={recipeWithoutImage} />);
    expect(screen.getByText("No img")).toBeInTheDocument();
  });
});
