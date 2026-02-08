# Research: フィールド情報コンテンツ追加

**Date**: 2026-02-07
**Feature**: 029-add-field-info-content

## Research Summary

本機能は既存パターンの踏襲であり、技術的な未知要素は少ない。主な調査対象は既存のデータパターンとの整合性、およびIslandSchemaの拡張方針。

---

## R1: 既存データパターンとの整合性

**Decision**: JSONファイル + Zodバリデーション + Server Component パターンを踏襲

**Rationale**:
- `pokemon.json`（直接import）と `recipes.json`（fs.readFile）の2パターンが存在
- フィールドデータは静的かつ小規模（5〜10件）のため、直接importパターン（pokemon方式）が適切
- Zodスキーマによる型安全性を維持

**Alternatives considered**:
- fs.readFileパターン（recipes方式）: 小規模データには冗長
- API経由（apps/api）: API層は開発中であり、静的データにはオーバーエンジニアリング

---

## R2: IslandSchema拡張方針

**Decision**: 既存IslandSchemaを破壊的に拡張し、フィールド情報の全属性を含める

**Rationale**:
- 現在のIslandSchemaは `id`, `name`, `description`, `availablePokemon`, `imageUrl` のみ
- `availablePokemon` はフラットなID配列だが、仕様ではカビゴン評価ランクごとの出現ポケモンが必要
- IslandSchemaは未使用（データファイルもなし）のため、破壊的変更にリスクなし

**Alternatives considered**:
- 別スキーマ新規作成: 既存スキーマとの重複が発生し、YAGNI違反
- 既存スキーマを維持して拡張スキーマを別途作成: 不要な複雑さ

---

## R3: カビゴン評価ランクのデータ構造

**Decision**: 評価ランクを配列で定義し、各ランクにエナジー閾値と出現ポケモンID配列を持たせる

**Rationale**:
- 6段階のランク（ノーマル〜マスター）は固定
- 各ランクのエナジー閾値はフィールドごとに異なる
- 出現ポケモンは差分表示（そのランクで新規に追加されるポケモンのみ）
- 配列構造により、ランクの順序と表示が自然に対応

**Alternatives considered**:
- ランク名をキーとするオブジェクト: 順序保証が弱い
- 別ファイルに分離: 小規模データでは不要な複雑さ

---

## R4: ページルーティングとSSG

**Decision**: `/islands` に一覧、`/islands/[id]` に詳細を配置。`generateStaticParams` で全フィールドを静的生成

**Rationale**:
- pokemonページと同一パターン（`/pokemon` + `/pokemon/[id]`）
- フィールド数は少ないため全ページ静的生成が最適
- URLの共有性・ブックマーク性を確保

**Alternatives considered**:
- slugベースのルーティング（`/islands/[slug]`）: フィールド名が日本語のためURLエンコーディングが複雑。IDベースが安全

---

## R5: とくいきのみの表現

**Decision**: `specialtyBerry` フィールドに `string | "random"` を使用

**Rationale**:
- 仕様上、ランダムの場合は候補きのみを表示しない（「ランダム」とのみ表示）
- シンプルなstring型で十分。候補リストの保持は不要（YAGNI）
- 固定の場合はきのみ名の文字列、ランダムの場合は `"random"` リテラル

**Alternatives considered**:
- きのみIDで参照: 表示時にlookupが必要で複雑。きのみ名直接保持で十分
- `{ type: "fixed" | "random", berry?: string }` のUnion型: ランダム候補を表示しないため過剰

---

## R6: 出現ポケモンとポケモン詳細ページのリンク

**Decision**: 出現ポケモンはポケモンIDで参照し、表示時にポケモン名を解決。リンクは `/pokemon/[id]` へ

**Rationale**:
- 既存のポケモンデータ（pokemon.json）にID→名前マッピングが存在
- FR-006で既存のポケモン詳細ページへのリンクが必須
- IDベースの参照により、ポケモン名変更時のデータ不整合を防止

**Alternatives considered**:
- ポケモン名で参照: 名前変更時の整合性リスク
- 出現ポケモンデータ内にポケモン情報を埋め込み: データ重複
