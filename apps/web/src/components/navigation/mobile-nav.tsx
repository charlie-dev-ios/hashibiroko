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
import { navigationSections } from "./navigation-links";

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
        <nav className="mt-8 space-y-6">
          {navigationSections.map((section) => (
            <div key={section.label}>
              <h3 className="mb-2 px-3 text-sm font-semibold text-muted-foreground">
                {section.label}
              </h3>
              <ul className="space-y-1">
                {section.links.map((link) => (
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
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
