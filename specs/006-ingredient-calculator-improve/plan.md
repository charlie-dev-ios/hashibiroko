# Implementation Plan: 必要食材数計算機の改善

**Branch**: `006-ingredient-calculator-improve` | **Date**: 2026-02-03 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/006-ingredient-calculator-improve/spec.md`

## Summary

既存の必要食材数計算機を改善する。主な変更点：
1. レシピ一覧で直接数量を指定できるUIに変更（RecipeSelectorの改修）
2. 鍋容量によるフィルタリング機能の追加
3. 料理カードの視認性向上（エナジー表示など）
4. 合計エナジーの計算・表示機能の追加

## Technical Context

**Language/Version**: TypeScript 5.9.3
**Primary Dependencies**: Next.js 16.0.8 (App Router), React 19.2.1, shadcn/ui, Tailwind CSS 4.x, lucide-react
**Storage**: N/A（クライアントサイドの状態管理のみ）
**Testing**: Vitest 4.0.16 + Testing Library
**Target Platform**: Web (ブラウザ)
**Project Type**: web (モノレポ構成 - apps/web)
**Performance Goals**: 数量変更時 500ms以内に計算結果更新
**Constraints**: クライアントサイドのみ、既存UIレイアウトを維持
**Scale/Scope**: 77種類のレシピ、既存コンポーネントの改修

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] 既存のコードパターンとスタイルを維持
- [x] TDD（Red-Green-Refactor）に従う
- [x] 既存の計算機コンポーネントを改修（新規作成は最小限）
- [x] shadcn/uiコンポーネントを活用
- [x] 型安全性を確保（anyの使用禁止）

## Project Structure

### Documentation (this feature)

```text
specs/006-ingredient-calculator-improve/
├── plan.md              # This file
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── checklists/          # Specification quality checklist
│   └── requirements.md
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
apps/web/src/
├── app/
│   └── calculator/
│       └── page.tsx              # 計算機ページ（既存）
├── components/
│   └── calculator/
│       ├── ingredient-calculator.tsx   # メインコンポーネント（改修）
│       ├── recipe-selector.tsx         # レシピ選択（大幅改修）
│       ├── selected-recipe-list.tsx    # 選択済みリスト（改修）
│       ├── ingredient-totals.tsx       # 食材合計（改修：エナジー追加）
│       └── pot-capacity-filter.tsx     # 新規：鍋容量フィルター
├── lib/
│   ├── schemas/
│   │   └── calculator.ts         # 計算機スキーマ（必要に応じて拡張）
│   └── utils/
│       └── calculator.ts         # 計算ロジック（エナジー計算追加）
└── tests/
    └── components/
        └── calculator/           # テストファイル
```

**Structure Decision**: 既存のモノレポ構成（apps/web）を維持。既存のcalculatorコンポーネントを改修する形で実装。

## Complexity Tracking

該当なし - 既存コンポーネントの改修のため、新規の複雑性は追加しない。

## Phase 0: Research

該当する不明点なし。既存のコードベースとパターンを踏襲する。

## Phase 1: Design

### 主要な変更点

1. **RecipeSelectorの改修**
   - 現在: クリックで選択/解除のみ
   - 変更後: 各カードに「+」「-」ボタンと数量表示を追加
   - エナジー（料理パワー）と食材数を明確に表示

2. **鍋容量フィルターの追加**
   - 既存の料理種別フィルターの横に配置
   - プリセット: Lv.1(15), Lv.2(21), Lv.3(27), Lv.4(33), Lv.5(39), Lv.6(45), Lv.7(51), Lv.8(57), すべて
   - ingredientCountで絞り込み

3. **合計エナジー計算の追加**
   - IngredientTotalsコンポーネントに合計エナジーを表示
   - 計算ロジックをcalculator.tsに追加

### データフロー

```
ユーザー操作
    ↓
RecipeSelector（数量変更）
    ↓
IngredientCalculator（状態管理）
    ↓
├── SelectedRecipeList（選択確認・削除）
└── IngredientTotals（食材合計 + エナジー合計）
```
