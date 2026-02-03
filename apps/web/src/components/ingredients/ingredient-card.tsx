import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Ingredient } from "@/lib/schemas/ingredient";

interface IngredientCardProps {
  ingredient: Ingredient;
}

export default function IngredientCard({ ingredient }: IngredientCardProps) {
  return (
    <Card
      className="hover:shadow-lg transition-shadow"
      role="article"
      aria-label={`食材: ${ingredient.name}`}
      data-testid="ingredient-card"
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{ingredient.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">エナジー</span>
          <span className="text-lg font-bold text-blue-600">
            {ingredient.energy.toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
