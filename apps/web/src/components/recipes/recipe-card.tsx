import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getTotalIngredientCount } from '@/lib/utils/recipe-utils';
import type { Recipe } from '@/lib/schemas/recipe';
import Image from 'next/image';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const totalIngredients = getTotalIngredientCount(recipe);

  return (
    <Card className="hover:shadow-lg transition-shadow" role="article" aria-label={`料理: ${recipe.name}`}>
      <CardHeader>
        {recipe.imageUrl ? (
          <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden bg-gray-100">
            <Image
              src={recipe.imageUrl}
              alt={recipe.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="relative w-full h-48 mb-4 rounded-md bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">画像なし</span>
          </div>
        )}
        <CardTitle>{recipe.name}</CardTitle>
        <CardDescription>{recipe.type}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* エナジー */}
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">エナジー</span>
            <span className="text-lg font-bold text-blue-600">{recipe.power}</span>
          </div>

          {/* 必要食材の列挙 */}
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">必要食材</p>
            <ul className="space-y-1">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-sm text-gray-700 flex justify-between">
                  <span>{ingredient.name}</span>
                  <span className="text-gray-500">×{ingredient.quantity}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 必要食材の総数 */}
          <div className="flex justify-between items-center pt-2 border-t">
            <span className="text-sm font-medium text-gray-600">必要食材の総数</span>
            <span className="text-base font-semibold">{totalIngredients}個</span>
          </div>

          {/* 効果 */}
          <div className="pt-2">
            <p className="text-xs text-gray-500">{recipe.effect}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
