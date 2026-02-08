# Quickstart: フィールド情報コンテンツ追加

**Date**: 2026-02-07
**Feature**: 029-add-field-info-content

## Prerequisites

- Bun 1.1.40+
- Node.js (Next.js 16互換)

## Setup

```bash
cd /home/user/hashibiroko
bun install
```

## Development

```bash
# 開発サーバー起動（ポート3030）
cd apps/web && bun dev
```

ブラウザで `http://localhost:3030/islands` にアクセスしてフィールド一覧を確認。

## Testing

```bash
# ユニットテスト実行
cd apps/web && bun run test

# 特定テストのみ
cd apps/web && bun run test -- --grep "island"

# Lint/Format チェック
bun check
```

## Implementation Order

1. **IslandSchema拡張** (`lib/schemas/island.ts`) — Zodスキーマを更新
2. **islands.jsonデータ作成** (`content/islands/islands.json`) — 全フィールドデータ
3. **データアクセス関数** (`lib/data/islands.ts`) — getAllIslands, getIslandById
4. **IslandCard + IslandList** (`components/islands/`) — 一覧表示コンポーネント
5. **島ガイド一覧ページ** (`app/islands/page.tsx`) — 既存プレースホルダーを置換
6. **SnorlaxRankTable** (`components/islands/`) — カビゴン評価テーブル
7. **RankPokemonList** (`components/islands/`) — ランク別出現ポケモン
8. **IslandDetail** (`components/islands/`) — 詳細統合コンポーネント
9. **フィールド詳細ページ** (`app/islands/[id]/page.tsx`) — 動的ルート

各ステップでTDD（テスト先行）を遵守すること。

## Key Files

| File | Purpose |
|------|---------|
| `src/lib/schemas/island.ts` | Zodスキーマ定義（既存→拡張） |
| `src/content/islands/islands.json` | フィールドデータ（新規） |
| `src/lib/data/islands.ts` | データアクセス関数（新規） |
| `src/components/islands/*.tsx` | UIコンポーネント群（新規） |
| `src/app/islands/page.tsx` | 一覧ページ（既存→置換） |
| `src/app/islands/[id]/page.tsx` | 詳細ページ（新規） |
