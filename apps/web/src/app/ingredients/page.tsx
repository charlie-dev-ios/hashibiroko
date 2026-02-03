import type { Metadata } from "next";
import IngredientList from "@/components/ingredients/ingredient-list";
import Breadcrumb from "@/components/navigation/breadcrumb";
import { getAllIngredients } from "@/lib/data/ingredients";

export const metadata: Metadata = {
  title: "食材一覧 | ポケモンスリープ攻略サイト",
  description:
    "ポケモンスリープの食材一覧。各食材の基本エナジー値を確認できます。",
};

export default async function IngredientsPage() {
  const ingredients = await getAllIngredients();

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "食材情報" }]} />

      <h1 className="text-4xl font-bold mb-8">食材一覧</h1>

      <p className="text-gray-600 mb-6">
        全{ingredients.length}種類の食材を掲載
      </p>

      <IngredientList ingredients={ingredients} />
    </div>
  );
}
