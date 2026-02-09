# Tasks: カビゴン評価ランクデータの実データ対応

**Input**: Design documents from `/specs/030-update-snorlax-ratings/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

**Tests**: TDD approach required by Constitution. Test tasks are included.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

- **Monorepo**: `apps/web/src/` for source, `apps/web/tests/unit/` for tests

---

## Phase 1: Setup

**Purpose**: No new project setup needed. This feature modifies existing files only.

(No tasks in this phase - existing project structure is sufficient)

---

## Phase 2: Foundational (Schema & Data Migration)

**Purpose**: Update Zod schema and JSON data that ALL user stories depend on. MUST complete before any UI work.

**⚠️ CRITICAL**: Both user stories depend on the new schema and data. This phase BLOCKS all UI work.

### Tests (Red phase)

- [x] T001 Update SnorlaxRankTierSchema tests: replace 6 rank name enum tests with 4 tier name enum tests (ノーマル/スーパー/ハイパー/マスター), add rejection test for old names (いいかんじ, すごいぞ, とてもすごい) in `apps/web/tests/unit/lib/schemas/island.test.ts`
- [x] T002 Update SnorlaxRankSchema tests: add tests for new fields `rankTier`, `rankNumber`, `dreamShards`, test validation for rankNumber range (1-5 for ノーマル/スーパー/ハイパー, 1-20 for マスター), test dreamShards >= 0 in `apps/web/tests/unit/lib/schemas/island.test.ts`
- [x] T003 Update IslandSchema tests: change `.length(6)` expectation to `.length(35)`, update mock data to 35 ranks with new field structure in `apps/web/tests/unit/lib/schemas/island.test.ts`

### Implementation (Green phase)

- [x] T004 Update Zod schemas: rename `SnorlaxRankNameSchema` to `SnorlaxRankTierSchema` with 4 values (ノーマル/スーパー/ハイパー/マスター), add `rankNumber` (z.number().int().positive()), add `dreamShards` (z.number().int().nonnegative()), rename `rank` to `rankTier`, change `.length(6)` to `.length(35)`, update type exports in `apps/web/src/lib/schemas/island.ts`
- [x] T005 Update islands.json with real game data for all 6 fields × 35 ranks each (210 total rank entries) with rankTier, rankNumber, requiredEnergy, dreamShards fields. Use data from `specs/030-update-snorlax-ratings/research.md`. Set newPokemonIds to empty arrays for all ranks in `apps/web/src/content/islands/islands.json`
- [x] T006 Update data access layer tests: update mock data fixtures to use new 35-rank structure with rankTier/rankNumber/dreamShards fields in `apps/web/tests/unit/lib/data/islands.test.ts`

**Checkpoint**: Schema tests pass, JSON data validates against new schema, data access layer tests pass.

---

## Phase 3: User Story 1 - 正確なカビゴン評価ランク一覧の閲覧 (Priority: P1) 🎯 MVP

**Goal**: ランク表にノーマル1〜マスター20の35段階が表示され、各ランクの必要エナジーと報酬（ゆめのかけら数）が正しく表示される。

**Independent Test**: フィールド詳細ページを開き、カビゴン評価ランク表の各ランク名（「ノーマル 1」形式）・必要エナジー（カンマ区切り）・報酬（ゆめのかけら数）が表示されることを確認する。

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T007 [US1] Update snorlax-rank-table tests: test that rank name displays as `{rankTier} {rankNumber}` format (e.g., "ノーマル 3"), test that 報酬 (dreamShards) column exists and displays values with toLocaleString formatting, test that all 35 ranks render, update mock data to new structure in `apps/web/tests/unit/components/islands/snorlax-rank-table.test.tsx`

### Implementation for User Story 1

- [x] T008 [US1] Update SnorlaxRankTable component: change rank column to display `{rankTier} {rankNumber}`, add third column header "報酬" for dreamShards, display dreamShards with toLocaleString formatting, update key from `rank.rank` to `${rank.rankTier}-${rank.rankNumber}` in `apps/web/src/components/islands/snorlax-rank-table.tsx`

**Checkpoint**: SnorlaxRankTable renders 35 ranks with tier+number names, energy, and dream shard rewards. All rank table tests pass.

---

## Phase 4: User Story 2 - ランク別出現ポケモンの正確な表示 (Priority: P2)

**Goal**: ランク別出現ポケモン一覧が35段階の新ランク構造に対応し、各ランクのキーが正しく設定される。

**Independent Test**: フィールド詳細ページの出現ポケモンセクションが35段階のランク名で表示され、各ランクに「なし」が表示される（初期リリースではnewPokemonIdsは空配列）。

### Tests for User Story 2

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T009 [US2] Update rank-pokemon-list tests: test that rank heading displays as `{rankTier} {rankNumber}` format, test that all 35 ranks render, update mock data to new structure with rankTier/rankNumber fields, update key expectations in `apps/web/tests/unit/components/islands/rank-pokemon-list.test.tsx`

### Implementation for User Story 2

- [x] T010 [US2] Update RankPokemonList component: change heading from `rank.rank` to `${rank.rankTier} ${rank.rankNumber}`, update key from `rank.rank` to `${rank.rankTier}-${rank.rankNumber}` in `apps/web/src/components/islands/rank-pokemon-list.tsx`

**Checkpoint**: RankPokemonList renders 35 ranks with correct tier+number headings. All pokemon list tests pass.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Verify everything works together end-to-end.

- [x] T011 Run all unit tests via `cd apps/web && bun run test` and fix any failures
- [x] T012 Run type checking via `bun run typecheck` and fix any type errors
- [x] T013 Run build via `bun run build` and verify no build errors
- [x] T014 Manually verify island detail page renders correctly with new 35-rank data for at least ワカクサ本島 and ゴールド旧発電所

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: N/A - no setup needed
- **Foundational (Phase 2)**: BLOCKS all user stories - schema and data must be updated first
- **User Story 1 (Phase 3)**: Depends on Phase 2 completion
- **User Story 2 (Phase 4)**: Depends on Phase 2 completion, independent of Phase 3
- **Polish (Phase 5)**: Depends on Phases 3 and 4 completion

### User Story Dependencies

- **User Story 1 (P1)**: Depends on Foundational (Phase 2) only. No dependency on US2.
- **User Story 2 (P2)**: Depends on Foundational (Phase 2) only. No dependency on US1.

### Within Each Phase

- Phase 2: T001-T003 (tests) → T004 (schema) → T005 (data) → T006 (data tests)
- Phase 3: T007 (test) → T008 (implementation)
- Phase 4: T009 (test) → T010 (implementation)
- Phase 5: T011 → T012 → T013 → T014 (sequential verification)

### Parallel Opportunities

- **Phase 2**: T001, T002, T003 can run in parallel (same file, but independent test sections)
- **Phase 3 & 4**: Can run in parallel after Phase 2 (different component files)
  - T007 + T009 can run in parallel (different test files)
  - T008 + T010 can run in parallel (different component files)

---

## Parallel Example: After Phase 2

```bash
# Launch User Story 1 and User Story 2 tests together:
Task: "Update snorlax-rank-table tests in apps/web/tests/unit/components/islands/snorlax-rank-table.test.tsx"
Task: "Update rank-pokemon-list tests in apps/web/tests/unit/components/islands/rank-pokemon-list.test.tsx"

# Then launch implementations together:
Task: "Update SnorlaxRankTable in apps/web/src/components/islands/snorlax-rank-table.tsx"
Task: "Update RankPokemonList in apps/web/src/components/islands/rank-pokemon-list.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 2: Foundational (schema + data)
2. Complete Phase 3: User Story 1 (rank table with energy + rewards)
3. **STOP and VALIDATE**: Verify rank table shows 35 ranks correctly
4. Deploy/demo if ready

### Incremental Delivery

1. Phase 2: Schema + Data → Foundation ready
2. Phase 3: Rank Table → Accurate rank data displayed (MVP!)
3. Phase 4: Pokemon List → Rank headings updated
4. Phase 5: Polish → Full verification

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story
- Constitution requires TDD: write failing tests before implementation
- T005 (JSON data update) is the largest task: 6 islands × 35 ranks = 210 entries
- Data source: research.md contains verified game data for all 6 fields
- newPokemonIds set to empty arrays initially (per research.md R-006)
- Commit after each task or logical group
