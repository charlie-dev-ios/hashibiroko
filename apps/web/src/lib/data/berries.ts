import type { Berry } from "../schemas/berry";

/**
 * ポケモンスリープのきのみデータ
 * 各ポケモンタイプに1種類ずつ、計18種類
 * 基礎エナジーはゲーム内では確認できない値
 */
export const berries: Berry[] = [
  {
    id: 1,
    name: "キーのみ",
    type: "ノーマル",
    energy: 25,
  },
  {
    id: 2,
    name: "ヒメリのみ",
    type: "ほのお",
    energy: 27,
  },
  {
    id: 3,
    name: "オレンのみ",
    type: "みず",
    energy: 31,
  },
  {
    id: 4,
    name: "ウブのみ",
    type: "でんき",
    energy: 25,
  },
  {
    id: 5,
    name: "フィラのみ",
    type: "くさ",
    energy: 30,
  },
  {
    id: 6,
    name: "マゴのみ",
    type: "こおり",
    energy: 32,
  },
  {
    id: 7,
    name: "ドリのみ",
    type: "かくとう",
    energy: 30,
  },
  {
    id: 8,
    name: "チーゴのみ",
    type: "どく",
    energy: 26,
  },
  {
    id: 9,
    name: "クラボのみ",
    type: "じめん",
    energy: 28,
  },
  {
    id: 10,
    name: "カゴのみ",
    type: "ひこう",
    energy: 26,
  },
  {
    id: 11,
    name: "シーヤのみ",
    type: "エスパー",
    energy: 28,
  },
  {
    id: 12,
    name: "ラムのみ",
    type: "むし",
    energy: 26,
  },
  {
    id: 13,
    name: "オボンのみ",
    type: "いわ",
    energy: 30,
  },
  {
    id: 14,
    name: "ブリーのみ",
    type: "ゴースト",
    energy: 33,
  },
  {
    id: 15,
    name: "ヤチェのみ",
    type: "ドラゴン",
    energy: 35,
  },
  {
    id: 16,
    name: "ベリブのみ",
    type: "あく",
    energy: 33,
  },
  {
    id: 17,
    name: "モモンのみ",
    type: "はがね",
    energy: 27,
  },
  {
    id: 18,
    name: "リリバのみ",
    type: "フェアリー",
    energy: 30,
  },
];

/**
 * IDからきのみを取得
 */
export function getBerryById(id: number): Berry | undefined {
  return berries.find((berry) => berry.id === id);
}

/**
 * タイプからきのみを取得
 */
export function getBerryByType(type: Berry["type"]): Berry | undefined {
  return berries.find((berry) => berry.type === type);
}
