import type { Ingredient } from "@/lib/schemas/ingredient";

interface IngredientCardProps {
  ingredient: Ingredient;
}

export default function IngredientCard({ ingredient }: IngredientCardProps) {
  return (
    <div
      className="flex items-center justify-between px-4 py-3 bg-white border rounded-lg hover:bg-gray-50 transition-colors"
      data-testid="ingredient-card"
    >
      <span className="font-medium text-gray-900">{ingredient.name}</span>
      <span className="text-blue-600 font-bold tabular-nums">
        {ingredient.energy.toLocaleString()}
      </span>
    </div>
  );
}
