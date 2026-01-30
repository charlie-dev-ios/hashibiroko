/**
 * 鍋容量プリセット定義
 * ポケモンスリープの鍋レベルに対応
 */

export interface PotCapacityPreset {
  level: number;
  capacity: number;
  label: string;
}

export const POT_CAPACITY_PRESETS: PotCapacityPreset[] = [
  { level: 1, capacity: 15, label: "Lv.1 (15)" },
  { level: 2, capacity: 21, label: "Lv.2 (21)" },
  { level: 3, capacity: 27, label: "Lv.3 (27)" },
  { level: 4, capacity: 33, label: "Lv.4 (33)" },
  { level: 5, capacity: 39, label: "Lv.5 (39)" },
  { level: 6, capacity: 45, label: "Lv.6 (45)" },
  { level: 7, capacity: 51, label: "Lv.7 (51)" },
  { level: 8, capacity: 57, label: "Lv.8 (57)" },
];
