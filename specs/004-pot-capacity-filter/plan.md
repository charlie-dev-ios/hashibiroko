# Implementation Plan: 鍋容量フィルター

**Branch**: `004-pot-capacity-filter` | **Date**: 2026-01-30 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-pot-capacity-filter/spec.md`

## Summary

料理一覧画面に鍋容量フィルターを追加し、ユーザーが指定した容量（食材数）以下の料理のみを表示する機能を実装する。既存の `ingredientCount` フィールドを活用し、既存の料理種別・食材フィルターと併用可能にする。ポケモンスリープの標準鍋サイズ（Lv.1〜Lv.8）のプリセットも提供する。

## Technical Context

**Language/Version**: TypeScript 5.9.3
**Primary Dependencies**: Next.js 16.0.8 (App Router), React 19.2.1, shadcn/ui, Tailwind CSS 4.x, Zod 4.3.4
**Storage**: N/A（クライアントサイドのフィルタリングのみ）
**Testing**: Vitest 4.0.16 + Testing Library
**Target Platform**: Web (Next.js on Vercel)
**Project Type**: Monorepo (apps/web)
**Performance Goals**: フィルター適用後1秒以内に結果表示
**Constraints**: クライアントサイドのみ、サーバー不要
**Scale/Scope**: 77料理のフィルタリング

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 原則 | 状態 | 確認 |
|------|------|------|
| I. Test-Driven Development | ✅ PASS | テストファイルを先に作成し、Red-Green-Refactorサイクルで実装 |
| II. AI-First Development | ✅ PASS | 明確な仕様、既存パターンに従った設計 |
| III. Simplicity (YAGNI) | ✅ PASS | 既存のフィルター実装パターンを再利用、新たな抽象化なし |

**Gate Status**: ✅ PASSED - Phase 0 開始可能

## Project Structure

### Documentation (this feature)

```text
specs/004-pot-capacity-filter/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # N/A (no API)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
apps/web/
├── src/
│   ├── app/
│   │   └── recipes/
│   │       └── page.tsx                    # 既存：Server Component
│   ├── components/
│   │   └── recipes/
│   │       ├── recipe-filter.tsx           # 変更：鍋容量フィルターUI追加
│   │       ├── recipe-list.tsx             # 既存：変更なし
│   │       ├── recipes-page-content.tsx    # 変更：鍋容量state追加
│   │       └── pot-capacity-filter.tsx     # 新規：鍋容量フィルターコンポーネント
│   └── lib/
│       └── utils/
│           └── recipe-utils.ts             # 変更：鍋容量フィルター関数追加
└── tests/
    └── unit/
        ├── components/
        │   └── recipes/
        │       ├── recipe-filter.test.tsx     # 変更：鍋容量テスト追加
        │       └── pot-capacity-filter.test.tsx # 新規：専用テスト
        └── lib/
            └── utils/
                └── recipe-utils.test.ts       # 変更：フィルター関数テスト追加
```

**Structure Decision**: 既存のapps/web構造を維持。research.mdの分析結果に基づき、`recipe-filter.tsx` に鍋容量セクションを直接追加する（新規コンポーネント分離しない）。

## Constitution Check (Post-Design)

*Re-check after Phase 1 design.*

| 原則 | 状態 | 確認 |
|------|------|------|
| I. Test-Driven Development | ✅ PASS | テストファイルを先に作成、既存テストパターンに準拠 |
| II. AI-First Development | ✅ PASS | 明確な仕様、既存パターン踏襲、機械可読なドキュメント |
| III. Simplicity (YAGNI) | ✅ PASS | 新規コンポーネント不要、既存recipe-filter.tsxに統合、新たな抽象化なし |

**Post-Design Gate Status**: ✅ PASSED - Phase 2 (tasks) 開始可能

## Generated Artifacts

| ファイル | 内容 |
|----------|------|
| `research.md` | 技術調査・設計決定 |
| `data-model.md` | データモデル・状態遷移 |
| `quickstart.md` | 開発手順ガイド |

## Complexity Tracking

> 違反なし。既存パターンに完全準拠。

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |
