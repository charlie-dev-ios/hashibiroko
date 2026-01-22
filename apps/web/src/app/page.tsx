import TopNav from "@/components/navigation/top-nav";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl font-bold sm:text-4xl">
          ポケモンスリープ攻略サイト
        </h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          ポケモンスリープの攻略情報を網羅したガイドサイトへようこそ
        </p>
      </div>
      <TopNav />
    </div>
  );
}
