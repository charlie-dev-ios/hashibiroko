import { describe, expect, it } from "vitest";
import {
  extractIngredients,
  filterRecipes,
  filterRecipesByIngredients,
  filterRecipesByType,
  getAllRecipes,
  getRecipeById,
  getTotalIngredientCount,
} from "@/lib/data/recipes";

describe("Recipe Data API", () => {
  describe("getAllRecipes", () => {
    it("should return all recipes", async () => {
      const recipes = await getAllRecipes();
      expect(recipes).toBeInstanceOf(Array);
      expect(recipes.length).toBeGreaterThan(0);
    });

    it("should validate recipe data with Zod schema", async () => {
      const recipes = await getAllRecipes();
      recipes.forEach((recipe) => {
        expect(recipe).toHaveProperty("id");
        expect(recipe).toHaveProperty("name");
        expect(recipe).toHaveProperty("type");
        expect(recipe).toHaveProperty("power");
        expect(recipe).toHaveProperty("ingredients");
        // effect is optional
      });
    });

    it("should return recipes with valid types", async () => {
      const recipes = await getAllRecipes();
      const validTypes = ["カレー", "サラダ", "デザート", "ドリンク"];
      recipes.forEach((recipe) => {
        expect(validTypes).toContain(recipe.type);
      });
    });
  });

  describe("getRecipeById", () => {
    it("should return a recipe by id", async () => {
      const recipe = await getRecipeById(1);
      expect(recipe).not.toBeNull();
      expect(recipe?.id).toBe(1);
      expect(recipe?.name).toBe("しんりょくアボカドグラタン");
    });

    it("should return null for non-existent id", async () => {
      const recipe = await getRecipeById(9999);
      expect(recipe).toBeNull();
    });

    it("should return recipe with complete data structure", async () => {
      const recipe = await getRecipeById(2);
      expect(recipe).not.toBeNull();
      expect(recipe?.name).toBe("いあいぎりすき焼きカレー");
      expect(recipe?.type).toBe("カレー");
      expect(recipe?.power).toBe(20655);
      expect(recipe?.ingredients.length).toBeGreaterThan(0);
    });
  });

  describe("extractIngredients", () => {
    it("should extract unique ingredient names from recipes", async () => {
      const recipes = await getAllRecipes();
      const ingredients = extractIngredients(recipes);

      expect(ingredients).toBeInstanceOf(Array);
      expect(ingredients.length).toBeGreaterThan(0);
      // Should be unique
      expect(new Set(ingredients).size).toBe(ingredients.length);
    });

    it("should include common ingredients like あまいミツ", async () => {
      const recipes = await getAllRecipes();
      const ingredients = extractIngredients(recipes);

      expect(ingredients).toContain("あまいミツ");
    });
  });

  describe("getTotalIngredientCount", () => {
    it("should calculate total ingredient count correctly", async () => {
      const recipe = await getRecipeById(2); // いあいぎりすき焼きカレー: 27+26+26+22 = 101
      expect(recipe).not.toBeNull();

      const total = getTotalIngredientCount(recipe!);
      expect(total).toBe(101);
    });

    it("should handle single ingredient recipe", async () => {
      const recipe = await getRecipeById(1); // しんりょくアボカドグラタン: 22+20+41+32 = 115
      expect(recipe).not.toBeNull();

      const total = getTotalIngredientCount(recipe!);
      expect(total).toBe(115);
    });
  });

  describe("filterRecipesByType", () => {
    it("should filter recipes by カレー type", async () => {
      const recipes = await getAllRecipes();
      const filtered = filterRecipesByType(recipes, "カレー");

      expect(filtered.length).toBeGreaterThan(0);
      filtered.forEach((recipe) => {
        expect(recipe.type).toBe("カレー");
      });
    });

    it("should filter recipes by サラダ type", async () => {
      const recipes = await getAllRecipes();
      const filtered = filterRecipesByType(recipes, "サラダ");

      expect(filtered.length).toBeGreaterThan(0);
      filtered.forEach((recipe) => {
        expect(recipe.type).toBe("サラダ");
      });
    });

    it("should filter recipes by デザート type", async () => {
      const recipes = await getAllRecipes();
      const filtered = filterRecipesByType(recipes, "デザート");

      expect(filtered.length).toBeGreaterThan(0);
      filtered.forEach((recipe) => {
        expect(recipe.type).toBe("デザート");
      });
    });
  });

  describe("filterRecipesByIngredients", () => {
    it("should filter recipes containing a single ingredient", async () => {
      const recipes = await getAllRecipes();
      const filtered = filterRecipesByIngredients(recipes, ["あまいミツ"]);

      expect(filtered.length).toBeGreaterThan(0);
      filtered.forEach((recipe) => {
        const ingredientNames = recipe.ingredients.map((i) => i.name);
        expect(ingredientNames).toContain("あまいミツ");
      });
    });

    it("should filter recipes containing multiple ingredients (AND condition)", async () => {
      const recipes = await getAllRecipes();
      const filtered = filterRecipesByIngredients(recipes, [
        "あまいミツ",
        "マメミート",
      ]);

      expect(filtered.length).toBeGreaterThan(0);
      filtered.forEach((recipe) => {
        const ingredientNames = recipe.ingredients.map((i) => i.name);
        expect(ingredientNames).toContain("あまいミツ");
        expect(ingredientNames).toContain("マメミート");
      });
    });

    it("should return empty array when no recipes match", async () => {
      const recipes = await getAllRecipes();
      const filtered = filterRecipesByIngredients(recipes, ["存在しない食材"]);

      expect(filtered).toEqual([]);
    });
  });

  describe("filterRecipes", () => {
    it("should return all recipes when no filters applied", async () => {
      const recipes = await getAllRecipes();
      const filtered = filterRecipes(recipes, {});

      expect(filtered.length).toBe(recipes.length);
    });

    it("should filter by type only", async () => {
      const recipes = await getAllRecipes();
      const filtered = filterRecipes(recipes, { type: "カレー" });

      expect(filtered.length).toBeGreaterThan(0);
      filtered.forEach((recipe) => {
        expect(recipe.type).toBe("カレー");
      });
    });

    it("should filter by ingredients only", async () => {
      const recipes = await getAllRecipes();
      const filtered = filterRecipes(recipes, { ingredients: ["あまいミツ"] });

      expect(filtered.length).toBeGreaterThan(0);
      filtered.forEach((recipe) => {
        const ingredientNames = recipe.ingredients.map((i) => i.name);
        expect(ingredientNames).toContain("あまいミツ");
      });
    });

    it("should filter by both type and ingredients", async () => {
      const recipes = await getAllRecipes();
      const filtered = filterRecipes(recipes, {
        type: "サラダ",
        ingredients: ["あまいミツ"],
      });

      expect(filtered.length).toBeGreaterThan(0);
      filtered.forEach((recipe) => {
        expect(recipe.type).toBe("サラダ");
        const ingredientNames = recipe.ingredients.map((i) => i.name);
        expect(ingredientNames).toContain("あまいミツ");
      });
    });
  });
});
