# Quickstart: せいかく一覧ページ

## 前提条件

- Bun 1.1.40+ がインストール済み
- `bun install` で依存関係がインストール済み

## 開発手順

### 1. ブランチを作成・チェックアウト

```bash
git checkout 030-add-character-traits-table
```

### 2. データファイルを作成

`apps/web/src/content/natures/natures.json` に25個のせいかくデータを記述。

### 3. テストを実行（TDD: Red）

```bash
cd apps/web && bun run test
```

### 4. 実装

以下の順序で実装:
1. Zodスキーマ（`lib/schemas/nature.ts`）
2. データローダー（`lib/data/natures.ts`）
3. マトリクス表コンポーネント（`components/natures/nature-matrix-table.tsx`）
4. 補正詳細コンポーネント（`components/natures/nature-stat-details.tsx`）
5. ページ（`app/natures/page.tsx`）
6. ナビゲーション追加（`components/navigation/navigation-links.ts`）

### 5. テスト実行（TDD: Green）

```bash
cd apps/web && bun run test
```

### 6. ビルド確認

```bash
cd apps/web && bun build
```

### 7. 開発サーバーで確認

```bash
bun dev
# http://localhost:3030/natures にアクセス
```

## 確認ポイント

- [ ] ナビゲーション「基本データ」に「せいかく」リンクが表示される
- [ ] /natures にアクセスすると5×5マトリクス表が表示される
- [ ] 25個すべてのせいかくが表に含まれている
- [ ] マトリクス表の下にパラメータ補正の詳細が表示される
- [ ] モバイル幅で横スクロールできる
- [ ] すべてのテストが通る
