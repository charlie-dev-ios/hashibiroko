# Tasks: 必要食材数計算機の改善

**Input**: Design documents from `/specs/006-ingredient-calculator-improve/`
**Prerequisites**: plan.md, spec.md, data-model.md, quickstart.md

**Tests**: TDDに従い、テストを先に書いてから実装する。

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app (Monorepo)**: `apps/web/src/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 既存のcalculatorコンポーネントと関連ファイルの確認

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 計算ロジック用のテストを作成 in `apps/web/tests/unit/lib/utils/calculator.test.ts`
- [x] T003 calculateTotalEnergy関数を実装 in `apps/web/src/lib/utils/calculator.ts`
- [x] T004 POT_CAPACITY_PRESETS定数を定義 in `apps/web/src/lib/utils/calculator.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin ✓

---

## Phase 3: User Story 1 - 一覧で直接個数を指定する (Priority: P1) 🎯 MVP

**Goal**: レシピ一覧で各レシピの作成数量を直接指定できるようにする

**Independent Test**: レシピ一覧で+/-ボタンや数値入力で数量を変更し、食材合計に即座に反映されることを確認

### Tests for User Story 1

- [ ] T005 [P] [US1] RecipeSelectorの数量変更機能のテストを作成 in `apps/web/src/components/calculator/recipe-selector.test.tsx`

### Implementation for User Story 1

- [x] T006 [US1] RecipeSelectorのPropsにonQuantityChange, selectedRecipesを追加 in `apps/web/src/components/calculator/recipe-selector.tsx`
- [x] T007 [US1] レシピカードに+/-ボタンと数量入力フィールドを追加 in `apps/web/src/components/calculator/recipe-selector.tsx`
- [x] T008 [US1] IngredientCalculatorを更新してRecipeSelectorに新しいpropsを渡す in `apps/web/src/components/calculator/ingredient-calculator.tsx`

**Checkpoint**: User Story 1が機能し、一覧で直接数量変更ができる ✓

---

## Phase 4: User Story 2 - 鍋容量でレシピを絞り込む (Priority: P2)

**Goal**: 鍋容量に基づいてレシピを絞り込めるようにする

**Independent Test**: 鍋容量プリセットを選択し、その容量以下のレシピのみが表示されることを確認

### Tests for User Story 2

- [ ] T009 [P] [US2] 鍋容量フィルターのテストを作成 in `apps/web/src/components/calculator/recipe-selector.test.tsx`

### Implementation for User Story 2

- [x] T010 [US2] 鍋容量フィルターUIを追加 in `apps/web/src/components/calculator/recipe-selector.tsx`
- [x] T011 [US2] IngredientCalculatorに鍋容量状態を追加 in `apps/web/src/components/calculator/ingredient-calculator.tsx`

**Checkpoint**: User Story 2が機能し、鍋容量で絞り込みができる ✓

---

## Phase 5: User Story 3 - 料理カードの情報を見やすくする (Priority: P2)

**Goal**: レシピカードにエナジー、食材数、料理種別を明確に表示する

**Independent Test**: レシピカードにエナジーが「1,500 EP」のように表示されることを確認

### Implementation for User Story 3

- [x] T012 [US3] レシピカードのデザインを改善してエナジーを表示 in `apps/web/src/components/calculator/recipe-selector.tsx`
- [x] T013 [US3] 数値フォーマット用ヘルパー関数を追加（カンマ区切り） in `apps/web/src/lib/utils/calculator.ts`

**Checkpoint**: User Story 3が機能し、カードの視認性が向上 ✓

---

## Phase 6: User Story 4 - 選択中のレシピの合計エナジーを確認する (Priority: P3)

**Goal**: 選択したレシピの合計エナジーを表示する

**Independent Test**: 複数レシピを選択し、合計エナジーが正しく計算・表示されることを確認

### Tests for User Story 4

- [ ] T014 [P] [US4] 合計エナジー表示のテストを作成 in `apps/web/src/components/calculator/ingredient-totals.test.tsx`

### Implementation for User Story 4

- [x] T015 [US4] IngredientTotalsにtotalEnergy propsを追加 in `apps/web/src/components/calculator/ingredient-totals.tsx`
- [x] T016 [US4] IngredientCalculatorで合計エナジーを計算してIngredientTotalsに渡す in `apps/web/src/components/calculator/ingredient-calculator.tsx`

**Checkpoint**: User Story 4が機能し、合計エナジーが表示される ✓

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T017 全テストの実行と確認 in `apps/web/`
- [x] T018 Lintとフォーマットの実行 in project root
- [ ] T019 quickstart.mdに従った動作確認

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2)
- **User Story 2 (P2)**: Can start after User Story 1 completion (shares RecipeSelector)
- **User Story 3 (P2)**: Can start after User Story 1 completion (shares RecipeSelector)
- **User Story 4 (P3)**: Can start after Foundational (Phase 2) - Independent of other stories

### Parallel Opportunities

- T002, T003, T004 in Foundational can be done sequentially (T003 depends on T002)
- US3 and US4 can be worked on in parallel after US1 completes
- Test tasks marked [P] can run in parallel with other [P] tasks

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Continue with remaining stories

### Task Summary

- Total tasks: 19
- Phase 1 (Setup): 1 task
- Phase 2 (Foundational): 3 tasks
- Phase 3 (US1): 4 tasks
- Phase 4 (US2): 3 tasks
- Phase 5 (US3): 2 tasks
- Phase 6 (US4): 3 tasks
- Phase 7 (Polish): 3 tasks

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- TDDに従い、テストを先に書いてから実装する
- 各タスク完了後にコミット
- 既存の機能（検索、料理種別フィルター）を壊さないこと
