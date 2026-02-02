# Implementation Plan: 必要食材個数計算機

**Branch**: `005-ingredient-calculator` | **Date**: 2026-02-02 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-ingredient-calculator/spec.md`

## Summary

レシピを複数選択し、それぞれの作成数量を指定することで、必要な食材の合計数を計算・表示する機能。既存のレシピデータを活用し、クライアントサイドで完結する計算ロジックを実装。

## Technical Context

**Language/Version**: TypeScript 5.9.3
**Primary Dependencies**: Next.js 16.0.8 (App Router), React 19.2.1, shadcn/ui, Tailwind CSS 4.x, Zod 4.3.4
**Storage**: N/A（クライアントサイドのみ、React stateで状態管理）
**Testing**: Playwright (E2E)
**Target Platform**: Web (Desktop & Mobile responsive)
**Project Type**: Monorepo (apps/web)
**Performance Goals**: レシピ選択・計算結果表示が500ms以内
**Constraints**: 77レシピ全件を扱える、数量上限99
**Scale/Scope**: 既存レシピページと同等のユーザー体験

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] 新規API不要（クライアントサイド完結）
- [x] 既存スキーマ・データ活用
- [x] shadcn/ui コンポーネント使用
- [x] 既存のコード規約に準拠

## Project Structure

### Documentation (this feature)

```text
specs/005-ingredient-calculator/
├── plan.md              # This file
├── data-model.md        # データモデル定義
├── spec.md              # 仕様書
├── tasks.md             # タスク一覧
├── quickstart.md        # クイックスタートガイド
└── checklists/
    └── requirements.md  # 要件チェックリスト
```

### Source Code (repository root)

```text
apps/web/
├── src/
│   ├── app/
│   │   └── calculator/
│   │       └── page.tsx              # 計算機ページ
│   ├── components/
│   │   └── calculator/
│   │       ├── ingredient-calculator.tsx   # メインコンポーネント
│   │       ├── recipe-search.tsx           # レシピ検索
│   │       ├── selected-recipe-list.tsx    # 選択レシピ一覧
│   │       └── ingredient-totals.tsx       # 食材合計表示
│   └── lib/
│       ├── schemas/
│       │   └── calculator.ts         # 計算機用スキーマ
│       └── utils/
│           └── calculator.ts         # 計算ロジック
└── tests/
    └── e2e/
        └── calculator.spec.ts        # E2Eテスト
```

**Structure Decision**: 既存のapps/web構造に準拠。計算機専用のコンポーネントディレクトリとユーティリティを追加。

## Complexity Tracking

N/A - 既存構造に沿った実装のため複雑性の増加なし。
