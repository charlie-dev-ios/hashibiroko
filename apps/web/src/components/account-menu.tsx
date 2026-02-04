"use client";

import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserSettings } from "@/hooks/use-user-settings";
import { RANK_PRESETS } from "@/lib/schemas/user-settings";
import { POT_CAPACITY_PRESETS } from "@/lib/utils/calculator";

export function AccountMenu() {
  const { settings, setSettings, isLoaded } = useUserSettings();

  // 現在のランクラベルを取得
  const getCurrentRankLabel = () => {
    if (settings.rank === null) return "未設定";
    const preset = RANK_PRESETS.find((p) => settings.rank !== null && settings.rank <= p.value);
    return preset ? preset.label : `ランク ${settings.rank}`;
  };

  // 現在の鍋容量ラベルを取得
  const getCurrentPotCapacityLabel = () => {
    if (settings.potCapacity === null) return "未設定";
    const preset = POT_CAPACITY_PRESETS.find((p) => p.value === settings.potCapacity);
    return preset ? `${preset.label} (${preset.value})` : `${settings.potCapacity}`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="設定メニュー">
          <Settings className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>デフォルト設定</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* ランク設定 */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span className="flex-1">ランク</span>
              <span className="text-xs text-muted-foreground">
                {isLoaded ? getCurrentRankLabel() : "..."}
              </span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                onClick={() => setSettings({ rank: null })}
                className={settings.rank === null ? "bg-accent" : ""}
              >
                未設定
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {RANK_PRESETS.map((preset) => (
                <DropdownMenuItem
                  key={preset.value}
                  onClick={() => setSettings({ rank: preset.value })}
                  className={settings.rank === preset.value ? "bg-accent" : ""}
                >
                  {preset.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          {/* 鍋容量設定 */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span className="flex-1">鍋容量</span>
              <span className="text-xs text-muted-foreground">
                {isLoaded ? getCurrentPotCapacityLabel() : "..."}
              </span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                onClick={() => setSettings({ potCapacity: null })}
                className={settings.potCapacity === null ? "bg-accent" : ""}
              >
                未設定
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {POT_CAPACITY_PRESETS.map((preset) => (
                <DropdownMenuItem
                  key={preset.value}
                  onClick={() => setSettings({ potCapacity: preset.value })}
                  className={settings.potCapacity === preset.value ? "bg-accent" : ""}
                >
                  {preset.label} ({preset.value})
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
