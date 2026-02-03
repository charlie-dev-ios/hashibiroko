"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IngredientTotal } from "@/lib/schemas/calculator";
import { formatNumber } from "@/lib/utils/calculator";

interface IngredientTotalsProps {
  totals: IngredientTotal[];
  grandTotal: number;
  totalEnergy: number;
}

export default function IngredientTotals({
  totals,
  grandTotal,
  totalEnergy,
}: IngredientTotalsProps) {
  if (totals.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">必要食材</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-sm">
            レシピを追加すると必要な食材が表示されます
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">必要食材</CardTitle>
        <div className="flex flex-wrap gap-4 mt-2 text-sm">
          <div className="flex items-center gap-1">
            <span className="text-gray-500">食材合計:</span>
            <span className="font-medium">{grandTotal}個</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-gray-500">合計エナジー:</span>
            <span className="font-medium text-amber-600">
              {formatNumber(totalEnergy)} EP
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2" aria-label="必要食材一覧">
          {totals.map((item) => (
            <li
              key={item.name}
              className="flex items-center justify-between py-1 border-b border-gray-100 last:border-0"
            >
              <span className="text-sm">{item.name}</span>
              <span className="font-medium text-sm">
                {item.totalQuantity}個
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
