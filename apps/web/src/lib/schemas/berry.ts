import { z } from "zod";

export const BerrySchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1), // 例: "オレンのみ"
  energy: z.number().positive(), // エネルギー値
  description: z.string().optional(), // 説明文
  imageUrl: z.string().url().optional(),
});

export type Berry = z.infer<typeof BerrySchema>;
