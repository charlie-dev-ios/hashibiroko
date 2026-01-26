# Tasks: サイドバーナビゲーション

**Input**: Design documents from `/specs/003-sidebar-navigation/`
**Prerequisites**: plan.md, spec.md, data-model.md, research.md, quickstart.md

**Tests**: TDDが必須のため、各ユーザーストーリーにテストタスクを含む

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

**UI Components**: shadcn/ui Sidebar (`components/ui/sidebar.tsx`) を使用

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Monorepo**: `apps/web/src/` for Next.js frontend
- Tests are colocated with implementation files

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 共通のナビゲーションリンク定義を作成

- [x] T001 Create NavigationLink type and navigationLinks data in apps/web/src/components/navigation/navigation-links.ts
- [x] T002 Update top-nav.tsx to import from navigation-links.ts in apps/web/src/components/navigation/top-nav.tsx

**Checkpoint**: 共通リンク定義が作成され、top-navで使用されていることを確認

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: shadcn/ui Sidebarを使用したAppSidebarコンポーネントを作成

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 [P] Create AppSidebar component test (failing) in apps/web/tests/unit/app-sidebar.test.tsx
- [x] T004 Create AppSidebar component using shadcn/ui Sidebar components in apps/web/src/components/app-sidebar.tsx
  - Use `Sidebar`, `SidebarContent`, `SidebarGroup`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`
  - Import navigationLinks from navigation-links.ts
  - Use lucide-react icons for each menu item

**Checkpoint**: Foundation ready - AppSidebarコンポーネントが単体で動作（テストパス）

---

## Phase 3: User Story 1 - サイドバーからコンテンツへ遷移 (Priority: P1) 🎯 MVP

**Goal**: デスクトップでサイドバーを常時表示し、全ページから他セクションへ遷移可能にする

**Independent Test**: サイドバーの各リンクをクリックして該当ページへ遷移できることを確認

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T005 [P] [US1] Integration test for layout with SidebarProvider in apps/web/tests/integration/layout-sidebar.test.tsx

### Implementation for User Story 1

- [x] T006 [US1] Update layout.tsx to wrap with SidebarProvider in apps/web/src/app/layout.tsx
- [x] T007 [US1] Add AppSidebar and SidebarInset to layout structure in apps/web/src/app/layout.tsx
- [x] T008 [US1] Add SidebarTrigger to header for mobile toggle in apps/web/src/app/layout.tsx
- [x] T009 [US1] Verify all navigation links work (build successful)

**Checkpoint**: デスクトップでサイドバーが表示され、全リンクが正常に遷移する

---

## Phase 4: User Story 2 - 現在地の視覚的フィードバック (Priority: P2)

**Goal**: 現在閲覧中のセクションをサイドバー上でハイライト表示

**Independent Test**: 各ページに遷移したとき、対応するサイドバー項目がアクティブ状態で表示される

### Tests for User Story 2 ⚠️

- [x] T010 [P] [US2] Test for active state detection in AppSidebar in apps/web/tests/unit/app-sidebar.test.tsx

### Implementation for User Story 2

- [x] T011 [US2] Add usePathname hook to AppSidebar for active path detection in apps/web/src/components/app-sidebar.tsx
- [x] T012 [US2] Pass isActive prop to SidebarMenuButton based on current path in apps/web/src/components/app-sidebar.tsx
- [x] T013 [US2] Ensure child routes also highlight parent (e.g., /pokemon/1 highlights /pokemon) in apps/web/src/components/app-sidebar.tsx

**Checkpoint**: 現在のページに対応するサイドバー項目がハイライトされる

---

## Phase 5: User Story 3 - モバイル対応 (Priority: P1)

**Goal**: モバイルではSheet形式でサイドバーを表示（shadcn/ui Sidebar内蔵機能）

**Independent Test**: モバイルビューでSidebarTriggerをタップし、サイドバーがSheet形式で開閉する

### Tests for User Story 3 ⚠️

- [x] T014 [P] [US3] Test for mobile Sheet behavior (shadcn/ui provides built-in mobile support)

### Implementation for User Story 3

- [x] T015 [US3] Verify SidebarTrigger is visible on mobile in apps/web/src/app/layout.tsx
- [x] T016 [US3] Ensure sidebar closes after navigation on mobile (use setOpenMobile from useSidebar) in apps/web/src/components/app-sidebar.tsx
- [x] T017 [US3] Remove or deprecate old mobile-nav.tsx (layout.tsx no longer references it)

**Checkpoint**: モバイルでSidebarTriggerが表示され、Sheet形式でサイドバーが開閉する

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: クリーンアップ、アクセシビリティ確認、最終検証

- [x] T018 [P] Verify aria attributes are correctly applied by shadcn/ui components
- [x] T019 [P] Verify keyboard shortcut (⌘B/Ctrl+B) toggles sidebar (built into shadcn/ui)
- [x] T020 Verify transition animation is smooth (shadcn/ui default)
- [x] T021 Update header to remove old MobileNav references in apps/web/src/app/layout.tsx
- [x] T022 Run quickstart.md validation checklist
- [x] T023 Run full test suite and E2E tests (89 tests passed)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3, 4, 5)**: All depend on Foundational phase completion
  - US1 must be done first (layout integration)
  - US2 and US3 can be done in parallel after US1
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Depends on US1 (sidebar must be in layout)
- **User Story 3 (P1)**: Depends on US1 (SidebarTrigger must be in header)

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- Components before integration
- Core implementation before polish
- Story complete before moving to next priority

### Parallel Opportunities

- T003 can run while T001, T002 are being done
- T010, T014 can run in parallel with their respective story phases
- T018, T019 can run in parallel (different aspects of validation)

---

## Parallel Example: After US1 Completion

```bash
# US2 and US3 can proceed in parallel:
Task: "T010 [US2] Test for active state detection"
Task: "T014 [US3] Test for mobile Sheet behavior"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (共通リンク定義)
2. Complete Phase 2: Foundational (AppSidebarコンポーネント)
3. Complete Phase 3: User Story 1 (レイアウト統合)
4. **STOP and VALIDATE**: サイドバーからの遷移を手動テスト
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → 基盤完成
2. Add User Story 1 → サイドバー表示 → Deploy/Demo (MVP!)
3. Add User Story 2 → アクティブ状態追加 → Deploy/Demo
4. Add User Story 3 → モバイル最適化 → Deploy/Demo
5. Polish → 最終リリース

---

## shadcn/ui Sidebar 使用コンポーネント一覧

| コンポーネント | 用途 |
|---------------|------|
| `SidebarProvider` | コンテキスト提供、Cookie永続化 |
| `Sidebar` | メインサイドバー（デスクトップ固定/モバイルSheet） |
| `SidebarContent` | スクロール可能なコンテンツ領域 |
| `SidebarGroup` | メニューグループ |
| `SidebarMenu` | メニューリスト |
| `SidebarMenuItem` | メニュー項目 |
| `SidebarMenuButton` | クリック可能なボタン（isActive対応） |
| `SidebarInset` | メインコンテンツ領域 |
| `SidebarTrigger` | トグルボタン（モバイル用） |
| `useSidebar` | 状態管理フック |

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- shadcn/ui Sidebarがモバイル対応を内蔵しているため、既存のmobile-nav.tsxは削除
- TDD必須: テストを先に書いて失敗を確認してから実装
- Commit after each task or logical group
