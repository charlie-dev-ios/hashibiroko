# Quickstart: 料理コンテンツページ開発環境セットアップ

**Date**: 2026-01-04
**Feature**: 料理コンテンツページ実装

## 概要

このガイドでは、料理コンテンツページの開発環境をセットアップし、ローカル開発を開始する手順を説明します。既存のポケモンスリープサイト（`apps/web`）に統合する形で実装します。

**所要時間**: 約5分（既存環境が整っている場合）

---

## 前提条件

### 必須

既存のポケモンスリープサイトが動作していること：
- **Bun**: v1.1.40
- **Node.js**: v20以上（Bunがあれば不要）
- **Git**: バージョン管理

### 確認コマンド

```bash
cd /path/to/hashibiroko
bun --version  # 1.1.40
git branch     # 002-recipe-content ブランチにいることを確認
```

---

## セットアップ手順

### 1. ブランチ確認

```bash
# 002-recipe-contentブランチにいることを確認
git branch

# もし違うブランチにいる場合
git checkout 002-recipe-content
```

---

### 2. 依存関係インストール（既存環境の場合はスキップ可）

```bash
cd apps/web
bun install
```

---

### 3. ディレクトリ構造作成

```bash
# 料理関連ディレクトリを作成
mkdir -p src/components/recipes
mkdir -p src/content/recipes
mkdir -p tests/unit/components/recipes
mkdir -p tests/integration
```

---

### 4. サンプル料理データ作成

`src/content/recipes/recipes.json` を作成：

```json
{
  "recipes": [
    {
      "id": 1,
      "name": "とくせんリンゴジュース",
      "type": "デザート",
      "power": 85,
      "ingredients": [
        { "name": "あまいミツ", "quantity": 7 }
      ],
      "effect": "おてつだい時間短縮",
      "imageUrl": "/images/recipes/apple-juice.png"
    },
    {
      "id": 2,
      "name": "マメバーグカレー",
      "type": "カレー",
      "power": 1560,
      "ingredients": [
        { "name": "マメミート", "quantity": 7 },
        { "name": "とくせんエッグ", "quantity": 4 }
      ],
      "effect": "エナジー獲得量アップ",
      "imageUrl": "/images/recipes/bean-burger-curry.png"
    },
    {
      "id": 3,
      "name": "とくせんフルーツサラダ",
      "type": "サラダ",
      "power": 450,
      "ingredients": [
        { "name": "あまいミツ", "quantity": 3 },
        { "name": "モモのみ", "quantity": 8 },
        { "name": "ウブのみ", "quantity": 5 }
      ],
      "effect": "おてつだいスピード up",
      "imageUrl": "/images/recipes/fruit-salad.png"
    }
  ]
}
```

---

### 5. 開発サーバー起動

```bash
bun run dev
```

ブラウザで http://localhost:3030 を開く

---

### 6. テスト実行確認

```bash
# 全テスト実行
bun run test

# ウォッチモード（開発中）
bun run test:watch
```

---

## 開発ワークフロー（TDD）

### Red-Green-Refactorサイクル

#### 1. Red: テストを書く（失敗）

```typescript
// tests/unit/lib/data/recipes.test.ts
import { describe, it, expect } from 'vitest';
import { getAllRecipes } from '@/lib/data/recipes';

describe('Recipe Data API', () => {
  it('should return all recipes', async () => {
    const recipes = await getAllRecipes();
    expect(recipes).toBeInstanceOf(Array);
    expect(recipes.length).toBeGreaterThan(0);
  });
});
```

```bash
bun run test  # テスト失敗を確認（関数未実装）
```

#### 2. Green: 実装する（成功）

```typescript
// src/lib/data/recipes.ts
import fs from 'fs/promises';
import path from 'path';
import { RecipeSchema, type Recipe } from '@/lib/schemas/recipe';
import { z } from 'zod';

const RECIPES_FILE = path.join(process.cwd(), 'src/content/recipes/recipes.json');

export async function getAllRecipes(): Promise<Recipe[]> {
  const data = await fs.readFile(RECIPES_FILE, 'utf-8');
  const parsed = JSON.parse(data);

  const result = z.array(RecipeSchema).safeParse(parsed.recipes);

  if (!result.success) {
    throw new Error(`Recipe data validation failed: ${result.error.message}`);
  }

  return result.data;
}
```

```bash
bun run test  # テスト成功を確認
```

#### 3. Refactor: リファクタリング

コードを改善（テストは継続的にパス）

---

## ディレクトリ構造（実装後）

```text
apps/web/
├── src/
│   ├── app/
│   │   └── recipes/
│   │       └── page.tsx              # 料理一覧ページ
│   ├── components/
│   │   └── recipes/
│   │       ├── recipe-card.tsx       # 料理カード
│   │       ├── recipe-list.tsx       # 料理一覧
│   │       └── recipe-filter.tsx     # フィルターUI
│   ├── lib/
│   │   ├── schemas/
│   │   │   └── recipe.ts             # RecipeSchema（既存）
│   │   └── data/
│   │       └── recipes.ts            # 料理データアクセス
│   └── content/
│       └── recipes/
│           └── recipes.json          # 料理データ
└── tests/
    ├── unit/
    │   ├── lib/data/recipes.test.ts
    │   └── components/recipes/
    └── integration/
        └── recipes-page.test.tsx
```

---

## 実装フェーズ

### Phase 1: データ層（P1 - MVP）
1. サンプルデータ作成 ✓（上記手順4で完了）
2. `getAllRecipes()` 実装
3. `getRecipeById()` 実装
4. ユニットテスト作成

### Phase 2: 基本UI（P1 - MVP）
1. RecipeCard コンポーネント
2. RecipeList コンポーネント
3. 料理ページ（`app/recipes/page.tsx`）
4. コンポーネントテスト

### Phase 3: 種別フィルター（P2）
1. フィルター関数実装
2. RecipeFilter コンポーネント
3. ページ統合
4. 統合テスト

### Phase 4-6: 詳細は plan.md 参照

---

## トラブルシューティング

### Bunのインストールエラー

```bash
# キャッシュクリア
bun pm cache rm

# 再インストール
bun install
```

### Next.jsのビルドエラー

```bash
# .next ディレクトリを削除
rm -rf .next

# 再ビルド
bun run build
```

### テストが失敗する

```bash
# テストキャッシュクリア
rm -rf node_modules/.vite

# 再実行
bun run test
```

### 型エラーが出る

```bash
# TypeScript型チェック
bun run build

# tsconfig.json を確認
cat tsconfig.json
```

---

## 次のステップ

1. **Phase 1開始**: `src/lib/data/recipes.ts` を作成し、データアクセス関数を実装
2. **TDD実践**: テストを先に書いてから実装
3. **コミット**: 各フェーズごとにコミット（Conventional Commits準拠）

```bash
# 例: Phase 1完了後
git add .
git commit -m "feat(recipes): 料理データアクセス層を実装

- getAllRecipes() 実装
- getRecipeById() 実装
- Zodバリデーション追加
- ユニットテスト作成

🤖 Generated with Claude Code
Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## 参考リンク

- [Next.js 16 ドキュメント](https://nextjs.org/docs)
- [shadcn/ui ドキュメント](https://ui.shadcn.com/docs)
- [Zod ドキュメント](https://zod.dev/)
- [Vitest ドキュメント](https://vitest.dev/)
- [Bun ドキュメント](https://bun.sh/docs)

---

## まとめ

これで、料理コンテンツページの開発環境が完全にセットアップされました。TDDサイクル（Red-Green-Refactor）に従い、Phase 1 から実装を開始できます。

**Ready to code**: ✅ 環境セットアップ完了、実装開始可能
