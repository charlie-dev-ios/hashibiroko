# Quickstart: サイドバーナビゲーション

**Date**: 2026-01-25
**Feature**: 003-sidebar-navigation

## Prerequisites

- Node.js 20+
- Bun 1.1.40+

## Setup

```bash
# リポジトリのクローン（既存の場合はスキップ）
git clone https://github.com/charlie-dev-ios/hashibiroko.git
cd hashibiroko

# featureブランチに切り替え
git checkout 003-sidebar-navigation

# 依存関係インストール
bun install

# 開発サーバー起動
bun dev
```

## 開発サーバー

```bash
cd apps/web
bun dev
# http://localhost:3030 でアクセス
```

## テスト実行

```bash
cd apps/web

# 全テスト実行
bun run test

# 特定ファイルのテスト
bun run test src/components/navigation/sidebar.test.tsx

# ウォッチモード
bun run test --watch
```

## 主要ファイル

| ファイル | 説明 |
|---------|------|
| `src/components/navigation/navigation-links.ts` | ナビゲーションリンク定義 |
| `src/components/navigation/sidebar.tsx` | サイドバーコンポーネント |
| `src/components/navigation/sidebar-nav-item.tsx` | ナビ項目コンポーネント |
| `src/app/layout.tsx` | ルートレイアウト |

## 動作確認チェックリスト

### デスクトップ（768px以上）

- [ ] サイドバーが左側に常時表示される
- [ ] 各リンクをクリックで該当ページへ遷移
- [ ] 現在のページがハイライト表示
- [ ] Tab/Enterでキーボード操作可能

### モバイル（768px未満）

- [ ] サイドバーは非表示
- [ ] ハンバーガーメニューをタップでSheet表示
- [ ] リンククリックで遷移＋Sheet自動クローズ
- [ ] 現在のページがハイライト表示

## トラブルシューティング

### サイドバーが表示されない

1. ブラウザの幅が768px以上か確認
2. `layout.tsx`でSidebarコンポーネントがインポートされているか確認
3. DevToolsでCSSクラス`hidden md:block`を確認

### アクティブ状態が反映されない

1. `usePathname()`がClient Componentで使用されているか確認
2. `"use client"`ディレクティブがあるか確認
3. リンクの`href`とパスが一致しているか確認
