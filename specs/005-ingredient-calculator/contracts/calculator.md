# Component Contracts: 必要食材個数計算機

**Purpose**: コンポーネントのProps・インターフェース定義
**Date**: 2026-02-02

---

## Schemas (`apps/web/src/lib/schemas/calculator.ts`)

```typescript
import { z } from "zod";

/**
 * 選択されたレシピと数量
 */
export const SelectedRecipeSchema = z.object({
  recipeId: z.number().int().positive(),
  quantity: z.number().int().min(1).max(99),
});

export type SelectedRecipe = z.infer<typeof SelectedRecipeSchema>;

/**
 * 食材合計（計算結果）
 */
export const IngredientTotalSchema = z.object({
  name: z.string().min(1),
  totalQuantity: z.number().int().nonnegative(),
});

export type IngredientTotal = z.infer<typeof IngredientTotalSchema>;
```

---

## Utility Functions (`apps/web/src/lib/utils/calculator.ts`)

```typescript
import type { Recipe } from "@/lib/schemas/recipe";
import type { SelectedRecipe, IngredientTotal } from "@/lib/schemas/calculator";

/**
 * 選択されたレシピから必要食材の合計を計算
 * @param selectedRecipes 選択されたレシピと数量の配列
 * @param allRecipes 全レシピデータ
 * @returns 食材ごとの合計数（数量の多い順）
 */
export function calculateIngredientTotals(
  selectedRecipes: SelectedRecipe[],
  allRecipes: Recipe[]
): IngredientTotal[];

/**
 * 食材合計の総数を計算
 * @param totals 食材合計配列
 * @returns 全食材の総数
 */
export function getTotalIngredientCount(totals: IngredientTotal[]): number;
```

---

## Components

### 1. IngredientCalculator (メインコンポーネント)

**File**: `apps/web/src/components/calculator/ingredient-calculator.tsx`

```typescript
interface IngredientCalculatorProps {
  /** 全レシピデータ（Server Componentから渡される） */
  initialRecipes: Recipe[];
}
```

**責務**:
- 選択レシピの状態管理 (`selectedRecipes`)
- 検索クエリの状態管理 (`searchQuery`)
- 子コンポーネントへのprops配布
- リセット機能

---

### 2. RecipeSelector (レシピ選択)

**File**: `apps/web/src/components/calculator/recipe-selector.tsx`

```typescript
interface RecipeSelectorProps {
  /** 検索対象のレシピ一覧 */
  recipes: Recipe[];
  /** 既に選択済みのレシピID（重複防止用） */
  selectedRecipeIds: number[];
  /** 検索クエリ */
  searchQuery: string;
  /** 検索クエリ変更ハンドラ */
  onSearchChange: (query: string) => void;
  /** レシピ選択ハンドラ */
  onSelectRecipe: (recipeId: number) => void;
}
```

**責務**:
- 検索入力UI
- フィルタリングされたレシピ表示
- 選択時のコールバック

---

### 3. SelectedRecipeList (選択レシピ一覧)

**File**: `apps/web/src/components/calculator/selected-recipe-list.tsx`

```typescript
interface SelectedRecipeListProps {
  /** 選択されたレシピ情報（レシピデータ + 数量） */
  items: Array<{
    recipe: Recipe;
    quantity: number;
  }>;
  /** 数量変更ハンドラ */
  onQuantityChange: (recipeId: number, quantity: number) => void;
  /** レシピ削除ハンドラ */
  onRemove: (recipeId: number) => void;
}
```

**責務**:
- 選択済みレシピの一覧表示
- 各レシピの数量変更UI
- 削除ボタン

---

### 4. IngredientTotals (食材合計表示)

**File**: `apps/web/src/components/calculator/ingredient-totals.tsx`

```typescript
interface IngredientTotalsProps {
  /** 食材ごとの合計数 */
  totals: IngredientTotal[];
  /** 全食材の総数 */
  grandTotal: number;
}
```

**責務**:
- 食材リスト表示
- 総数表示
- 空状態の表示

---

## Page Component (`apps/web/src/app/calculator/page.tsx`)

```typescript
// Server Component
export default async function CalculatorPage() {
  const recipes = await getAllRecipes();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "食材計算機" }]} />
      <h1 className="text-4xl font-bold mb-8">必要食材計算機</h1>
      <IngredientCalculator initialRecipes={recipes} />
    </div>
  );
}
```

---

## Navigation Link Addition

**File**: `apps/web/src/components/navigation/navigation-links.ts`

```typescript
// 追加するリンク
{
  title: "食材計算機",
  href: "/calculator",
  description: "レシピから必要な食材の合計を計算",
  icon: Calculator, // lucide-react
}
```

---

## State Management Flow

```
IngredientCalculator
├── State
│   ├── selectedRecipes: SelectedRecipe[]
│   └── searchQuery: string
│
├── Derived (useMemo)
│   ├── filteredRecipes: initialRecipes filtered by searchQuery
│   ├── selectedItems: selectedRecipes mapped to { recipe, quantity }
│   ├── ingredientTotals: calculateIngredientTotals(selectedRecipes, initialRecipes)
│   └── grandTotal: getTotalIngredientCount(ingredientTotals)
│
└── Handlers
    ├── handleSearchChange(query: string)
    ├── handleSelectRecipe(recipeId: number)
    ├── handleQuantityChange(recipeId: number, quantity: number)
    ├── handleRemove(recipeId: number)
    └── handleReset()
```

---

## Validation Rules

| Field | Rule | Error Handling |
|-------|------|----------------|
| quantity | 1 ≤ value ≤ 99 | Clamp to bounds |
| recipeId | Must exist in allRecipes | Skip if not found |
| searchQuery | Any string | Trim whitespace |

---

## Accessibility Requirements

- すべてのインタラクティブ要素に適切な `aria-label`
- 数量入力に `aria-describedby` でヘルプテキスト
- リスト更新時の `aria-live` アナウンス
- キーボードナビゲーション対応
