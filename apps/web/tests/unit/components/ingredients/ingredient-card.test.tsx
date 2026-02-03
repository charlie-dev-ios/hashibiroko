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

  it("should render energy label", () => {
    render(<IngredientCard ingredient={mockIngredient} />);
    expect(screen.getByText(/エナジー/)).toBeInTheDocument();
  });

  it("should handle zero energy ingredients", () => {
    const zeroEnergyIngredient = {
      id: 16,
      name: "ゆめのかけら",
      energy: 0,
    };
    render(<IngredientCard ingredient={zeroEnergyIngredient} />);
    expect(screen.getByText("ゆめのかけら")).toBeInTheDocument();
    expect(screen.getByText(/0/)).toBeInTheDocument();
  });
});
