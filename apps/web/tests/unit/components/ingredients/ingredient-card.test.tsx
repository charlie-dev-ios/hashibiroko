import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import IngredientCard from "@/components/ingredients/ingredient-card";

describe("IngredientCard", () => {
  const mockIngredient = {
    id: 1,
    name: "げきからハーブ",
    energy: 130,
  };

  it("should render ingredient name", () => {
    render(<IngredientCard ingredient={mockIngredient} />);
    expect(screen.getByText("げきからハーブ")).toBeInTheDocument();
  });

  it("should render energy value", () => {
    render(<IngredientCard ingredient={mockIngredient} />);
    expect(screen.getByText(/130/)).toBeInTheDocument();
  });
});
