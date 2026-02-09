# Data Model: せいかく一覧ページ

## Entities

### Nature（せいかく）

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| name | string | せいかく名（例: さみしがり） | 必須、1文字以上 |
| increasedStat | NatureStat | 上昇するパラメータ | 必須、5種のenum値 |
| decreasedStat | NatureStat | 下降するパラメータ | 必須、5種のenum値 |

### NatureStat（パラメータ種別）

enum型。以下の5値:

| Value | Label | Description |
|-------|-------|-------------|
| `helpingSpeed` | おてつだいスピード | おてつだい時間の速さ |
| `ingredientRate` | 食材お手伝い確率 | 食材を見つける確率 |
| `mainSkillRate` | メインスキル発動確率 | メインスキルが発動する確率 |
| `expGain` | EXP獲得量 | 獲得経験値の量 |
| `energyRecovery` | げんき回復量 | げんき回復の量 |

### StatEffect（パラメータ補正効果）

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| stat | NatureStat | 対象パラメータ | 必須 |
| label | string | パラメータの日本語表示名 | 必須 |
| increasedEffect | string | 上昇時の効果説明 | 必須 |
| decreasedEffect | string | 下降時の効果説明 | 必須 |

## Relationships

- 各 Nature は `increasedStat` と `decreasedStat` で NatureStat を参照
- `increasedStat === decreasedStat` の場合は無補正せいかく（対角線）
- 25個の Nature で 5×5 の全組み合わせをカバー

## JSON Data Structure

```json
{
  "natures": [
    { "name": "さみしがり", "increasedStat": "helpingSpeed", "decreasedStat": "ingredientRate" },
    ...
  ],
  "statEffects": [
    {
      "stat": "helpingSpeed",
      "label": "おてつだいスピード",
      "increasedEffect": "おてつだい時間が約2%短縮",
      "decreasedEffect": "おてつだい時間が約2%延長"
    },
    ...
  ]
}
```
