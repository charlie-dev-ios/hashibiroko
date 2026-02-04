"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useUserSettings } from "@/hooks/use-user-settings";
import { RANK_PRESETS } from "@/lib/schemas/user-settings";
import { POT_CAPACITY_PRESETS } from "@/lib/utils/calculator";

export function SettingsForm() {
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

  if (!isLoaded) {
    return (
      <Card className="max-w-2xl">
        <CardContent className="p-6">
          <p className="text-gray-500">読み込み中...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* ランク設定 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">睡眠リサーチランク</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            現在のゲーム内ランクを選択してください。ランクによって利用可能な機能が変わる場合があります。
          </p>
          <div className="space-y-2">
            <Label>ランク</Label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={settings.rank === null ? "default" : "outline"}
                size="sm"
                onClick={() => handleRankChange(null)}
              >
                未設定
              </Button>
              {RANK_PRESETS.map((preset) => (
                <Button
                  key={preset.value}
                  variant={settings.rank === preset.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleRankChange(preset.value)}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 鍋容量設定 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">デフォルト鍋容量</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            必要食材計算機などで使用するデフォルトの鍋容量を設定できます。
          </p>
          <div className="space-y-2">
            <Label>鍋容量</Label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={settings.potCapacity === null ? "default" : "outline"}
                size="sm"
                onClick={() => handlePotCapacityChange(null)}
              >
                未設定
              </Button>
              {POT_CAPACITY_PRESETS.map((preset) => (
                <Button
                  key={preset.value}
                  variant={settings.potCapacity === preset.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePotCapacityChange(preset.value)}
                >
                  {preset.label} ({preset.value})
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* リセットボタン */}
      <div className="pt-4">
        <Button variant="outline" onClick={handleReset}>
          設定をリセット
        </Button>
      </div>
    </div>
  );
}
