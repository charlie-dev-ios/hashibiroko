import { berries } from "@/lib/data/berries";
import { BerryCard } from "./berry-card";

export function BerryList() {
  if (berries.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        きのみデータがありません。
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* ヘッダー */}
      <div className="flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-500 border-b">
        <span>きのみ名</span>
        <span>基礎エナジー</span>
      </div>
      {/* リスト */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {berries.map((berry) => (
          <BerryCard key={berry.id} berry={berry} />
        ))}
      </div>
    </div>
  );
}
