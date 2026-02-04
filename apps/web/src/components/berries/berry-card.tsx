import type { Berry } from "@/lib/schemas/berry";
import { typeColors, typeTextColors } from "@/lib/schemas/pokemon-type";
import { cn } from "@/lib/utils";

interface BerryCardProps {
  berry: Berry;
}

export function BerryCard({ berry }: BerryCardProps) {
  const bgColor = typeColors[berry.type];
  const textColor = typeTextColors[berry.type];

  return (
    <div
      className="flex items-center justify-between px-4 py-3 bg-white border rounded-lg hover:bg-gray-50 transition-colors"
      data-testid="berry-card"
    >
      <div className="flex items-center gap-2">
        <span className="font-medium text-gray-900">{berry.name}</span>
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
            bgColor,
            textColor,
          )}
        >
          {berry.type}
        </span>
      </div>
      <span className="text-blue-600 font-bold tabular-nums">
        {berry.energy}
      </span>
    </div>
  );
}
