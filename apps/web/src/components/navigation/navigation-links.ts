import type { LucideIcon } from "lucide-react";
import {
  Cat,
  ChefHat,
  Home,
  Map as MapIcon,
  Moon,
  Settings,
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
    title: "ポケモン図鑑",
    href: "/pokemon",
    description: "ポケモンの詳細情報を検索・閲覧",
    icon: Cat,
  },
  {
    title: "料理情報",
    href: "/recipes",
    description: "レシピときのみの詳細データ",
    icon: ChefHat,
  },
  {
    title: "島ガイド",
    href: "/islands",
    description: "各フィールドの特徴とポケモン出現情報",
    icon: MapIcon,
  },
  {
    title: "睡眠戦略",
    href: "/strategies",
    description: "効率的な睡眠計測と攻略のコツ",
    icon: Moon,
  },
  {
    title: "チーム編成",
    href: "/teams",
    description: "最適なポケモンチーム編成ガイド",
    icon: Users,
  },
  {
    title: "ゲームメカニクス",
    href: "/mechanics",
    description: "睡眠タイプやゲームシステムの解説",
    icon: Settings,
  },
];
