# Data Access Contracts: フィールド情報

**Date**: 2026-02-07

本機能はAPI層を使用せず、JSONデータの直接importによるServer Componentレンダリングを採用する。
以下はデータアクセス関数の契約定義。

## `getAllIslands(): Promise<Island[]>`

全フィールドデータを取得する。

- **Input**: なし
- **Output**: `Island[]` — 全フィールドの配列（ID昇順）
- **Validation**: Zodスキーマで全レコードをバリデーション
- **Error**: バリデーション失敗時はthrow

## `getIslandById(id: number): Promise<Island | undefined>`

指定IDのフィールドデータを取得する。

- **Input**: `id: number` — フィールドID
- **Output**: `Island | undefined` — 該当フィールド or undefined
- **Validation**: 入力IDは正の整数

## `getIslandByName(name: string): Promise<Island | undefined>`

指定名のフィールドデータを取得する。

- **Input**: `name: string` — フィールド名
- **Output**: `Island | undefined` — 該当フィールド or undefined

---

## Page Routes

### `GET /islands`

島ガイド一覧ページ。全フィールドのカード一覧を表示。

- **Data**: `getAllIslands()`
- **Rendering**: Server Component (SSG)
- **Output**: フィールドカード一覧（名前、とくいきのみ）

### `GET /islands/[id]`

フィールド詳細ページ。指定フィールドの全情報を表示。

- **Data**: `getIslandById(id)`、ポケモン名解決に `getPokemonById()` を使用
- **Rendering**: Server Component (SSG via `generateStaticParams`)
- **Output**: フィールド名、とくいきのみ、カビゴン評価テーブル（エナジー + 出現ポケモン）
- **Not Found**: ID不一致時は `notFound()` を返す

### `generateStaticParams`

全フィールドIDから静的パラメータを生成。

- **Data**: `getAllIslands()`
- **Output**: `{ id: string }[]`
