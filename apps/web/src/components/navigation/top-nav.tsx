import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { navigationLinks } from "./navigation-links";

// ホームを除外したコンテンツセクション
const contentSections = navigationLinks.filter((link) => link.href !== "/");

export default function TopNav() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
      {contentSections.map((section) => (
        <Link key={section.href} href={section.href}>
          <Card className="h-full transition-colors hover:bg-accent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <section.icon className="h-5 w-5" />
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
