import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Link from "next/link";
import { AccountMenu } from "@/components/account-menu";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
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
        <Toaster position="top-right" />
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center justify-between gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Link href="/" className="flex items-center space-x-2">
                  <span className="font-bold">ポケモンスリープ攻略</span>
                </Link>
              </div>
              <div className="px-4">
                <AccountMenu />
              </div>
            </header>
            <div className="min-h-screen bg-background">{children}</div>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
