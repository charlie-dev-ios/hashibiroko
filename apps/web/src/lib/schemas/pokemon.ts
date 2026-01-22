import { z } from "zod";

export const SleepTypeSchema = z.enum(["うとうと", "すやすや", "ぐっすり"]);
export const SpecialtySchema = z.enum(["きのみ", "食材", "スキル"]);

export const PokemonSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  nameKana: z.string().min(1).optional(), // 検索用ひらがな
  sleepType: SleepTypeSchema,
  specialty: SpecialtySchema,

  // きのみ情報
  berry: z.object({
    type: z.string(), // きのみの種類（例: "オレンのみ"）
    baseYield: z.number().positive(), // 基本収集数
  }),

  // メインスキル
  skill: z.object({
    name: z.string(),
    description: z.string(),
    maxLevel: z.number().int().positive().default(7),
  }),

  // 進化情報
  evolution: z
    .object({
      prevId: z.number().int().positive().optional(), // 進化前のポケモンID
      nextIds: z.array(z.number().int().positive()).optional(), // 進化先のポケモンID（複数可能）
      condition: z.string().optional(), // 進化条件（例: "Lv.20"、"おやつ80個"）
    })
    .optional(),

  // 出現場所
  islands: z.array(z.string()), // 出現する島の名前

  // 画像
  imageUrl: z.string().url().optional(),
  iconUrl: z.string().url().optional(),
});

export type Pokemon = z.infer<typeof PokemonSchema>;
export type SleepType = z.infer<typeof SleepTypeSchema>;
export type Specialty = z.infer<typeof SpecialtySchema>;
