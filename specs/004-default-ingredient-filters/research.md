# Research: デフォルト食材フィルター選択

**Feature**: 004-default-ingredient-filters
**Date**: 2026-01-30

## Overview

この機能は単純なUI状態の初期値変更のため、深い技術調査は不要。既存のReact Hooksパターンを使用。

## Research Items

### 1. useState初期化パターン

**Decision**: Lazy初期化関数を使用

**Rationale**:
- `useState`の初期値として関数を渡すと、初回レンダリング時のみ実行される
- `extractIngredients(initialRecipes)`を毎回計算する代わりに、初期化時のみ実行
- パフォーマンス上の利点がある

**Alternatives considered**:
- `useEffect`で初期化: 追加の再レンダリングが発生するため却下
- 直接`availableIngredients`を参照: `useMemo`より前に`useState`が評価されるため不可

### 2. フィルタリングロジック

**Decision**: 全選択状態では既存のフィルタリングをスキップ

**Rationale**:
- 全食材が選択されている場合、フィルタリングは不要（全料理を表示）
- 不要な配列操作を回避してパフォーマンス向上

**Alternatives considered**:
- 常にフィルタリング実行: 全選択でも`filterRecipesByIngredients`を呼ぶ → 無駄な処理

### 3. 既存テストへの影響

**Decision**: 既存テストの修正と新規テストの追加

**Rationale**:
- 現在のテストは`selectedIngredients`が空の状態を前提としている可能性
- デフォルト状態が変わるため、テストの前提条件を更新する必要あり

## Dependencies

- `extractIngredients`: `@/lib/utils/recipe-utils.ts`から既にインポート済み
- 追加の依存関係なし

## NEEDS CLARIFICATION Resolution

**None** - すべての技術的決定が完了

## Conclusion

実装に必要な技術的調査は完了。以下の方針で進める:

1. `useState`のLazy初期化を使用
2. フィルタリングロジックで全選択状態を最適化
3. TDDに従いテストを先に作成
