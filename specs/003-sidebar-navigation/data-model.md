# Data Model: サイドバーナビゲーション

**Date**: 2026-01-25
**Feature**: 003-sidebar-navigation

## Overview

本機能はUIコンポーネントのみで、永続化データやAPIは含まない。以下は型定義とコンポーネントインターフェースの設計。

---

## Type Definitions

### NavigationLink

ナビゲーション項目を表す型。

```typescript
// apps/web/src/components/navigation/navigation-links.ts

export interface NavigationLink {
  /** 表示ラベル */
  title: string;
  /** 遷移先パス */
  href: string;
  /** 説明文（オプション） */
  description?: string;
  /** アイコン名（lucide-react） */
  icon?: string;
}
```

### NavigationLinkGroup（将来の拡張用、現時点では不使用）

```typescript
export interface NavigationLinkGroup {
  /** グループ名 */
  label: string;
  /** グループに属するリンク */
  links: NavigationLink[];
}
```

---

## Component Interfaces

### Sidebar Props

```typescript
// apps/web/src/components/navigation/sidebar.tsx

export interface SidebarProps {
  /** 追加のCSSクラス */
  className?: string;
}
```

### SidebarNavItem Props

```typescript
// apps/web/src/components/navigation/sidebar-nav-item.tsx

export interface SidebarNavItemProps {
  /** ナビゲーションリンク情報 */
  link: NavigationLink;
  /** アクティブ状態 */
  isActive: boolean;
}
```

### SidebarLayout Props

```typescript
// apps/web/src/components/layout/sidebar-layout.tsx

export interface SidebarLayoutProps {
  /** 子要素（ページコンテンツ） */
  children: React.ReactNode;
}
```

---

## Navigation Links Data

```typescript
// apps/web/src/components/navigation/navigation-links.ts

export const navigationLinks: NavigationLink[] = [
  {
    title: "ホーム",
    href: "/",
    description: "トップページ",
    icon: "Home",
  },
  {
    title: "ポケモン図鑑",
    href: "/pokemon",
    description: "ポケモンの詳細情報を検索・閲覧",
    icon: "Cat",
  },
  {
    title: "料理情報",
    href: "/recipes",
    description: "レシピときのみの詳細データ",
    icon: "ChefHat",
  },
  {
    title: "島ガイド",
    href: "/islands",
    description: "各フィールドの特徴とポケモン出現情報",
    icon: "Map",
  },
  {
    title: "睡眠戦略",
    href: "/strategies",
    description: "効率的な睡眠計測と攻略のコツ",
    icon: "Moon",
  },
  {
    title: "チーム編成",
    href: "/teams",
    description: "最適なポケモンチーム編成ガイド",
    icon: "Users",
  },
  {
    title: "ゲームメカニクス",
    href: "/mechanics",
    description: "睡眠タイプやゲームシステムの解説",
    icon: "Settings",
  },
];
```

---

## State Management

### Sidebar State（モバイル用、デスクトップは常時表示）

```typescript
// useSidebarフックは不要 - MobileNavが既にSheet状態を内部管理
// デスクトップサイドバーは常時表示で状態管理不要
```

### Active Path Detection

```typescript
// usePathname()を直接使用
// カスタムフック不要（YAGNI）
```

---

## Relationships

```
layout.tsx
    │
    ├── Sidebar (デスクトップ: 常時表示)
    │       └── SidebarNavItem[] (navigationLinksから生成)
    │
    ├── MobileNav (モバイル: ヘッダー内)
    │       └── Sheet → NavigationLinks (navigationLinksから生成)
    │
    └── children (ページコンテンツ)
```
