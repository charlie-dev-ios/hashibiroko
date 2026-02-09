import { z } from "zod";

/**
 * せいかくによって影響を受けるパラメータの種別
 */
export const NatureStatSchema = z.enum([
  "helpingSpeed",
  "ingredientRate",
  "mainSkillRate",
  "expGain",
  "energyRecovery",
]);

export type NatureStat = z.infer<typeof NatureStatSchema>;

/**
 * せいかくスキーマ
 * Pokemon Sleepのせいかくデータを表す
 */
export const NatureSchema = z.object({
  /** せいかく名 */
  name: z.string().min(1),
  /** 上昇するパラメータ */
  increasedStat: NatureStatSchema,
  /** 下降するパラメータ */
  decreasedStat: NatureStatSchema,
});

export type Nature = z.infer<typeof NatureSchema>;

/**
 * パラメータ補正効果スキーマ
 */
export const StatEffectSchema = z.object({
  /** 対象パラメータ */
  stat: NatureStatSchema,
  /** パラメータの日本語表示名 */
  label: z.string().min(1),
  /** 上昇時の効果説明 */
  increasedEffect: z.string().min(1),
  /** 下降時の効果説明 */
  decreasedEffect: z.string().min(1),
});

export type StatEffect = z.infer<typeof StatEffectSchema>;
