# Component Contracts: フィールド情報

**Date**: 2026-02-07

## IslandList

フィールドカードのグリッド一覧。

```typescript
interface IslandListProps {
  islands: Island[];
}
```

- **Rendering**: Server Component
- **Layout**: レスポンシブグリッド（1列 → md:2列 → lg:3列）
- **Empty state**: フィールドがない場合は案内メッセージ表示
- **Test**: データ0件/1件/複数件での表示確認

## IslandCard

フィールド一覧の各カード。

```typescript
interface IslandCardProps {
  island: Island;
}
```

- **Rendering**: Server Component（Link付き）
- **Display**: フィールド名、とくいきのみ
- **Link**: `/islands/{island.id}` へ遷移
- **Accessibility**: role="article", aria-label, data-testid
- **Test**: 固定きのみ/ランダムきのみの表示分岐

## IslandDetail

フィールド詳細の全情報表示。

```typescript
interface IslandDetailProps {
  island: Island;
  pokemonMap: Map<number, { id: number; name: string }>;
}
```

- **Rendering**: Server Component
- **Sections**:
  1. フィールド名 + 説明
  2. とくいきのみ情報
  3. カビゴン評価テーブル（SnorlaxRankTable）
  4. ランク別出現ポケモン（RankPokemonList）
- **Test**: 全セクションの表示確認

## SnorlaxRankTable

カビゴン評価ランクごとの必要エナジー一覧テーブル。

```typescript
interface SnorlaxRankTableProps {
  ranks: SnorlaxRank[];
}
```

- **Rendering**: Server Component
- **Display**: テーブル形式（ランク名 | 必要エナジー）
- **Format**: エナジー値はカンマ区切り表示（例: 16,089）
- **Test**: 6ランク全てが正しい順序で表示されること

## RankPokemonList

カビゴン評価ランクごとの出現ポケモン一覧（差分表示）。

```typescript
interface RankPokemonListProps {
  ranks: SnorlaxRank[];
  pokemonMap: Map<number, { id: number; name: string }>;
}
```

- **Rendering**: Server Component
- **Display**: ランクごとにセクション分け、各ポケモンはリンク付きで表示
- **Link**: 各ポケモン → `/pokemon/{pokemonId}`
- **Empty**: 新規出現ポケモンがいないランクは「なし」と表示
- **Test**: ポケモンリンクの正確性、空ランクの表示
