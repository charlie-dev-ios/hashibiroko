import { z } from "zod";

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
