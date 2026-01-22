import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Link from "next/link";
import MobileNav from "@/components/navigation/mobile-nav";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "ポケモンスリープ攻略サイト",
  description:
    "ポケモンスリープの攻略情報を提供するサイト。ポケモン図鑑、ゲームメカニクス、戦略ガイド、チーム編成などの情報を掲載。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} font-sans antialiased`}>
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <div className="mr-4 flex md:hidden">
              <MobileNav />
            </div>
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">ポケモンスリープ攻略</span>
            </Link>
          </div>
        </header>
        <main className="min-h-screen bg-background">{children}</main>
      </body>
    </html>
  );
}
