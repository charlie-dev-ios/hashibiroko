import type { Metadata } from "next";
import NatureMatrixTable from "@/components/natures/nature-matrix-table";
import NatureStatDetails from "@/components/natures/nature-stat-details";
import Breadcrumb from "@/components/navigation/breadcrumb";
import { getAllNatures, getAllStatEffects } from "@/lib/data/natures";

export const metadata: Metadata = {
  title: "せいかく一覧 | ポケモンスリープ攻略サイト",
  description:
    "ポケモンスリープのせいかく一覧。せいかくによるパラメータの上昇・下降の組み合わせをマトリクス表で確認できます。",
};

export default async function NaturesPage() {
  const [natures, statEffects] = await Promise.all([
    getAllNatures(),
    getAllStatEffects(),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "せいかく一覧" }]} />

      <h1 className="text-4xl font-bold mb-8">せいかく一覧</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">せいかく早見表</h2>
        <p className="text-muted-foreground mb-4">
          行が上昇するパラメータ、列が下降するパラメータを表しています。
        </p>
        <NatureMatrixTable natures={natures} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">パラメータ補正の詳細</h2>
        <p className="text-muted-foreground mb-4">
          各パラメータが上昇・下降した場合の具体的な効果です。
        </p>
        <NatureStatDetails statEffects={statEffects} />
      </section>
    </div>
  );
}
