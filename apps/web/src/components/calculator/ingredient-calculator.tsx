"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useUserSettings } from "@/hooks/use-user-settings";
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

interface IngredientCalculatorProps {
  initialRecipes: Recipe[];
}

export default function IngredientCalculator({
  initialRecipes,
}: IngredientCalculatorProps) {
  const { settings, isLoaded } = useUserSettings();
  const [selectedRecipes, setSelectedRecipes] = useState<SelectedRecipe[]>([]);
  const [potCapacity, setPotCapacity] = useState<number | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  // ユーザー設定が読み込まれたら、デフォルト鍋容量を設定
  useEffect(() => {
    if (isLoaded && !hasInitialized) {
      setPotCapacity(settings.potCapacity);
      setHasInitialized(true);
    }
  }, [isLoaded, settings.potCapacity, hasInitialized]);

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

  // 鍋容量を変更
  const handlePotCapacityChange = useCallback((capacity: number | null) => {
    setPotCapacity(capacity);
  }, []);

  // 選択をリセット
  const handleReset = useCallback(() => {
    setSelectedRecipes([]);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* 左カラム: レシピ選択 */}
        <div className="min-w-0">
          <RecipeSelector
            recipes={initialRecipes}
            selectedRecipes={selectedRecipes}
            onQuantityChange={handleQuantityChange}
            onReset={handleReset}
            potCapacity={potCapacity}
            onPotCapacityChange={handlePotCapacityChange}
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
