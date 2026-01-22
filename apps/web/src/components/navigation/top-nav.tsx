import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const contentSections = [
  {
    title: "ポケモン図鑑",
    description: "ポケモンの詳細情報を検索・閲覧できます",
    href: "/pokemon",
  },
  {
    title: "ゲームメカニクス",
    description: "睡眠タイプやゲームシステムの解説",
    href: "/mechanics",
  },
  {
    title: "睡眠戦略",
    description: "効率的な睡眠計測と攻略のコツ",
    href: "/strategies",
  },
  {
    title: "チーム編成",
    description: "最適なポケモンチーム編成ガイド",
    href: "/teams",
  },
  {
    title: "料理情報",
    description: "レシピときのみの詳細データ",
    href: "/recipes",
  },
  {
    title: "島ガイド",
    description: "各フィールドの特徴とポケモン出現情報",
    href: "/islands",
  },
];

export default function TopNav() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
      {contentSections.map((section) => (
        <Link key={section.href} href={section.href}>
          <Card className="h-full transition-colors hover:bg-accent">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">
                {section.title}
              </CardTitle>
              <CardDescription className="text-sm">
                {section.description}
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}
