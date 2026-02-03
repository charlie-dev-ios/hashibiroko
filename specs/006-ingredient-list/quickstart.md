# Quickstart: 食材情報閲覧

**Feature**: 006-ingredient-list

## 開発開始手順

### 1. 環境確認

```bash
cd /home/user/hashibiroko
bun install
```

### 2. 開発サーバー起動

```bash
cd apps/web
bun dev
```

### 3. テスト実行

```bash
cd apps/web
bun run test
```

## 実装順序

1. **スキーマ作成** - `lib/schemas/ingredient.ts`
2. **データファイル作成** - `content/ingredients/ingredients.json`
3. **データ取得関数作成** - `lib/data/ingredients.ts`
4. **コンポーネント作成** - `components/ingredients/`
5. **ページ更新** - `app/ingredients/page.tsx`

## 確認方法

1. http://localhost:3030/ingredients にアクセス
2. 食材一覧が表示されることを確認
3. 各食材に名前とエナジー値が表示されることを確認

## 関連ファイル

- 参考実装: `components/recipes/` （同様のリストパターン）
- ナビゲーション: `components/navigation/navigation-links.ts`
- レシピデータ: `content/recipes/recipes.json`
