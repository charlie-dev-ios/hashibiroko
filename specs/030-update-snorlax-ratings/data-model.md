# Data Model: カビゴン評価ランクデータの実データ対応

## Entities

### SnorlaxRankTier (新規)

カビゴン評価の大分類ティア。

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| name | enum | "ノーマル", "スーパー", "ハイパー", "マスター" | ティア名 |

### SnorlaxRank (変更)

各フィールドにおけるカビゴンの評価ランク1段階分のデータ。

**現在のフィールド構成**:

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| rank | SnorlaxRankName | enum of 6 values | ランク名 |
| requiredEnergy | integer | >= 0 | 必要エナジー |
| newPokemonIds | integer[] | each > 0 | 新規出現ポケモンID |

**変更後のフィールド構成**:

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| rankTier | SnorlaxRankTier | enum of 4 values | ランクティア名 |
| rankNumber | integer | 1-5 (ノーマル/スーパー/ハイパー), 1-20 (マスター) | ティア内番号 |
| requiredEnergy | integer | >= 0 | 必要エナジー |
| dreamShards | integer | >= 0 | 報酬（ゆめのかけら数） |
| newPokemonIds | integer[] | each > 0 | 新規出現ポケモンID |

**表示名の導出**: `{rankTier} {rankNumber}`（例：「ノーマル 3」「マスター 15」）

### Island (変更)

| Field | Type | Before | After |
|-------|------|--------|-------|
| snorlaxRanks | SnorlaxRank[] | `.length(6)` | `.length(35)` |

他のフィールド（id, name, description, specialtyBerry, imageUrl）は変更なし。

## State Transitions

なし（静的データ）

## Validation Rules

1. **ランク構造の整合性**: 全フィールドで正確に35ランクを持つこと
2. **ランク順序**: ノーマル1-5 → スーパー1-5 → ハイパー1-5 → マスター1-20 の順序
3. **エナジー単調増加**: requiredEnergy はランク順で厳密に単調増加（ノーマル1の0を除く）
4. **ノーマル1**: requiredEnergy = 0, dreamShards = 0
5. **ティア内番号の範囲**:
   - ノーマル/スーパー/ハイパー: 1-5
   - マスター: 1-20

## Relationships

```
Island 1--* SnorlaxRank (exactly 35 per island)
SnorlaxRank *--1 SnorlaxRankTier
SnorlaxRank *--* Pokemon (via newPokemonIds)
```

## Migration from Current Data

| Before | After |
|--------|-------|
| 6 rank names (ノーマル, いいかんじ, すごいぞ, とてもすごい, ハイパー, マスター) | 4 tier names × numbered (ノーマル1-5, スーパー1-5, ハイパー1-5, マスター1-20) |
| No reward field | dreamShards field added |
| `.length(6)` constraint | `.length(35)` constraint |
| Fictional energy values | Real game data values |

## JSON Data Structure (After)

```json
{
  "islands": [
    {
      "id": 1,
      "name": "ワカクサ本島",
      "description": "...",
      "specialtyBerry": "ランダム",
      "snorlaxRanks": [
        {
          "rankTier": "ノーマル",
          "rankNumber": 1,
          "requiredEnergy": 0,
          "dreamShards": 0,
          "newPokemonIds": []
        },
        {
          "rankTier": "ノーマル",
          "rankNumber": 2,
          "requiredEnergy": 3118,
          "dreamShards": 35,
          "newPokemonIds": []
        },
        ...
      ]
    }
  ]
}
```
