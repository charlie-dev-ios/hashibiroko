import type { IngredientTotal, SelectedRecipe } from "@/lib/schemas/calculator";
import type { Recipe } from "@/lib/schemas/recipe";

/**
 * 鍋容量プリセット（ポケモンスリープの標準的な鍋サイズ）
 */
export const POT_CAPACITY_PRESETS = [
  { label: "Lv.1", value: 15 },
  { label: "Lv.2", value: 21 },
  { label: "Lv.3", value: 27 },
  { label: "Lv.4", value: 33 },
  { label: "Lv.5", value: 39 },
  { label: "Lv.6", value: 45 },
  { label: "Lv.7", value: 51 },
  { label: "Lv.8", value: 57 },
] as const;

export type PotCapacityPreset = (typeof POT_CAPACITY_PRESETS)[number];

/**
 * 選択されたレシピから必要食材の合計を計算
 * @param selectedRecipes 選択されたレシピと数量の配列
 * @param allRecipes 全レシピデータ
 * @returns 食材ごとの合計数（数量の多い順）
 */
export function calculateIngredientTotals(
  selectedRecipes: SelectedRecipe[],
  allRecipes: Recipe[],
): IngredientTotal[] {
  const ingredientMap = new Map<string, number>();

  for (const selected of selectedRecipes) {
    const recipe = allRecipes.find((r) => r.id === selected.recipeId);
    if (!recipe) continue;

    for (const ingredient of recipe.ingredients) {
      const current = ingredientMap.get(ingredient.name) || 0;
      ingredientMap.set(
        ingredient.name,
        current + ingredient.quantity * selected.quantity,
      );
    }
  }

  return Array.from(ingredientMap.entries())
    .map(([name, totalQuantity]) => ({ name, totalQuantity }))
    .sort((a, b) => b.totalQuantity - a.totalQuantity);
}

/**
 * 食材合計の総数を計算
 * @param totals 食材合計配列
 * @returns 全食材の総数
 */
export function getGrandTotal(totals: IngredientTotal[]): number {
  return totals.reduce((sum, item) => sum + item.totalQuantity, 0);
}

/**
 * 数量を有効範囲に制限
 * @param value 入力値
 * @returns 1〜99の範囲に制限された値
 */
export function clampQuantity(value: number): number {
  return Math.max(1, Math.min(99, Math.round(value)));
}

/**
 * 選択されたレシピの合計エナジー（料理パワー）を計算
 * @param selectedRecipes 選択されたレシピと数量の配列
 * @param allRecipes 全レシピデータ
 * @returns 合計エナジー
 */
export function calculateTotalEnergy(
  selectedRecipes: SelectedRecipe[],
  allRecipes: Recipe[],
): number {
  return selectedRecipes.reduce((total, selected) => {
    const recipe = allRecipes.find((r) => r.id === selected.recipeId);
    if (!recipe) return total;
    return total + recipe.energy * selected.quantity;
  }, 0);
}

/**
 * 数値をカンマ区切りでフォーマット
 * @param value 数値
 * @returns カンマ区切りの文字列
 */
export function formatNumber(value: number): string {
  return value.toLocaleString("ja-JP");
}
