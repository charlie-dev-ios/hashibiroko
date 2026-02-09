# Tasks: せいかく一覧ページ

**Input**: Design documents from `/specs/030-add-character-traits-table/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: TDD必須（Constitution要件）。テストを先に書き、失敗を確認してから実装する。

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: データファイルとスキーマの作成

- [x] T001 Create natures JSON data file with 25 natures and stat effects at `apps/web/src/content/natures/natures.json`
- [x] T002 [P] Create Nature Zod schema test (RED) at `apps/web/tests/unit/lib/schemas/nature.test.ts`
- [x] T003 [P] Create Nature Zod schema at `apps/web/src/lib/schemas/nature.ts`
- [x] T004 Verify Nature schema tests pass (GREEN)

**Checkpoint**: せいかくデータとスキーマが準備完了

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: データローダーの作成（全ユーザーストーリーの前提）

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Create natures data loader test (RED) at `apps/web/tests/unit/lib/data/natures.test.ts`
- [x] T006 Create natures data loader at `apps/web/src/lib/data/natures.ts`
- [x] T007 Verify data loader tests pass (GREEN)

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - せいかく早見表の閲覧 (Priority: P1) 🎯 MVP

**Goal**: 5×5マトリクス表でせいかくと対応するパラメータの上昇・下降の組み合わせを表示する

**Independent Test**: ナビゲーションから「せいかく」をクリックし、25個すべてのせいかくがマトリクス表内に正しく配置されていることを確認

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T008 [P] [US1] Create NatureMatrixTable component test (RED) at `apps/web/tests/unit/components/natures/nature-matrix-table.test.tsx`

### Implementation for User Story 1

- [x] T009 [US1] Create NatureMatrixTable component at `apps/web/src/components/natures/nature-matrix-table.tsx`
- [x] T010 [US1] Verify NatureMatrixTable tests pass (GREEN)
- [x] T011 [US1] Create natures page at `apps/web/src/app/natures/page.tsx`
- [x] T012 [US1] Add "せいかく" link to navigation in `apps/web/src/components/navigation/navigation-links.ts`

**Checkpoint**: マトリクス表ページが完成し、ナビゲーションからアクセス可能

---

## Phase 4: User Story 2 - パラメータ補正の詳細仕様の確認 (Priority: P2)

**Goal**: 各パラメータの上昇・下降による具体的な補正効果をマトリクス表の下に表示する

**Independent Test**: 5つのパラメータそれぞれについて上昇・下降の具体的な効果が表示されていることを確認

### Tests for User Story 2 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T013 [P] [US2] Create NatureStatDetails component test (RED) at `apps/web/tests/unit/components/natures/nature-stat-details.test.tsx`

### Implementation for User Story 2

- [x] T014 [US2] Create NatureStatDetails component at `apps/web/src/components/natures/nature-stat-details.tsx`
- [x] T015 [US2] Verify NatureStatDetails tests pass (GREEN)
- [x] T016 [US2] Integrate NatureStatDetails into natures page at `apps/web/src/app/natures/page.tsx`

**Checkpoint**: パラメータ補正詳細がマトリクス表の下に表示される

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: 品質確認とビルド検証

- [x] T017 Run all tests and verify pass at `apps/web/` (231 tests, 31 files, all pass)
- [x] T018 Run build and verify success at `apps/web/` (Google Fonts network error - pre-existing, not related to this feature)
- [x] T019 Run lint check and fix any issues (Biome check passed)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational phase completion
- **User Story 2 (Phase 4)**: Depends on Phase 3 (page must exist to integrate into)
- **Polish (Phase 5)**: Depends on all user stories being complete

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- Component implementation after tests
- Page integration after component is complete

### Parallel Opportunities

- T002 and T003 can run in parallel (test file and schema file are separate)
- T008 (US1 test) can be written while T005-T007 (foundational) are being implemented
- T013 (US2 test) can be written while US1 implementation is in progress

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (data + schema)
2. Complete Phase 2: Foundational (data loader)
3. Complete Phase 3: User Story 1 (matrix table + page + navigation)
4. **STOP and VALIDATE**: マトリクス表がナビゲーションからアクセスできることを確認
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → データ基盤完成
2. User Story 1 → マトリクス表MVP完成 → Deploy/Demo
3. User Story 2 → 補正詳細追加 → Deploy/Demo
4. Polish → 品質確認 → Final Deploy

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- TDD必須: テストを先に書き、FAILを確認してから実装
- Commit after each phase completion
- 全25せいかくの正確なデータはnatures.jsonに含める
