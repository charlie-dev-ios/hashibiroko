import { describe, expect, it } from "vitest";
import type { SelectedRecipe } from "@/lib/schemas/calculator";
import type { Recipe } from "@/lib/schemas/recipe";
import {
  calculateIngredientTotals,
  calculateTotalEnergy,
  clampQuantity,
  formatNumber,
  getGrandTotal,
  POT_CAPACITY_PRESETS,
} from "@/lib/utils/calculator";

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

describe("calculator", () => {
  describe("calculateIngredientTotals", () => {
    it("should calculate ingredient totals for a single recipe", () => {
      const selectedRecipes: SelectedRecipe[] = [{ recipeId: 1, quantity: 1 }];
      const totals = calculateIngredientTotals(selectedRecipes, mockRecipes);
      expect(totals).toHaveLength(1);
      expect(totals[0]).toEqual({ name: "あまいミツ", totalQuantity: 7 });
    });

    it("should multiply by quantity", () => {
      const selectedRecipes: SelectedRecipe[] = [{ recipeId: 2, quantity: 3 }];
      const totals = calculateIngredientTotals(selectedRecipes, mockRecipes);
      expect(totals).toHaveLength(2);
      const mameTotal = totals.find((t) => t.name === "マメミート");
      expect(mameTotal?.totalQuantity).toBe(21); // 7 * 3
    });

    it("should aggregate same ingredients from different recipes", () => {
      const selectedRecipes: SelectedRecipe[] = [
        { recipeId: 2, quantity: 1 }, // マメミート: 7
        { recipeId: 3, quantity: 1 }, // マメミート: 9
      ];
      const totals = calculateIngredientTotals(selectedRecipes, mockRecipes);
      const mameTotal = totals.find((t) => t.name === "マメミート");
      expect(mameTotal?.totalQuantity).toBe(16); // 7 + 9
    });

    it("should return empty array when no recipes selected", () => {
      const totals = calculateIngredientTotals([], mockRecipes);
      expect(totals).toHaveLength(0);
    });
  });

  describe("getGrandTotal", () => {
    it("should sum all ingredient totals", () => {
      const totals = [
        { name: "マメミート", totalQuantity: 10 },
        { name: "あまいミツ", totalQuantity: 5 },
      ];
      expect(getGrandTotal(totals)).toBe(15);
    });

    it("should return 0 for empty array", () => {
      expect(getGrandTotal([])).toBe(0);
    });
  });

  describe("clampQuantity", () => {
    it("should return value within 1-99 range", () => {
      expect(clampQuantity(5)).toBe(5);
      expect(clampQuantity(50)).toBe(50);
    });

    it("should clamp value to minimum 1", () => {
      expect(clampQuantity(0)).toBe(1);
      expect(clampQuantity(-5)).toBe(1);
    });

    it("should clamp value to maximum 99", () => {
      expect(clampQuantity(100)).toBe(99);
      expect(clampQuantity(999)).toBe(99);
    });

    it("should round decimal values", () => {
      expect(clampQuantity(5.7)).toBe(6);
      expect(clampQuantity(5.3)).toBe(5);
    });
  });

  describe("calculateTotalEnergy", () => {
    it("should calculate total energy for a single recipe", () => {
      const selectedRecipes: SelectedRecipe[] = [{ recipeId: 1, quantity: 1 }];
      const total = calculateTotalEnergy(selectedRecipes, mockRecipes);
      expect(total).toBe(85);
    });

    it("should multiply energy by quantity", () => {
      const selectedRecipes: SelectedRecipe[] = [{ recipeId: 2, quantity: 3 }];
      const total = calculateTotalEnergy(selectedRecipes, mockRecipes);
      expect(total).toBe(4680); // 1560 * 3
    });

    it("should sum energy from multiple recipes", () => {
      const selectedRecipes: SelectedRecipe[] = [
        { recipeId: 1, quantity: 1 }, // 85
        { recipeId: 2, quantity: 2 }, // 1560 * 2 = 3120
      ];
      const total = calculateTotalEnergy(selectedRecipes, mockRecipes);
      expect(total).toBe(3205); // 85 + 3120
    });

    it("should return 0 when no recipes selected", () => {
      const total = calculateTotalEnergy([], mockRecipes);
      expect(total).toBe(0);
    });

    it("should handle recipes with 0 energy", () => {
      const selectedRecipes: SelectedRecipe[] = [{ recipeId: 4, quantity: 1 }];
      const total = calculateTotalEnergy(selectedRecipes, mockRecipes);
      expect(total).toBe(0);
    });

    it("should skip non-existent recipes", () => {
      const selectedRecipes: SelectedRecipe[] = [
        { recipeId: 999, quantity: 1 },
      ];
      const total = calculateTotalEnergy(selectedRecipes, mockRecipes);
      expect(total).toBe(0);
    });
  });

  describe("POT_CAPACITY_PRESETS", () => {
    it("should have correct preset values", () => {
      expect(POT_CAPACITY_PRESETS).toBeDefined();
      expect(POT_CAPACITY_PRESETS.length).toBeGreaterThan(0);
    });

    it("should have Lv.1 with value 15", () => {
      const lv1 = POT_CAPACITY_PRESETS.find((p) => p.label === "Lv.1");
      expect(lv1?.value).toBe(15);
    });

    it("should have Lv.8 with value 57", () => {
      const lv8 = POT_CAPACITY_PRESETS.find((p) => p.label === "Lv.8");
      expect(lv8?.value).toBe(57);
    });

    it("should have presets in ascending order", () => {
      for (let i = 1; i < POT_CAPACITY_PRESETS.length; i++) {
        expect(POT_CAPACITY_PRESETS[i].value).toBeGreaterThan(
          POT_CAPACITY_PRESETS[i - 1].value,
        );
      }
    });
  });

  describe("formatNumber", () => {
    it("should format numbers with comma separators", () => {
      expect(formatNumber(1000)).toBe("1,000");
      expect(formatNumber(1234567)).toBe("1,234,567");
    });

    it("should not add commas to small numbers", () => {
      expect(formatNumber(100)).toBe("100");
      expect(formatNumber(999)).toBe("999");
    });

    it("should handle zero", () => {
      expect(formatNumber(0)).toBe("0");
    });
  });
});
