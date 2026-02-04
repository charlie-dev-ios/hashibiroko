# Data Model: きのみ情報一覧

## Entities

### Berry（きのみ）

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| id | number | きのみID（1-18） | int, positive |
| name | string | きのみ名 | min 1 char |
| type | PokemonType | ポケモンタイプ | enum |
| energy | number | 基礎エナジー | positive |

### PokemonType（ポケモンタイプ）

Enum with 18 values:
- normal, fire, water, electric, grass, ice
- fighting, poison, ground, flying, psychic, bug
- rock, ghost, dragon, dark, steel, fairy

## Relationships

- Berry : PokemonType = 1:1（各きのみは1つのタイプに対応）

## State Transitions

N/A - 静的データのため状態遷移なし

## Validation Rules

- Berry.id: 1以上18以下の整数
- Berry.name: 空文字不可
- Berry.type: PokemonType enumの値のみ許可
- Berry.energy: 正の数値
