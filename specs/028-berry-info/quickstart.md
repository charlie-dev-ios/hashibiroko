# Quickstart: きのみ情報一覧

## セットアップ

```bash
# プロジェクトルートから
cd apps/web
bun install
```

## 開発サーバー起動

```bash
bun dev
# http://localhost:3030/berries でアクセス
```

## ファイル構成

```
apps/web/src/
├── app/berries/page.tsx       # ページコンポーネント
├── components/berries/
│   ├── berry-card.tsx         # きのみカード
│   └── berry-list.tsx         # きのみ一覧
└── lib/
    ├── schemas/berry.ts       # Zodスキーマ
    └── data/berries.ts        # 静的データ
```

## テスト実行

```bash
cd apps/web
bun run test
```

## 実装フロー

1. `lib/schemas/berry.ts` - スキーマにtypeフィールドを追加
2. `lib/data/berries.ts` - 18種類のきのみデータを定義
3. `components/berries/berry-card.tsx` - カードコンポーネント作成
4. `components/berries/berry-list.tsx` - 一覧コンポーネント作成
5. `app/berries/page.tsx` - ページを更新
6. テスト作成・実行
