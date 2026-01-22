import type { Recipe } from "@/lib/schemas/recipe";

/**
 * 料理の必要食材総数を計算
 * クライアントサイドで安全に使用可能
 */
export function getTotalIngredientCount(recipe: Recipe): number {
  return recipe.ingredients.reduce(
    (sum, ingredient) => sum + ingredient.quantity,
    0,
  );
}

/**
 * 料理から食材のユニークリストを抽出
 * クライアントサイドで安全に使用可能
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
 * 食材でフィルタリング（AND条件: すべての食材を含む）
 * クライアントサイドで安全に使用可能
 */
export function filterRecipesByIngredients(
  recipes: Recipe[],
  ingredientNames: string[],
): Recipe[] {
  if (ingredientNames.length === 0) {
    return recipes;
  }

  return recipes.filter((recipe) => {
    const recipeIngredientNames = recipe.ingredients.map((i) => i.name);
    return ingredientNames.every((name) =>
      recipeIngredientNames.includes(name),
    );
  });
}
