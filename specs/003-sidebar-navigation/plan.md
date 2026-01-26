# Implementation Plan: サイドバーナビゲーション

**Branch**: `003-sidebar-navigation` | **Date**: 2026-01-25 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-sidebar-navigation/spec.md`

## Summary

サイト全体にサイドバーナビゲーションを追加し、どのページからでも他のコンテンツセクションへ遷移できるようにする。デスクトップでは常時表示、モバイルではハンバーガーメニューで開閉するレスポンシブ対応を実装。

## Technical Context

**Language/Version**: TypeScript 5.9.3
**Primary Dependencies**: Next.js 16.0.8 (App Router), React 19.2.1, shadcn/ui, Tailwind CSS 4.x, lucide-react
**Storage**: N/A（状態管理はReact stateのみ）
**Testing**: Vitest 4.0.16 + Testing Library
**Target Platform**: Web（デスクトップ、モバイル）
**Project Type**: Monorepo（apps/web）
**Performance Goals**: サイドバー開閉アニメーション 0.3秒以内
**Constraints**: 768px未満をモバイル、768px以上をデスクトップとする
**Scale/Scope**: 7つのナビゲーション項目（ホーム、ポケモン、料理、島、攻略、チーム、メカニクス）

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. TDD (NON-NEGOTIABLE) | ✅ PASS | テストから開始、コンポーネントテスト作成 |
| II. AI-First Development | ✅ PASS | 既存の`.specify/`構造に従う |
| III. Simplicity (YAGNI) | ✅ PASS | 既存のnavigationLinksを再利用、新規抽象化なし |

**Gate Result**: PASS - 全原則を遵守

## Project Structure

### Documentation (this feature)

```text
specs/003-sidebar-navigation/
├── spec.md              # 仕様書
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # N/A (UIのみ、APIなし)
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
apps/web/src/
├── app/
│   └── layout.tsx                    # 変更: SidebarProviderでラップ
├── components/
│   ├── ui/
│   │   ├── sidebar.tsx               # 既存: shadcn/ui サイドバー基盤
│   │   └── tooltip.tsx               # 既存: shadcn/ui ツールチップ
│   ├── app-sidebar.tsx               # 新規: アプリ固有のサイドバー構成
│   ├── app-sidebar.test.tsx          # 新規: サイドバーテスト
│   └── navigation/
│       ├── navigation-links.ts       # 新規: 共通ナビリンク定義
│       ├── mobile-nav.tsx            # 削除予定: shadcn/ui Sidebarに統合
│       └── top-nav.tsx               # 変更: 共通リンク使用
└── hooks/
    └── use-mobile.ts                 # 既存: shadcn/ui 依存
```

**Structure Decision**: shadcn/ui の `Sidebar` コンポーネントを使用。アプリ固有のナビゲーション構成は `app-sidebar.tsx` で定義し、`SidebarProvider` + `Sidebar` + `SidebarInset` パターンでレイアウトを構成。既存の `mobile-nav.tsx` は shadcn/ui Sidebar のモバイル対応（内蔵Sheet）で置き換え。

## Complexity Tracking

> 違反なし - 追加の正当化は不要

## Existing Code Analysis

### 現状の実装

1. **mobile-nav.tsx**: Sheet（shadcn/ui）を使用したモバイル専用サイドパネル
   - `navigationLinks`配列が定義済み
   - 左からスライドイン
   - リンククリックで自動クローズ

2. **top-nav.tsx**: ホームページ用カードグリッド
   - `contentSections`配列が定義済み（mobile-navと重複）

3. **layout.tsx**: ヘッダーのみ、サイドバーなし
   - モバイルでのみMobileNavを表示（`md:hidden`）

### 課題

- ナビゲーションリンクが2箇所で重複定義
- デスクトップでのナビゲーション手段がホームページのみ
- サイドバーの常時表示なし

## Implementation Approach

### アプローチ

1. **共通化**: `navigation-links.ts`にリンク定義を抽出
2. **shadcn/ui使用**: 既存の `components/ui/sidebar.tsx` を活用
3. **アプリサイドバー**: `app-sidebar.tsx` でナビゲーション構成を定義
4. **レイアウト変更**: `layout.tsx` を `SidebarProvider` でラップ
5. **モバイル統合**: shadcn/ui Sidebar のSheet機能でモバイル対応（既存MobileNav削除）

### 技術選定

| 要素 | 選定 | 理由 |
|------|------|------|
| サイドバーUI | shadcn/ui Sidebar | 既にプロジェクトに追加済み、フル機能 |
| モバイル対応 | shadcn/ui Sidebar (内蔵Sheet) | 既存MobileNavを置き換え、コード削減 |
| アクティブ状態 | `usePathname()` + `SidebarMenuButton` | `isActive` propで自動スタイリング |
| トグル | `SidebarTrigger` | キーボードショートカット(⌘B)対応済み |
| 状態管理 | `SidebarProvider` + `useSidebar` | shadcn/ui内蔵、Cookie永続化対応 |

### shadcn/ui Sidebar の主要コンポーネント

```tsx
// レイアウト構造
<SidebarProvider>
  <AppSidebar />           // ナビゲーション定義
  <SidebarInset>           // メインコンテンツ領域
    <header>
      <SidebarTrigger />   // モバイルトグル
    </header>
    {children}
  </SidebarInset>
</SidebarProvider>
```
