# Data Model: 鍋容量フィルター

**Date**: 2026-01-30
**Feature**: 004-pot-capacity-filter

## Entities

### Recipe (既存 - 変更なし)

既存のRecipeエンティティを変更せずに使用。`ingredientCount` フィールドがフィルターの基準。

```typescript
// apps/web/src/lib/schemas/recipe.ts - 既存定義
interface Recipe {
  id: number;
  name: string;
  type: RecipeType;        // "カレー" | "サラダ" | "デザート" | "ドリンク"
  ingredientCount: number; // ← フィルター対象
  energy: number;
  power: number;           // energyのエイリアス
  ingredients: {
    name: string;
    quantity: number;
  }[];
  imageUrl?: string;
  effect?: string;
}
```

### Pot Capacity Preset (新規 - 定数)

```typescript
// apps/web/src/lib/constants/pot-capacity.ts - 新規作成
interface PotCapacityPreset {
  level: number;    // 1-8
  capacity: number; // 15, 21, 27, 33, 39, 45, 51, 57
  label: string;    // "Lv.1 (15)" 等
}

const POT_CAPACITY_PRESETS: PotCapacityPreset[] = [
  { level: 1, capacity: 15, label: "Lv.1 (15)" },
  { level: 2, capacity: 21, label: "Lv.2 (21)" },
  { level: 3, capacity: 27, label: "Lv.3 (27)" },
  { level: 4, capacity: 33, label: "Lv.4 (33)" },
  { level: 5, capacity: 39, label: "Lv.5 (39)" },
  { level: 6, capacity: 45, label: "Lv.6 (45)" },
  { level: 7, capacity: 51, label: "Lv.7 (51)" },
  { level: 8, capacity: 57, label: "Lv.8 (57)" },
];
```

### Filter State (コンポーネント状態)

```typescript
// recipes-page-content.tsx の状態拡張
interface RecipeFilterState {
  selectedType: RecipeType | null;          // 既存
  selectedIngredients: string[];            // 既存
  potCapacity: number | null;               // 新規追加
}
```

## Relationships

```
┌─────────────────────┐
│   RecipeFilterState │
│   (Component State) │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐     フィルター適用
│      Recipe[]       │ ◄──────────────────
│   (Data Source)     │
└─────────────────────┘
          │
          │ ingredientCount <= potCapacity
          ▼
┌─────────────────────┐
│  Filtered Recipe[]  │
│   (Display Data)    │
└─────────────────────┘
```

## Validation Rules

### Pot Capacity Input

| ルール | 条件 | 結果 |
|--------|------|------|
| 空値 | `potCapacity === null` | フィルターなし（全表示） |
| ゼロ以下 | `potCapacity <= 0` | フィルターなし（全表示） |
| 正の整数 | `potCapacity > 0` | フィルター適用 |
| 非整数 | 小数点入力 | 整数に切り捨て（HTMLネイティブ） |

### Filter Logic

```typescript
// フィルター適用ロジック（AND条件）
filteredRecipes = initialRecipes
  .filter(r => selectedType === null || r.type === selectedType)
  .filter(r => selectedIngredients.length === 0 || hasAllIngredients(r, selectedIngredients))
  .filter(r => potCapacity === null || potCapacity <= 0 || r.ingredientCount <= potCapacity);
```

## State Transitions

### Filter State Machine

```
                          ┌──────────────────┐
                          │   Initial State  │
                          │ potCapacity=null │
                          └────────┬─────────┘
                                   │
           ┌───────────────────────┼───────────────────────┐
           │                       │                       │
           ▼                       ▼                       ▼
   ┌───────────────┐      ┌───────────────┐      ┌───────────────┐
   │ Input Number  │      │ Click Preset  │      │ Clear Filter  │
   │ potCapacity=N │      │ potCapacity=P │      │ potCapacity=  │
   └───────┬───────┘      └───────┬───────┘      │     null      │
           │                       │              └───────────────┘
           ▼                       ▼                       ▲
   ┌───────────────────────────────────────┐               │
   │         Filtered State                │───────────────┘
   │   potCapacity = N (N > 0)             │  (on clear)
   └───────────────────────────────────────┘
```

## Data Constraints

### Recipe Data Constraints (既存データから導出)

| 制約 | 値 | 備考 |
|------|-----|------|
| 最小 ingredientCount | 0 | ごちゃまぜ系料理 |
| 最大 ingredientCount | 115 | しんりょくアボカドグラタン |
| 料理総数 | 77 | 全レシピ数 |

### Pot Capacity Constraints

| 制約 | 値 | 備考 |
|------|-----|------|
| 最小プリセット | 15 | Lv.1 |
| 最大プリセット | 57 | Lv.8 (Max) |
| 入力最小値 | 1 | HTML input min属性 |
| 入力最大値 | 制限なし | 999でも入力可能 |
