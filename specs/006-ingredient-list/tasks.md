# Tasks: 食材情報閲覧

**Input**: Design documents from `/specs/006-ingredient-list/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

**Tests**: TDD必須（Constitution準拠）- テストを先に書いて失敗を確認してから実装

**Organization**: タスクはユーザーストーリー単位で整理され、独立した実装・テストが可能

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 並列実行可能（異なるファイル、依存関係なし）
- **[Story]**: タスクが属するユーザーストーリー（例: US1, US2）
- 説明には正確なファイルパスを含む

## Path Conventions

- **Web app**: `apps/web/src/`（Monorepo構造）

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: ディレクトリ構造と共通設定の準備

- [ ] T001 食材コンテンツディレクトリ作成 `apps/web/src/content/ingredients/`
- [ ] T002 食材コンポーネントディレクトリ作成 `apps/web/src/components/ingredients/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 全ユーザーストーリーに必要な基盤（スキーマとデータ）

**⚠️ CRITICAL**: このフェーズ完了まで、ユーザーストーリーの作業は開始不可

### Tests

- [ ] T003 [P] 食材スキーマのテスト作成 `apps/web/src/lib/schemas/ingredient.test.ts`
- [ ] T004 [P] 食材データ取得関数のテスト作成 `apps/web/src/lib/data/ingredients.test.ts`

### Implementation

- [ ] T005 [P] 食材Zodスキーマ作成 `apps/web/src/lib/schemas/ingredient.ts`
- [ ] T006 食材マスターデータJSON作成 `apps/web/src/content/ingredients/ingredients.json`
- [ ] T007 食材データ取得関数実装 `apps/web/src/lib/data/ingredients.ts`

**Checkpoint**: 基盤準備完了 - ユーザーストーリー実装を開始可能

---

## Phase 3: User Story 1 - 食材一覧の閲覧 (Priority: P1) MVP

**Goal**: ユーザーがナビゲーションから食材一覧画面にアクセスし、全食材とエナジー値を確認できる

**Independent Test**: `/ingredients` にアクセスし、食材リストが表示され、各食材に名前とエナジー値が表示されることを確認

### Tests for User Story 1

> **NOTE: テストを先に書き、実装前に失敗することを確認**

- [ ] T008 [P] [US1] 食材カードコンポーネントのテスト作成 `apps/web/src/components/ingredients/ingredient-card.test.tsx`
- [ ] T009 [P] [US1] 食材リストコンポーネントのテスト作成 `apps/web/src/components/ingredients/ingredient-list.test.tsx`

### Implementation for User Story 1

- [ ] T010 [P] [US1] 食材カードコンポーネント実装 `apps/web/src/components/ingredients/ingredient-card.tsx`
- [ ] T011 [US1] 食材リストコンポーネント実装 `apps/web/src/components/ingredients/ingredient-list.tsx`
- [ ] T012 [US1] 食材一覧ページ更新 `apps/web/src/app/ingredients/page.tsx`

**Checkpoint**: User Story 1完了 - 食材一覧が表示され、各食材の名前とエナジー値が確認できる

---

## Phase 4: User Story 2 - 食材の素早い確認 (Priority: P2)

**Goal**: 視認しやすいレイアウトで食材情報が表示される

**Independent Test**: 食材一覧画面で特定の食材を探し、情報が見やすく整理されていることを確認

### Implementation for User Story 2

- [ ] T013 [US2] 食材一覧のレイアウト改善（グリッド表示） `apps/web/src/components/ingredients/ingredient-list.tsx`
- [ ] T014 [US2] レスポンシブデザイン対応 `apps/web/src/components/ingredients/ingredient-card.tsx`

**Checkpoint**: User Story 2完了 - 食材リストが見やすく整理されている

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: 全ユーザーストーリーに影響する改善

- [ ] T015 [P] エッジケース対応（空データ時のメッセージ表示） `apps/web/src/components/ingredients/ingredient-list.tsx`
- [ ] T016 テスト実行と動作確認
- [ ] T017 コード品質チェック（Biome lint/format）

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: 依存なし - すぐに開始可能
- **Foundational (Phase 2)**: Setup完了後 - 全ユーザーストーリーをブロック
- **User Story 1 (Phase 3)**: Foundational完了後に開始可能
- **User Story 2 (Phase 4)**: User Story 1の基本実装完了後
- **Polish (Phase 5)**: 全ユーザーストーリー完了後

### User Story Dependencies

- **User Story 1 (P1)**: Foundational完了後に開始可能 - 他のストーリーに依存なし
- **User Story 2 (P2)**: US1の基本実装完了後 - US1のコンポーネントを改善

### Within Each Phase

- テストを先に書いて失敗を確認（TDD必須）
- スキーマ → データ → コンポーネント → ページの順
- 各タスク完了後にコミット推奨

### Parallel Opportunities

- T001, T002: ディレクトリ作成は並列可能
- T003, T004: テスト作成は並列可能
- T005, T006: スキーマとデータ作成は並列可能
- T008, T009: US1テスト作成は並列可能
- T010: カード実装はリストと並列可能

---

## Parallel Example: Foundational Phase

```bash
# テストを並列で作成
Task: T003 "食材スキーマのテスト作成"
Task: T004 "食材データ取得関数のテスト作成"

# 実装を並列で作成
Task: T005 "食材Zodスキーマ作成"
Task: T006 "食材マスターデータJSON作成"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 1: Setup完了
2. Phase 2: Foundational完了（CRITICAL - 全ストーリーをブロック）
3. Phase 3: User Story 1完了
4. **STOP and VALIDATE**: User Story 1を独立してテスト
5. デプロイ/デモ可能

### Incremental Delivery

1. Setup + Foundational完了 → 基盤準備完了
2. User Story 1追加 → 独立テスト → デプロイ/デモ (MVP!)
3. User Story 2追加 → 独立テスト → デプロイ/デモ
4. 各ストーリーが前のストーリーを壊さずに価値を追加

---

## Task Summary

- **Total tasks**: 17
- **Phase 1 (Setup)**: 2 tasks
- **Phase 2 (Foundational)**: 5 tasks
- **Phase 3 (US1)**: 5 tasks
- **Phase 4 (US2)**: 2 tasks
- **Phase 5 (Polish)**: 3 tasks

## Notes

- [P] タスク = 異なるファイル、依存関係なし
- [Story] ラベルはタスクを特定のユーザーストーリーにマッピング
- 各ユーザーストーリーは独立して完了・テスト可能
- TDD: テストを先に書いて失敗を確認してから実装
- 各タスクまたは論理グループ後にコミット
- 任意のチェックポイントで停止してストーリーを独立検証可能
