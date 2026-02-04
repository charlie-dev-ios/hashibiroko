import { describe, expect, it } from "vitest";
import { IngredientSchema } from "@/lib/schemas/ingredient";

describe("IngredientSchema", () => {
  it("should validate a valid ingredient", () => {
    const validIngredient = {
      id: 1,
      name: "げきからハーブ",
      energy: 130,
    };

    const result = IngredientSchema.parse(validIngredient);
    expect(result).toEqual(validIngredient);
  });

  it("should validate an ingredient with optional imageUrl", () => {
    const ingredientWithImage = {
      id: 1,
      name: "げきからハーブ",
      energy: 130,
      imageUrl: "/images/ingredients/herb.png",
    };

    const result = IngredientSchema.parse(ingredientWithImage);
    expect(result.imageUrl).toBe("/images/ingredients/herb.png");
  });

  it("should reject an ingredient with negative id", () => {
    const invalidIngredient = {
      id: -1,
      name: "げきからハーブ",
      energy: 130,
    };

    expect(() => IngredientSchema.parse(invalidIngredient)).toThrow();
  });

  it("should reject an ingredient with empty name", () => {
    const invalidIngredient = {
      id: 1,
      name: "",
      energy: 130,
    };

    expect(() => IngredientSchema.parse(invalidIngredient)).toThrow();
  });

  it("should reject an ingredient with negative energy", () => {
    const invalidIngredient = {
      id: 1,
      name: "げきからハーブ",
      energy: -10,
    };

    expect(() => IngredientSchema.parse(invalidIngredient)).toThrow();
  });
});
