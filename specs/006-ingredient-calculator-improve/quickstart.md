# Quickstart: 必要食材数計算機の改善

## 概要

既存の必要食材数計算機のUIを改善し、以下の機能を追加する：
1. レシピ一覧での直接数量指定
2. 鍋容量フィルター
3. 料理カードの視認性向上（エナジー表示）
4. 合計エナジー表示

## 前提条件

- 既存の計算機コンポーネントが動作している
- 開発環境がセットアップ済み（bun install完了）

## 開発手順

### 1. 開発サーバー起動

```bash
cd apps/web
bun dev
```

ブラウザで http://localhost:3030/calculator を開く

### 2. 実装順序

TDDに従い、以下の順序で実装：

#### Step 1: 計算ロジックの追加
- `apps/web/src/lib/utils/calculator.ts`に`calculateTotalEnergy`関数を追加
- テストを先に書いてから実装

#### Step 2: RecipeSelectorの改修
- 数量変更UIの追加（+/-ボタン、数値入力）
- エナジー表示の追加
- 鍋容量フィルター機能の追加

#### Step 3: IngredientCalculatorの更新
- 鍋容量状態の追加
- RecipeSelectorへの新しいprops追加

#### Step 4: IngredientTotalsの改修
- 合計エナジー表示の追加

### 3. テスト実行

```bash
cd apps/web
bun run test
```

### 4. リント・フォーマット

```bash
# プロジェクトルートで
bun check
```

## 主要ファイル

| ファイル | 役割 |
|---------|------|
| `apps/web/src/components/calculator/ingredient-calculator.tsx` | メイン状態管理 |
| `apps/web/src/components/calculator/recipe-selector.tsx` | レシピ選択UI（大幅改修） |
| `apps/web/src/components/calculator/ingredient-totals.tsx` | 結果表示（エナジー追加） |
| `apps/web/src/lib/utils/calculator.ts` | 計算ロジック |

## 注意点

- 既存の機能（検索、料理種別フィルター）を壊さないこと
- 数量の範囲は1〜99
- 鍋容量プリセットは既存定義（004-pot-capacity-filter）を参照
