import { z } from "zod";

export const SnorlaxRankNameSchema = z.enum([
  "ノーマル",
  "いいかんじ",
  "すごいぞ",
  "とてもすごい",
  "ハイパー",
  "マスター",
]);

export const SnorlaxRankSchema = z.object({
  rank: SnorlaxRankNameSchema,
  requiredEnergy: z.number().int().nonnegative(),
  newPokemonIds: z.array(z.number().int().positive()),
});

export const IslandSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  description: z.string(),
  specialtyBerry: z.string().min(1),
  snorlaxRanks: z.array(SnorlaxRankSchema).length(6),
  imageUrl: z.string().url().optional(),
});

export type SnorlaxRankName = z.infer<typeof SnorlaxRankNameSchema>;
export type SnorlaxRank = z.infer<typeof SnorlaxRankSchema>;
export type Island = z.infer<typeof IslandSchema>;
