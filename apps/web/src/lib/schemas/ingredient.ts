import { z } from "zod";

/**
 * 食材スキーマ
 * Pokemon Sleepの食材データを表す
 */
export const IngredientSchema = z.object({
  /** 一意識別子 */
  id: z.number().int().positive(),
  /** 食材名 */
  name: z.string().min(1),
  /** 基本エナジー値 */
  energy: z.number().int().nonnegative(),
  /** アイコン画像のパス（オプション） */
  imageUrl: z.string().optional(),
});

export type Ingredient = z.infer<typeof IngredientSchema>;
