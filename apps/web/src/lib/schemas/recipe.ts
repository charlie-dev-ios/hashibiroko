import { z } from 'zod';

export const RecipeTypeSchema = z.enum(['カレー', 'サラダ', 'デザート', 'ドリンク']);

export const RecipeSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1), // 例: "とくせんリンゴジュース"
  type: RecipeTypeSchema,
  power: z.number().positive(), // 料理パワー
  ingredients: z.array(z.object({
    name: z.string(),
    quantity: z.number().int().positive(),
  })),
  effect: z.string(), // 効果説明
  imageUrl: z.string().optional(), // 相対パスまたはURL
});

export type Recipe = z.infer<typeof RecipeSchema>;
export type RecipeType = z.infer<typeof RecipeTypeSchema>;
