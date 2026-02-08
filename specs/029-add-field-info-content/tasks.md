# Tasks: フィールド情報コンテンツ追加

**Input**: Design documents from `/specs/029-add-field-info-content/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: TDD必須（Constitution: Test-Driven Development NON-NEGOTIABLE）。各タスクでテスト先行。

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app (monorepo)**: `apps/web/src/`, `apps/web/tests/`

---

## Phase 1: Foundational (Blocking Prerequisites)

**Purpose**: スキーマ・データ・データアクセス関数の整備。全ユーザーストーリーの共通基盤。

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T001 Test IslandSchema and SnorlaxRankSchema validation in `apps/web/tests/unit/lib/schemas/island.test.ts` — valid/invalid data cases, SnorlaxRankName enum, array length=6 constraint
- [X] T002 Extend IslandSchema with SnorlaxRankNameSchema, SnorlaxRankSchema in `apps/web/src/lib/schemas/island.ts` — data-model.md のZodスキーマ設計に従う
- [X] T003 Create islands.json with all field data in `apps/web/src/content/islands/islands.json` — 全フィールド（ワカクサ本島、シアンの砂浜、トープ洞窟、ウノハナ雪原、ラピスラズリ湖畔 等）のデータをdata-model.mdのサンプル構造に従い作成
- [X] T004 Test data access functions (getAllIslands, getIslandById, getIslandByName) in `apps/web/tests/unit/lib/data/islands.test.ts` — 全件取得、ID検索、名前検索、存在しないID/名前のundefined返却
- [X] T005 Implement data access functions in `apps/web/src/lib/data/islands.ts` — islands.json直接import + Zodバリデーション、contracts/data-access.mdの契約に従う

**Checkpoint**: Foundation ready — スキーマ・データ・アクセス関数が揃い、ユーザーストーリー実装を開始可能

---

## Phase 2: User Story 1 — フィールド基本情報の閲覧 (Priority: P1) 🎯 MVP

**Goal**: 島ガイドページにフィールド一覧を表示し、各フィールドの基本情報（名前・とくいきのみ）を確認できるようにする

**Independent Test**: 島ガイドページを開き、フィールドカードからフィールドを選択して、名前ととくいきのみが表示されることを確認

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T006 [P] [US1] Test IslandCard in `apps/web/tests/unit/components/islands/island-card.test.tsx` — フィールド名表示、固定きのみ名表示、ランダム時「ランダム」表示、リンク先 `/islands/{id}`、aria-label/data-testid
- [X] T007 [P] [US1] Test IslandList in `apps/web/tests/unit/components/islands/island-list.test.tsx` — 0件時の空メッセージ、1件/複数件でのグリッド表示、全カードのレンダリング

### Implementation for User Story 1

- [X] T008 [P] [US1] Implement IslandCard in `apps/web/src/components/islands/island-card.tsx` — shadcn/ui Card + Next.js Link、contracts/components.mdのIslandCard契約に従う
- [X] T009 [P] [US1] Implement IslandList in `apps/web/src/components/islands/island-list.tsx` — レスポンシブグリッド（1列→md:2列→lg:3列）、contracts/components.mdのIslandList契約に従う
- [X] T010 [US1] Replace islands list page in `apps/web/src/app/islands/page.tsx` — 既存プレースホルダーを置換、getAllIslands()でデータ取得、IslandListに渡す、metadata設定
- [X] T011 [US1] Create basic detail page in `apps/web/src/app/islands/[id]/page.tsx` — generateStaticParams、generateMetadata、getIslandById、notFound()、フィールド名・説明・とくいきのみの基本情報表示、Breadcrumb

**Checkpoint**: US1完了 — 島ガイド一覧からフィールド選択→基本情報（名前・とくいきのみ）が確認可能

---

## Phase 3: User Story 2 — カビゴン評価ごとの必要エナジー確認 (Priority: P1)

**Goal**: フィールド詳細ページにカビゴン評価6段階の必要エナジー一覧テーブルを追加する

**Independent Test**: フィールド詳細ページでカビゴン評価テーブルが表示され、全6ランクの必要エナジーが数値で確認できる

### Tests for User Story 2

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T012 [P] [US2] Test SnorlaxRankTable in `apps/web/tests/unit/components/islands/snorlax-rank-table.test.tsx` — 6ランク全表示、ランク名の順序、エナジー値のカンマ区切り表示（例: 16,089）、テーブル構造（thead/tbody）

### Implementation for User Story 2

- [X] T013 [US2] Implement SnorlaxRankTable in `apps/web/src/components/islands/snorlax-rank-table.tsx` — shadcn/ui Table、contracts/components.mdのSnorlaxRankTable契約に従う
- [X] T014 [US2] Add SnorlaxRankTable to detail page in `apps/web/src/app/islands/[id]/page.tsx` — island.snorlaxRanksをSnorlaxRankTableに渡す

**Checkpoint**: US2完了 — フィールド詳細ページでカビゴン評価ごとの必要エナジーが一覧確認可能

---

## Phase 4: User Story 3 — カビゴン評価ごとの出現ポケモン確認 (Priority: P2)

**Goal**: フィールド詳細ページにカビゴン評価ランクごとの出現ポケモン（差分表示）をポケモン詳細ページへのリンク付きで追加する

**Independent Test**: フィールド詳細ページでランクごとの出現ポケモンが表示され、各ポケモン名がポケモン詳細ページへリンクされている

### Tests for User Story 3

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T015 [P] [US3] Test RankPokemonList in `apps/web/tests/unit/components/islands/rank-pokemon-list.test.tsx` — ランクごとのセクション表示、ポケモン名表示、`/pokemon/{id}`へのリンク、新規出現なしランクの「なし」表示

### Implementation for User Story 3

- [X] T016 [US3] Implement RankPokemonList in `apps/web/src/components/islands/rank-pokemon-list.tsx` — ランクごとにセクション分け、各ポケモンはLink付き表示、contracts/components.mdのRankPokemonList契約に従う
- [X] T017 [US3] Add RankPokemonList to detail page in `apps/web/src/app/islands/[id]/page.tsx` — pokemonMap構築（getAllPokemon→Map変換）、RankPokemonListに渡す

**Checkpoint**: US3完了 — フィールド詳細ページで全情報（基本情報・エナジー・出現ポケモン）が確認可能

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: ナビゲーション統合、全体の品質確認

- [X] T018 Update navigation links in `apps/web/src/components/navigation/navigation-links.ts` — 島ガイドリンクが正しく `/islands` を指していることを確認、必要に応じてアイコン・ラベルを調整
- [X] T019 Run Biome format and lint check with `bun check` from project root — 全ファイルがフォーマット・Lint規約に準拠
- [X] T020 Run full test suite with `cd apps/web && bun run test` — 全テストパス確認、既存テストへの回帰がないこと

---

## Dependencies & Execution Order

### Phase Dependencies

- **Foundational (Phase 1)**: No dependencies — can start immediately. BLOCKS all user stories
- **User Story 1 (Phase 2)**: Depends on Foundational completion
- **User Story 2 (Phase 3)**: Depends on Foundational completion + US1 detail page (T011)
- **User Story 3 (Phase 4)**: Depends on Foundational completion + US1 detail page (T011)
- **Polish (Phase 5)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 (P1)**: Can start after Phase 1 — Creates list page + basic detail page
- **US2 (P1)**: Can start after Phase 1 — Adds SnorlaxRankTable to detail page created by US1 (T011)
- **US3 (P2)**: Can start after Phase 1 — Adds RankPokemonList to detail page created by US1 (T011)

### Within Each User Story

- Tests MUST be written and FAIL before implementation (TDD)
- Components before page integration
- Commit after each task or logical group

### Parallel Opportunities

- **Phase 1**: T001 (schema test) can be parallel with T004 (data test) once T002+T003 complete
- **Phase 2**: T006 + T007 (tests) in parallel → T008 + T009 (components) in parallel → T010 + T011 sequentially
- **Phase 3**: T012 (test) → T013 (component) → T014 (page integration)
- **Phase 4**: T015 (test) → T016 (component) → T017 (page integration)
- **Phase 5**: T018 + T019 in parallel → T020 last

---

## Parallel Example: User Story 1

```bash
# Launch tests for US1 together (TDD - write first, ensure FAIL):
Task: T006 "Test IslandCard in apps/web/tests/unit/components/islands/island-card.test.tsx"
Task: T007 "Test IslandList in apps/web/tests/unit/components/islands/island-list.test.tsx"

# Launch component implementations together:
Task: T008 "Implement IslandCard in apps/web/src/components/islands/island-card.tsx"
Task: T009 "Implement IslandList in apps/web/src/components/islands/island-list.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Foundational (schema + data + access functions)
2. Complete Phase 2: User Story 1 (list page + basic detail)
3. **STOP and VALIDATE**: 島ガイド一覧→フィールド選択→基本情報表示を確認
4. Deploy/demo if ready

### Incremental Delivery

1. Phase 1 → Foundation ready
2. Add US1 → フィールド一覧 + 基本情報閲覧 → Deploy (MVP!)
3. Add US2 → カビゴン評価エナジーテーブル追加 → Deploy
4. Add US3 → 出現ポケモンリスト追加 → Deploy
5. Each story adds value without breaking previous stories

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- TDD必須: テストを先に書き、FAILを確認してから実装（Constitution準拠）
- 既存pokemonパターンを踏襲（list page + [id] detail page + components/ + lib/data/）
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
