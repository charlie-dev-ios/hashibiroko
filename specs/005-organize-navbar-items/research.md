# Research: ナビゲーションバーアイテムの整理

**Feature**: 005-organize-navbar-items
**Date**: 2026-02-02

## Overview

この機能は既存のナビゲーション構造を修正するシンプルなUI変更であり、技術的な不明点は最小限。

## Decisions

### 1. アイコン選択（きのみ情報・食材情報）

**Decision**: lucide-reactの既存アイコンを使用

| 項目 | アイコン | 理由 |
|------|---------|------|
| きのみ情報 | `Cherry` | ベリー/果実を表現 |
| 食材情報 | `Egg` | 食材を表現 |

**Rationale**: lucide-reactは既にプロジェクトで使用されており、追加の依存関係が不要。

**Alternatives considered**:
- カスタムSVGアイコン → 追加の作業が必要、YAGNIに反する
- 他のアイコンライブラリ → 依存関係の追加が必要

### 2. 新規ページのURL設計

**Decision**:
- きのみ情報: `/berries`
- 食材情報: `/ingredients`

**Rationale**: 英語のURLパスはSEOに有利であり、既存のページ（/pokemon, /recipes, /islands）と一貫性がある。

**Alternatives considered**:
- 日本語パス (`/きのみ`, `/食材`) → URLエンコーディングの問題、ブックマークの可読性低下

### 3. ナビゲーション項目の順序

**Decision**: 以下の順序を維持
1. ホーム
2. ポケモン図鑑
3. 料理情報
4. フィールド情報（旧: 島ガイド）
5. きのみ情報（新規）
6. 食材情報（新規）
7. チーム編成

**Rationale**: 関連するコンテンツ（料理→フィールド→きのみ→食材）をグループ化し、ユーザーの探索フローに沿った順序。

### 4. 既存ページ（strategies, mechanics）の扱い

**Decision**: ナビゲーションから削除のみ、ページファイル自体は残す

**Rationale**:
- ナビゲーションからの削除は本仕様のスコープ内
- ページファイルの削除は別タスクとして管理すべき（破壊的変更）
- 直接URLアクセス時の動作は本仕様のスコープ外

## Technical Findings

### 既存のナビゲーション構造

`apps/web/src/components/navigation/navigation-links.ts` で定義:
- `NavigationLink` インターフェース: title, href, description, icon
- `navigationLinks` 配列: 全ナビゲーション項目を管理
- サイドバー・トップナビ両方で使用

### テスト構造

- Unit tests: `apps/web/tests/unit/components/navigation/`
- Integration tests: `apps/web/tests/integration/navigation.test.tsx`
- E2E tests: `apps/web/e2e/navigation.spec.ts`

### 影響範囲

1. `navigation-links.ts` - 直接変更
2. 既存テストファイル - アサーション更新
3. 新規ページファイル - プレースホルダー作成

## Unresolved Items

なし - すべての技術的決定が完了。
