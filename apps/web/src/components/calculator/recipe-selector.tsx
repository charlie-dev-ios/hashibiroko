"use client";

import { Check, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Recipe, RecipeType } from "@/lib/schemas/recipe";

const RECIPE_TYPES: { value: RecipeType; label: string }[] = [
  { value: "カレー", label: "カレー・シチュー" },
  { value: "サラダ", label: "サラダ" },
  { value: "デザート", label: "デザート" },
];

interface RecipeSelectorProps {
  recipes: Recipe[];
  selectedRecipeIds: number[];
  onToggleRecipe: (recipeId: number) => void;
}

export default function RecipeSelector({
  recipes,
  selectedRecipeIds,
  onToggleRecipe,
}: RecipeSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<RecipeType | null>(null);

  const filteredRecipes = useMemo(() => {
    let result = recipes;

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
  }, [recipes, searchQuery, selectedType]);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const isSelected = (recipeId: number) => selectedRecipeIds.includes(recipeId);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">レシピを選択</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
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
          className="max-h-80 overflow-y-auto border rounded-md"
          role="listbox"
          aria-label="レシピ一覧"
        >
          {filteredRecipes.length === 0 ? (
            <p className="p-3 text-sm text-gray-500 text-center">
              該当するレシピがありません
            </p>
          ) : (
            <ul className="divide-y">
              {filteredRecipes.map((recipe) => {
                const selected = isSelected(recipe.id);
                return (
                  <li key={recipe.id}>
                    <button
                      type="button"
                      className={`w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors text-left ${
                        selected ? "bg-blue-50" : ""
                      }`}
                      onClick={() => onToggleRecipe(recipe.id)}
                      role="option"
                      aria-selected={selected}
                    >
                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-sm font-medium truncate ${
                            selected ? "text-blue-700" : ""
                          }`}
                        >
                          {recipe.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {recipe.type} ・ 食材{recipe.ingredientCount}個
                        </p>
                      </div>
                      {selected ? (
                        <Check className="h-4 w-4 text-blue-600 flex-shrink-0 ml-2" />
                      ) : (
                        <div className="h-4 w-4 border rounded border-gray-300 flex-shrink-0 ml-2" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <p className="text-xs text-gray-500">
          {filteredRecipes.length}件中 {selectedRecipeIds.length}件選択中
        </p>
      </CardContent>
    </Card>
  );
}
