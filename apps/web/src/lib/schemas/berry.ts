import { z } from "zod";
import { PokemonTypeSchema } from "./pokemon-type";

export const BerrySchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1), // 例: "オレンのみ"
  type: PokemonTypeSchema, // ポケモンタイプ
  energy: z.number().positive(), // 基礎エナジー
  description: z.string().optional(), // 説明文
  imageUrl: z.string().url().optional(),
});

export type Berry = z.infer<typeof BerrySchema>;
