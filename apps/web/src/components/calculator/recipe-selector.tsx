"use client";

import { useMemo, useState } from "react";
import { Plus, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Recipe } from "@/lib/schemas/recipe";

interface RecipeSelectorProps {
  recipes: Recipe[];
  selectedRecipeIds: number[];
  onSelectRecipe: (recipeId: number) => void;
}

export default function RecipeSelector({
  recipes,
  selectedRecipeIds,
  onSelectRecipe,
}: RecipeSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecipes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return recipes;
    return recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(query)
    );
  }, [recipes, searchQuery]);

  const availableRecipes = useMemo(() => {
    return filteredRecipes.filter(
      (recipe) => !selectedRecipeIds.includes(recipe.id)
    );
  }, [filteredRecipes, selectedRecipeIds]);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">レシピを追加</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
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

        <div
          className="max-h-64 overflow-y-auto border rounded-md"
          role="listbox"
          aria-label="レシピ一覧"
        >
          {availableRecipes.length === 0 ? (
            <p className="p-3 text-sm text-gray-500 text-center">
              {searchQuery
                ? "該当するレシピがありません"
                : "すべてのレシピが選択済みです"}
            </p>
          ) : (
            <ul className="divide-y">
              {availableRecipes.map((recipe) => (
                <li key={recipe.id}>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors text-left"
                    onClick={() => onSelectRecipe(recipe.id)}
                    role="option"
                    aria-selected="false"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">
                        {recipe.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {recipe.type} ・ 食材{recipe.ingredientCount}個
                      </p>
                    </div>
                    <Plus className="h-4 w-4 text-gray-400 flex-shrink-0 ml-2" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {searchQuery && (
          <p className="text-xs text-gray-500">
            {availableRecipes.length}件のレシピが見つかりました
          </p>
        )}
      </CardContent>
    </Card>
  );
}
