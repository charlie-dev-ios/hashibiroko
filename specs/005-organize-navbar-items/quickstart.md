# Quickstart: ナビゲーションバーアイテムの整理

**Feature**: 005-organize-navbar-items
**Date**: 2026-02-02

## Prerequisites

- Node.js / Bun インストール済み
- プロジェクトの依存関係インストール済み (`bun install`)

## Implementation Steps

### Step 1: テストの更新（Red Phase）

まず、新しいナビゲーション構成に対応するテストを更新します。

**ファイル**: `apps/web/tests/unit/components/navigation/`

```typescript
// 期待するナビゲーション項目
const expectedItems = [
  { title: 'ホーム', href: '/' },
  { title: 'ポケモン図鑑', href: '/pokemon' },
  { title: '料理情報', href: '/recipes' },
  { title: 'フィールド情報', href: '/islands' },  // 名称変更
  { title: 'きのみ情報', href: '/berries' },       // 新規
  { title: '食材情報', href: '/ingredients' },     // 新規
  { title: 'チーム編成', href: '/teams' },
];

// 削除された項目がないことを確認
expect(screen.queryByText('睡眠戦略')).not.toBeInTheDocument();
expect(screen.queryByText('ゲームメカニクス')).not.toBeInTheDocument();
```

### Step 2: ナビゲーション定義の更新（Green Phase）

**ファイル**: `apps/web/src/components/navigation/navigation-links.ts`

```typescript
import {
  Cat,
  ChefHat,
  Cherry,      // 新規追加
  Egg,         // 新規追加
  Home,
  Map as MapIcon,
  Users,
} from "lucide-react";

export const navigationLinks: NavigationLink[] = [
  {
    title: "ホーム",
    href: "/",
    description: "トップページ",
    icon: Home,
  },
  {
    title: "ポケモン図鑑",
    href: "/pokemon",
    description: "ポケモンの詳細情報を検索・閲覧",
    icon: Cat,
  },
  {
    title: "料理情報",
    href: "/recipes",
    description: "レシピときのみの詳細データ",
    icon: ChefHat,
  },
  {
    title: "フィールド情報",  // 名称変更
    href: "/islands",
    description: "各フィールドの特徴とポケモン出現情報",
    icon: MapIcon,
  },
  {
    title: "きのみ情報",      // 新規
    href: "/berries",
    description: "きのみの種類と効果",
    icon: Cherry,
  },
  {
    title: "食材情報",        // 新規
    href: "/ingredients",
    description: "食材の入手方法と使い道",
    icon: Egg,
  },
  {
    title: "チーム編成",
    href: "/teams",
    description: "最適なポケモンチーム編成ガイド",
    icon: Users,
  },
];
```

### Step 3: 新規ページの作成

**ファイル**: `apps/web/src/app/berries/page.tsx`

```typescript
export default function BerriesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">きのみ情報</h1>
      <p className="text-muted-foreground">準備中です。</p>
    </div>
  );
}
```

**ファイル**: `apps/web/src/app/ingredients/page.tsx`

```typescript
export default function IngredientsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">食材情報</h1>
      <p className="text-muted-foreground">準備中です。</p>
    </div>
  );
}
```

### Step 4: テスト実行

```bash
cd apps/web
bun run test
```

### Step 5: E2Eテストの更新

**ファイル**: `apps/web/e2e/navigation.spec.ts`

ナビゲーションの項目変更に応じてE2Eテストを更新。

## Verification Checklist

- [ ] ナビゲーションに「睡眠戦略」が表示されない
- [ ] ナビゲーションに「ゲームメカニクス」が表示されない
- [ ] 「フィールド情報」が表示され、/islands に遷移する
- [ ] 「きのみ情報」が表示され、/berries に遷移する
- [ ] 「食材情報」が表示され、/ingredients に遷移する
- [ ] モバイル・デスクトップ両方で正常に表示される
- [ ] 全テストがパスする

## Commands

```bash
# 開発サーバー起動
bun dev

# テスト実行
cd apps/web && bun run test

# Lint/Format
bun check
```
