'use client';

import { useState, useMemo } from 'react';
import RecipeList from './recipe-list';
import RecipeFilter from './recipe-filter';
import type { Recipe, RecipeType } from '@/lib/schemas/recipe';
import { extractIngredients, filterRecipesByIngredients } from '@/lib/utils/recipe-utils';

interface RecipesPageContentProps {
  initialRecipes: Recipe[];
}

export default function RecipesPageContent({ initialRecipes }: RecipesPageContentProps) {
  const [selectedType, setSelectedType] = useState<RecipeType | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  // Extract all available ingredients
  const availableIngredients = useMemo(() => {
    return extractIngredients(initialRecipes);
  }, [initialRecipes]);

  // Apply filters
  const filteredRecipes = useMemo(() => {
    let result = initialRecipes;

    // Filter by type
    if (selectedType) {
      result = result.filter(recipe => recipe.type === selectedType);
    }

    // Filter by ingredients (AND condition)
    if (selectedIngredients.length > 0) {
      result = filterRecipesByIngredients(result, selectedIngredients);
    }

    return result;
  }, [initialRecipes, selectedType, selectedIngredients]);

  return (
    <>
      <p className="text-gray-600 mb-6">
        全{initialRecipes.length}種類の料理を掲載
        {filteredRecipes.length < initialRecipes.length && (
          <span className="ml-2 text-sm">
            （{filteredRecipes.length}件表示中）
          </span>
        )}
      </p>

      <RecipeFilter
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        selectedIngredients={selectedIngredients}
        onIngredientsChange={setSelectedIngredients}
        availableIngredients={availableIngredients}
      />

      <RecipeList recipes={filteredRecipes} />
    </>
  );
}
