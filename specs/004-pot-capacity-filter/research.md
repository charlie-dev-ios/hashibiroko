# Research: 鍋容量フィルター

**Date**: 2026-01-30
**Feature**: 004-pot-capacity-filter

## 1. 既存フィルター実装パターン分析

### Decision
既存の `recipe-filter.tsx` と `recipes-page-content.tsx` のパターンに従い、鍋容量フィルターを追加する。

### Rationale
- 既存コードベースに一貫したフィルター実装パターンが存在
- `recipes-page-content.tsx` で状態管理（useState）
- `recipe-filter.tsx` でUI表示
- `recipe-utils.ts` でフィルタリングロジック
- この3層構造を維持することで、コードの一貫性と保守性を確保

### Existing Pattern Analysis

```typescript
// recipes-page-content.tsx
const [selectedType, setSelectedType] = useState<RecipeType | null>(null);
const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

// フィルター適用
const filteredRecipes = useMemo(() => {
  let result = initialRecipes;
  if (selectedType) {
    result = result.filter((recipe) => recipe.type === selectedType);
  }
  if (selectedIngredients.length > 0) {
    result = filterRecipesByIngredients(result, selectedIngredients);
  }
  return result;
}, [initialRecipes, selectedType, selectedIngredients]);
```

### Alternatives Considered
1. **Zustand でグローバル状態管理** - 却下：単一ページのローカル状態で十分、過剰な複雑さ
2. **URL パラメータでフィルター状態管理** - 却下：現状他のフィルターもURL非使用、一貫性のため同じパターンを維持

## 2. ポケモンスリープ鍋サイズ仕様

### Decision
以下のプリセット値を採用：

| レベル | 容量 |
|--------|------|
| Lv.1 | 15 |
| Lv.2 | 21 |
| Lv.3 | 27 |
| Lv.4 | 33 |
| Lv.5 | 39 |
| Lv.6 | 45 |
| Lv.7 | 51 |
| Lv.8 (Max) | 57 |

### Rationale
- 2025年時点のポケモンスリープゲーム内仕様に基づく
- 各レベルで+6ずつ容量が増加する一貫したパターン
- 最大容量57は現在のゲーム仕様の上限

### Alternatives Considered
- カスタム容量のみ（プリセットなし）- 却下：ユーザビリティ低下

## 3. UIコンポーネント設計

### Decision
`recipe-filter.tsx` に直接鍋容量セクションを追加する（新規コンポーネント分離しない）

### Rationale
- 既存の `recipe-filter.tsx` は165行で、200行の分割推奨ラインを下回る
- 料理種別・食材フィルターと同じコンポーネント内に配置することでUI/UXの一貫性を保つ
- propsで状態を受け渡すパターンが既に確立されている

### UI Design
1. **数値入力フィールド**: 手動で鍋容量を入力
2. **プリセットボタン群**: Lv.1〜Lv.8を横並びで表示
3. **クリアボタン**: フィルター解除
4. **適用中表示**: 他のフィルターと同じスタイルでバッジ表示

### Alternatives Considered
1. **スライダーUI** - 却下：離散的なプリセット値との相性が悪い
2. **ドロップダウン** - 却下：プリセットと手動入力の併用が難しい
3. **別コンポーネント分離** - 却下：ファイル分割の必要性なし（行数基準未達）

## 4. フィルタリングロジック

### Decision
`recipe-utils.ts` に `filterRecipesByPotCapacity` 関数を追加

### Implementation

```typescript
/**
 * 鍋容量でフィルタリング
 * @param recipes 料理リスト
 * @param maxCapacity 鍋容量（0以下の場合はフィルターなし）
 * @returns フィルター後の料理リスト
 */
export function filterRecipesByPotCapacity(
  recipes: Recipe[],
  maxCapacity: number | null,
): Recipe[] {
  if (maxCapacity === null || maxCapacity <= 0) {
    return recipes;
  }
  return recipes.filter((recipe) => recipe.ingredientCount <= maxCapacity);
}
```

### Rationale
- 既存の `filterRecipesByIngredients` と同じパターン
- `ingredientCount` フィールドを直接使用（計算不要）
- null や 0 以下の値は「フィルターなし」として扱う

### Alternatives Considered
- `getTotalIngredientCount` を使用して動的計算 - 却下：`ingredientCount` が既にデータに存在

## 5. 入力バリデーション

### Decision
- 整数のみ許可（`type="number"`, `step="1"`）
- 負の数は入力不可（`min="1"`）
- 空値は「フィルターなし」として扱う
- 非数値入力はブラウザのネイティブバリデーションで防止

### Rationale
- シンプルな実装でエッジケースをカバー
- ユーザーエラーの可能性を最小化
- 過剰なエラーメッセージ表示を回避

### Alternatives Considered
- Zodによるリアルタイムバリデーション - 却下：単純な数値入力に過剰
- 詳細なエラーメッセージ表示 - 却下：ネイティブバリデーションで十分

## 6. テスト戦略

### Decision
TDDサイクルに従い、以下の順序でテストを作成：

1. **Unit Test - recipe-utils.ts**
   - `filterRecipesByPotCapacity` 関数のテスト
   - 境界値テスト（0, null, 負数, 最大値超え）

2. **Component Test - recipe-filter.tsx**
   - 鍋容量入力フィールドの表示
   - プリセットボタンのクリック
   - 値の変更コールバック

3. **Integration Test - recipes-page-content.tsx**
   - 鍋容量フィルターと他フィルターの組み合わせ

### Rationale
- Constitution の TDD 原則に準拠
- 既存テストファイルの構造に合わせる
- `apps/web/tests/unit/` ディレクトリに配置

## Summary

| 項目 | 決定 |
|------|------|
| 状態管理 | useState in recipes-page-content.tsx |
| UIコンポーネント | recipe-filter.tsx に統合 |
| フィルターロジック | recipe-utils.ts に関数追加 |
| プリセット値 | Lv.1(15) 〜 Lv.8(57) |
| バリデーション | HTML5 ネイティブ + 簡易チェック |
| テスト | Unit → Component → Integration |
