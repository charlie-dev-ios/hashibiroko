"use client";

import { Minus, Plus, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { SelectedRecipe } from "@/lib/schemas/calculator";
import type { Recipe, RecipeType } from "@/lib/schemas/recipe";
import {
  clampQuantity,
  formatNumber,
  POT_CAPACITY_PRESETS,
} from "@/lib/utils/calculator";

const RECIPE_TYPES: { value: RecipeType; label: string }[] = [
  { value: "カレー", label: "カレー・シチュー" },
  { value: "サラダ", label: "サラダ" },
  { value: "デザート", label: "デザート" },
];

interface RecipeSelectorProps {
  recipes: Recipe[];
  selectedRecipes: SelectedRecipe[];
  onQuantityChange: (recipeId: number, quantity: number) => void;
  potCapacity: number | null;
  onPotCapacityChange: (capacity: number | null) => void;
}

export default function RecipeSelector({
  recipes,
  selectedRecipes,
  onQuantityChange,
  potCapacity,
  onPotCapacityChange,
}: RecipeSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<RecipeType | null>(null);

  // 選択済みレシピのIDと数量のマップ
  const selectedMap = useMemo(() => {
    const map = new Map<number, number>();
    for (const sr of selectedRecipes) {
      map.set(sr.recipeId, sr.quantity);
    }
    return map;
  }, [selectedRecipes]);

  const filteredRecipes = useMemo(() => {
    let result = recipes;

    // 鍋容量フィルター
    if (potCapacity !== null && potCapacity > 0) {
      result = result.filter((recipe) => recipe.ingredientCount <= potCapacity);
    }

    // ジャンルフィルター
    if (selectedType) {
      result = result.filter((recipe) => recipe.type === selectedType);
    }

    // 検索フィルター
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter((recipe) =>
        recipe.name.toLowerCase().includes(query),
      );
    }

    return result;
  }, [recipes, searchQuery, selectedType, potCapacity]);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const getQuantity = (recipeId: number) => selectedMap.get(recipeId) ?? 0;

  const handleIncrement = (recipeId: number) => {
    const current = getQuantity(recipeId);
    onQuantityChange(recipeId, clampQuantity(current + 1));
  };

  const handleDecrement = (recipeId: number) => {
    const current = getQuantity(recipeId);
    if (current <= 1) {
      // 数量が1以下の場合は選択解除（数量0）
      onQuantityChange(recipeId, 0);
    } else {
      onQuantityChange(recipeId, clampQuantity(current - 1));
    }
  };

  const handleQuantityInput = (recipeId: number, value: string) => {
    const num = Number.parseInt(value, 10);
    if (Number.isNaN(num) || num <= 0) {
      onQuantityChange(recipeId, 0);
    } else {
      onQuantityChange(recipeId, clampQuantity(num));
    }
  };

  const selectedCount = selectedRecipes.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">レシピを選択</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* 鍋容量フィルター */}
        <div>
          <p className="text-sm font-medium mb-2">鍋容量</p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={potCapacity === null ? "default" : "outline"}
              size="sm"
              onClick={() => onPotCapacityChange(null)}
              className="text-xs"
            >
              すべて
            </Button>
            {POT_CAPACITY_PRESETS.map((preset) => (
              <Button
                key={preset.value}
                variant={potCapacity === preset.value ? "default" : "outline"}
                size="sm"
                onClick={() => onPotCapacityChange(preset.value)}
                className="text-xs"
              >
                {preset.label} ({preset.value})
              </Button>
            ))}
          </div>
        </div>

        {/* ジャンルフィルター */}
        <div>
          <p className="text-sm font-medium mb-2">料理種別</p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedType === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(null)}
              className="text-xs"
            >
              すべて
            </Button>
            {RECIPE_TYPES.map((type) => (
              <Button
                key={type.value}
                variant={selectedType === type.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type.value)}
                className="text-xs"
              >
                {type.label}
              </Button>
            ))}
          </div>
        </div>

        {/* 検索 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="レシピ名で検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-9"
            aria-label="レシピを検索"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={handleClearSearch}
              aria-label="検索をクリア"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* レシピリスト */}
        <div
          className="max-h-96 overflow-y-auto border rounded-md"
          role="listbox"
          aria-label="レシピ一覧"
        >
          {filteredRecipes.length === 0 ? (
            <p className="p-4 text-sm text-gray-500 text-center">
              該当するレシピがありません
            </p>
          ) : (
            <ul className="divide-y">
              {filteredRecipes.map((recipe) => {
                const quantity = getQuantity(recipe.id);
                const isSelected = quantity > 0;
                return (
                  <li
                    key={recipe.id}
                    className={`p-4 ${isSelected ? "bg-blue-50" : "hover:bg-gray-50"} transition-colors`}
                  >
                    <div className="space-y-3">
                      {/* レシピ情報 */}
                      <div>
                        <p
                          className={`text-sm font-medium leading-relaxed ${
                            isSelected ? "text-blue-700" : ""
                          }`}
                        >
                          {recipe.name}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-gray-500">
                          <span className="bg-gray-100 px-2 py-0.5 rounded">
                            {recipe.type}
                          </span>
                          <span>食材 {recipe.ingredientCount}個</span>
                          <span className="text-amber-600 font-medium">
                            {formatNumber(recipe.energy)}
                          </span>
                        </div>
                      </div>

                      {/* 数量コントロール */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9"
                          onClick={() => handleDecrement(recipe.id)}
                          disabled={quantity === 0}
                          aria-label={`${recipe.name}の数量を減らす`}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          min={0}
                          max={99}
                          value={quantity || ""}
                          onChange={(e) =>
                            handleQuantityInput(recipe.id, e.target.value)
                          }
                          placeholder="0"
                          className="w-14 h-9 text-center text-sm"
                          aria-label={`${recipe.name}の数量`}
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9"
                          onClick={() => handleIncrement(recipe.id)}
                          disabled={quantity >= 99}
                          aria-label={`${recipe.name}の数量を増やす`}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <p className="text-xs text-gray-500">
          {filteredRecipes.length}件表示 / {selectedCount}件選択中
        </p>
      </CardContent>
    </Card>
  );
}
