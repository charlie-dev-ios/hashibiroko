import { z } from "zod";

export const PokemonTypeSchema = z.enum([
  "ノーマル",
  "ほのお",
  "みず",
  "でんき",
  "くさ",
  "こおり",
  "かくとう",
  "どく",
  "じめん",
  "ひこう",
  "エスパー",
  "むし",
  "いわ",
  "ゴースト",
  "ドラゴン",
  "あく",
  "はがね",
  "フェアリー",
]);

export type PokemonType = z.infer<typeof PokemonTypeSchema>;

// タイプに対応する色（Tailwind CSS用）
export const typeColors: Record<PokemonType, string> = {
  ノーマル: "bg-gray-400",
  ほのお: "bg-orange-500",
  みず: "bg-blue-500",
  でんき: "bg-yellow-400",
  くさ: "bg-green-500",
  こおり: "bg-cyan-300",
  かくとう: "bg-red-700",
  どく: "bg-purple-500",
  じめん: "bg-amber-600",
  ひこう: "bg-indigo-300",
  エスパー: "bg-pink-500",
  むし: "bg-lime-500",
  いわ: "bg-stone-500",
  ゴースト: "bg-purple-700",
  ドラゴン: "bg-violet-600",
  あく: "bg-gray-700",
  はがね: "bg-slate-400",
  フェアリー: "bg-pink-300",
};

// タイプに対応するテキスト色（コントラスト確保用）
export const typeTextColors: Record<PokemonType, string> = {
  ノーマル: "text-white",
  ほのお: "text-white",
  みず: "text-white",
  でんき: "text-gray-900",
  くさ: "text-white",
  こおり: "text-gray-900",
  かくとう: "text-white",
  どく: "text-white",
  じめん: "text-white",
  ひこう: "text-gray-900",
  エスパー: "text-white",
  むし: "text-gray-900",
  いわ: "text-white",
  ゴースト: "text-white",
  ドラゴン: "text-white",
  あく: "text-white",
  はがね: "text-gray-900",
  フェアリー: "text-gray-900",
};
