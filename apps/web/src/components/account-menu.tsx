"use client";

import { Minus, Plus, Settings } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useUserSettings } from "@/hooks/use-user-settings";
import { POT_CAPACITY_PRESETS } from "@/lib/utils/calculator";

export function AccountMenu() {
  const { settings, setSettings, resetSettings, isLoaded } = useUserSettings();

  const handleRankChange = (value: number | null) => {
    setSettings({ rank: value });
    toast.success("ランク設定を保存しました");
  };

  const handlePotCapacityChange = (value: number | null) => {
    setSettings({ potCapacity: value });
    toast.success("鍋容量設定を保存しました");
  };

  const handleReset = () => {
    resetSettings();
    toast.success("設定をリセットしました");
  };

  const incrementRank = () => {
    const current = settings.rank ?? 0;
    if (current < 60) {
      handleRankChange(current + 1);
    }
  };

  const decrementRank = () => {
    const current = settings.rank ?? 1;
    if (current > 1) {
      handleRankChange(current - 1);
    } else {
      handleRankChange(null);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="設定">
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>設定</DialogTitle>
          <DialogDescription>
            デフォルトの設定を保存します。各ページで初期値として使用されます。
          </DialogDescription>
        </DialogHeader>

        {!isLoaded ? (
          <p className="text-gray-500">読み込み中...</p>
        ) : (
          <div className="space-y-6">
            {/* ランク設定 */}
            <div className="space-y-3">
              <Label htmlFor="rank">睡眠リサーチランク</Label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={decrementRank}
                  disabled={settings.rank === null}
                  aria-label="ランクを下げる"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-16 text-center font-medium">
                  {settings.rank ?? "-"}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={incrementRank}
                  disabled={settings.rank === 60}
                  aria-label="ランクを上げる"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <input
                id="rank"
                type="range"
                min={1}
                max={60}
                value={settings.rank ?? 1}
                onChange={(e) => {
                  const value = Number.parseInt(e.target.value, 10);
                  handleRankChange(value);
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1</span>
                <span>30</span>
                <span>60</span>
              </div>
            </div>

            {/* 鍋容量設定 */}
            <div className="space-y-3">
              <Label htmlFor="pot-capacity">デフォルト鍋容量</Label>
              <select
                id="pot-capacity"
                value={settings.potCapacity ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  handlePotCapacityChange(value === "" ? null : Number(value));
                }}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="">未設定</option>
                {POT_CAPACITY_PRESETS.map((preset) => (
                  <option key={preset.value} value={preset.value}>
                    {preset.label} ({preset.value})
                  </option>
                ))}
              </select>
            </div>

            {/* リセットボタン */}
            <div className="pt-2">
              <Button variant="outline" size="sm" onClick={handleReset}>
                設定をリセット
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
