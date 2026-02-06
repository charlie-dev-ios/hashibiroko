"use client";

import { Minus, Plus, Settings } from "lucide-react";
import { useEffect, useState } from "react";
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
import type { UserSettings } from "@/lib/schemas/user-settings";
import { POT_CAPACITY_PRESETS } from "@/lib/utils/calculator";

export function AccountMenu() {
  const { settings, setSettings, resetSettings, isLoaded } = useUserSettings();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<UserSettings>({
    rank: null,
    potCapacity: null,
  });

  // Dialogが開いたときに現在の設定をコピー
  useEffect(() => {
    if (open && isLoaded) {
      setDraft({ ...settings });
    }
  }, [open, isLoaded, settings]);

  const handleSave = () => {
    setSettings(draft);
    toast.success("設定を保存しました");
    setOpen(false);
  };

  const handleReset = () => {
    resetSettings();
    setDraft({ rank: null, potCapacity: null });
    toast.success("設定をリセットしました");
  };

  const incrementRank = () => {
    const current = draft.rank ?? 0;
    if (current < 60) {
      setDraft({ ...draft, rank: current + 1 });
    }
  };

  const decrementRank = () => {
    const current = draft.rank ?? 1;
    if (current > 1) {
      setDraft({ ...draft, rank: current - 1 });
    } else {
      setDraft({ ...draft, rank: null });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
                  disabled={draft.rank === null}
                  aria-label="ランクを下げる"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-16 text-center font-medium">
                  {draft.rank ?? "-"}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={incrementRank}
                  disabled={draft.rank === 60}
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
                value={draft.rank ?? 1}
                onChange={(e) => {
                  const value = Number.parseInt(e.target.value, 10);
                  setDraft({ ...draft, rank: value });
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
                value={draft.potCapacity ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  setDraft({
                    ...draft,
                    potCapacity: value === "" ? null : Number(value),
                  });
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

            {/* ボタン */}
            <div className="flex items-center justify-between pt-2">
              <Button variant="outline" size="sm" onClick={handleReset}>
                リセット
              </Button>
              <Button size="sm" onClick={handleSave}>
                保存
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
