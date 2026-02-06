import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { navigationSections } from "./navigation-links";

export default function TopNav() {
  return (
    <div className="space-y-8">
      {navigationSections.map((section) => (
        <div key={section.label}>
          <h2 className="mb-4 text-lg font-semibold">{section.label}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {section.links.map((link) => (
              <Link key={link.href} href={link.href}>
                <Card className="h-full transition-colors hover:bg-accent">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                      <link.icon className="h-5 w-5" />
                      {link.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {link.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
