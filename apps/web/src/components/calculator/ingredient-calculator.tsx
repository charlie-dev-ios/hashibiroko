"use client";

import { useCallback, useMemo, useState } from "react";
import type { SelectedRecipe } from "@/lib/schemas/calculator";
import type { Recipe } from "@/lib/schemas/recipe";
import {
  calculateIngredientTotals,
  calculateTotalEnergy,
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
  const [potCapacity, setPotCapacity] = useState<number | null>(null);

  // 選択済みレシピとそのデータを結合
  const selectedItems = useMemo(() => {
    return selectedRecipes
      .map((sr) => {
        const recipe = initialRecipes.find((r) => r.id === sr.recipeId);
        if (!recipe) return null;
        return { recipe, quantity: sr.quantity };
      })
      .filter(
        (item): item is { recipe: Recipe; quantity: number } => item !== null,
      );
  }, [selectedRecipes, initialRecipes]);

  // 食材合計を計算
  const ingredientTotals = useMemo(
    () => calculateIngredientTotals(selectedRecipes, initialRecipes),
    [selectedRecipes, initialRecipes],
  );

  // 食材総数
  const grandTotal = useMemo(
    () => getGrandTotal(ingredientTotals),
    [ingredientTotals],
  );

  // 合計エナジーを計算
  const totalEnergy = useMemo(
    () => calculateTotalEnergy(selectedRecipes, initialRecipes),
    [selectedRecipes, initialRecipes],
  );

  // 数量を変更（0の場合は削除、それ以外は追加または更新）
  const handleQuantityChange = useCallback(
    (recipeId: number, quantity: number) => {
      setSelectedRecipes((prev) => {
        if (quantity <= 0) {
          // 数量が0以下の場合は削除
          return prev.filter((sr) => sr.recipeId !== recipeId);
        }

        const existing = prev.find((sr) => sr.recipeId === recipeId);
        if (existing) {
          // 既存のレシピを更新
          return prev.map((sr) =>
            sr.recipeId === recipeId
              ? { ...sr, quantity: clampQuantity(quantity) }
              : sr,
          );
        }

        // 新規追加
        return [...prev, { recipeId, quantity: clampQuantity(quantity) }];
      });
    },
    [],
  );

  // レシピを削除
  const handleRemove = useCallback((recipeId: number) => {
    setSelectedRecipes((prev) => prev.filter((sr) => sr.recipeId !== recipeId));
  }, []);

  // すべてリセット
  const handleReset = useCallback(() => {
    setSelectedRecipes([]);
  }, []);

  // 鍋容量を変更
  const handlePotCapacityChange = useCallback((capacity: number | null) => {
    setPotCapacity(capacity);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* 左カラム: レシピ選択 & 選択済みリスト */}
        <div className="space-y-6 min-w-0">
          <RecipeSelector
            recipes={initialRecipes}
            selectedRecipes={selectedRecipes}
            onQuantityChange={handleQuantityChange}
            potCapacity={potCapacity}
            onPotCapacityChange={handlePotCapacityChange}
          />
          <SelectedRecipeList
            items={selectedItems}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemove}
            onReset={handleReset}
          />
        </div>

        {/* 右カラム: 食材合計 */}
        <div>
          <IngredientTotals
            totals={ingredientTotals}
            grandTotal={grandTotal}
            totalEnergy={totalEnergy}
          />
        </div>
      </div>
    </div>
  );
}
