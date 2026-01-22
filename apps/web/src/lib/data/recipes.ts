import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import {
  type Recipe,
  RecipeSchema,
  type RecipeType,
} from "@/lib/schemas/recipe";

const RECIPES_FILE = path.join(
  process.cwd(),
  "src/content/recipes/recipes.json",
);

/**
 * すべての料理を取得
 */
export async function getAllRecipes(): Promise<Recipe[]> {
  const data = await fs.readFile(RECIPES_FILE, "utf-8");
  const parsed = JSON.parse(data);

  const result = z.array(RecipeSchema).safeParse(parsed.recipes);

  if (!result.success) {
    throw new Error(`Recipe data validation failed: ${result.error.message}`);
  }

  return result.data;
}

/**
 * IDで料理を取得
 */
export async function getRecipeById(id: number): Promise<Recipe | null> {
  const allRecipes = await getAllRecipes();
  const recipe = allRecipes.find((r) => r.id === id);

  return recipe || null;
}

/**
 * 料理から食材のユニークリストを抽出
 */
export function extractIngredients(recipes: Recipe[]): string[] {
  const ingredientSet = new Set<string>();

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      ingredientSet.add(ingredient.name);
    });
  });

  return Array.from(ingredientSet).sort();
}

/**
 * 料理の必要食材総数を計算
 */
export function getTotalIngredientCount(recipe: Recipe): number {
  return recipe.ingredients.reduce(
    (sum, ingredient) => sum + ingredient.quantity,
    0,
  );
}

/**
 * 料理種別でフィルタリング
 */
export function filterRecipesByType(
  recipes: Recipe[],
  type: RecipeType,
): Recipe[] {
  return recipes.filter((recipe) => recipe.type === type);
}

/**
 * 食材でフィルタリング（AND条件: すべての食材を含む）
 * @param recipes フィルター対象の料理リスト
 * @param ingredientNames 検索する食材名のリスト
 * @returns 指定されたすべての食材を含む料理のみを返す
 */
export function filterRecipesByIngredients(
  recipes: Recipe[],
  ingredientNames: string[],
): Recipe[] {
  // 食材が指定されていない場合は全レシピを返す
  if (ingredientNames.length === 0) {
    return recipes;
  }

  return recipes.filter((recipe) => {
    // 料理に含まれる食材名をリストアップ
    const recipeIngredientNames = recipe.ingredients.map((i) => i.name);
    // 指定されたすべての食材が料理に含まれているかチェック (AND条件)
    return ingredientNames.every((name) =>
      recipeIngredientNames.includes(name),
    );
  });
}

/**
 * フィルターオプション
 */
export interface FilterOptions {
  type?: RecipeType;
  ingredients?: string[];
}

/**
 * 複合フィルター（種別 + 食材）
 * @param recipes フィルター対象の料理リスト
 * @param options フィルターオプション（種別、食材）
 * @returns フィルター条件に一致する料理のリスト
 */
export function filterRecipes(
  recipes: Recipe[],
  options: FilterOptions,
): Recipe[] {
  let result = recipes;

  // 種別フィルターが指定されている場合、まず種別で絞り込む
  if (options.type) {
    result = filterRecipesByType(result, options.type);
  }

  // 食材フィルターが指定されている場合、さらに食材で絞り込む（AND条件）
  if (options.ingredients && options.ingredients.length > 0) {
    result = filterRecipesByIngredients(result, options.ingredients);
  }

  return result;
}
