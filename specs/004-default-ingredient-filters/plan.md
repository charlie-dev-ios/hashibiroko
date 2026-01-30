# Implementation Plan: デフォルト食材フィルター選択

**Branch**: `004-default-ingredient-filters` | **Date**: 2026-01-30 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-default-ingredient-filters/spec.md`

## Summary

料理一覧画面で食材フィルターのデフォルト状態を「全て選択」に変更する。現在の実装では`selectedIngredients`が空配列で初期化されているため、`availableIngredients`を初期値として設定する。

## Technical Context

**Language/Version**: TypeScript 5.9.3
**Primary Dependencies**: Next.js 16.0.8, React 19.2.1, shadcn/ui
**Storage**: N/A（クライアントサイドの状態管理のみ）
**Testing**: Vitest 4.0.16 + Testing Library
**Target Platform**: Web (Vercel)
**Project Type**: Web application (monorepo: apps/web)
**Performance Goals**: ページ読み込み完了後1秒以内に全フィルターが正しい状態で表示
**Constraints**: 既存のフィルタリングロジックへの影響を最小限に
**Scale/Scope**: 単一コンポーネントの変更（recipes-page-content.tsx）

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| TDD (Red-Green-Refactor) | ✅ PASS | テストを先に書いてから実装 |
| AI-First Development | ✅ PASS | 仕様書に基づく明確な変更 |
| Simplicity (YAGNI) | ✅ PASS | 必要最小限の変更のみ |

**Gate Result**: PASS - すべての原則に適合

## Project Structure

### Documentation (this feature)

```text
specs/004-default-ingredient-filters/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── checklists/
    └── requirements.md  # Specification quality checklist
```

### Source Code (repository root)

```text
apps/web/
├── src/
│   ├── components/
│   │   └── recipes/
│   │       ├── recipes-page-content.tsx  # ← 変更対象
│   │       ├── recipe-filter.tsx
│   │       ├── recipe-list.tsx
│   │       └── recipe-card.tsx
│   └── lib/
│       └── utils/
│           └── recipe-utils.ts
└── tests/
    └── unit/
        └── components/
            └── recipes/
                └── recipes-page-content.test.tsx  # ← テスト追加
```

**Structure Decision**: 既存のWeb application構造を維持。変更は`recipes-page-content.tsx`のみ。

## Complexity Tracking

> **No violations** - Constitution Checkに違反なし

## Implementation Approach

### 変更箇所

1. **recipes-page-content.tsx**
   - `selectedIngredients`の初期化ロジックを変更
   - `useState<string[]>([])`を初期化関数を使用する形に変更

### 技術的考慮事項

現在の実装:
```typescript
const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
const availableIngredients = useMemo(() => extractIngredients(initialRecipes), [initialRecipes]);
```

問題点: `useState`は初期レンダリング時に一度だけ評価されるため、`availableIngredients`を直接初期値として使用できない

解決策:
```typescript
const [selectedIngredients, setSelectedIngredients] = useState<string[]>(() =>
  extractIngredients(initialRecipes)
);
const availableIngredients = useMemo(() => extractIngredients(initialRecipes), [initialRecipes]);
```

**推奨**: 初期化関数を使用する方法（useEffectによる再レンダリングを回避）

### フィルタリングロジックの変更

現在のロジック:
```typescript
// 選択された食材がある場合のみフィルタリング
if (selectedIngredients.length > 0) {
  result = filterRecipesByIngredients(result, selectedIngredients);
}
```

新しいロジック:
```typescript
// 全選択状態でない場合のみフィルタリング
// 全選択 = すべての料理を表示
if (selectedIngredients.length > 0 && selectedIngredients.length < availableIngredients.length) {
  result = filterRecipesByIngredients(result, selectedIngredients);
}
```

### テスト計画

1. 初期状態で全食材が選択されていること
2. 初期状態で全料理が表示されていること
3. 食材のチェックを外すと該当料理のみ表示されること
4. 「選択をクリア」で全ての選択が解除されること
