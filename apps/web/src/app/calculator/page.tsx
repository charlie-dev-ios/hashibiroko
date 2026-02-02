import type { Metadata } from "next";
import Breadcrumb from "@/components/navigation/breadcrumb";
import IngredientCalculator from "@/components/calculator/ingredient-calculator";
import { getAllRecipes } from "@/lib/data/recipes";

export const metadata: Metadata = {
  title: "必要食材計算機 | ポケモンスリープ攻略サイト",
  description:
    "ポケモンスリープの料理に必要な食材を計算。複数のレシピを選択して、必要な食材の合計数を確認できます。",
};

export default async function CalculatorPage() {
  const recipes = await getAllRecipes();

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "必要食材計算機" }]} />

      <h1 className="text-4xl font-bold mb-4">必要食材計算機</h1>
      <p className="text-gray-600 mb-8">
        レシピを選択して、必要な食材の合計数を計算します。複数のレシピを組み合わせて計画を立てましょう。
      </p>

      <IngredientCalculator initialRecipes={recipes} />
    </div>
  );
}
