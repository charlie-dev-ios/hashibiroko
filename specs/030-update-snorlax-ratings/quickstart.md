# Quickstart: カビゴン評価ランクデータの実データ対応

## Overview

カビゴン評価ランクデータを実際のポケモンスリープのゲームデータに合わせて更新する。主な変更は以下の3点：

1. **スキーマ変更**: 6段階の独自ランク名 → 4ティア×番号の35段階
2. **報酬フィールド追加**: 各ランクにゆめのかけら報酬を追加
3. **データ更新**: 全6フィールドの必要エナジー・報酬を実ゲームデータに更新

## Implementation Order (TDD)

Constitution（TDD非交渉）に従い、テスト先行で進める。

### Step 1: スキーマ変更 + テスト

1. `island.test.ts` を新しいスキーマ構造に合わせて更新（Red）
2. `island.ts` のZodスキーマを更新（Green）
   - `SnorlaxRankNameSchema` → `SnorlaxRankTierSchema`（4値enum）
   - `SnorlaxRankSchema` に `rankNumber`, `dreamShards` を追加、`rank` → `rankTier` にリネーム
   - `IslandSchema` の `.length(6)` → `.length(35)`

### Step 2: JSONデータ更新

1. `islands.json` を全6フィールド × 35ランクの実データで更新
2. `islands.test.ts`（データアクセス層テスト）を新構造に合わせて更新

### Step 3: コンポーネント更新 + テスト

1. `snorlax-rank-table.test.tsx` を新構造に合わせて更新（Red）
2. `snorlax-rank-table.tsx` を更新（Green）
   - ランク名カラム: `{rankTier} {rankNumber}` 表示
   - 報酬カラム追加: ゆめのかけら数を表示
3. `rank-pokemon-list.test.tsx` を新構造に合わせて更新（Red）
4. `rank-pokemon-list.tsx` を更新（Green）
   - keyをティア+番号に変更

## Key Files

| File | Change |
|------|--------|
| `apps/web/src/lib/schemas/island.ts` | スキーマ全面更新 |
| `apps/web/src/content/islands/islands.json` | 全データ更新（210エントリ） |
| `apps/web/src/components/islands/snorlax-rank-table.tsx` | 報酬カラム追加、ランク名表示変更 |
| `apps/web/src/components/islands/rank-pokemon-list.tsx` | キー変更 |
| `apps/web/tests/unit/lib/schemas/island.test.ts` | テスト全面更新 |
| `apps/web/tests/unit/lib/data/islands.test.ts` | テストデータ更新 |
| `apps/web/tests/unit/components/islands/snorlax-rank-table.test.tsx` | テスト更新 |
| `apps/web/tests/unit/components/islands/rank-pokemon-list.test.tsx` | テスト更新 |

## Verification

```bash
# テスト実行
cd apps/web && bun run test

# 型チェック
bun run typecheck

# ビルド確認
bun run build
```
