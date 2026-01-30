import { describe, expect, it } from "vitest";
import type { Recipe } from "@/lib/schemas/recipe";
import {
  extractIngredients,
  filterRecipesByIngredients,
  filterRecipesByPotCapacity,
  getTotalIngredientCount,
} from "@/lib/utils/recipe-utils";

// テスト用モックデータ
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
  {
    id: 4,
    name: "ごちゃまぜカレー",
    type: "カレー",
    ingredientCount: 0,
    energy: 0,
    power: 0,
    ingredients: [],
  },
];

describe("recipe-utils", () => {
  describe("getTotalIngredientCount", () => {
    it("should calculate total ingredient count correctly", () => {
      const recipe = mockRecipes[1]; // マメバーグカレー: 7+4 = 11
      const total = getTotalIngredientCount(recipe);
      expect(total).toBe(11);
    });

    it("should return 0 for recipe with no ingredients", () => {
      const recipe = mockRecipes[3]; // ごちゃまぜカレー
      const total = getTotalIngredientCount(recipe);
      expect(total).toBe(0);
    });
  });

  describe("extractIngredients", () => {
    it("should extract unique ingredient names", () => {
      const ingredients = extractIngredients(mockRecipes);
      expect(ingredients).toContain("あまいミツ");
      expect(ingredients).toContain("マメミート");
      // 重複がないことを確認
      expect(new Set(ingredients).size).toBe(ingredients.length);
    });

    it("should return empty array for empty recipes", () => {
      const ingredients = extractIngredients([]);
      expect(ingredients).toEqual([]);
    });
  });

  describe("filterRecipesByIngredients", () => {
    it("should filter recipes containing specified ingredient", () => {
      const filtered = filterRecipesByIngredients(mockRecipes, ["マメミート"]);
      expect(filtered.length).toBe(2);
      expect(filtered.map((r) => r.name)).toContain("マメバーグカレー");
      expect(filtered.map((r) => r.name)).toContain("ニンジャカレー");
    });

    it("should return all recipes when no ingredients specified", () => {
      const filtered = filterRecipesByIngredients(mockRecipes, []);
      expect(filtered.length).toBe(mockRecipes.length);
    });
  });

  describe("filterRecipesByPotCapacity", () => {
    it("should return all recipes when potCapacity is null", () => {
      const filtered = filterRecipesByPotCapacity(mockRecipes, null);
      expect(filtered.length).toBe(mockRecipes.length);
    });

    it("should return all recipes when potCapacity is 0", () => {
      const filtered = filterRecipesByPotCapacity(mockRecipes, 0);
      expect(filtered.length).toBe(mockRecipes.length);
    });

    it("should return all recipes when potCapacity is negative", () => {
      const filtered = filterRecipesByPotCapacity(mockRecipes, -10);
      expect(filtered.length).toBe(mockRecipes.length);
    });

    it("should filter recipes by pot capacity", () => {
      const filtered = filterRecipesByPotCapacity(mockRecipes, 10);
      expect(filtered.length).toBe(2); // ingredientCount 7 と 0
      expect(filtered.map((r) => r.name)).toContain("とくせんリンゴジュース");
      expect(filtered.map((r) => r.name)).toContain("ごちゃまぜカレー");
    });

    it("should include recipes with exact pot capacity match", () => {
      const filtered = filterRecipesByPotCapacity(mockRecipes, 11);
      expect(filtered.length).toBe(3); // ingredientCount 7, 11, 0
      expect(filtered.map((r) => r.name)).toContain("マメバーグカレー");
    });

    it("should return only recipes with ingredientCount=0 when potCapacity is very small", () => {
      const filtered = filterRecipesByPotCapacity(mockRecipes, 1);
      expect(filtered.length).toBe(1);
      expect(filtered[0].name).toBe("ごちゃまぜカレー");
    });

    it("should return all recipes when potCapacity is very large", () => {
      const filtered = filterRecipesByPotCapacity(mockRecipes, 999);
      expect(filtered.length).toBe(mockRecipes.length);
    });

    it("should handle empty recipes array", () => {
      const filtered = filterRecipesByPotCapacity([], 50);
      expect(filtered).toEqual([]);
    });
  });
});
