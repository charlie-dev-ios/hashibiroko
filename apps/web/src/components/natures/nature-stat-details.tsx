import { ArrowDown, ArrowUp } from "lucide-react";
import type { StatEffect } from "@/lib/schemas/nature";

export interface NatureStatDetailsProps {
  statEffects: StatEffect[];
}

export default function NatureStatDetails({
  statEffects,
}: NatureStatDetailsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {statEffects.map((effect) => (
        <div
          key={effect.stat}
          data-stat={effect.stat}
          className="rounded-lg border p-4"
        >
          <h3 className="font-semibold mb-3">{effect.label}</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <ArrowUp className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
              <span>{effect.increasedEffect}</span>
            </div>
            <div className="flex items-start gap-2">
              <ArrowDown className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
              <span>{effect.decreasedEffect}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
