# Implementation Plan: 食材情報閲覧

**Branch**: `006-ingredient-list` | **Date**: 2026-02-03 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/006-ingredient-list/spec.md`

## Summary

ユーザーが食材ごとのエナジー値を確認できる食材一覧ページを実装する。既存のナビゲーションから食材ページにアクセスし、全食材の名前、アイコン、基本エナジー値を一覧で閲覧できるようにする。

## Technical Context

**Language/Version**: TypeScript 5.9.3
**Primary Dependencies**: Next.js 16.0.8 (App Router), React 19.2.1, shadcn/ui, Tailwind CSS 4.x, Zod 4.3.4
**Storage**: 静的JSONファイル（`src/content/ingredients/ingredients.json`）
**Testing**: Vitest + Testing Library
**Target Platform**: Web (Desktop/Mobile responsive)
**Project Type**: web（Monorepo - apps/web）
**Performance Goals**: 1秒以内にページ表示完了
**Constraints**: Server Component優先、既存パターンに準拠
**Scale/Scope**: 約20種類の食材データ

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Notes |
|------|--------|-------|
| Test-Driven Development | ✅ | テストから実装を開始 |
| AI-First Development | ✅ | 明確なファイル構造とドキュメント |
| Simplicity (YAGNI) | ✅ | 最小限の実装、不要な抽象化なし |

## Project Structure

### Documentation (this feature)

```text
specs/006-ingredient-list/
├── spec.md              # 仕様書
├── plan.md              # 本ファイル
├── research.md          # 調査結果
├── data-model.md        # データモデル
├── quickstart.md        # クイックスタート
├── checklists/          # チェックリスト
│   └── requirements.md
└── tasks.md             # タスク一覧（speckit.tasks出力）
```

### Source Code (repository root)

```text
apps/web/src/
├── app/
│   └── ingredients/
│       └── page.tsx            # 更新対象：食材一覧ページ
├── components/
│   └── ingredients/            # 新規作成
│       ├── ingredient-card.tsx # 食材カード
│       ├── ingredient-card.test.tsx
│       ├── ingredient-list.tsx # 食材リスト
│       └── ingredient-list.test.tsx
├── content/
│   └── ingredients/            # 新規作成
│       └── ingredients.json    # 食材マスターデータ
└── lib/
    ├── data/
    │   ├── ingredients.ts      # 新規作成：データ取得
    │   └── ingredients.test.ts
    └── schemas/
        ├── ingredient.ts       # 新規作成：Zodスキーマ
        └── ingredient.test.ts
```

**Structure Decision**: 既存のrecipesパターン（data/, schemas/, components/, content/）を踏襲

## Complexity Tracking

該当なし - Constitution Checkに違反なし

## Implementation Phases

### Phase 1: データ層

1. Zodスキーマ定義（`lib/schemas/ingredient.ts`）
2. 食材データJSON作成（`content/ingredients/ingredients.json`）
3. データ取得関数（`lib/data/ingredients.ts`）
4. 単体テスト

### Phase 2: コンポーネント層

1. IngredientCard コンポーネント
2. IngredientList コンポーネント
3. コンポーネントテスト

### Phase 3: ページ統合

1. ingredients/page.tsx の更新
2. 統合テスト
3. 動作確認

## Dependencies

- 既存: `@/components/navigation/breadcrumb`
- 既存: shadcn/ui Card コンポーネント
- 新規依存なし
