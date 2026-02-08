# Implementation Plan: フィールド情報コンテンツ追加

**Branch**: `029-add-field-info-content` | **Date**: 2026-02-07 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/029-add-field-info-content/spec.md`

## Summary

島ガイドページ（現在プレースホルダー）にフィールド詳細情報を追加する。各フィールドの名前、とくいきのみ（固定/ランダム）、カビゴン評価6段階ごとの必要エナジー、各ランクで新規に出現するポケモン（差分表示）を表示する。一覧ページ + 個別詳細ページ構成で、ゲーム内の全フィールドを初回リリースで網羅する。

## Technical Context

**Language/Version**: TypeScript 5.9.3 + Next.js 16.0.8 (App Router), React 19.2.1
**Primary Dependencies**: shadcn/ui (Radix UI), Tailwind CSS 4.x, Zod 4.3.4, lucide-react
**Storage**: JSONファイルベース（`src/content/` 配下、既存パターン踏襲）
**Testing**: Vitest 4.0.16 + Testing Library + Playwright (E2E)
**Target Platform**: Web (Vercel, SSG/SSR)
**Project Type**: Web application (monorepo: apps/web)
**Performance Goals**: 静的生成によりページロードは即座（標準Web性能）
**Constraints**: TDD必須、Server Component優先、`any`型禁止、Biomeフォーマット準拠
**Scale/Scope**: 全フィールド（推定5〜10フィールド）、各フィールドにカビゴン評価6段階 × 出現ポケモン

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Notes |
|------|--------|-------|
| I. TDD (NON-NEGOTIABLE) | PASS | 全コンポーネント・データ関数にテストを先行作成。Vitest + Testing Libraryで実施 |
| II. AI-First Development | PASS | speckit仕様駆動で開発。明確なデータモデル・契約定義あり |
| III. Simplicity (YAGNI) | PASS | 既存パターン（JSON + Zod + Server Component）を踏襲。新たな抽象化は不要 |

## Project Structure

### Documentation (this feature)

```text
specs/029-add-field-info-content/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
apps/web/src/
├── app/
│   └── islands/
│       ├── page.tsx                    # フィールド一覧ページ（既存を置換）
│       └── [id]/
│           └── page.tsx                # フィールド詳細ページ（新規）
├── components/
│   └── islands/
│       ├── island-list.tsx             # フィールド一覧コンポーネント
│       ├── island-card.tsx             # フィールドカードコンポーネント
│       ├── island-detail.tsx           # フィールド詳細コンポーネント
│       ├── snorlax-rank-table.tsx      # カビゴン評価テーブル
│       └── rank-pokemon-list.tsx       # ランク別出現ポケモン一覧
├── content/
│   └── islands/
│       └── islands.json                # フィールドデータ（新規）
└── lib/
    ├── schemas/
    │   └── island.ts                   # IslandSchema（拡張）
    └── data/
        └── islands.ts                  # データアクセス関数（新規）

apps/web/tests/
├── unit/
│   ├── components/
│   │   └── islands/
│   │       ├── island-card.test.tsx
│   │       ├── island-list.test.tsx
│   │       ├── island-detail.test.tsx
│   │       ├── snorlax-rank-table.test.tsx
│   │       └── rank-pokemon-list.test.tsx
│   └── lib/
│       └── data/
│           └── islands.test.ts
└── e2e/
    └── islands.spec.ts
```

**Structure Decision**: 既存のpokemonパターン（一覧page + [id]詳細page + components/ + lib/data/ + content/JSON）をそのまま踏襲。新規抽象化なし。

## Complexity Tracking

該当なし。既存パターンの踏襲のみで、Constitution違反はない。
