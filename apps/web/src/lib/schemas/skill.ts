import { z } from "zod";

export const SkillSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  description: z.string(),
  effects: z.array(
    z.object({
      level: z.number().int().min(1).max(7),
      value: z.string(), // 例: "エネルギー量の3%"、"120"
    }),
  ),
  iconUrl: z.string().url().optional(),
});

export type Skill = z.infer<typeof SkillSchema>;
