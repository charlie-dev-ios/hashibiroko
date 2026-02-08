# Data Model: フィールド情報コンテンツ追加

**Date**: 2026-02-07
**Feature**: 029-add-field-info-content

## Entities

### Island (フィールド/島)

主要エンティティ。各フィールドのすべての情報を保持する。

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | number (int, positive) | Yes | 一意のフィールドID |
| name | string (min 1) | Yes | フィールド名（例: "ワカクサ本島"） |
| description | string | Yes | フィールドの説明文 |
| specialtyBerry | string | Yes | とくいきのみ名。ランダムの場合は `"ランダム"` |
| snorlaxRanks | SnorlaxRank[] | Yes | カビゴン評価ランクごとの情報（6段階） |
| imageUrl | string (url) | No | フィールド画像URL |

### SnorlaxRank (カビゴン評価ランク)

Island内にネストされるサブエンティティ。各評価ランクの情報を保持する。

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| rank | SnorlaxRankName | Yes | 評価ランク名 |
| requiredEnergy | number (int, non-negative) | Yes | 必要エナジー量 |
| newPokemonIds | number[] (int, positive) | Yes | そのランクで新規に出現するポケモンID配列 |

### SnorlaxRankName (カビゴン評価ランク名)

列挙型。6段階の固定値。

```
"ノーマル" | "いいかんじ" | "すごいぞ" | "とてもすごい" | "ハイパー" | "マスター"
```

## Relationships

```
Island 1──* SnorlaxRank (ネスト、配列として保持)
SnorlaxRank *──* Pokemon (newPokemonIds → pokemon.json の id で参照)
Island *──1 Berry (specialtyBerry → berries.ts の name で参照、ランダムの場合は参照なし)
```

## Validation Rules

- `id`: 正の整数、全フィールドで一意
- `name`: 1文字以上の文字列
- `specialtyBerry`: 空文字列不可。`"ランダム"` または既存のきのみ名
- `snorlaxRanks`: 正確に6要素の配列（ノーマル〜マスターの順序）
- `snorlaxRanks[].requiredEnergy`: 0以上の整数。ランクが上がるにつれ単調増加
- `snorlaxRanks[].newPokemonIds`: 各要素は正の整数。pokemon.json に存在するIDであること

## Data Source

`apps/web/src/content/islands/islands.json` に全フィールドデータをJSON配列として格納。

### サンプルデータ構造

```json
[
  {
    "id": 1,
    "name": "ワカクサ本島",
    "description": "最初に訪れるフィールド。多くのポケモンが生息している。",
    "specialtyBerry": "ランダム",
    "snorlaxRanks": [
      {
        "rank": "ノーマル",
        "requiredEnergy": 0,
        "newPokemonIds": [1, 4, 7, 25, 35, 39]
      },
      {
        "rank": "いいかんじ",
        "requiredEnergy": 16089,
        "newPokemonIds": [50, 52, 54, 56]
      },
      {
        "rank": "すごいぞ",
        "requiredEnergy": 33526,
        "newPokemonIds": [58, 79, 84]
      },
      {
        "rank": "とてもすごい",
        "requiredEnergy": 65764,
        "newPokemonIds": [92, 104, 115]
      },
      {
        "rank": "ハイパー",
        "requiredEnergy": 117524,
        "newPokemonIds": [132, 133, 143]
      },
      {
        "rank": "マスター",
        "requiredEnergy": 206474,
        "newPokemonIds": [149, 196, 197]
      }
    ]
  }
]
```

## Zod Schema (設計)

```typescript
const SnorlaxRankNameSchema = z.enum([
  "ノーマル",
  "いいかんじ",
  "すごいぞ",
  "とてもすごい",
  "ハイパー",
  "マスター",
]);

const SnorlaxRankSchema = z.object({
  rank: SnorlaxRankNameSchema,
  requiredEnergy: z.number().int().nonnegative(),
  newPokemonIds: z.array(z.number().int().positive()),
});

const IslandSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  description: z.string(),
  specialtyBerry: z.string().min(1),
  snorlaxRanks: z.array(SnorlaxRankSchema).length(6),
  imageUrl: z.string().url().optional(),
});
```
