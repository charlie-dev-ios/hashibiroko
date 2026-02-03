import { describe, expect, it } from "vitest";
import { getAllIngredients, getIngredientByName } from "@/lib/data/ingredients";

describe("getAllIngredients", () => {
  it("should return an array of ingredients", async () => {
    const ingredients = await getAllIngredients();
    expect(Array.isArray(ingredients)).toBe(true);
    expect(ingredients.length).toBeGreaterThan(0);
  });

  it("should return ingredients with required fields", async () => {
    const ingredients = await getAllIngredients();
    for (const ingredient of ingredients) {
      expect(ingredient).toHaveProperty("id");
      expect(ingredient).toHaveProperty("name");
      expect(ingredient).toHaveProperty("energy");
      expect(typeof ingredient.id).toBe("number");
      expect(typeof ingredient.name).toBe("string");
      expect(typeof ingredient.energy).toBe("number");
    }
  });

  it("should include known ingredients", async () => {
    const ingredients = await getAllIngredients();
    const names = ingredients.map((i) => i.name);

    expect(names).toContain("げきからハーブ");
    expect(names).toContain("マメミート");
    expect(names).toContain("モーモーミルク");
  });
});

describe("getIngredientByName", () => {
  it("should return an ingredient by name", async () => {
    const ingredient = await getIngredientByName("げきからハーブ");
    expect(ingredient).not.toBeNull();
    expect(ingredient?.name).toBe("げきからハーブ");
    expect(ingredient?.energy).toBe(130);
  });

  it("should return null for non-existent ingredient", async () => {
    const ingredient = await getIngredientByName("存在しない食材");
    expect(ingredient).toBeNull();
  });
});
