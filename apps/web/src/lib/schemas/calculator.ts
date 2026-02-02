import { z } from "zod";

/**
 * 選択されたレシピと数量
 */
export const SelectedRecipeSchema = z.object({
  recipeId: z.number().int().positive(),
  quantity: z.number().int().min(1).max(99),
});

export type SelectedRecipe = z.infer<typeof SelectedRecipeSchema>;

/**
 * 食材合計（計算結果）
 */
export const IngredientTotalSchema = z.object({
  name: z.string().min(1),
  totalQuantity: z.number().int().nonnegative(),
});

export type IngredientTotal = z.infer<typeof IngredientTotalSchema>;
