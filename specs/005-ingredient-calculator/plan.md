# Implementation Plan: 必要食材個数計算機

**Branch**: `005-ingredient-calculator` | **Date**: 2026-02-02 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-ingredient-calculator/spec.md`

## Summary

レシピを複数選択し、それぞれの作成数量を指定することで、必要な食材の合計数を計算・表示する機能。既存のレシピデータを活用し、クライアントサイドで完結する計算ロジックを実装。

## Technical Context

**Language/Version**: TypeScript 5.9.3
**Primary Dependencies**: Next.js 16.0.8 (App Router), React 19.2.1, shadcn/ui, Tailwind CSS 4.x, Zod 4.3.4
**Storage**: N/A（クライアントサイドのみ、React stateで状態管理）
**Testing**: Playwright (E2E)
**Target Platform**: Web (Desktop & Mobile responsive)
**Project Type**: Monorepo (apps/web)
**Performance Goals**: レシピ選択・計算結果表示が500ms以内
**Constraints**: 77レシピ全件を扱える、数量上限99
**Scale/Scope**: 既存レシピページと同等のユーザー体験

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] 新規API不要（クライアントサイド完結）
- [x] 既存スキーマ・データ活用
- [x] shadcn/ui コンポーネント使用
- [x] 既存のコード規約に準拠

## Research Findings

### 既存コードパターン分析

**スキーマ定義** (`apps/web/src/lib/schemas/recipe.ts`):
- `RecipeSchema`: id, name, type, ingredientCount, energy, ingredients配列
- `ingredients`: `{ name: string, quantity: number }[]`
- Zodによるバリデーション + transform

**ユーティリティ** (`apps/web/src/lib/utils/recipe-utils.ts`):
- `getTotalIngredientCount(recipe)`: 単一レシピの食材総数
- `extractIngredients(recipes)`: 全食材のユニークリスト抽出
- `filterRecipesByIngredients()`: 食材フィルター
- `filterRecipesByPotCapacity()`: 鍋容量フィルター

**コンポーネントパターン** (`apps/web/src/components/recipes/`):
- `recipes-page-content.tsx`: 親コンポーネント（状態管理）
- `recipe-filter.tsx`: フィルターUI（Button, Checkbox使用）
- `recipe-list.tsx`: リスト表示

**ナビゲーション** (`apps/web/src/components/navigation/navigation-links.ts`):
- `NavigationLink`インターフェース: title, href, description, icon
- lucide-react アイコン使用

**利用可能なUIコンポーネント** (`apps/web/src/components/ui/`):
- button, card, checkbox, input, label, select, separator, skeleton, tooltip

## Project Structure

### Documentation (this feature)

```text
specs/005-ingredient-calculator/
├── plan.md              # This file
├── data-model.md        # データモデル定義
├── spec.md              # 仕様書
├── tasks.md             # タスク一覧
├── quickstart.md        # 動作確認手順
├── contracts/           # インターフェース定義
│   └── calculator.ts    # コンポーネントProps定義
└── checklists/
    └── requirements.md  # 要件チェックリスト
```

### Source Code (repository root)

```text
apps/web/
├── src/
│   ├── app/
│   │   └── calculator/
│   │       ├── page.tsx              # 計算機ページ
│   │       └── loading.tsx           # ローディング状態
│   ├── components/
│   │   └── calculator/
│   │       ├── ingredient-calculator.tsx   # メインコンポーネント
│   │       ├── recipe-selector.tsx         # レシピ選択（検索付き）
│   │       ├── selected-recipe-list.tsx    # 選択レシピ一覧
│   │       └── ingredient-totals.tsx       # 食材合計表示
│   └── lib/
│       ├── schemas/
│       │   └── calculator.ts         # 計算機用スキーマ
│       └── utils/
│           └── calculator.ts         # 計算ロジック
└── tests/
    └── e2e/
        └── calculator.spec.ts        # E2Eテスト
```

**Structure Decision**: 既存の`recipes/`構造に準拠。計算機専用のコンポーネントディレクトリとユーティリティを追加。

## Implementation Architecture

### コンポーネント階層

```
app/calculator/page.tsx (Server Component)
└── IngredientCalculator (Client Component - 状態管理)
    ├── RecipeSelector (レシピ検索・選択)
    │   └── Input + filtered recipe list
    ├── SelectedRecipeList (選択済みレシピ一覧)
    │   └── 各レシピ: 名前 + 数量Input + 削除Button
    └── IngredientTotals (計算結果表示)
        └── Card: 食材リスト + 総数
```

### 状態管理

```typescript
// IngredientCalculator 内部状態
interface CalculatorState {
  selectedRecipes: SelectedRecipe[];  // { recipeId, quantity }[]
  searchQuery: string;                 // 検索文字列
}

// 派生状態（useMemoで計算）
- filteredRecipes: 検索結果
- ingredientTotals: 食材合計配列
- grandTotal: 食材総数
```

### データフロー

```
1. page.tsx: getAllRecipes() でレシピ全件取得 (Server)
2. IngredientCalculator: initialRecipes を props で受け取り
3. ユーザー操作 → selectedRecipes 更新 → 自動再計算
4. calculateIngredientTotals() → IngredientTotals 表示
```

## Key Implementation Decisions

### D1: レシピ選択UI
**決定**: Input + ドロップダウンリスト（Comboboxパターン）
**理由**: 77レシピから素早く検索・選択できる

### D2: 数量入力
**決定**: type="number" の Input、min=1、max=99
**理由**: シンプルで直感的、バリデーション容易

### D3: 状態管理
**決定**: React useState（Zustand不要）
**理由**: 単一コンポーネント内で完結、外部共有不要

### D4: 計算タイミング
**決定**: 即時計算（デバウンスなし）
**理由**: 77レシピ×99数量でもミリ秒単位で完了

## Complexity Tracking

N/A - 既存構造に沿った実装のため複雑性の増加なし。