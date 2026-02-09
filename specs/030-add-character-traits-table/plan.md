# Implementation Plan: せいかく一覧ページ

**Branch**: `030-add-character-traits-table` | **Date**: 2026-02-09 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/030-add-character-traits-table/spec.md`

## Summary

ポケモンスリープのせいかく一覧ページを新規追加する。5×5のマトリクス表（行: 上昇パラメータ、列: 下降パラメータ、セル: せいかく名）と、各パラメータの補正効果の詳細説明セクションの2部構成。ナビゲーションの「基本データ」セクションに追加する。既存のデータページパターン（JSONデータ + Zodスキーマ + サーバーコンポーネント）に準拠して実装する。

## Technical Context

**Language/Version**: TypeScript 5.9.3 + Next.js 16.0.8 (App Router), React 19.2.1
**Primary Dependencies**: shadcn/ui (Radix UI), Tailwind CSS 4.x, Zod 4.3.4, lucide-react
**Storage**: JSONファイルベース（`apps/web/src/content/natures/natures.json`）
**Testing**: Vitest 4.0.16 + Testing Library
**Target Platform**: Web（Vercel）、モバイル対応（レスポンシブ）
**Project Type**: Web（Next.js App Router モノレポ内 `apps/web`）
**Performance Goals**: 静的データのため特別なパフォーマンス要件なし。SSRによる即時表示
**Constraints**: 5×5マトリクス表はモバイルで横スクロール対応必須
**Scale/Scope**: 25個のせいかくデータ（静的）、1ページ追加

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Notes |
|------|--------|-------|
| TDD必須 | PASS | テストを先に書いてから実装する。Zodスキーマ、データローダー、コンポーネントそれぞれにテストを作成 |
| YAGNI原則 | PASS | 必要最小限の実装。フィルタリングやソート等の不要な機能は追加しない |
| Simplicity | PASS | 既存パターン（JSON + Zod + Server Component）を踏襲。新たな抽象化は導入しない |

## Project Structure

### Documentation (this feature)

```text
specs/030-add-character-traits-table/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
apps/web/src/
├── app/
│   └── natures/
│       └── page.tsx                    # せいかく一覧ページ（Server Component）
├── components/
│   └── natures/
│       ├── nature-matrix-table.tsx     # 5×5マトリクス表コンポーネント
│       ├── nature-matrix-table.test.tsx
│       ├── nature-stat-details.tsx     # パラメータ補正詳細コンポーネント
│       └── nature-stat-details.test.tsx
├── content/
│   └── natures/
│       └── natures.json               # せいかくデータ（25件）
└── lib/
    ├── schemas/
    │   ├── nature.ts                   # Zodスキーマ定義
    │   └── nature.test.ts
    └── data/
        ├── natures.ts                  # データローダー関数
        └── natures.test.ts
```

**Structure Decision**: 既存のデータページパターン（pokemon/, recipes/, islands/等）に完全準拠。`app/natures/` にページ、`components/natures/` にコンポーネント、`content/natures/` にJSONデータ、`lib/schemas/` にスキーマ、`lib/data/` にデータローダーを配置する。
