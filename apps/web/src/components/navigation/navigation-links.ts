import type { LucideIcon } from "lucide-react";
import {
  Calculator,
  Cat,
  ChefHat,
  Cherry,
  Egg,
  Home,
  Map as MapIcon,
  Users,
} from "lucide-react";

export interface NavigationLink {
  /** 表示ラベル */
  title: string;
  /** 遷移先パス */
  href: string;
  /** 説明文 */
  description: string;
  /** アイコンコンポーネント */
  icon: LucideIcon;
}

export const navigationLinks: NavigationLink[] = [
  {
    title: "ホーム",
    href: "/",
    description: "トップページ",
    icon: Home,
  },
  {
    title: "フィールド",
    href: "/islands",
    description: "各フィールドの特徴とポケモン出現情報",
    icon: MapIcon,
  },
  {
    title: "ポケモン",
    href: "/pokemon",
    description: "ポケモンの詳細情報を検索・閲覧",
    icon: Cat,
  },
  {
    title: "きのみ",
    href: "/berries",
    description: "きのみの種類と効果",
    icon: Cherry,
  },
  {
    title: "食材",
    href: "/ingredients",
    description: "食材の入手方法と使い道",
    icon: Egg,
  },
  {
    title: "料理",
    href: "/recipes",
    description: "レシピときのみの詳細データ",
    icon: ChefHat,
  },
  {
    title: "食材計算機",
    href: "/calculator",
    description: "レシピから必要な食材の合計を計算",
    icon: Calculator,
  },
  {
    title: "チーム編成",
    href: "/teams",
    description: "最適なポケモンチーム編成ガイド",
    icon: Users,
  },
];
