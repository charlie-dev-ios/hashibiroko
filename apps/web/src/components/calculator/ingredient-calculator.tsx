"use client";

import { useCallback, useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SelectedRecipe } from "@/lib/schemas/calculator";
import type { Recipe } from "@/lib/schemas/recipe";
import {
  calculateIngredientTotals,
  clampQuantity,
  getGrandTotal,
} from "@/lib/utils/calculator";
import IngredientTotals from "./ingredient-totals";
import RecipeSelector from "./recipe-selector";
import SelectedRecipeList from "./selected-recipe-list";

interface IngredientCalculatorProps {
  initialRecipes: Recipe[];
}

export default function IngredientCalculator({
  initialRecipes,
}: IngredientCalculatorProps) {
  const [selectedRecipes, setSelectedRecipes] = useState<SelectedRecipe[]>([]);

  // 選択済みレシピIDのリスト
  const selectedRecipeIds = useMemo(
    () => selectedRecipes.map((sr) => sr.recipeId),
    [selectedRecipes]
  );

  // 選択済みレシピとそのデータを結合
  const selectedItems = useMemo(() => {
    return selectedRecipes
      .map((sr) => {
        const recipe = initialRecipes.find((r) => r.id === sr.recipeId);
        if (!recipe) return null;
        return { recipe, quantity: sr.quantity };
      })
      .filter((item): item is { recipe: Recipe; quantity: number } =>
        item !== null
      );
  }, [selectedRecipes, initialRecipes]);

  // 食材合計を計算
  const ingredientTotals = useMemo(
    () => calculateIngredientTotals(selectedRecipes, initialRecipes),
    [selectedRecipes, initialRecipes]
  );

  // 食材総数
  const grandTotal = useMemo(
    () => getGrandTotal(ingredientTotals),
    [ingredientTotals]
  );

  // レシピを選択に追加
  const handleSelectRecipe = useCallback((recipeId: number) => {
    setSelectedRecipes((prev) => {
      if (prev.some((sr) => sr.recipeId === recipeId)) {
        return prev;
      }
      return [...prev, { recipeId, quantity: 1 }];
    });
  }, []);

  // 数量を変更
  const handleQuantityChange = useCallback(
    (recipeId: number, quantity: number) => {
      setSelectedRecipes((prev) =>
        prev.map((sr) =>
          sr.recipeId === recipeId
            ? { ...sr, quantity: clampQuantity(quantity) }
            : sr
        )
      );
    },
    []
  );

  // レシピを削除
  const handleRemove = useCallback((recipeId: number) => {
    setSelectedRecipes((prev) =>
      prev.filter((sr) => sr.recipeId !== recipeId)
    );
  }, []);

  // すべてリセット
  const handleReset = useCallback(() => {
    setSelectedRecipes([]);
  }, []);

  return (
    <div className="space-y-6">
      {/* ヘッダー（リセットボタン） */}
      {selectedRecipes.length > 0 && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="text-gray-600"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            リセット
          </Button>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 左カラム: レシピ選択 & 選択済みリスト */}
        <div className="space-y-6">
          <RecipeSelector
            recipes={initialRecipes}
            selectedRecipeIds={selectedRecipeIds}
            onSelectRecipe={handleSelectRecipe}
          />
          <SelectedRecipeList
            items={selectedItems}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemove}
          />
        </div>

        {/* 右カラム: 食材合計 */}
        <div>
          <IngredientTotals totals={ingredientTotals} grandTotal={grandTotal} />
        </div>
      </div>
    </div>
  );
}
