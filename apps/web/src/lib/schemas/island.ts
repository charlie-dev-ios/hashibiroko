import { z } from "zod";

export const SnorlaxRankTierSchema = z.enum([
  "ノーマル",
  "スーパー",
  "ハイパー",
  "マスター",
]);

export const SnorlaxRankSchema = z.object({
  rankTier: SnorlaxRankTierSchema,
  rankNumber: z.number().int().positive(),
  requiredEnergy: z.number().int().nonnegative(),
  dreamShards: z.number().int().nonnegative(),
  newPokemonIds: z.array(z.number().int().positive()),
});

export const IslandSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  description: z.string(),
  specialtyBerries: z.array(z.string().min(1)).min(1),
  snorlaxRanks: z.array(SnorlaxRankSchema).length(35),
  imageUrl: z.string().url().optional(),
});

export type SnorlaxRankTier = z.infer<typeof SnorlaxRankTierSchema>;
export type SnorlaxRank = z.infer<typeof SnorlaxRankSchema>;
export type Island = z.infer<typeof IslandSchema>;
