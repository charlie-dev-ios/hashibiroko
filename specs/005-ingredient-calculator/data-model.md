# Data Model: 必要食材個数計算機

**Date**: 2026-02-02
**Feature**: 必要食材個数計算機

## 概要

このドキュメントでは、必要食材個数計算機で使用するデータエンティティとスキーマを定義します。既存のRecipeスキーマを活用し、計算機固有のデータ構造を追加します。

---

## エンティティ一覧

1. **Recipe（料理）** - 既存エンティティ（変更なし）
2. **SelectedRecipe（選択レシピ）** - 計算対象として選択されたレシピと数量
3. **IngredientTotal（食材合計）** - 計算結果として表示する食材と合計数
4. **CalculatorState（計算機状態）** - 計算機全体の状態管理

---

## 1. Recipe（料理）- 既存

### 説明
既存のレシピエンティティ。変更なしでそのまま使用。

### 既存スキーマ（参照）

```typescript
// apps/web/src/lib/schemas/recipe.ts
export const RecipeSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  type: z.enum(['カレー', 'サラダ', 'デザート', 'ドリンク']),
  ingredientCount: z.number().int().nonnegative(), // 食材総数
  energy: z.number().nonnegative(),
  ingredients: z.array(z.object({
    name: z.string(),
    quantity: z.number().int().positive(),
  })),
});

export type Recipe = z.infer<typeof RecipeSchema>;
```

### 使用するフィールド

| フィールド | 用途 |
|---------|------|
| `id` | レシピの一意識別子、SelectedRecipeで参照 |
| `name` | 検索・表示用 |
| `ingredients` | 食材計算の元データ |
| `ingredientCount` | 1回あたりの食材総数（参考表示用） |

---

## 2. SelectedRecipe（選択レシピ）

### 説明
ユーザーが計算対象として選択したレシピと、その作成数量を表す。

### スキーマ

```typescript
// apps/web/src/lib/schemas/calculator.ts
import { z } from 'zod';

export const SelectedRecipeSchema = z.object({
  recipeId: z.number().int().positive(),
  quantity: z.number().int().min(1).max(99),
});

export type SelectedRecipe = z.infer<typeof SelectedRecipeSchema>;
```

### フィールド説明

| フィールド | 型 | 説明 | 制約 |
|---------|-----|------|------|
| `recipeId` | number | 選択したレシピのID | 正の整数 |
| `quantity` | number | 作成数量 | 1〜99の整数 |

### バリデーションルール
- `recipeId`: 既存のRecipeデータに存在するIDでなければならない
- `quantity`: 1以上99以下の整数

### サンプルデータ

```json
{
  "recipeId": 20,
  "quantity": 3
}
```

---

## 3. IngredientTotal（食材合計）

### 説明
計算結果として表示する、食材ごとの必要合計数。

### スキーマ

```typescript
// apps/web/src/lib/schemas/calculator.ts
export const IngredientTotalSchema = z.object({
  name: z.string().min(1),
  totalQuantity: z.number().int().nonnegative(),
});

export type IngredientTotal = z.infer<typeof IngredientTotalSchema>;
```

### フィールド説明

| フィールド | 型 | 説明 |
|---------|-----|------|
| `name` | string | 食材名（例: "マメミート"） |
| `totalQuantity` | number | 必要合計数 |

### サンプルデータ

```json
[
  { "name": "マメミート", "totalQuantity": 21 },
  { "name": "あまいミツ", "totalQuantity": 14 },
  { "name": "モーモーミルク", "totalQuantity": 7 }
]
```

---

## 4. CalculatorState（計算機状態）

### 説明
計算機コンポーネントの全体状態。UIの状態管理に使用。

### 型定義

```typescript
// apps/web/src/lib/types/calculator.ts
export interface CalculatorState {
  selectedRecipes: SelectedRecipe[];  // 選択中のレシピ一覧
  searchQuery: string;                // 検索クエリ
}
```

### 初期状態

```typescript
const initialState: CalculatorState = {
  selectedRecipes: [],
  searchQuery: '',
};
```

---

## データフロー

### 1. レシピ選択フロー

```
ユーザー入力（レシピ選択）
  ↓
selectedRecipes に追加
  ↓
calculateIngredientTotals() 実行
  ↓
IngredientTotal[] 生成
  ↓
UI更新（食材合計表示）
```

### 2. 食材合計計算フロー

```
selectedRecipes: SelectedRecipe[]
  ↓
recipes.json から該当レシピ取得
  ↓
各レシピの ingredients × quantity を展開
  ↓
同じ食材名でグループ化・合算
  ↓
IngredientTotal[] を返却
```

### 3. 検索フロー

```
ユーザー入力（検索クエリ）
  ↓
searchQuery 更新
  ↓
recipes.filter(r => r.name.includes(searchQuery))
  ↓
フィルタ済みレシピをUI表示
```

---

## 計算ロジック

### calculateIngredientTotals 関数

```typescript
// apps/web/src/lib/utils/calculator.ts
import type { Recipe, SelectedRecipe, IngredientTotal } from '@/lib/schemas/calculator';

export function calculateIngredientTotals(
  selectedRecipes: SelectedRecipe[],
  allRecipes: Recipe[]
): IngredientTotal[] {
  // 食材名 -> 合計数のマップ
  const ingredientMap = new Map<string, number>();

  for (const selected of selectedRecipes) {
    const recipe = allRecipes.find(r => r.id === selected.recipeId);
    if (!recipe) continue;

    for (const ingredient of recipe.ingredients) {
      const current = ingredientMap.get(ingredient.name) || 0;
      ingredientMap.set(
        ingredient.name,
        current + ingredient.quantity * selected.quantity
      );
    }
  }

  // Map を IngredientTotal[] に変換
  return Array.from(ingredientMap.entries())
    .map(([name, totalQuantity]) => ({ name, totalQuantity }))
    .sort((a, b) => b.totalQuantity - a.totalQuantity); // 数量の多い順
}
```

### getTotalIngredientCount 関数

```typescript
// 全食材の総数を計算
export function getTotalIngredientCount(totals: IngredientTotal[]): number {
  return totals.reduce((sum, item) => sum + item.totalQuantity, 0);
}
```

---

## ファイル配置

### スキーマファイル
```
apps/web/src/lib/schemas/
├── recipe.ts           # 既存: RecipeSchema
└── calculator.ts       # 新規: SelectedRecipeSchema, IngredientTotalSchema
```

### ユーティリティファイル
```
apps/web/src/lib/utils/
└── calculator.ts       # 新規: calculateIngredientTotals, getTotalIngredientCount
```

### コンポーネントファイル
```
apps/web/src/components/calculator/
├── ingredient-calculator.tsx      # メインコンポーネント
├── recipe-search.tsx              # レシピ検索コンポーネント
├── selected-recipe-list.tsx       # 選択レシピ一覧
└── ingredient-totals.tsx          # 食材合計表示
```

### ページファイル
```
apps/web/src/app/calculator/
└── page.tsx            # 計算機ページ
```

---

## サンプルシナリオ

### シナリオ: マメバーグカレー3個 + ベイビィハニーカレー2個

**入力**:
```json
{
  "selectedRecipes": [
    { "recipeId": 20, "quantity": 3 },
    { "recipeId": 21, "quantity": 2 }
  ]
}
```

**レシピデータ参照**:
- マメバーグカレー (id: 20): マメミート × 7
- ベイビィハニーカレー (id: 21): あまいミツ × 7

**計算**:
- マメミート: 7 × 3 = 21個
- あまいミツ: 7 × 2 = 14個

**出力**:
```json
{
  "ingredientTotals": [
    { "name": "マメミート", "totalQuantity": 21 },
    { "name": "あまいミツ", "totalQuantity": 14 }
  ],
  "grandTotal": 35
}
```

---

## まとめ

- **既存資産活用**: RecipeSchemaをそのまま使用
- **シンプルな追加定義**: SelectedRecipe, IngredientTotalの2つのみ
- **クライアントサイド完結**: 全計算をフロントエンドで実行
- **型安全性**: Zodスキーマによる厳格なバリデーション
