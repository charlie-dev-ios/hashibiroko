import Image from "next/image";
import { Card } from "@/components/ui/card";
import type { Recipe } from "@/lib/schemas/recipe";
import { getTotalIngredientCount } from "@/lib/utils/recipe-utils";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const totalIngredients = getTotalIngredientCount(recipe);

  return (
    <Card
      className="hover:shadow-lg transition-shadow flex overflow-hidden"
      role="article"
      aria-label={`料理: ${recipe.name}`}
      data-testid="recipe-card"
    >
      {/* サムネイル（左側） */}
      {recipe.imageUrl ? (
        <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100">
          <Image
            src={recipe.imageUrl}
            alt={recipe.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
      ) : (
        <div className="w-20 h-20 flex-shrink-0 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400 text-xs">No img</span>
        </div>
      )}

      {/* コンテンツ（右側） */}
      <div className="flex-1 p-3 min-w-0">
        <h3 className="font-semibold text-sm truncate">{recipe.name}</h3>
        <p className="text-xs text-gray-500">{recipe.type}</p>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-sm font-bold text-blue-600">
            {((recipe as any).power ?? recipe.energy).toLocaleString()}
          </span>
          <span className="text-xs text-gray-500">
            食材{totalIngredients}個
          </span>
          {recipe.effect && (
            <span className="text-xs text-green-600 truncate">
              {recipe.effect}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
