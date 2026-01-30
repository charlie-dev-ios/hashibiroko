# Quickstart: デフォルト食材フィルター選択

**Feature**: 004-default-ingredient-filters
**Date**: 2026-01-30

## Prerequisites

- Node.js / Bun がインストールされていること
- 依存関係がインストールされていること (`bun install`)

## Development Setup

```bash
# リポジトリルートから
cd apps/web

# 開発サーバー起動
bun dev
```

## Implementation Steps

### Step 1: テストの作成 (TDD - Red)

```bash
# テストファイルを作成/更新
# apps/web/tests/unit/components/recipes/recipes-page-content.test.tsx
```

テストケース:
1. 初期状態で全食材が選択されていること
2. 初期状態で全料理が表示されていること
3. 食材のチェックを外すと該当料理のみ表示されること

### Step 2: 実装 (TDD - Green)

変更対象ファイル:
```
apps/web/src/components/recipes/recipes-page-content.tsx
```

変更内容:
```typescript
// Before
const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

// After
const [selectedIngredients, setSelectedIngredients] = useState<string[]>(() =>
  extractIngredients(initialRecipes)
);
```

### Step 3: テスト実行

```bash
# テスト実行
bun run test

# 特定のテストファイルのみ
bun run test recipes-page-content
```

### Step 4: リファクタリング (TDD - Refactor)

コードの整理とパフォーマンス最適化を行う。

## Verification

### Manual Testing

1. http://localhost:3030/recipes にアクセス
2. 食材フィルターを開く
3. 全てのチェックボックスがチェック済みであることを確認
4. 全料理が表示されていることを確認
5. 任意の食材のチェックを外す
6. 料理一覧がフィルタリングされることを確認

### Automated Testing

```bash
# 全テスト実行
bun run test

# カバレッジ確認
bun run test --coverage
```

## Troubleshooting

### よくある問題

**Q: 初期状態で食材が選択されていない**
- `useState`の初期化関数が正しく設定されているか確認
- `extractIngredients`が正しくインポートされているか確認

**Q: フィルタリングが正しく動作しない**
- フィルタリングロジックの条件を確認
- 全選択状態でのスキップ処理を確認
