"use client";

import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_USER_SETTINGS,
  type UserSettings,
  UserSettingsSchema,
} from "@/lib/schemas/user-settings";

const STORAGE_KEY = "hashibiroko-user-settings";

/**
 * localStorageからユーザー設定を読み込む
 */
function loadSettings(): UserSettings {
  if (typeof window === "undefined") {
    return DEFAULT_USER_SETTINGS;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return DEFAULT_USER_SETTINGS;
    }

    const parsed = JSON.parse(stored);
    const result = UserSettingsSchema.safeParse(parsed);

    if (result.success) {
      return result.data;
    }

    console.warn("Invalid user settings in localStorage, using defaults");
    return DEFAULT_USER_SETTINGS;
  } catch {
    console.warn("Failed to load user settings from localStorage");
    return DEFAULT_USER_SETTINGS;
  }
}

/**
 * localStorageにユーザー設定を保存
 */
function saveSettings(settings: UserSettings): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    console.warn("Failed to save user settings to localStorage");
  }
}

/**
 * ユーザー設定を管理するカスタムフック
 *
 * @returns ユーザー設定と更新関数
 */
export function useUserSettings() {
  const [settings, setSettingsState] = useState<UserSettings>(
    DEFAULT_USER_SETTINGS,
  );
  const [isLoaded, setIsLoaded] = useState(false);

  // 初期化時にlocalStorageから読み込み
  useEffect(() => {
    const loaded = loadSettings();
    setSettingsState(loaded);
    setIsLoaded(true);
  }, []);

  // 設定を更新して保存
  const setSettings = useCallback((newSettings: Partial<UserSettings>) => {
    setSettingsState((prev) => {
      const updated = { ...prev, ...newSettings };
      saveSettings(updated);
      return updated;
    });
  }, []);

  // 設定をリセット
  const resetSettings = useCallback(() => {
    setSettingsState(DEFAULT_USER_SETTINGS);
    saveSettings(DEFAULT_USER_SETTINGS);
  }, []);

  return {
    settings,
    setSettings,
    resetSettings,
    isLoaded,
  };
}
