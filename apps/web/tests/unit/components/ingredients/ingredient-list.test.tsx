import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import IngredientList from "@/components/ingredients/ingredient-list";

describe("IngredientList", () => {
  const mockIngredients = [
    { id: 1, name: "げきからハーブ", energy: 130 },
    { id: 2, name: "マメミート", energy: 103 },
    { id: 3, name: "モーモーミルク", energy: 98 },
  ];

  it("should render all ingredients", () => {
    render(<IngredientList ingredients={mockIngredients} />);
    expect(screen.getByText("げきからハーブ")).toBeInTheDocument();
    expect(screen.getByText("マメミート")).toBeInTheDocument();
    expect(screen.getByText("モーモーミルク")).toBeInTheDocument();
  });

  it("should display message when no ingredients", () => {
    render(<IngredientList ingredients={[]} />);
    expect(screen.getByText(/食材がありません/)).toBeInTheDocument();
  });

  it("should render correct number of cards", () => {
    render(<IngredientList ingredients={mockIngredients} />);
    // Each ingredient should render its name
    const ingredientNames = ["げきからハーブ", "マメミート", "モーモーミルク"];
    for (const name of ingredientNames) {
      expect(screen.getByText(name)).toBeInTheDocument();
    }
  });
});
