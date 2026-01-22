import { z } from "zod";

export const IslandSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1), // 例: "ワカクサ本島"
  description: z.string(),
  availablePokemon: z.array(z.number().int().positive()), // ポケモンIDの配列
  imageUrl: z.string().url().optional(),
});

export type Island = z.infer<typeof IslandSchema>;
