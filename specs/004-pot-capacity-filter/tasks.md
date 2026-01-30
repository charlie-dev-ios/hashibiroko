# Tasks: 鍋容量フィルター

**Input**: Design documents from `/specs/004-pot-capacity-filter/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

**Tests**: TDD必須（Constitution準拠）- テストを先に書き、失敗を確認してから実装

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Monorepo**: `apps/web/src/`, `apps/web/tests/`
- Based on plan.md structure

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 定数ファイルの作成（全ストーリーで共有）

- [x] T001 [P] Create pot capacity presets constants in `apps/web/src/lib/constants/pot-capacity.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: フィルタリングロジックの実装（全ストーリーで必要）

**⚠️ CRITICAL**: User Story 1-3 すべてがこのフェーズに依存

### Tests (TDD - MUST FAIL first)

- [x] T002 [P] Unit test for `filterRecipesByPotCapacity` in `apps/web/tests/unit/lib/utils/recipe-utils.test.ts`
  - null/undefined で全件返却
  - 0以下で全件返却
  - 正の値でフィルタリング
  - 境界値（ingredientCount と同値）

### Implementation

- [x] T003 Implement `filterRecipesByPotCapacity` function in `apps/web/src/lib/utils/recipe-utils.ts`

**Checkpoint**: Foundation ready - User Story 実装開始可能

---

## Phase 3: User Story 1 - 鍋容量で料理をフィルタリングする (Priority: P1) 🎯 MVP

**Goal**: ユーザーが鍋容量を入力し、その数以下の料理のみ表示する

**Independent Test**: 鍋容量入力フィールドに数値を入れ、フィルター結果が即座に更新されることを確認

### Tests for User Story 1 (TDD - MUST FAIL first)

- [x] T004 [P] [US1] Component test for pot capacity input UI in `apps/web/tests/unit/components/recipes/recipe-filter.test.tsx`
  - 鍋容量入力フィールドが表示される
  - 数値入力でonChangeコールバックが呼ばれる
  - クリアボタンでnullがセットされる

- [x] T005 [P] [US1] Integration test for filtering in `apps/web/tests/unit/components/recipes/recipes-page-content.test.tsx` (新規作成)
  - 鍋容量を設定すると filteredRecipes が更新される
  - 鍋容量をクリアすると全件表示に戻る

### Implementation for User Story 1

- [x] T006 [US1] Add `potCapacity` state to `apps/web/src/components/recipes/recipes-page-content.tsx`
  - useState<number | null>(null) を追加
  - useMemo の依存配列に追加
  - filterRecipesByPotCapacity を呼び出し

- [x] T007 [US1] Add pot capacity filter section to `apps/web/src/components/recipes/recipe-filter.tsx`
  - RecipeFilterProps に potCapacity, onPotCapacityChange を追加
  - 数値入力フィールド（type="number", min="1", step="1"）
  - クリアボタン

- [x] T008 [US1] Add pot capacity badge to filter summary in `apps/web/src/components/recipes/recipe-filter.tsx`
  - 適用中フィルター表示にpotCapacityを追加

**Checkpoint**: MVP完成 - 鍋容量入力によるフィルタリングが動作

---

## Phase 4: User Story 2 - 他のフィルターと組み合わせて使用する (Priority: P2)

**Goal**: 鍋容量フィルターと既存フィルター（種別・食材）をAND条件で併用

**Independent Test**: 鍋容量と料理種別を両方設定し、両条件を満たす料理のみ表示されることを確認

### Tests for User Story 2 (TDD - MUST FAIL first)

- [x] T009 [P] [US2] Integration test for combined filters in `apps/web/tests/unit/components/recipes/recipes-page-content.test.tsx`
  - 鍋容量 + 料理種別 でANDフィルタリング
  - 鍋容量 + 食材 でANDフィルタリング
  - 鍋容量のみクリアで他フィルターは維持

### Implementation for User Story 2

- [x] T010 [US2] Verify AND condition logic in `apps/web/src/components/recipes/recipes-page-content.tsx`
  - 既存実装のuseMemo内でAND条件が正しく動作することを確認
  - 必要に応じてリファクタリング

- [x] T011 [US2] Update filter summary to show combined state in `apps/web/src/components/recipes/recipe-filter.tsx`
  - 複数フィルター適用時の表示が正しいことを確認

**Checkpoint**: 複合フィルタリングが動作

---

## Phase 5: User Story 3 - よく使う鍋容量を素早く選択する (Priority: P3)

**Goal**: プリセットボタン（Lv.1〜Lv.8）をクリックして素早く鍋容量を設定

**Independent Test**: プリセットボタンをクリックし、対応する容量でフィルタリングされることを確認

### Tests for User Story 3 (TDD - MUST FAIL first)

- [x] T012 [P] [US3] Component test for preset buttons in `apps/web/tests/unit/components/recipes/recipe-filter.test.tsx`
  - 8つのプリセットボタンが表示される
  - ボタンクリックでonPotCapacityChangeが呼ばれる（正しい値で）
  - 選択中のプリセットがハイライトされる
  - 手動入力でプリセット選択が解除される

### Implementation for User Story 3

- [x] T013 [US3] Add preset buttons UI to `apps/web/src/components/recipes/recipe-filter.tsx`
  - POT_CAPACITY_PRESETS をインポート
  - ボタン群をレンダリング（横並び、レスポンシブ）
  - 選択状態のスタイリング

- [x] T014 [US3] Handle preset selection state in `apps/web/src/components/recipes/recipe-filter.tsx`
  - 現在の potCapacity と preset.capacity を比較してアクティブ判定
  - 手動入力時はプリセット選択解除

**Checkpoint**: 全User Storyが独立して動作

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: コード品質とエッジケース対応

- [x] T015 [P] Add edge case tests in `apps/web/tests/unit/lib/utils/recipe-utils.test.ts`
  - 空配列入力
  - ingredientCount=0 の料理（ごちゃまぜ系）

- [x] T016 [P] Add accessibility attributes to `apps/web/src/components/recipes/recipe-filter.tsx`
  - aria-label for input
  - aria-pressed for preset buttons
  - fieldset/legend for grouping

- [x] T017 Run all tests and verify coverage: `bun run test --coverage`

- [ ] T018 Manual testing per quickstart.md scenarios

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup (T001) - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational (T002, T003)
- **User Story 2 (Phase 4)**: Depends on User Story 1 completion (integration)
- **User Story 3 (Phase 5)**: Depends on User Story 1 completion (uses same state)
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - No dependencies on other stories
- **User Story 2 (P2)**: Requires US1 implementation (same state management)
- **User Story 3 (P3)**: Requires US1 implementation (same state management)

### Within Each User Story

- Tests (TDD) MUST be written and FAIL before implementation
- Test → Implementation → Verify test passes
- Commit after each task or logical group

### Parallel Opportunities

Within Phase 3 (User Story 1):
- T004 and T005 can run in parallel (different test files)

Within Phase 5 (User Story 3):
- T012 can start while T010/T011 are in progress (different focus)

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Component test for pot capacity input UI in apps/web/tests/unit/components/recipes/recipe-filter.test.tsx"
Task: "Integration test for filtering in apps/web/tests/unit/components/recipes/recipes-page-content.test.tsx"

# After tests fail, implementation tasks are sequential:
# T006 → T007 → T008 (same files, state dependencies)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001)
2. Complete Phase 2: Foundational (T002 → T003)
3. Complete Phase 3: User Story 1 (T004-T005 → T006-T008)
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready - 基本的なフィルタリングが動作

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add User Story 1 → MVP: 鍋容量入力フィルタリング
3. Add User Story 2 → 複合フィルタリング
4. Add User Story 3 → プリセット機能
5. Polish → 品質向上

### TDD Cycle (Each Task)

1. Write test (Red)
2. Run test, confirm failure
3. Implement minimum code (Green)
4. Run test, confirm pass
5. Refactor if needed
6. Commit

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- **TDD必須**: テストが先、実装が後
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
