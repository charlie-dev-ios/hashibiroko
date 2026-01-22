# コーディング規約

## TypeScript基本方針
- **全レイヤーでTypeScriptを使用**
- **型安全性を最大限活用**
- **`any`型の使用は原則禁止**（どうしても必要な場合はコメントで理由を説明）
- **strict mode有効**

## 命名規則
| 対象 | 規則 | 例 |
|------|------|-----|
| コンポーネント | PascalCase | `PokemonCard.tsx` |
| 関数 | camelCase | `getPokemonList()` |
| 定数 | UPPER_SNAKE_CASE | `MAX_TEAM_SIZE` |
| 型・インターフェース | PascalCase | `PokemonType`, `UserData` |
| ファイル名（コンポーネント） | PascalCase | `PokemonCard.tsx` |
| ファイル名（その他） | kebab-case | `use-pokemon.ts` |

## コンポーネント設計
- **デフォルトはServer Component**
- クライアント機能（useState、useEffectなど）が必要な場合のみ`'use client'`を使用
- **すべてのPropsに型を明示**
- **Single Responsibility Principle（単一責任の原則）**
- 200行を超えるコンポーネントは分割を検討
- 再利用可能な部分は独立したコンポーネントに

## ファイル構成パターン
```typescript
// 外部ライブラリimport
import { ... } from '...'

// プロジェクト内import
import { ... } from '@/...'

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

## Biome設定
- **フォーマット**: lineWidth 80, double quotes, trailing commas
- **主要ルール**:
  - `useConst`: 再代入されない変数は`const`を使用
  - `noParameterAssign`: パラメータへの再代入を禁止
  - `useTemplate`: テンプレートリテラルを使用
  - `noFloatingPromises`: await忘れを検出
  - `noImportCycles`: 循環importを検出

## テストファイル配置
- **テストファイルは実装ファイルと同階層に配置**
- **命名規則**: `*.test.ts` or `*.test.tsx`

## Git規約
### コミットメッセージ
- [Conventional Commits](https://www.conventionalcommits.org/)に準拠
- **日本語で記述**
- **重要**: Claudeが書いた旨のフッター（Co-Authored-Byなど）は含めないこと

#### フォーマット
```
<type>[optional scope]: <説明>

[optional body]

[optional footer(s)]
```

#### Type一覧
- `feat`: 新機能の追加
- `fix`: バグ修正
- `docs`: ドキュメントのみの変更
- `style`: コードの意味に影響しない変更
- `refactor`: バグ修正や機能追加を伴わないコード変更
- `perf`: パフォーマンス改善
- `test`: テストの追加・修正
- `chore`: ビルドプロセスや補助ツールの変更
- `ci`: CI設定の変更

### ブランチ戦略
- `main`: 本番環境
- `feature/*`: 機能開発（例: `feature/pokemon-detail`）
- `fix/*`: バグ修正（例: `fix/recipe-filter`）
