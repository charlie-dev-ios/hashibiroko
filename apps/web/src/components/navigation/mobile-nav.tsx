"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigationLinks = [
  {
    title: "ポケモン図鑑",
    href: "/pokemon",
    description: "ポケモンの詳細情報を検索・閲覧",
  },
  {
    title: "ゲームメカニクス",
    href: "/mechanics",
    description: "睡眠タイプやゲームシステムの解説",
  },
  {
    title: "睡眠戦略",
    href: "/strategies",
    description: "効率的な睡眠計測と攻略のコツ",
  },
  {
    title: "チーム編成",
    href: "/teams",
    description: "最適なポケモンチーム編成ガイド",
  },
  {
    title: "料理情報",
    href: "/recipes",
    description: "レシピときのみの詳細データ",
  },
  {
    title: "島ガイド",
    href: "/islands",
    description: "各フィールドの特徴とポケモン出現情報",
  },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label="メニューを開く">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>メニュー</SheetTitle>
          <SheetDescription>ポケモンスリープ攻略サイト</SheetDescription>
        </SheetHeader>
        <nav className="mt-8">
          <ul className="space-y-4">
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-lg p-3 transition-colors hover:bg-accent"
                  onClick={() => setOpen(false)}
                >
                  <div className="font-medium">{link.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {link.description}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
