# Data Model: 食材情報閲覧

**Feature**: 006-ingredient-list
**Date**: 2026-02-03

## Entities

### Ingredient

食材を表すエンティティ。

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | number | Yes | 一意識別子（1から始まる連番） |
| name | string | Yes | 食材名（日本語） |
| energy | number | Yes | 基本エナジー値（0以上の整数） |
| imageUrl | string | No | アイコン画像のパス |

### Validation Rules

- `id`: 正の整数
- `name`: 1文字以上の文字列
- `energy`: 0以上の整数
- `imageUrl`: 省略可能、設定時は有効なパス文字列

### Zod Schema

```typescript
import { z } from "zod";

export const IngredientSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  energy: z.number().int().nonnegative(),
  imageUrl: z.string().optional(),
});

export type Ingredient = z.infer<typeof IngredientSchema>;
```

## Data Source

### ingredients.json

```json
{
  "ingredients": [
    {
      "id": 1,
      "name": "げきからハーブ",
      "energy": 130
    },
    {
      "id": 2,
      "name": "マメミート",
      "energy": 103
    }
    // ... 他の食材
  ]
}
```

## Relationships

- **Ingredient → Recipe**: 1つの食材は複数のレシピで使用される（現在は外部キー関係なし、名前で参照）

## State Transitions

該当なし（静的データ、状態変化なし）
