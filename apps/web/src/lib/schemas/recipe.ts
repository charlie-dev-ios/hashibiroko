import { z } from "zod";

export const RecipeTypeSchema = z.enum([
  "カレー",
  "サラダ",
  "デザート",
  "ドリンク",
]);

export const RecipeSchema = z
  .object({
    id: z.number().int().positive(),
    name: z.string(), // 例: "とくせんリンゴジュース"
    type: RecipeTypeSchema,
    ingredientCount: z.number().int().nonnegative(), // 食材の総数
    energy: z.number().int().nonnegative(), // 料理パワー（0も許容）
    ingredients: z.array(
      z.object({
        name: z.string(),
        quantity: z.number().int().positive(),
      }),
    ),
    imageUrl: z.string().optional(), // 相対パスまたはURL（任意）
    effect: z.string().optional(), // 料理の効果（任意）
  })
  .transform((data) => ({
    ...data,
    power: data.energy, // powerはenergyのエイリアス
  }));

export type Recipe = z.infer<typeof RecipeSchema>;
export type RecipeType = z.infer<typeof RecipeTypeSchema>;
