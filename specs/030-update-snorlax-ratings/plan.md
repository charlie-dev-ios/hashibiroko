# Implementation Plan: カビゴン評価ランクデータの実データ対応

**Branch**: `030-update-snorlax-ratings` | **Date**: 2026-02-08 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/030-update-snorlax-ratings/spec.md`

## Summary

カビゴン評価ランクのデータモデルを、現在の独自6段階ランク（ノーマル/いいかんじ/すごいぞ/とてもすごい/ハイパー/マスター）から、実際のポケモンスリープのゲーム内ランク体系（ノーマル1-5/スーパー1-5/ハイパー1-5/マスター1-20の35段階）に更新する。各ランクに報酬（ゆめのかけら）フィールドを追加し、全6フィールドのデータを実際のゲームに合わせる。

## Technical Context

**Language/Version**: TypeScript 5.9.3 + Next.js 16.0.8 (App Router)
**Primary Dependencies**: React 19.2.1, Zod 4.3.4, shadcn/ui (Radix UI), Tailwind CSS 4.x, lucide-react
**Storage**: JSONファイルベース（`apps/web/src/content/islands/islands.json`）
**Testing**: Vitest 4.0.16 + React Testing Library
**Target Platform**: Web (SSG/ISR via Next.js)
**Project Type**: Turborepoモノレポ（`apps/web/` 配下がメインWebアプリ）
**Performance Goals**: N/A（静的データの表示のみ）
**Constraints**: N/A
**Scale/Scope**: 6フィールド × 35ランク = 210ランクエントリ

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Notes |
|------|--------|-------|
| I. TDD (NON-NEGOTIABLE) | PASS | スキーマ変更→テスト更新→コンポーネント更新の順で、テスト先行で進める |
| II. AI-First Development | PASS | JSONデータファイルの更新は機械的に検証可能 |
| III. Simplicity / YAGNI | PASS | 既存のデータ構造を拡張するのみ。新しい抽象化やパターンは不要 |

## Project Structure

### Documentation (this feature)

```text
specs/030-update-snorlax-ratings/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A - no API contracts)
└── tasks.md             # Phase 2 output (created by /speckit.tasks)
```

### Source Code (repository root)

```text
apps/web/src/
├── content/
│   └── islands/
│       └── islands.json          # データ更新対象（6フィールド × 35ランク）
├── lib/
│   ├── schemas/
│   │   └── island.ts             # Zodスキーマ更新対象（SnorlaxRankNameSchema, SnorlaxRankSchema, IslandSchema）
│   └── data/
│       └── islands.ts            # データアクセス層（変更なし想定）
├── components/
│   └── islands/
│       ├── snorlax-rank-table.tsx # ランク表コンポーネント更新対象（報酬カラム追加、ランク名表示変更）
│       └── rank-pokemon-list.tsx  # 出現ポケモンリスト更新対象（キー変更）
└── app/
    └── islands/
        └── [id]/
            └── page.tsx          # 変更なし想定

apps/web/tests/unit/
├── lib/
│   ├── schemas/
│   │   └── island.test.ts        # スキーマテスト更新対象
│   └── data/
│       └── islands.test.ts       # データテスト更新対象
└── components/
    └── islands/
        ├── snorlax-rank-table.test.tsx  # テーブルテスト更新対象
        └── rank-pokemon-list.test.tsx   # ポケモンリストテスト更新対象
```

**Structure Decision**: 既存のモノレポ構造（`apps/web/`）をそのまま活用。新しいディレクトリやモジュールの追加は不要。変更は既存ファイルの修正のみ。

## Complexity Tracking

> No violations. All changes follow existing patterns.
