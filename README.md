# hashibiroko

Web + モバイル向けアプリケーション

## 技術スタック

- **Web**: Next.js 16 + React 19 + TypeScript + Tailwind CSS 4
- **API**: Hono + Drizzle ORM
- **デプロイ**: Vercel (Web) / Cloudflare Workers (API)

詳細は [docs/architecture.md](./docs/architecture.md) を参照してください。

## セットアップ

```bash
# 依存関係のインストール
bun install

# 開発サーバー起動
bun dev
```

## プロジェクト構成

```
hashibiroko/
├── apps/
│   ├── web/          # Next.js Webフロントエンド
│   └── api/          # Hono APIバックエンド
├── packages/
│   └── shared/       # 共通パッケージ（型、スキーマ）
├── docs/             # ドキュメント
├── specs/            # 機能仕様書 (speckit)
└── .specify/         # speckit ツール設定
```

## ドキュメント

- [アーキテクチャ設計](./docs/architecture.md)
- [Constitution (開発原則)](/.specify/memory/constitution.md)

## 開発ガイド

### コミットメッセージ

[Conventional Commits](https://www.conventionalcommits.org/) を採用（日本語）

```
feat(auth): ログイン機能を追加
fix(api): エラーハンドリングを修正
docs: READMEを更新
```

### 開発原則

1. **TDD必須**: テストを先に書く
2. **AI-First**: エージェントが理解しやすい構造
3. **Simplicity**: YAGNI原則を遵守

## ライセンス

TBD
