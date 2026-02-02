# Implementation Plan: ナビゲーションバーアイテムの整理

**Branch**: `005-organize-navbar-items` | **Date**: 2026-02-02 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-organize-navbar-items/spec.md`

## Summary

ナビゲーションバーの項目を整理し、ユーザーが必要な情報にアクセスしやすくする。具体的には、使用されていない項目（睡眠戦略、ゲームメカニクス）を削除し、島ガイドをフィールド情報に名称変更、きのみ情報と食材情報を新規追加する。

## Technical Context

**Language/Version**: TypeScript 5.9.3
**Primary Dependencies**: Next.js 16.0.8 (App Router), React 19.2.1, shadcn/ui, Tailwind CSS 4.x, lucide-react
**Storage**: N/A（ナビゲーション定義はコード内の静的配列）
**Testing**: Vitest 4.0.16 + Testing Library
**Target Platform**: Web（デスクトップ・モバイル対応）
**Project Type**: Web application (monorepo)
**Performance Goals**: N/A（UIのみの変更）
**Constraints**: N/A
**Scale/Scope**: ナビゲーションリンク6項目

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| TDD Required | PASS | 既存のナビゲーションテストを更新 |
| AI-First Development | PASS | 仕様明確、機械可読なドキュメント |
| Simplicity (YAGNI) | PASS | 必要最小限の変更のみ |

## Project Structure

### Documentation (this feature)

```text
specs/005-organize-navbar-items/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Phase 0 output
├── quickstart.md        # Phase 1 output
├── checklists/
│   └── requirements.md  # Specification quality checklist
└── tasks.md             # Phase 2 output (created by /speckit.tasks)
```

### Source Code (affected files)

```text
apps/web/src/
├── components/
│   └── navigation/
│       └── navigation-links.ts    # ナビゲーション定義（主な変更対象）
├── app/
│   ├── berries/                   # 新規ページ（きのみ情報）
│   │   └── page.tsx
│   └── ingredients/               # 新規ページ（食材情報）
│       └── page.tsx

apps/web/tests/
├── unit/
│   └── components/
│       └── navigation/
│           └── *.test.tsx         # ナビゲーションテスト更新
└── integration/
    └── navigation.test.tsx        # 統合テスト更新
```

**Structure Decision**: 既存のmonorepo構造（apps/web）を維持。ナビゲーション定義ファイル `navigation-links.ts` への変更が主な作業。新規ページはプレースホルダーとして最小限の実装。

## Complexity Tracking

該当なし - Constitution Check に違反なし。
