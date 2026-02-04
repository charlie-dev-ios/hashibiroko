# Implementation Plan: きのみ情報一覧

**Branch**: `028-berry-info` | **Date**: 2026-02-03 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/028-berry-info/spec.md`

## Summary

ポケモンスリープの全18種類のきのみ情報（名前、タイプ、基礎エナジー）を一覧表示する機能。ゲーム内では確認できない基礎エナジーを静的データとして管理し、シンプルなカード形式で表示する。

## Technical Context

**Language/Version**: TypeScript 5.9.3  
**Primary Dependencies**: Next.js 16.0.8 (App Router), React 19.2.1, shadcn/ui, Tailwind CSS 4.x  
**Storage**: N/A（静的データをコード内で管理）  
**Testing**: Vitest 4.0.16 + Testing Library  
**Target Platform**: Web (Vercel)
**Project Type**: web (monorepo - apps/web)  
**Performance Goals**: 1秒以内にきのみ一覧を表示  
**Constraints**: 静的データのためAPIは不要  
**Scale/Scope**: 18種類のきのみデータ

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- ✅ シンプルな静的データ表示機能（複雑性なし）
- ✅ 既存のプロジェクト構造に従う（apps/web内）
- ✅ shadcn/uiコンポーネントを使用
- ✅ Zodバリデーションを使用

## Project Structure

### Documentation (this feature)

```text
specs/028-berry-info/
├── spec.md              # 機能仕様
├── plan.md              # このファイル
├── research.md          # Phase 0 出力
├── data-model.md        # Phase 1 出力
├── quickstart.md        # Phase 1 出力
└── checklists/          # 品質チェックリスト
    └── requirements.md
```

### Source Code (repository root)

```text
apps/web/
├── src/
│   ├── app/
│   │   └── berries/
│   │       └── page.tsx          # きのみ一覧ページ（既存、更新）
│   ├── components/
│   │   └── berries/
│   │       ├── berry-card.tsx    # きのみカードコンポーネント（新規）
│   │       └── berry-list.tsx    # きのみ一覧コンポーネント（新規）
│   └── lib/
│       ├── schemas/
│       │   └── berry.ts          # きのみスキーマ（既存、更新）
│       └── data/
│           └── berries.ts        # きのみ静的データ（新規）
└── tests/
    └── unit/
        └── components/
            └── berries/
                └── berry-card.test.tsx  # テスト（新規）
```

**Structure Decision**: 既存のapps/web構造に従い、berries関連コンポーネントをsrc/components/berries/に配置。静的データはsrc/lib/data/berries.tsに配置。

## Complexity Tracking

N/A - 単純な静的データ表示機能のため、Constitution違反なし
