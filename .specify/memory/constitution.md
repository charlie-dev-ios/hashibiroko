# hashibiroko Constitution

## Core Principles

### I. Test-Driven Development (NON-NEGOTIABLE)

TDDは本プロジェクトの開発における必須プラクティスです。

- **Red-Green-Refactor サイクル**を厳守
  1. テストを先に書く（Red）
  2. テストが通る最小限の実装を行う（Green）
  3. コードをリファクタリングする（Refactor）
- すべての機能追加・変更はテストから開始
- テストなしのコードマージは禁止

### II. AI-First Development

エージェントが自律的に開発できる環境を優先的に整備します。

- 明確で機械可読なドキュメント構造
- 自動化可能なワークフロー設計
- エージェントが理解しやすいコード規約とプロジェクト構造
- `.specify/` ディレクトリによる仕様管理

### III. Simplicity

シンプルさを最優先します。

- YAGNI（You Aren't Gonna Need It）原則を遵守
- 必要になるまで複雑さを追加しない
- 明確な理由なく抽象化しない

## Technology Stack

技術スタックの詳細は [docs/architecture.md](../../docs/architecture.md) を参照してください。

### 技術選定の原則

- TypeScriptを全レイヤーで統一使用
- **Bun** をパッケージマネージャーおよび開発ランタイムとして統一
- Zodスキーマをフロント・バックエンドで共有
- 型安全性を最大限活用
- Edge対応・軽量フレームワークを優先

## Development Workflow

### 開発フロー

1. **仕様策定**: `.specify/` 配下に仕様を記述
2. **テスト作成**: 仕様に基づきテストを先に作成
3. **実装**: テストが通る最小限の実装
4. **リファクタリング**: コード品質の向上
5. **レビュー**: PR作成とレビュー

### コード規約

> 📝 **TODO**: 後ほど整備予定
> - Linter/Formatter 設定
> - 命名規則
> - ディレクトリ構造規則

### Git Commit規約

[Conventional Commits](https://www.conventionalcommits.org/) を採用します。

**コミットメッセージは日本語で記述してください。**（type部分は英語）

#### フォーマット

```
<type>[optional scope]: <説明>

[optional body]

[optional footer(s)]
```

#### Type 一覧

| Type | 説明 |
|------|------|
| `feat` | 新機能の追加 |
| `fix` | バグ修正 |
| `docs` | ドキュメントのみの変更 |
| `style` | コードの意味に影響しない変更（空白、フォーマット等） |
| `refactor` | バグ修正や機能追加を伴わないコード変更 |
| `perf` | パフォーマンス改善 |
| `test` | テストの追加・修正 |
| `chore` | ビルドプロセスや補助ツールの変更 |
| `ci` | CI設定の変更 |

#### 例

```
feat(auth): ログイン機能を追加
fix(api): サーバーからのnullレスポンスを処理
docs: Constitutionにコミット規約を追記
test(user): ユーザーサービスのユニットテストを追加
```

#### Breaking Changes

破壊的変更がある場合は `!` を付与、またはフッターに `BREAKING CHANGE:` を記載：

```
feat(api)!: レスポンス形式を変更

BREAKING CHANGE: APIレスポンスがネスト構造で返却されるようになりました
```

## Governance

- 本Constitutionはプロジェクトの最上位ルールとして機能
- 変更には明確な理由と移行計画が必要
- すべてのPR/レビューはConstitution遵守を確認

**Version**: 1.2.0 | **Ratified**: 2025-12-05 | **Last Amended**: 2025-12-08
