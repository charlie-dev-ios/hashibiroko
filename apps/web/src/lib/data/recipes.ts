import fs from 'fs/promises';
import path from 'path';
import { RecipeSchema, type Recipe, type RecipeType } from '@/lib/schemas/recipe';
import { z } from 'zod';

const RECIPES_FILE = path.join(process.cwd(), 'src/content/recipes/recipes.json');

/**
 * すべての料理を取得
 */
export async function getAllRecipes(): Promise<Recipe[]> {
  const data = await fs.readFile(RECIPES_FILE, 'utf-8');
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
  const recipe = allRecipes.find(r => r.id === id);

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
  return recipe.ingredients.reduce((sum, ingredient) => sum + ingredient.quantity, 0);
}

/**
 * 料理種別でフィルタリング
 */
export function filterRecipesByType(recipes: Recipe[], type: RecipeType): Recipe[] {
  return recipes.filter(recipe => recipe.type === type);
}

/**
 * 食材でフィルタリング（AND条件: すべての食材を含む）
 */
export function filterRecipesByIngredients(recipes: Recipe[], ingredientNames: string[]): Recipe[] {
  if (ingredientNames.length === 0) {
    return recipes;
  }

  return recipes.filter(recipe => {
    const recipeIngredientNames = recipe.ingredients.map(i => i.name);
    return ingredientNames.every(name => recipeIngredientNames.includes(name));
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
 */
export function filterRecipes(recipes: Recipe[], options: FilterOptions): Recipe[] {
  let result = recipes;

  if (options.type) {
    result = filterRecipesByType(result, options.type);
  }

  if (options.ingredients && options.ingredients.length > 0) {
    result = filterRecipesByIngredients(result, options.ingredients);
  }

  return result;
}
