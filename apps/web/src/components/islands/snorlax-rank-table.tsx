import type { SnorlaxRank } from "@/lib/schemas/island";

export interface SnorlaxRankTableProps {
  ranks: SnorlaxRank[];
}

export default function SnorlaxRankTable({ ranks }: SnorlaxRankTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 px-4 font-medium">ランク</th>
            <th className="text-right py-2 px-4 font-medium">必要エナジー</th>
          </tr>
        </thead>
        <tbody>
          {ranks.map((rank) => (
            <tr key={rank.rank} className="border-b last:border-b-0">
              <td className="py-2 px-4">{rank.rank}</td>
              <td className="py-2 px-4 text-right tabular-nums">
                {rank.requiredEnergy.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
