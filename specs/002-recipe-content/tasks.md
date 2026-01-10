# Tasks: 料理コンテンツページ実装

**Input**: Design documents from `/specs/002-recipe-content/`
**Prerequisites**: plan.md, spec.md, data-model.md, quickstart.md

**Tests**: Test tasks are included per TDD requirement in plan.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app structure**: `apps/web/src/`, `apps/web/tests/`
- All paths relative to repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and directory structure

- [x] T001 Create recipe-related directory structure (components/recipes/, content/recipes/, tests/)
- [x] T002 [P] Verify existing dependencies (Next.js 16.0.8, Bun 1.1.40, shadcn/ui, Zod)
- [x] T003 [P] Create sample recipe data file in apps/web/src/content/recipes/recipes.json with 10-15 recipes

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core data infrastructure that MUST be complete before ANY user story UI can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Extend RecipeSchema to export RecipeType in apps/web/src/lib/schemas/recipe.ts
- [x] T005 [P] Unit test for getAllRecipes() in apps/web/tests/unit/lib/data/recipes.test.ts (Red - write test FIRST)
- [x] T006 [P] Unit test for getRecipeById() in apps/web/tests/unit/lib/data/recipes.test.ts (Red - write test FIRST)
- [x] T007 [P] Unit test for getTotalIngredientCount() in apps/web/tests/unit/lib/data/recipes.test.ts (Red - write test FIRST)
- [x] T008 Implement getAllRecipes() function in apps/web/src/lib/data/recipes.ts (Green - make tests pass)
- [x] T009 Implement getRecipeById() function in apps/web/src/lib/data/recipes.ts (Green - make tests pass)
- [x] T010 Implement getTotalIngredientCount() function in apps/web/src/lib/data/recipes.ts (Green - make tests pass)
- [x] T011 Verify all data layer unit tests pass (Refactor - optimize code)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - すべての料理を一覧表示（デフォルト状態） (Priority: P1) 🎯 MVP

**Goal**: ユーザーは料理ページにアクセスすると、フィルター未設定のデフォルト状態で、すべての料理が一覧表示される。各料理はカード形式で表示され、料理の画像、名前、エナジー、必要食材の列挙、必要食材の総数が含まれる。

**Independent Test**: 料理ページを開くだけで、すべての料理カードが表示されることで独立してテスト可能。フィルター機能は不要。

### Tests for User Story 1 (TDD - Red Phase)

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T012 [P] [US1] Component test for RecipeCard rendering in apps/web/tests/unit/components/recipes/recipe-card.test.tsx
- [x] T013 [P] [US1] Component test for RecipeList rendering in apps/web/tests/unit/components/recipes/recipe-list.test.tsx
- [x] T014 [P] [US1] Component test for empty state in RecipeList in apps/web/tests/unit/components/recipes/recipe-list.test.tsx

### Implementation for User Story 1 (Green Phase)

- [x] T015 [P] [US1] Create RecipeCard component in apps/web/src/components/recipes/recipe-card.tsx
- [x] T016 [P] [US1] Create RecipeList component in apps/web/src/components/recipes/recipe-list.tsx
- [x] T017 [US1] Update recipes page to fetch and display all recipes in apps/web/src/app/recipes/page.tsx
- [x] T018 [US1] Add metadata for SEO in apps/web/src/app/recipes/page.tsx
- [x] T019 [US1] Verify all US1 tests pass and refactor components

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently. Build succeeds, all 10-15 recipes display in grid.

---

## Phase 4: User Story 2 - 料理種別で絞り込み (Priority: P2)

**Goal**: ユーザーは料理ページで、料理の種別（カレー・シチュー、サラダ、デザート）を選択し、その種別に該当する料理のみを一覧に表示できる。フィルターを解除すると、再びすべての料理が表示される。

**Independent Test**: 料理ページで種別選択ボタンをクリックし、該当する料理カードのみが表示され、フィルター解除ですべてに戻ることで独立してテスト可能。

### Tests for User Story 2 (TDD - Red Phase)

- [x] T020 [P] [US2] Unit test for filterRecipesByType() in apps/web/tests/unit/lib/data/recipes.test.ts
- [x] T021 [P] [US2] Integration test for type filter UI interaction in apps/web/tests/integration/recipes-page.test.tsx
- [x] T022 [P] [US2] Integration test for filter clear functionality in apps/web/tests/integration/recipes-page.test.tsx

### Implementation for User Story 2 (Green Phase)

- [x] T023 [P] [US2] Implement filterRecipesByType() function in apps/web/src/lib/data/recipes.ts
- [x] T024 [US2] Create RecipeFilter component with type selection UI in apps/web/src/components/recipes/recipe-filter.tsx
- [x] T025 [US2] Integrate RecipeFilter into recipes page with useState in apps/web/src/app/recipes/page.tsx
- [x] T026 [US2] Add filter clear button to RecipeFilter in apps/web/src/components/recipes/recipe-filter.tsx
- [x] T027 [US2] Verify all US2 tests pass and performance < 1 second (SC-002)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently. Type filtering works without breaking default display.

---

## Phase 5: User Story 3 - 食材で料理を絞り込み (Priority: P3)

**Goal**: ユーザーは料理ページで、特定の食材を選択し、その食材を使用する料理のみを一覧に表示できる。フィルターを解除すると、再びすべての料理が表示される。

**Independent Test**: 料理ページで食材フィルターを開き、特定の食材を選択し、その食材を含む料理カードのみが表示され、フィルター解除ですべてに戻ることで独立してテスト可能。

### Tests for User Story 3 (TDD - Red Phase)

- [x] T028 [P] [US3] Unit test for extractIngredients() in apps/web/tests/unit/lib/data/recipes.test.ts
- [x] T029 [P] [US3] Unit test for filterRecipesByIngredients() single ingredient in apps/web/tests/unit/lib/data/recipes.test.ts
- [x] T030 [P] [US3] Unit test for filterRecipesByIngredients() multiple ingredients (AND) in apps/web/tests/unit/lib/data/recipes.test.ts
- [x] T031 [P] [US3] Integration test for ingredient filter UI interaction in apps/web/tests/integration/recipes-page.test.tsx

### Implementation for User Story 3 (Green Phase)

- [x] T032 [P] [US3] Implement extractIngredients() function in apps/web/src/lib/data/recipes.ts
- [x] T033 [P] [US3] Implement filterRecipesByIngredients() function in apps/web/src/lib/data/recipes.ts
- [x] T034 [US3] Extend RecipeFilter component with ingredient selection UI in apps/web/src/components/recipes/recipe-filter.tsx
- [x] T035 [US3] Add ingredient filter state management to recipes page in apps/web/src/app/recipes/page.tsx
- [x] T036 [US3] Verify all US3 tests pass and performance < 1 second (SC-003)

**Checkpoint**: All user stories 1-3 should now be independently functional. Ingredient filtering works alongside type filtering.

---

## Phase 6: User Story 4 - 種別と食材の複合フィルター (Priority: P4)

**Goal**: ユーザーは料理ページで、種別選択と食材フィルターを組み合わせて、より精密に料理を絞り込むことができる。例えば、「サラダ」種別かつ「トマト」を含む料理のみを表示する。

**Independent Test**: 種別を選択し、さらに食材フィルターを適用し、両方の条件を満たす料理カードのみが表示されることで独立してテスト可能。

### Tests for User Story 4 (TDD - Red Phase)

- [x] T037 [P] [US4] Unit test for filterRecipes() with type only in apps/web/tests/unit/lib/data/recipes.test.ts
- [x] T038 [P] [US4] Unit test for filterRecipes() with ingredients only in apps/web/tests/unit/lib/data/recipes.test.ts
- [x] T039 [P] [US4] Unit test for filterRecipes() with both type and ingredients in apps/web/tests/unit/lib/data/recipes.test.ts
- [x] T040 [P] [US4] Integration test for combined filter UI interaction in apps/web/tests/integration/recipes-page.test.tsx
- [x] T041 [P] [US4] Integration test for partial filter clear (type only or ingredients only) in apps/web/tests/integration/recipes-page.test.tsx

### Implementation for User Story 4 (Green Phase)

- [x] T042 [US4] Implement filterRecipes() unified filter function in apps/web/src/lib/data/recipes.ts
- [x] T043 [US4] Update recipes page to use filterRecipes() instead of separate filters in apps/web/src/app/recipes/page.tsx
- [x] T044 [US4] Add partial filter clear buttons to RecipeFilter in apps/web/src/components/recipes/recipe-filter.tsx
- [x] T045 [US4] Add filter state display to RecipeFilter showing active filters in apps/web/src/components/recipes/recipe-filter.tsx
- [x] T046 [US4] Verify all US4 tests pass and combined filtering works correctly

**Checkpoint**: All user stories should now be independently functional. Combined filtering provides advanced search capability.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and edge cases

- [x] T047 [P] Add empty state message when no recipes match filters in apps/web/src/components/recipes/recipe-list.tsx
- [x] T048 [P] Add placeholder image support for recipes without imageUrl in apps/web/src/components/recipes/recipe-card.tsx
- [x] T049 [P] Add loading state to recipes page during data fetch in apps/web/src/app/recipes/page.tsx
- [x] T050 [P] Optimize with useMemo for filter operations in apps/web/src/app/recipes/page.tsx
- [ ] T051 [P] Test with 100+ recipe dataset to verify performance (SC-005) - DEFERRED: Current dataset sufficient for MVP
- [x] T052 [P] Add ARIA attributes for accessibility to RecipeCard in apps/web/src/components/recipes/recipe-card.tsx
- [x] T053 [P] Add ARIA attributes for accessibility to RecipeFilter in apps/web/src/components/recipes/recipe-filter.tsx
- [ ] T054 [P] Verify keyboard navigation works for all interactive elements - DEFERRED: Manual testing required
- [ ] T055 [P] Run Lighthouse audit to verify page load < 3 seconds (SC-001) - DEFERRED: Manual testing required
- [x] T056 [P] Add inline code comments to complex filter logic in apps/web/src/lib/data/recipes.ts
- [ ] T057 Validate quickstart.md steps work correctly - DEFERRED: Manual validation required
- [x] T058 Final build and test suite verification

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3 → P4)
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Independent of US1, but builds on same page
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Independent of US1/US2, but builds on same page
- **User Story 4 (P4)**: Depends on US2 and US3 being complete (combines both filter types)

### Within Each User Story

- Tests MUST be written and FAIL before implementation (TDD Red-Green-Refactor)
- Data layer functions before UI components
- UI components before page integration
- Core implementation before integration tests
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T002, T003)
- Within Foundational phase:
  - All unit tests (T005, T006, T007) can be written in parallel
  - Data functions (T008, T009, T010) can be implemented in parallel after tests
- Within each User Story:
  - All test files marked [P] can be written in parallel
  - Component files marked [P] can be implemented in parallel (e.g., RecipeCard + RecipeList)
- All Polish tasks marked [P] can run in parallel (T047-T056)

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (Red phase):
Task: "Component test for RecipeCard rendering in apps/web/tests/unit/components/recipes/recipe-card.test.tsx"
Task: "Component test for RecipeList rendering in apps/web/tests/unit/components/recipes/recipe-list.test.tsx"
Task: "Component test for empty state in RecipeList in apps/web/tests/unit/components/recipes/recipe-list.test.tsx"

# Launch all components for User Story 1 together (Green phase):
Task: "Create RecipeCard component in apps/web/src/components/recipes/recipe-card.tsx"
Task: "Create RecipeList component in apps/web/src/components/recipes/recipe-list.tsx"
```

---

## Parallel Example: User Story 3

```bash
# Launch all unit tests for User Story 3 together (Red phase):
Task: "Unit test for extractIngredients() in apps/web/tests/unit/lib/data/recipes.test.ts"
Task: "Unit test for filterRecipesByIngredients() single ingredient in apps/web/tests/unit/lib/data/recipes.test.ts"
Task: "Unit test for filterRecipesByIngredients() multiple ingredients (AND) in apps/web/tests/unit/lib/data/recipes.test.ts"
Task: "Integration test for ingredient filter UI interaction in apps/web/tests/integration/recipes-page.test.tsx"

# Launch data layer functions for User Story 3 together (Green phase):
Task: "Implement extractIngredients() function in apps/web/src/lib/data/recipes.ts"
Task: "Implement filterRecipesByIngredients() function in apps/web/src/lib/data/recipes.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready (すべての料理を一覧表示 - 基本機能完成)

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP: デフォルト全表示)
3. Add User Story 2 → Test independently → Deploy/Demo (種別フィルター追加)
4. Add User Story 3 → Test independently → Deploy/Demo (食材フィルター追加)
5. Add User Story 4 → Test independently → Deploy/Demo (複合フィルター完成)
6. Polish phase → Production ready
7. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (highest priority - MVP)
   - Developer B: User Story 2 (type filter)
   - Developer C: User Story 3 (ingredient filter)
3. After US2 & US3 complete:
   - Any developer: User Story 4 (combines US2 + US3)
4. Team: Polish phase together

---

## Success Metrics Validation

- **SC-001**: After T055, verify page load < 3 seconds with Lighthouse
- **SC-002**: After T027, verify type filter applies < 1 second
- **SC-003**: After T036, verify ingredient filter applies < 1 second
- **SC-004**: After T052-T054, verify 90%+ users understand recipe cards (user testing)
- **SC-005**: After T051, verify smooth operation with 100+ recipes

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- TDD cycle: Red (write failing test) → Green (make it pass) → Refactor (optimize)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Recipe data (recipes.json) can be expanded beyond 10-15 samples as needed
- Use shadcn/ui components: Card, Button, Select, Checkbox, Command (for ingredient search)

---

## Total Task Count

- **Phase 1 (Setup)**: 3 tasks
- **Phase 2 (Foundational)**: 8 tasks
- **Phase 3 (US1)**: 8 tasks
- **Phase 4 (US2)**: 8 tasks
- **Phase 5 (US3)**: 9 tasks
- **Phase 6 (US4)**: 10 tasks
- **Phase 7 (Polish)**: 12 tasks

**Total**: 58 tasks

**Parallelizable**: 42 tasks marked with [P]

**MVP Scope**: Phase 1 (3) + Phase 2 (8) + Phase 3 (8) = 19 tasks
