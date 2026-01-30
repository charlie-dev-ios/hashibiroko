# Quickstart: 鍋容量フィルター

**Date**: 2026-01-30
**Feature**: 004-pot-capacity-filter

## 概要

料理一覧画面で鍋の容量（食材数）を指定し、その数以下の料理のみを表示するフィルター機能。

## 前提条件

- Node.js 20+
- Bun 1.1.40+
- 開発環境セットアップ済み

## セットアップ

```bash
# リポジトリルートで
bun install
cd apps/web
```

## 開発フロー (TDD)

### 1. ユーティリティ関数のテスト・実装

```bash
# テスト実行（監視モード）
bun run test -- --watch apps/web/tests/unit/lib/utils/recipe-utils.test.ts
```

**ステップ:**
1. `filterRecipesByPotCapacity` のテストを追加
2. テスト失敗を確認 (Red)
3. `recipe-utils.ts` に関数を実装
4. テスト成功を確認 (Green)
5. リファクタリング

### 2. 定数ファイル作成

```bash
# apps/web/src/lib/constants/pot-capacity.ts を作成
```

プリセット値の定義:
- Lv.1: 15
- Lv.2: 21
- Lv.3: 27
- Lv.4: 33
- Lv.5: 39
- Lv.6: 45
- Lv.7: 51
- Lv.8: 57

### 3. RecipeFilter コンポーネント拡張

```bash
# テスト実行
bun run test -- --watch apps/web/tests/unit/components/recipes/recipe-filter.test.tsx
```

**追加UI:**
- 鍋容量入力フィールド
- プリセットボタン群
- フィルター状態表示

### 4. RecipesPageContent 統合

```bash
# 統合テスト
bun run test -- --watch apps/web/tests/unit/components/recipes/
```

**追加状態:**
- `potCapacity: number | null`
- フィルターロジックに鍋容量条件を追加

## 動作確認

```bash
# 開発サーバー起動
bun dev

# ブラウザで確認
open http://localhost:3030/recipes
```

## テスト実行

```bash
# 全テスト実行
bun run test

# カバレッジ付き
bun run test -- --coverage

# 特定ファイルのみ
bun run test -- apps/web/tests/unit/lib/utils/recipe-utils.test.ts
```

## ファイル変更一覧

| ファイル | 変更種別 | 内容 |
|----------|----------|------|
| `src/lib/constants/pot-capacity.ts` | 新規 | プリセット定数 |
| `src/lib/utils/recipe-utils.ts` | 変更 | フィルター関数追加 |
| `src/components/recipes/recipe-filter.tsx` | 変更 | 鍋容量UI追加 |
| `src/components/recipes/recipes-page-content.tsx` | 変更 | 状態管理追加 |
| `tests/unit/lib/utils/recipe-utils.test.ts` | 変更 | テスト追加 |
| `tests/unit/components/recipes/recipe-filter.test.tsx` | 変更 | テスト追加 |

## トラブルシューティング

### フィルターが動作しない
- `potCapacity` が `null` または `0` 以下でないか確認
- `ingredientCount` フィールドがRecipeデータに存在するか確認

### プリセットボタンが表示されない
- `POT_CAPACITY_PRESETS` がimportされているか確認
- コンポーネントのpropsが正しく渡されているか確認

### テストが失敗する
- `bun install` で依存関係を更新
- Vitestのキャッシュをクリア: `bun run test -- --clearCache`
