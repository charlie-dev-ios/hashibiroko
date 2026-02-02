# Tasks: ナビゲーションバーアイテムの整理

**Input**: Design documents from `/specs/005-organize-navbar-items/`
**Prerequisites**: plan.md, spec.md, research.md, quickstart.md

**Tests**: TDD必須（Constitution準拠）- テストを先に書き、失敗を確認してから実装

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Web app (monorepo)**: `apps/web/src/`, `apps/web/tests/`

---

## Phase 1: Setup

**Purpose**: 既存のナビゲーション構造の確認

- [ ] T001 既存のナビゲーションテストを確認 in `apps/web/tests/unit/components/navigation/`
- [ ] T002 既存のE2Eテストを確認 in `apps/web/e2e/navigation.spec.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 新規アイコンのインポートと共通変更

**⚠️ CRITICAL**: 全ユーザーストーリーに必要な共通インフラ

- [ ] T003 [P] lucide-reactから Cherry, Egg アイコンをインポート可能か確認
- [ ] T004 navigation-links.ts のバックアップまたはgit状態を確認

**Checkpoint**: Foundation ready - ユーザーストーリー実装開始可能

---

## Phase 3: User Story 1 - 整理されたナビゲーション (Priority: P1) 🎯 MVP

**Goal**: 睡眠戦略とゲームメカニクスを削除し、ナビゲーションを整理

**Independent Test**: ナビゲーションに「睡眠戦略」「ゲームメカニクス」が表示されないことを確認

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T005 [US1] 「睡眠戦略」が表示されないことを確認するテストを追加 in `apps/web/tests/unit/components/navigation/top-nav.test.tsx`
- [ ] T006 [P] [US1] 「ゲームメカニクス」が表示されないことを確認するテストを追加 in `apps/web/tests/unit/components/navigation/top-nav.test.tsx`

### Implementation for User Story 1

- [ ] T007 [US1] navigation-links.ts から「睡眠戦略」エントリを削除 in `apps/web/src/components/navigation/navigation-links.ts`
- [ ] T008 [US1] navigation-links.ts から「ゲームメカニクス」エントリを削除 in `apps/web/src/components/navigation/navigation-links.ts`
- [ ] T009 [US1] Moon, Settings アイコンのインポートを削除（未使用になるため） in `apps/web/src/components/navigation/navigation-links.ts`
- [ ] T010 [US1] テストを実行し、パスすることを確認

**Checkpoint**: User Story 1 完了 - 不要な項目が削除された状態

---

## Phase 4: User Story 2 - フィールド情報へのナビゲーション (Priority: P1)

**Goal**: 「島ガイド」を「フィールド情報」に名称変更

**Independent Test**: 「フィールド情報」が表示され、/islands に遷移すること

### Tests for User Story 2

- [ ] T011 [US2] 「フィールド情報」が表示されることを確認するテストを追加 in `apps/web/tests/unit/components/navigation/top-nav.test.tsx`
- [ ] T012 [P] [US2] 「島ガイド」が表示されないことを確認するテストを追加 in `apps/web/tests/unit/components/navigation/top-nav.test.tsx`

### Implementation for User Story 2

- [ ] T013 [US2] navigation-links.ts の「島ガイド」titleを「フィールド情報」に変更 in `apps/web/src/components/navigation/navigation-links.ts`
- [ ] T014 [US2] descriptionも適切に更新 in `apps/web/src/components/navigation/navigation-links.ts`
- [ ] T015 [US2] テストを実行し、パスすることを確認

**Checkpoint**: User Story 2 完了 - 名称変更された状態

---

## Phase 5: User Story 3 - きのみ情報へのアクセス (Priority: P2)

**Goal**: 「きのみ情報」リンクをナビゲーションに追加

**Independent Test**: 「きのみ情報」が表示され、/berries に遷移すること

### Tests for User Story 3

- [ ] T016 [US3] 「きのみ情報」が表示されることを確認するテストを追加 in `apps/web/tests/unit/components/navigation/top-nav.test.tsx`
- [ ] T017 [P] [US3] /berries ページにアクセスできることを確認するE2Eテストを追加 in `apps/web/e2e/navigation.spec.ts`

### Implementation for User Story 3

- [ ] T018 [US3] Cherry アイコンをインポート in `apps/web/src/components/navigation/navigation-links.ts`
- [ ] T019 [US3] きのみ情報エントリを navigationLinks 配列に追加 in `apps/web/src/components/navigation/navigation-links.ts`
- [ ] T020 [US3] きのみ情報プレースホルダーページを作成 in `apps/web/src/app/berries/page.tsx`
- [ ] T021 [US3] テストを実行し、パスすることを確認

**Checkpoint**: User Story 3 完了 - きのみ情報にアクセス可能

---

## Phase 6: User Story 4 - 食材情報へのアクセス (Priority: P2)

**Goal**: 「食材情報」リンクをナビゲーションに追加

**Independent Test**: 「食材情報」が表示され、/ingredients に遷移すること

### Tests for User Story 4

- [ ] T022 [US4] 「食材情報」が表示されることを確認するテストを追加 in `apps/web/tests/unit/components/navigation/top-nav.test.tsx`
- [ ] T023 [P] [US4] /ingredients ページにアクセスできることを確認するE2Eテストを追加 in `apps/web/e2e/navigation.spec.ts`

### Implementation for User Story 4

- [ ] T024 [US4] Egg アイコンをインポート in `apps/web/src/components/navigation/navigation-links.ts`
- [ ] T025 [US4] 食材情報エントリを navigationLinks 配列に追加 in `apps/web/src/components/navigation/navigation-links.ts`
- [ ] T026 [US4] 食材情報プレースホルダーページを作成 in `apps/web/src/app/ingredients/page.tsx`
- [ ] T027 [US4] テストを実行し、パスすることを確認

**Checkpoint**: User Story 4 完了 - 食材情報にアクセス可能

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: 全体的な品質確認とテスト更新

- [ ] T028 [P] 統合テストを更新し、ナビゲーション項目数が6個であることを確認 in `apps/web/tests/integration/navigation.test.tsx`
- [ ] T029 [P] E2Eテストを更新し、全ナビゲーションリンクが動作することを確認 in `apps/web/e2e/navigation.spec.ts`
- [ ] T030 モバイルナビゲーションテストを更新 in `apps/web/tests/unit/components/navigation/mobile-nav.test.tsx`
- [ ] T031 Lint/Format チェックを実行 (`bun check`)
- [ ] T032 全テストスイートを実行 (`cd apps/web && bun run test`)
- [ ] T033 quickstart.md の検証チェックリストを確認

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - US1, US2 は P1 優先度のため先に実施
  - US3, US4 は P2 優先度のため後に実施（並列可能）
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Foundational 後すぐに開始可能
- **User Story 2 (P1)**: US1 と並列可能（異なる項目への変更）
- **User Story 3 (P2)**: US1, US2 完了後に開始（配列順序の整合性のため）
- **User Story 4 (P2)**: US3 と並列可能（異なるファイルへの変更）

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- Implementation follows test
- Verify tests pass after implementation

### Parallel Opportunities

- T005, T006: 同じファイルだが異なるテストケースのため並列可能
- T016, T017: 異なるファイルのため並列可能
- T022, T023: 異なるファイルのため並列可能
- T028, T029, T030: 異なるファイルのため並列可能

---

## Parallel Example: User Story 3 & 4

```bash
# US3 と US4 は並列実行可能:
# Developer A: US3 (きのみ情報)
Task: T016-T021

# Developer B: US4 (食材情報)
Task: T022-T027
```

---

## Implementation Strategy

### MVP First (User Story 1 & 2)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1 (削除)
4. Complete Phase 4: User Story 2 (名称変更)
5. **STOP and VALIDATE**: ナビゲーションが整理された状態をテスト
6. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add US1 + US2 → Test → Deploy/Demo (MVP!)
3. Add US3 (きのみ情報) → Test → Deploy/Demo
4. Add US4 (食材情報) → Test → Deploy/Demo
5. Polish → Final release

---

## Summary

| Metric | Count |
|--------|-------|
| Total Tasks | 33 |
| Phase 1 (Setup) | 2 |
| Phase 2 (Foundational) | 2 |
| Phase 3 (US1) | 6 |
| Phase 4 (US2) | 5 |
| Phase 5 (US3) | 6 |
| Phase 6 (US4) | 6 |
| Phase 7 (Polish) | 6 |
| Parallel Opportunities | 12 tasks marked [P] |

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- TDD必須（Constitution準拠）
