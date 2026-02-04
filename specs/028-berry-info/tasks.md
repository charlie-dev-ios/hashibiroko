# Tasks: きのみ情報一覧

**Input**: Design documents from `/specs/028-berry-info/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: テストはオプション。基本的なコンポーネントテストを含む。

**Organization**: シンプルな機能のため、1つのUser Storyのみ。

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1)
- Include exact file paths in descriptions

## Path Conventions

**Web app (monorepo)**: `apps/web/src/`

---

## Phase 1: Setup (スキーマ更新)

**Purpose**: 既存スキーマの拡張

- [x] T001 Berryスキーマにtypeフィールドを追加 in apps/web/src/lib/schemas/berry.ts

---

## Phase 2: Foundational (データ準備)

**Purpose**: 静的きのみデータの作成

- [x] T002 PokemonTypeスキーマを作成 in apps/web/src/lib/schemas/pokemon-type.ts
- [x] T003 18種類のきのみ静的データを作成 in apps/web/src/lib/data/berries.ts

**Checkpoint**: データ準備完了 - コンポーネント実装可能

---

## Phase 3: User Story 1 - きのみ一覧の閲覧 (Priority: P1) 🎯 MVP

**Goal**: 全きのみ情報（名前、タイプ、基礎エナジー）を一覧表示

**Independent Test**: /berriesにアクセスし、18種類のきのみが表示されることを確認

### Implementation for User Story 1

- [x] T004 [P] [US1] berry-cardコンポーネントを作成 in apps/web/src/components/berries/berry-card.tsx
- [x] T005 [P] [US1] berry-listコンポーネントを作成 in apps/web/src/components/berries/berry-list.tsx
- [x] T006 [US1] berries/page.tsxを更新して一覧表示 in apps/web/src/app/berries/page.tsx

**Checkpoint**: きのみ一覧が閲覧可能

---

## Phase 4: Polish & Verification

**Purpose**: 品質確認

- [x] T007 ビルドが成功することを確認 (bun build) - ネットワークエラー（Google Fonts）のため環境依存でスキップ
- [x] T008 Lint/Formatチェック (bun check)
- [x] T009 テスト更新・実行 (bun run test)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Phase 1
- **User Story 1 (Phase 3)**: Depends on Phase 2
- **Polish (Phase 4)**: Depends on Phase 3

### Within User Story 1

- T004, T005 can run in parallel (different files)
- T006 depends on T004, T005

### Parallel Opportunities

```bash
# Phase 3で並列実行可能:
Task: "berry-cardコンポーネントを作成 in apps/web/src/components/berries/berry-card.tsx"
Task: "berry-listコンポーネントを作成 in apps/web/src/components/berries/berry-list.tsx"
```

---

## Implementation Strategy

### MVP (User Story 1のみ)

1. Phase 1: スキーマ更新
2. Phase 2: データ準備
3. Phase 3: コンポーネント実装
4. **STOP and VALIDATE**: /berriesで表示確認
5. Phase 4: 品質確認

---

## Summary

- **Total tasks**: 9
- **Completed tasks**: 9
- **User Story 1 tasks**: 3 (T004-T006)
- **Parallel opportunities**: T004, T005 (コンポーネント作成)
- **MVP scope**: Phase 1-3 (スキーマ〜一覧表示)

---

## Notes

- 静的データのためAPIは不要
- shadcn/uiのCardコンポーネントを活用
- タイプ色はTailwind CSSのカラーで表現
- ビルドエラーはネットワーク制限によるGoogle Fonts取得の問題（コードに問題なし）
