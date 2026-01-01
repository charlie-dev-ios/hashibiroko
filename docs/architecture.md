# hashibiroko アーキテクチャ設計

## 概要

hashibiroko は **Web + モバイル** 向けのアプリケーションです。
フロントエンド（Web）とバックエンド（API）は分離されており、APIはモバイルアプリと共通で使用します。

## システム構成

```
┌─────────────────┐     ┌─────────────────┐
│   Web (Next.js) │     │      Mobile     │
│     Vercel      │     │                 │
└────────┬────────┘     └────────┬────────┘
         │                       │
         └───────────┬───────────┘
                     │
                     ▼
         ┌───────────────────────┐
         │   API (Hono)          │
         │  Cloudflare Workers   │
         └───────────┬───────────┘
                     │
                     ▼
         ┌───────────────────────┐
         │   Database            │
         │   Supabase (PostgreSQL)│
         └───────────────────────┘
```

## リポジトリ構成

```
hashibiroko/
├── apps/
│   ├── web/                    # Next.js 16 - Webフロントエンド
│   │   ├── src/
│   │   │   ├── app/            # App Router
│   │   │   ├── components/     # UIコンポーネント
│   │   │   ├── hooks/          # カスタムフック
│   │   │   ├── lib/            # ユーティリティ
│   │   │   └── stores/         # 状態管理 (Zustand)
│   │   └── package.json
│   │
│   └── api/                    # Hono - APIバックエンド
│       ├── src/
│       │   ├── routes/         # APIルート
│       │   ├── services/       # ビジネスロジック
│       │   ├── db/             # Drizzle スキーマ・クエリ
│       │   └── middleware/     # 認証等
│       └── package.json
│
├── packages/
│   └── shared/                 # 共通パッケージ
│       ├── src/
│       │   ├── schemas/        # Zod スキーマ（API契約）
│       │   └── types/          # 共通型定義
│       └── package.json
│
├── docs/                       # ドキュメント
├── specs/                      # speckit 仕様書
├── .specify/                   # speckit ツール
└── package.json                # ワークスペースルート
```

## 技術スタック

### フロントエンド（Web）

| カテゴリ | 技術 | バージョン | 備考 |
|----------|------|-----------|------|
| フレームワーク | Next.js | 16.x | App Router, Turbopack |
| UI Library | React | 19.x | |
| UIコンポーネント | shadcn/ui | - | Radix UI ベース |
| 言語 | TypeScript | 5.x | |
| スタイリング | Tailwind CSS | 4.x | |
| 状態管理 | Zustand | 5.x | シンプル・軽量 |
| データ取得 | TanStack Query | 5.x | |
| フォーム | React Hook Form | 7.x | |
| バリデーション | Zod | 3.x | API と共通 |
| デプロイ | Vercel | - | |

### UIライブラリ（必要時）

| 用途 | ライブラリ |
|------|-----------|
| ポップオーバー/ツールチップ | floating-ui |
| スライダー | @radix-ui/react-slider |
| リッチテキストエディター | tiptap |
| Diff表示 | react-diff-viewer |
| グラフ/チャート | chart.js |
| 絵文字ピッカー | emoji-mart |

### バックエンド（API）

| カテゴリ | 技術 | バージョン | 備考 |
|----------|------|-----------|------|
| 言語 | TypeScript | 5.x | フロントと統一 |
| フレームワーク | Hono | 4.x | Edge対応 |
| データベース | Supabase | - | PostgreSQL |
| ORM | Drizzle | 0.30+ | 型安全 |
| 認証 | Supabase Auth | - | OAuth, メール等 |
| バリデーション | Zod | 3.x | フロントと共通 |
| API Doc | OpenAPI | 3.0 | Swagger |
| デプロイ | Cloudflare Workers | - | Edge |

### 開発ツール

| カテゴリ | 技術 | 備考 |
|----------|------|------|
| パッケージマネージャー | Bun | 高速・TypeScript対応 |
| モノレポ管理 | Turborepo | ビルドキャッシュ |
| テスト | 未定 | 高速 |
| Linter | Biome（仮） | |
| Formatter | Biome（仮） | |

## 通信フロー

```
[Web/Mobile] 
    │
    │ HTTPS (JSON)
    ▼
[Cloudflare Workers - Hono API]
    │
    │ - JWT 認証検証
    │ - リクエストバリデーション (Zod)
    │ - ビジネスロジック実行
    │ - レスポンス生成
    ▼
[Database]
```

## 環境

| 環境 | Web | API | 用途 |
|------|-----|-----|------|
| Development | localhost:3000 | localhost:8787 | ローカル開発 |
| Staging | TBD | TBD | テスト環境 |
| Production | Vercel | Cloudflare Workers | 本番 |
