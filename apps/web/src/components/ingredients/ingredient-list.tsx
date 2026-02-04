import type { Ingredient } from "@/lib/schemas/ingredient";
import IngredientCard from "./ingredient-card";

interface IngredientListProps {
  ingredients: Ingredient[];
}

export default function IngredientList({ ingredients }: IngredientListProps) {
  if (ingredients.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">食材がありません</div>
    );
  }

  return (
    <div className="space-y-4">
      {/* ヘッダー */}
      <div className="flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-500 border-b">
        <span>食材名</span>
        <span>エナジー</span>
      </div>
      {/* リスト */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {ingredients.map((ingredient) => (
          <IngredientCard key={ingredient.id} ingredient={ingredient} />
        ))}
      </div>
    </div>
  );
}
