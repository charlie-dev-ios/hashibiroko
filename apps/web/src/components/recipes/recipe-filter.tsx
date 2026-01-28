"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { RecipeType } from "@/lib/schemas/recipe";

interface RecipeFilterProps {
  selectedType: RecipeType | null;
  onTypeChange: (type: RecipeType | null) => void;
  selectedIngredients: string[];
  onIngredientsChange: (ingredients: string[]) => void;
  availableIngredients: string[];
}

const RECIPE_TYPES: { value: RecipeType; label: string }[] = [
  { value: "カレー", label: "カレー・シチュー" },
  { value: "サラダ", label: "サラダ" },
  { value: "デザート", label: "デザート" },
];

export default function RecipeFilter({
  selectedType,
  onTypeChange,
  selectedIngredients,
  onIngredientsChange,
  availableIngredients,
}: RecipeFilterProps) {
  const [showIngredients, setShowIngredients] = useState(false);

  const handleIngredientToggle = (ingredient: string) => {
    if (selectedIngredients.includes(ingredient)) {
      onIngredientsChange(selectedIngredients.filter((i) => i !== ingredient));
    } else {
      onIngredientsChange([...selectedIngredients, ingredient]);
    }
  };

  const clearIngredients = () => {
    onIngredientsChange([]);
  };

  return (
    <search className="mb-6 space-y-4" aria-label="料理フィルター">
      {/* Type Filter */}
      <div>
        <h3 className="text-sm font-semibold mb-2" id="type-filter-label">
          料理種別
        </h3>
        <fieldset className="flex flex-wrap gap-2 border-none p-0">
          <legend className="sr-only" id="type-filter-label">
            料理種別
          </legend>
          <Button
            variant={selectedType === null ? "default" : "outline"}
            onClick={() => onTypeChange(null)}
            className="text-sm"
            aria-pressed={selectedType === null}
            aria-label="すべての料理種別を表示"
          >
            すべて
          </Button>
          {RECIPE_TYPES.map((type) => (
            <Button
              key={type.value}
              variant={selectedType === type.value ? "default" : "outline"}
              onClick={() => onTypeChange(type.value)}
              className="text-sm"
              aria-pressed={selectedType === type.value}
              aria-label={`${type.label}の料理を表示`}
            >
              {type.label}
            </Button>
          ))}
        </fieldset>
      </div>

      {/* Ingredient Filter */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold" id="ingredient-filter-label">
            食材フィルター
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowIngredients(!showIngredients)}
            className="text-xs"
            aria-expanded={showIngredients}
            aria-controls="ingredient-list"
            aria-label={
              showIngredients
                ? "食材フィルターを閉じる"
                : "食材フィルターを開く"
            }
          >
            {showIngredients ? "閉じる" : "開く"}
          </Button>
        </div>

        {showIngredients && (
          <fieldset
            id="ingredient-list"
            className="border rounded-md p-4 max-h-60 overflow-y-auto"
          >
            <legend className="sr-only" id="ingredient-filter-label">
              食材フィルター
            </legend>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {availableIngredients.map((ingredient) => (
                <div key={ingredient} className="flex items-center space-x-2">
                  <Checkbox
                    id={`ingredient-${ingredient}`}
                    checked={selectedIngredients.includes(ingredient)}
                    onCheckedChange={() => handleIngredientToggle(ingredient)}
                  />
                  <label
                    htmlFor={`ingredient-${ingredient}`}
                    className="text-sm cursor-pointer"
                  >
                    {ingredient}
                  </label>
                </div>
              ))}
            </div>
            {selectedIngredients.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearIngredients}
                className="mt-3 text-xs"
              >
                選択をクリア
              </Button>
            )}
          </fieldset>
        )}

        {selectedIngredients.length > 0 && (
          <div className="mt-2 text-sm text-gray-600">
            選択中: {selectedIngredients.join(", ")} (
            {selectedIngredients.length}個)
          </div>
        )}
      </div>

      {/* Active Filters Summary */}
      {(selectedType || selectedIngredients.length > 0) && (
        <div className="text-sm text-gray-600 flex flex-wrap gap-2">
          <span>フィルター:</span>
          {selectedType && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {RECIPE_TYPES.find((t) => t.value === selectedType)?.label}
            </span>
          )}
          {selectedIngredients.length > 0 && (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
              食材 {selectedIngredients.length}個
            </span>
          )}
        </div>
      )}
    </search>
  );
}
