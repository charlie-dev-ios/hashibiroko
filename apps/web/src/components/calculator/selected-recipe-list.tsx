"use client";

import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Recipe } from "@/lib/schemas/recipe";
import { clampQuantity } from "@/lib/utils/calculator";

interface SelectedRecipeItem {
  recipe: Recipe;
  quantity: number;
}

interface SelectedRecipeListProps {
  items: SelectedRecipeItem[];
  onQuantityChange: (recipeId: number, quantity: number) => void;
  onRemove: (recipeId: number) => void;
}

export default function SelectedRecipeList({
  items,
  onQuantityChange,
  onRemove,
}: SelectedRecipeListProps) {
  if (items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">選択中のレシピ</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-sm">レシピが選択されていません</p>
        </CardContent>
      </Card>
    );
  }

  const handleQuantityInput = (recipeId: number, value: string) => {
    const num = Number.parseInt(value, 10);
    if (!Number.isNaN(num)) {
      onQuantityChange(recipeId, clampQuantity(num));
    }
  };

  const handleIncrement = (recipeId: number, currentQuantity: number) => {
    onQuantityChange(recipeId, clampQuantity(currentQuantity + 1));
  };

  const handleDecrement = (recipeId: number, currentQuantity: number) => {
    onQuantityChange(recipeId, clampQuantity(currentQuantity - 1));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          選択中のレシピ ({items.length}件)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3" aria-label="選択中のレシピ一覧">
          {items.map(({ recipe, quantity }) => (
            <li
              key={recipe.id}
              className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{recipe.name}</p>
                <p className="text-xs text-gray-500">{recipe.type}</p>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleDecrement(recipe.id, quantity)}
                  disabled={quantity <= 1}
                  aria-label={`${recipe.name}の数量を減らす`}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <Input
                  type="number"
                  min={1}
                  max={99}
                  value={quantity}
                  onChange={(e) =>
                    handleQuantityInput(recipe.id, e.target.value)
                  }
                  className="w-14 h-8 text-center text-sm"
                  aria-label={`${recipe.name}の数量`}
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleIncrement(recipe.id, quantity)}
                  disabled={quantity >= 99}
                  aria-label={`${recipe.name}の数量を増やす`}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-500 hover:text-red-500"
                onClick={() => onRemove(recipe.id)}
                aria-label={`${recipe.name}を削除`}
              >
                <X className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
