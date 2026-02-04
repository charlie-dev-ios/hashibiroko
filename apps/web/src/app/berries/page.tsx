import type { Metadata } from "next";
import { BerryList } from "@/components/berries/berry-list";
import Breadcrumb from "@/components/navigation/breadcrumb";
import { berries } from "@/lib/data/berries";

export const metadata: Metadata = {
  title: "きのみ一覧 | ポケモンスリープ攻略サイト",
  description:
    "ポケモンスリープのきのみ一覧。各きのみの基礎エナジー値を確認できます。",
};

export default function BerriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "きのみ情報" }]} />

      <h1 className="text-4xl font-bold mb-8">きのみ一覧</h1>

      <p className="text-gray-600 mb-6">全{berries.length}種類のきのみを掲載</p>

      <BerryList />
    </div>
  );
}
