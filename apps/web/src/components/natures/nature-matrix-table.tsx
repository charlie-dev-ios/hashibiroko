import type { Nature, NatureStat } from "@/lib/schemas/nature";

const STATS: NatureStat[] = [
  "helpingSpeed",
  "ingredientRate",
  "mainSkillRate",
  "expGain",
  "energyRecovery",
];

const STAT_LABELS: Record<NatureStat, string> = {
  helpingSpeed: "おてつだいスピード",
  ingredientRate: "食材お手伝い確率",
  mainSkillRate: "メインスキル発動確率",
  expGain: "EXP獲得量",
  energyRecovery: "げんき回復量",
};

export interface NatureMatrixTableProps {
  natures: Nature[];
}

export default function NatureMatrixTable({ natures }: NatureMatrixTableProps) {
  const matrix = new Map<NatureStat, Map<NatureStat, string>>();
  for (const nature of natures) {
    if (!matrix.has(nature.increasedStat)) {
      matrix.set(nature.increasedStat, new Map());
    }
    matrix.get(nature.increasedStat)?.set(nature.decreasedStat, nature.name);
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-3 text-left font-medium bg-muted/50">
              <span className="text-xs text-muted-foreground">
                ↓下降 / 上昇→
              </span>
            </th>
            {STATS.map((stat) => (
              <th
                key={stat}
                className="py-2 px-3 text-center font-medium text-xs bg-muted/50"
              >
                {STAT_LABELS[stat]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {STATS.map((increasedStat) => (
            <tr key={increasedStat} className="border-b last:border-b-0">
              <th className="py-2 px-3 text-left font-medium text-xs whitespace-nowrap">
                {STAT_LABELS[increasedStat]}
              </th>
              {STATS.map((decreasedStat) => {
                const name =
                  matrix.get(increasedStat)?.get(decreasedStat) ?? "";
                const isNeutral = increasedStat === decreasedStat;
                return (
                  <td
                    key={decreasedStat}
                    className={`py-2 px-3 text-center text-sm whitespace-nowrap ${
                      isNeutral ? "bg-muted/30 text-muted-foreground" : ""
                    }`}
                  >
                    {name}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
