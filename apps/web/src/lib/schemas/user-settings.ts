import { z } from "zod";
import { POT_CAPACITY_PRESETS } from "@/lib/utils/calculator";

/**
 * 睡眠リサーチランクの選択肢
 */
export const RANK_PRESETS = [
  { label: "ランク 1-10", value: 10 },
  { label: "ランク 11-20", value: 20 },
  { label: "ランク 21-30", value: 30 },
  { label: "ランク 31-40", value: 40 },
  { label: "ランク 41-50", value: 50 },
  { label: "ランク 51-60", value: 60 },
] as const;

export type RankPreset = (typeof RANK_PRESETS)[number];

/**
 * 鍋容量の値のみを抽出
 */
export const POT_CAPACITY_VALUES = POT_CAPACITY_PRESETS.map((p) => p.value) as [
  number,
  ...number[],
];

/**
 * ユーザー設定スキーマ
 */
export const UserSettingsSchema = z.object({
  /** 睡眠リサーチランク（null = 未設定） */
  rank: z.number().int().min(1).max(60).nullable(),
  /** デフォルトの鍋容量（null = 未設定） */
  potCapacity: z.number().int().positive().nullable(),
});

export type UserSettings = z.infer<typeof UserSettingsSchema>;

/**
 * デフォルトのユーザー設定
 */
export const DEFAULT_USER_SETTINGS: UserSettings = {
  rank: null,
  potCapacity: null,
};
