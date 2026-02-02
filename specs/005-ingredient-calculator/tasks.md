# Tasks: 必要食材個数計算機

**Input**: Design documents from `/specs/005-ingredient-calculator/`
**Prerequisites**: plan.md, spec.md, data-model.md

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: スキーマとユーティリティの作成

- [ ] T001 [P] Create calculator schema in `apps/web/src/lib/schemas/calculator.ts`
- [ ] T002 [P] Create calculator utility functions in `apps/web/src/lib/utils/calculator.ts`

---

## Phase 2: User Story 1 - レシピ選択と食材計算 (Priority: P1) 🎯 MVP

**Goal**: 1つ以上のレシピを選択し、数量を指定して必要食材を計算できる

**Independent Test**: レシピを選択し数量を入力すると、必要な食材の合計が表示される

### Implementation for User Story 1

- [ ] T003 [US1] Create main calculator component in `apps/web/src/components/calculator/ingredient-calculator.tsx`
- [ ] T004 [US1] Create selected recipe list component in `apps/web/src/components/calculator/selected-recipe-list.tsx`
- [ ] T005 [US1] Create ingredient totals component in `apps/web/src/components/calculator/ingredient-totals.tsx`
- [ ] T006 [US1] Create calculator page in `apps/web/src/app/calculator/page.tsx`
- [ ] T007 [US1] Add basic recipe selection UI (dropdown/combobox)
- [ ] T008 [US1] Implement quantity input with validation (1-99)
- [ ] T009 [US1] Implement ingredient calculation logic integration
- [ ] T010 [US1] Display ingredient totals with grand total

**Checkpoint**: レシピ1つを選択し、数量を指定すると食材合計が表示される

---

## Phase 3: User Story 2 - 複数レシピ組み合わせ (Priority: P2)

**Goal**: 複数レシピを選択し、同じ食材は合算して表示する

**Independent Test**: 複数レシピを選択し、重複食材が正しく合算される

### Implementation for User Story 2

- [ ] T011 [US2] Extend calculator to support multiple recipe selection
- [ ] T012 [US2] Implement add/remove recipe from selection
- [ ] T013 [US2] Update UI to show list of selected recipes with individual quantities
- [ ] T014 [US2] Ensure ingredient aggregation works correctly across multiple recipes

**Checkpoint**: 複数レシピを追加・削除でき、食材が正しく合算される

---

## Phase 4: User Story 3 - レシピ検索 (Priority: P3)

**Goal**: レシピ名で検索して素早くレシピを見つけられる

**Independent Test**: 検索ボックスに入力すると、該当レシピがフィルタされる

### Implementation for User Story 3

- [ ] T015 [US3] Create recipe search component in `apps/web/src/components/calculator/recipe-search.tsx`
- [ ] T016 [US3] Implement search filtering logic (name matching)
- [ ] T017 [US3] Integrate search with recipe selection UI
- [ ] T018 [US3] Add clear search functionality

**Checkpoint**: 検索入力でレシピがフィルタされ、選択できる

---

## Phase 5: User Story 4 - リセット機能 (Priority: P4)

**Goal**: すべての選択をクリアして新しい計算を開始できる

**Independent Test**: リセットボタンで全選択がクリアされる

### Implementation for User Story 4

- [ ] T019 [US4] Add reset button to calculator UI
- [ ] T020 [US4] Implement reset functionality (clear all selections)
- [ ] T021 [US4] Add confirmation or immediate action based on UX decision

**Checkpoint**: リセットボタンで全選択がクリアされる

---

## Phase 6: Polish & Navigation

**Purpose**: ナビゲーション追加と最終調整

- [ ] T022 [P] Add calculator link to sidebar navigation
- [ ] T023 [P] Add loading state component in `apps/web/src/app/calculator/loading.tsx`
- [ ] T024 Verify responsive design (mobile/desktop)
- [ ] T025 Run lint and type checks

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies - start immediately
- **Phase 2 (US1)**: Depends on Phase 1 - CORE MVP
- **Phase 3 (US2)**: Can start after Phase 2 basics, but extends US1
- **Phase 4 (US3)**: Depends on Phase 2/3 (needs recipe selection UI)
- **Phase 5 (US4)**: Depends on Phase 2/3 (needs selections to reset)
- **Phase 6 (Polish)**: After core functionality complete

### Parallel Opportunities

- T001 and T002 can run in parallel
- T022 and T023 can run in parallel
- Within US1: T004 and T005 can run in parallel after T003

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: User Story 1
3. **STOP and VALIDATE**: Test basic calculation works
4. Deploy/demo if ready

### Incremental Delivery

1. Phase 1 → Phase 2 → MVP (basic calculation)
2. Add Phase 3 → Multiple recipes
3. Add Phase 4 → Search
4. Add Phase 5 → Reset
5. Phase 6 → Polish

---

## Notes

- 既存のレシピデータ（`recipes.json`）をそのまま使用
- shadcn/ui の Combobox または Select コンポーネント活用
- 状態管理は React useState で十分（Zustand不要）
- 計算はリアルタイム（デバウンス不要、77レシピ程度なら即時計算可能）
