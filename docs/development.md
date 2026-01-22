# Hashibiroko 開発ガイド

> Pokemon Sleep攻略情報サイトの開発詳細ガイド

このドキュメントには、技術スタック、コーディング規約、Git規約、テスト戦略など、開発に必要な詳細情報を集約しています。

## 目次

- [開発原則](#開発原則)
- [技術スタック](#技術スタック)
- [プロジェクト構成](#プロジェクト構成)
- [コーディング規約](#コーディング規約)
- [テスト戦略](#テスト戦略)
- [Git規約](#git規約)
- [開発コマンド](#開発コマンド)
- [環境情報](#環境情報)

---

## 開発原則

**[Constitution](./constitution.md)** を参照してください。

---

## 技術スタック

### apps/web（Webフロントエンド）

| カテゴリ | 技術 | バージョン | 備考 |
|----------|------|-----------|------|
| フレームワーク | Next.js | 16.0.8 | App Router, React Compiler |
| UI Library | React | 19.2.1 | |
| 言語 | TypeScript | 5.9.3 | strict mode |
| スタイリング | Tailwind CSS | 4.x | |
| UIコンポーネント | shadcn/ui | - | Radix UIベース |
| テスト | Vitest | 4.0.16 | + Testing Library |
| バリデーション | Zod | 4.3.4 | |
| Markdown | react-markdown + gray-matter | - | コンテンツ管理 |
| アイコン | lucide-react | - | |
| デプロイ | Vercel | - | |

### apps/api（APIバックエンド）※開発中

| カテゴリ | 技術 | バージョン | 備考 |
|----------|------|-----------|------|
| 言語 | TypeScript | 5.x | フロントと統一 |
| フレームワーク | Hono | 4.11.2 | Edge対応 |
| データベース | Supabase | - | PostgreSQL |
| ORM | Drizzle | 0.30+ | 型安全 |
| 認証 | Supabase Auth | - | OAuth, メール等 |
| デプロイ | Cloudflare Workers | - | Edge |

### 開発ツール

| カテゴリ | 技術 | バージョン | 備考 |
|----------|------|-----------|------|
| パッケージマネージャー | Bun | 1.1.40 | 高速・TypeScript対応 |
| モノレポ管理 | Turborepo | 2.6.3 | ビルドキャッシュ |
| Linter/Formatter | Biome | 2.3.11 | 高速・一元化 |

---

## プロジェクト構成

### ディレクトリ構造

```
hashibiroko/
├── apps/
│   ├── web/                      # Next.js Webフロントエンド
│   │   ├── src/
│   │   │   ├── app/             # App Router
│   │   │   │   ├── pokemon/     # ポケモン一覧・詳細
│   │   │   │   ├── recipes/     # 料理レシピ
│   │   │   │   ├── strategies/  # 攻略戦略
│   │   │   │   ├── islands/     # 島情報
│   │   │   │   ├── mechanics/   # ゲームメカニクス
│   │   │   │   ├── teams/       # チーム編成
│   │   │   │   └── api/         # Route Handlers
│   │   │   ├── components/      # UIコンポーネント
│   │   │   │   ├── ui/          # shadcn/ui コンポーネント
│   │   │   │   ├── pokemon/     # ポケモン関連
│   │   │   │   ├── recipes/     # レシピ関連
│   │   │   │   ├── navigation/  # ナビゲーション
│   │   │   │   └── common/      # 共通コンポーネント
│   │   │   ├── content/         # Markdownコンテンツ
│   │   │   ├── hooks/           # カスタムフック
│   │   │   ├── lib/             # ユーティリティ
│   │   │   │   ├── utils/       # 汎用関数
│   │   │   │   └── schemas/     # Zodスキーマ
│   │   │   └── stores/          # Zustand状態管理
│   │   ├── public/              # 静的アセット
│   │   ├── tests/               # テストファイル
│   │   └── package.json
│   │
│   └── api/                      # Hono API（開発中）
│       ├── src/
│       └── package.json
│
├── packages/                     # 共通パッケージ（今後作成予定）
│   └── shared/                   # 型定義・スキーマ共有
│
├── docs/                         # ドキュメント
│   ├── architecture.md           # アーキテクチャ設計
│   └── development.md            # 開発ガイド（本ファイル）
│
├── specs/                        # 機能仕様書（speckit）
│   ├── 001-pokemon-sleep-site/
│   └── 002-recipe-content/
│
├── .specify/                     # speckit設定
│   └── memory/
│       └── constitution.md       # 開発原則
│
├── .serena/                      # Serena設定
│   └── memories/                 # Serenaメモリファイル
│
├── .claude/                      # Claude Code設定
│   ├── commands/                 # カスタムコマンド
│   └── settings.json
│
├── README.md                     # プロジェクト概要
├── CLAUDE.md                     # AI開発ガイド
├── package.json                  # ワークスペースルート
└── turbo.json                    # Turborepo設定
```

---

## コーディング規約

### TypeScript

#### 基本方針

- **全レイヤーでTypeScriptを使用**
- **型安全性を最大限活用**
- **`any`型の使用は原則禁止**（どうしても必要な場合はコメントで理由を説明）
- **strict mode有効**

#### 型定義

```typescript
// ✅ Good: 明示的な型定義
interface PokemonProps {
  id: string;
  name: string;
  types: PokemonType[];
}

// ❌ Bad: any型の使用
function getData(params: any) { ... }

// ✅ Good: 適切な型定義
function getData(params: { id: string; filter?: string }) { ... }
```

### 命名規則

| 対象 | 規則 | 例 |
|------|------|-----|
| コンポーネント | PascalCase | `PokemonCard.tsx` |
| 関数 | camelCase | `getPokemonList()` |
| 定数 | UPPER_SNAKE_CASE | `MAX_TEAM_SIZE` |
| 型・インターフェース | PascalCase | `PokemonType`, `UserData` |
| ファイル名（コンポーネント） | PascalCase | `PokemonCard.tsx` |
| ファイル名（その他） | kebab-case | `use-pokemon.ts` |

### コンポーネント設計

#### Server Component優先

- **デフォルトはServer Component**
- クライアント機能（useState、useEffectなど）が必要な場合のみ`'use client'`を使用

```typescript
// ✅ Good: Server Component（デフォルト）
export default function PokemonList() {
  const pokemon = await getPokemonList();
  return <div>...</div>;
}

// ✅ Good: Client Componentが必要な場合のみ
'use client';
export default function InteractivePokemonCard() {
  const [selected, setSelected] = useState(false);
  return <div onClick={() => setSelected(!selected)}>...</div>;
}
```

#### Props型定義

- すべてのPropsに型を明示

```typescript
// ✅ Good: Props型を明示的に定義
interface PokemonCardProps {
  pokemon: Pokemon;
  onSelect?: (id: string) => void;
}

export function PokemonCard({ pokemon, onSelect }: PokemonCardProps) {
  return <div>...</div>;
}
```

#### コンポーネント分割

- **Single Responsibility Principle（単一責任の原則）**
- 200行を超えるコンポーネントは分割を検討
- 再利用可能な部分は独立したコンポーネントに

### ファイル構成

```typescript
// ✅ Good: 推奨されるファイル構成
import { ... } from '...'  // 外部ライブラリ
import { ... } from '@/...' // プロジェクト内

// 型定義
interface Props { ... }

// コンポーネント
export function Component({ ... }: Props) {
  // hooks
  // handlers
  // render
}

// ヘルパー関数（コンポーネント外）
function helperFunction() { ... }
```

### Biome設定

#### 概要

本プロジェクトでは、Linter/FormatterとしてBiomeを採用しています。

- **高速**: Rustで実装された高速なツール
- **一元化**: Linter/Formatterを1つのツールで統合
- **設定ファイル**: `biome.json`

#### フォーマット設定

- **行幅**: 80文字
- **インデント**: スペース2つ
- **引用符**: ダブルクォート
- **末尾カンマ**: すべて付与

#### 主要Lintルール

本プロジェクトでは以下のカテゴリのルールを有効化しています:

**Style（スタイル）**:
- `noParameterAssign`: パラメータへの再代入を禁止
- `useConst`: 再代入されない変数は`const`を使用
- `useTemplate`: 文字列結合ではなくテンプレートリテラルを使用
- `useSelfClosingElements`: 自己終了タグを使用

**Correctness（正確性）**:
- `noUndeclaredDependencies`: 未宣言の依存関係を検出

**Suspicious（疑わしいコード）**:
- `noVar`: `var`の使用を禁止

**Nursery（実験的）**:
- `noFloatingPromises`: await忘れのPromiseを検出
- `noImportCycles`: 循環importを検出

#### 実行コマンド

```bash
# フォーマット実行
bun format

# フォーマットチェック（変更なし）
bun format:check

# Lint実行
bun lint

# Lintチェック（変更なし）
bun lint:check

# フォーマット+Lint実行
bun check

# CI用チェック
bun check:ci
```

詳細な設定は `biome.json` を参照してください。

---

## テスト戦略

### TDD（Test-Driven Development）- 必須

本プロジェクトでは**TDDが必須**です。詳細は [Constitution](../.specify/memory/constitution.md) を参照してください。

#### Red-Green-Refactorサイクル

1. **Red**: テストを先に書く（失敗する）
2. **Green**: テストが通る最小限の実装
3. **Refactor**: コードをリファクタリング

### テストの種類

| テスト種類 | ツール | 目的 |
|----------|--------|------|
| Unit Test | Vitest + Testing Library | 個別関数・コンポーネントのテスト |
| Integration Test | Vitest + Testing Library | 複数コンポーネントの統合テスト |
| E2E Test | 今後導入予定 | エンドツーエンドのテスト |

### テストファイル配置

- **テストファイルは実装ファイルと同階層に配置**
- **命名規則**: `*.test.ts` or `*.test.tsx`

```
src/
├── components/
│   ├── PokemonCard.tsx
│   └── PokemonCard.test.tsx        # ← 同階層に配置
├── lib/
│   ├── utils/
│   │   ├── pokemon.ts
│   │   └── pokemon.test.ts         # ← 同階層に配置
```

### テストの書き方

#### コンポーネントのテスト

```typescript
// PokemonCard.test.tsx
import { render, screen } from '@testing-library/react';
import { PokemonCard } from './PokemonCard';

describe('PokemonCard', () => {
  it('should render pokemon name', () => {
    const pokemon = { id: '1', name: 'Pikachu', types: ['electric'] };
    render(<PokemonCard pokemon={pokemon} />);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
});
```

#### 関数のテスト

```typescript
// pokemon.test.ts
import { describe, it, expect } from 'vitest';
import { filterPokemonByType } from './pokemon';

describe('filterPokemonByType', () => {
  it('should filter pokemon by type', () => {
    const pokemon = [
      { id: '1', name: 'Pikachu', types: ['electric'] },
      { id: '2', name: 'Charmander', types: ['fire'] },
    ];
    const result = filterPokemonByType(pokemon, 'electric');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Pikachu');
  });
});
```

---

## Git規約

### コミットメッセージ

[Conventional Commits](https://www.conventionalcommits.org/)に準拠し、**日本語で記述**します。

#### フォーマット

```
<type>[optional scope]: <説明>

[optional body]

[optional footer(s)]
```

**重要**: Claudeが書いた旨のフッター（Co-Authored-Byなど）は含めないこと

#### Type一覧

| Type | 説明 | 例 |
|------|------|-----|
| `feat` | 新機能の追加 | `feat(pokemon): ポケモン詳細ページを追加` |
| `fix` | バグ修正 | `fix(recipes): フィルター機能のバグを修正` |
| `docs` | ドキュメントのみの変更 | `docs: READMEにセットアップ手順を追加` |
| `style` | コードの意味に影響しない変更 | `style(pokemon): インデントを修正` |
| `refactor` | バグ修正や機能追加を伴わないコード変更 | `refactor(api): ルーティングを整理` |
| `perf` | パフォーマンス改善 | `perf(pokemon): 画像の遅延読み込みを実装` |
| `test` | テストの追加・修正 | `test(pokemon): ポケモンカードのテストを追加` |
| `chore` | ビルドプロセスや補助ツールの変更 | `chore: 依存関係を更新` |
| `ci` | CI設定の変更 | `ci: GitHub Actionsを追加` |

#### 具体例

```bash
# 新機能
feat(pokemon): ポケモン詳細ページを追加

# バグ修正
fix(recipes): フィルター機能のバグを修正

# テスト
test(pokemon): ポケモンカードコンポーネントのテストを追加

# ドキュメント
docs: 開発ガイドを更新

# リファクタリング
refactor(components): Server Componentに変更してパフォーマンスを改善
```

#### Breaking Changes

破壊的変更がある場合は`!`を付与、またはフッターに`BREAKING CHANGE:`を記載：

```
feat(api)!: レスポンス形式を変更

BREAKING CHANGE: APIレスポンスがネスト構造で返却されるようになりました
```

### ブランチ戦略

| ブランチ | 用途 |
|---------|------|
| `main` | 本番環境 |
| `feature/*` | 機能開発（例: `feature/pokemon-detail`） |
| `fix/*` | バグ修正（例: `fix/recipe-filter`） |

---

## 開発コマンド

### プロジェクトルート

```bash
# 依存関係のインストール
bun install

# すべてのアプリの開発サーバー起動
bun dev

# すべてのアプリをビルド
bun build

# コード品質チェック・修正（Biome）
bun format        # フォーマット実行
bun lint          # Lint実行
bun check         # フォーマット+Lint実行

# CI用チェック（変更なし）
bun format:check  # フォーマットチェックのみ
bun lint:check    # Lintチェックのみ
bun check:ci      # CI用チェック
```

### apps/web（Webフロントエンド）

```bash
# カレントディレクトリを移動
cd apps/web

# 開発サーバー起動（ポート3030）
bun dev

# ビルド
bun build

# テスト実行
bun run test
```

### apps/api（APIバックエンド）※開発中

```bash
# カレントディレクトリを移動
cd apps/api

# 開発サーバー起動（ポート8787予定）
bun dev

# ビルド
bun build
```

---

## 環境情報

### 開発環境

| アプリ | URL | ポート |
|--------|-----|--------|
| Web | http://localhost:3030 | 3030 |
| API | http://localhost:8787（予定） | 8787（予定） |

### デプロイ環境

| 環境 | Web | API | 用途 |
|------|-----|-----|------|
| Development | localhost:3030 | localhost:8787 | ローカル開発 |
| Staging | TBD | TBD | テスト環境 |
| Production | Vercel | Cloudflare Workers | 本番 |

### 環境変数

```bash
# apps/web/.env.local（例）
NEXT_PUBLIC_API_URL=http://localhost:8787

# apps/api/.env（例）
DATABASE_URL=postgresql://...
```

---

## 関連ドキュメント

- [README.md](../README.md) - プロジェクト概要
- [アーキテクチャ設計](./architecture.md) - システム設計
- [Constitution](../.specify/memory/constitution.md) - 開発原則
- [AI開発ガイド](../CLAUDE.md) - Claude Code用

---

**Last Updated**: 2026-01-11
