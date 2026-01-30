# Tasks: デフォルト食材フィルター選択

**Input**: Design documents from `/specs/004-default-ingredient-filters/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Tests**: テストは Constitution Check (TDD) に基づき必須

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

- **Web app (monorepo)**: `apps/web/src/`, `apps/web/tests/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization - 既存プロジェクトのため最小限

- [ ] T001 Verify existing project structure and dependencies in apps/web/package.json

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T002 Verify extractIngredients function exists in apps/web/src/lib/utils/recipe-utils.ts
- [ ] T003 Verify RecipeFilter component accepts selectedIngredients prop in apps/web/src/components/recipes/recipe-filter.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - 料理一覧の初期表示 (Priority: P1) 🎯 MVP

**Goal**: ユーザーが料理一覧画面を開いたとき、すべての食材フィルターがデフォルトで選択された状態で表示される

**Independent Test**: 料理一覧画面にアクセスした際に、すべての食材チェックボックスが選択状態であることを確認

### Tests for User Story 1 (TDD - Red)

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T004 [US1] Create test file apps/web/tests/unit/components/recipes/recipes-page-content.test.tsx
- [ ] T005 [US1] Add test: "初期状態で全食材が選択されていること" in apps/web/tests/unit/components/recipes/recipes-page-content.test.tsx
- [ ] T006 [US1] Add test: "初期状態で全料理が表示されていること" in apps/web/tests/unit/components/recipes/recipes-page-content.test.tsx
- [ ] T007 [US1] Run tests and verify they FAIL (Red phase)

### Implementation for User Story 1 (TDD - Green)

- [ ] T008 [US1] Modify useState initialization to use lazy initializer with extractIngredients in apps/web/src/components/recipes/recipes-page-content.tsx
- [ ] T009 [US1] Run tests and verify they PASS (Green phase)

### Refactor for User Story 1 (TDD - Refactor)

- [ ] T010 [US1] Review and optimize code if needed in apps/web/src/components/recipes/recipes-page-content.tsx

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - 食材フィルターの解除 (Priority: P2)

**Goal**: ユーザーが食材フィルターのチェックを外すと、その食材を含む料理のみが表示される

**Independent Test**: チェックを外した食材を含む料理が一覧から除外されることを確認

### Tests for User Story 2 (TDD - Red)

- [ ] T011 [US2] Add test: "食材のチェックを外すと該当料理のみ表示されること" in apps/web/tests/unit/components/recipes/recipes-page-content.test.tsx
- [ ] T012 [US2] Add test: "チェックを再度付けると料理が再表示されること" in apps/web/tests/unit/components/recipes/recipes-page-content.test.tsx
- [ ] T013 [US2] Run tests and verify they FAIL (Red phase)

### Implementation for User Story 2 (TDD - Green)

- [ ] T014 [US2] Update filtering logic to handle all-selected state in apps/web/src/components/recipes/recipes-page-content.tsx
- [ ] T015 [US2] Run tests and verify they PASS (Green phase)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T016 Run full test suite with `bun run test`
- [ ] T017 Run E2E tests if available with `bun run test:e2e`
- [ ] T018 Manual verification following quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-4)**: All depend on Foundational phase completion
- **Polish (Phase 5)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Depends on User Story 1 (shared component state)

### Within Each User Story

- Tests MUST be written and FAIL before implementation (TDD Red-Green-Refactor)
- Story complete before moving to next priority

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo

---

## Notes

- TDD is NON-NEGOTIABLE per Constitution Check
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Single component change: apps/web/src/components/recipes/recipes-page-content.tsx
