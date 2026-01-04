# Data Model: 料理コンテンツページ

**Date**: 2026-01-04
**Feature**: 料理コンテンツページ実装

## 概要

このドキュメントでは、料理コンテンツページで使用するデータエンティティとスキーマを定義します。既存のポケモンスリープサイトで定義されているRecipeスキーマを活用し、必要に応じて拡張します。すべてのデータはファイルベース（JSON）で管理され、Zodスキーマによってバリデーションされます。

---

## エンティティ一覧

1. **Recipe（料理）** - 料理の基本情報（既存スキーマを活用）
2. **Ingredient（食材）** - 料理に必要な食材（新規定義）
3. **RecipeType（料理種別）** - カレー・シチュー、サラダ、デザート（既存 enum）

---

## 1. Recipe（料理）

### 説明
クッキングレシピ。料理の種別、エネルギー（パワー）、必要な食材、効果を含む。

### 既存スキーマ（`apps/web/src/lib/schemas/recipe.ts`）

```typescript
import { z } from 'zod';

export const RecipeSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1), // 例: "とくせんリンゴジュース"
  type: z.enum(['カレー', 'サラダ', 'デザート', 'ドリンク']),
  power: z.number().positive(), // 料理パワー（エナジー）
  ingredients: z.array(z.object({
    name: z.string(),
    quantity: z.number().int().positive(),
  })),
  effect: z.string(), // 効果説明
  imageUrl: z.string().url().optional(),
});

export type Recipe = z.infer<typeof RecipeSchema>;
```

### 仕様との対応関係

| 仕様要件 | スキーマフィールド | 備考 |
|---------|----------------|------|
| 料理の画像 | `imageUrl` | オプショナル、プレースホルダー対応必要 |
| 料理名 | `name` | 必須 |
| エナジー | `power` | 仕様では「エナジー」、既存では「パワー」 |
| 必要食材の列挙 | `ingredients[]` | 配列で複数食材対応 |
| 必要食材の総数 | 計算フィールド | `ingredients.reduce((sum, i) => sum + i.quantity, 0)` |

### 修正・拡張の必要性

**修正不要**: 既存スキーマで仕様を満たせる
- `type` enum に「カレー・シチュー」がないが、既存の `'カレー'` を「カレー・シチュー」として扱う
- 仕様の3種別（カレー・シチュー、サラダ、デザート）は既存の `type` enum でカバー可能
  - 「カレー」→「カレー・シチュー」
  - 「サラダ」→ そのまま
  - 「デザート」→ そのまま
  - 「ドリンク」→ 今回は使用しない（または「デザート」に含める）

### サンプルデータ

```json
{
  "id": 1,
  "name": "とくせんリンゴジュース",
  "type": "デザート",
  "power": 85,
  "ingredients": [
    { "name": "あまいミツ", "quantity": 7 }
  ],
  "effect": "おてつだい時間短縮",
  "imageUrl": "/images/recipes/apple-juice.png"
}
```

```json
{
  "id": 2,
  "name": "マメバーグカレー",
  "type": "カレー",
  "power": 1560,
  "ingredients": [
    { "name": "マメミート", "quantity": 7 },
    { "name": "とくせんエッグ", "quantity": 4 }
  ],
  "effect": "エナジー獲得量アップ",
  "imageUrl": "/images/recipes/bean-burger-curry.png"
}
```

### バリデーションルール
- `id`: 正の整数、ユニーク
- `name`: 1文字以上の文字列
- `type`: `'カレー'`, `'サラダ'`, `'デザート'`, `'ドリンク'` のいずれか
- `power`: 正の数値
- `ingredients`: 少なくとも1つの食材を含む配列
- `ingredients[].quantity`: 正の整数

---

## 2. Ingredient（食材）

### 説明
料理に必要な食材の種類。食材フィルターで使用する選択肢リストを生成するために必要。

### スキーマ

```typescript
export const IngredientSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1), // 例: "あまいミツ", "マメミート"
  description: z.string().optional(), // 食材の説明
  imageUrl: z.string().url().optional(),
});

export type Ingredient = z.infer<typeof IngredientSchema>;
```

### データソース

食材データは2つの方法で管理可能：

**Option A: 専用JSONファイル（推奨）**
- `apps/web/src/content/ingredients/ingredients.json`
- 食材のメタデータ（説明、画像）を含む

**Option B: Recipeから動的抽出**
- `recipes.json` から `ingredients[].name` を抽出
- メタデータなし、シンプル

**決定**: Option B（シンプルさ優先）
- 初期実装では `recipes.json` から食材名を抽出
- 将来的に食材詳細が必要になった場合のみ Option A に移行

### サンプルデータ（Option A の場合）

```json
{
  "id": 1,
  "name": "あまいミツ",
  "description": "甘くて栄養豊富な蜜",
  "imageUrl": "/images/ingredients/honey.png"
}
```

---

## 3. RecipeType（料理種別）

### 説明
料理の種別を表す列挙型。フィルター選択肢として使用。

### 定義

```typescript
export const RecipeTypeSchema = z.enum(['カレー', 'サラダ', 'デザート', 'ドリンク']);
export type RecipeType = z.infer<typeof RecipeTypeSchema>;
```

### 仕様との対応

| 仕様の種別 | スキーマの値 | 表示名 |
|---------|---------|------|
| カレー・シチュー | `'カレー'` | 「カレー・シチュー」 |
| サラダ | `'サラダ'` | 「サラダ」 |
| デザート | `'デザート'` | 「デザート」 |

**Note**: UI上では `'カレー'` を「カレー・シチュー」と表示

---

## データフロー

### 1. データ読み込みフロー

```
recipes.json
  ↓
getAllRecipes() (lib/data/recipes.ts)
  ↓
Zodバリデーション (RecipeSchema)
  ↓
Recipe[] オブジェクト
  ↓
RecipeListコンポーネント
```

### 2. 食材リスト抽出フロー

```
recipes.json
  ↓
getAllRecipes()
  ↓
Recipe[] オブジェクト
  ↓
extractIngredients() (lib/data/recipes.ts)
  ↓
string[] (ユニークな食材名のリスト)
  ↓
RecipeFilterコンポーネント（選択肢として表示）
```

### 3. フィルタリングフロー

```
ユーザー入力（種別 + 食材選択）
  ↓
filterRecipes(recipes, { type?, ingredients? })
  ↓
フィルター済みRecipe[]
  ↓
RecipeListコンポーネント（再表示）
```

---

## ファイル配置

### データファイル
```
apps/web/src/content/recipes/
└── recipes.json        # 料理データ（30-50レシピ）
```

### スキーマファイル
```
apps/web/src/lib/schemas/
└── recipe.ts           # RecipeSchema（既存）
```

### データアクセス層
```
apps/web/src/lib/data/
└── recipes.ts          # 料理データ取得・フィルター関数（新規）
```

---

## データアクセス関数

### `getAllRecipes(): Promise<Recipe[]>`
すべての料理を取得し、Zodでバリデーション

### `getRecipeById(id: number): Promise<Recipe | null>`
IDで特定の料理を取得

### `extractIngredients(recipes: Recipe[]): string[]`
すべての料理から食材名のユニークリストを抽出

### `filterRecipes(recipes: Recipe[], options: FilterOptions): Recipe[]`
種別・食材でフィルタリング

```typescript
interface FilterOptions {
  type?: RecipeType;       // 種別フィルター
  ingredients?: string[];  // 食材フィルター（AND条件: すべて含む）
}
```

### `getTotalIngredientCount(recipe: Recipe): number`
料理の必要食材総数を計算

```typescript
const getTotalIngredientCount = (recipe: Recipe): number => {
  return recipe.ingredients.reduce((sum, ing) => sum + ing.quantity, 0);
};
```

---

## サンプルレシピデータ（recipes.json）

```json
{
  "recipes": [
    {
      "id": 1,
      "name": "とくせんリンゴジュース",
      "type": "デザート",
      "power": 85,
      "ingredients": [
        { "name": "あまいミツ", "quantity": 7 }
      ],
      "effect": "おてつだい時間短縮",
      "imageUrl": "/images/recipes/apple-juice.png"
    },
    {
      "id": 2,
      "name": "マメバーグカレー",
      "type": "カレー",
      "power": 1560,
      "ingredients": [
        { "name": "マメミート", "quantity": 7 },
        { "name": "とくせんエッグ", "quantity": 4 }
      ],
      "effect": "エナジー獲得量アップ",
      "imageUrl": "/images/recipes/bean-burger-curry.png"
    },
    {
      "id": 3,
      "name": "とくせんフルーツサラダ",
      "type": "サラダ",
      "power": 450,
      "ingredients": [
        { "name": "あまいミツ", "quantity": 3 },
        { "name": "モモのみ", "quantity": 8 },
        { "name": "ウブのみ", "quantity": 5 }
      ],
      "effect": "おてつだいスピード up",
      "imageUrl": "/images/recipes/fruit-salad.png"
    }
  ]
}
```

---

## まとめ

- **既存スキーマ活用**: RecipeSchema（既存）をそのまま使用、修正不要
- **シンプルなアプローチ**: 食材は料理データから動的抽出、専用マスタ不要
- **型安全性**: Zodスキーマで厳格なバリデーション
- **拡張性**: 将来的に食材マスタや料理詳細ページを追加可能
