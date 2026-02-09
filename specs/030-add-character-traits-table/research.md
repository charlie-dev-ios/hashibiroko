# Research: せいかく一覧ページ

## R1: せいかくデータ構造

**Decision**: 25個のせいかくを `{ name, increasedStat, decreasedStat }` の配列としてJSONに格納。パラメータ補正の詳細情報は別の `statEffects` オブジェクトとして同じJSONに含める。

**Rationale**: 既存パターン（ingredients.json, pokemon.json等）に準拠。マトリクス表を組み立てるにはフラットな配列が最もシンプルで、行列変換のロジックもコンポーネント側で容易に実装できる。

**Alternatives considered**:
- 5×5の二次元配列として格納 → データの意味が不明瞭、Zodバリデーションが複雑化
- パラメータ別にネストした構造 → マトリクス表の行列方向と一致せず変換が必要

## R2: マトリクス表のレンダリング方式

**Decision**: HTMLの `<table>` 要素を使用。`overflow-x-auto` でモバイル横スクロール対応。

**Rationale**: 既存の `snorlax-rank-table.tsx` が同パターンを使用。セマンティックHTMLとして適切で、アクセシビリティも確保される。

**Alternatives considered**:
- CSS Grid → テーブルとしてのセマンティクスが失われる
- shadcn/ui Table → 依存を増やすだけで、この用途には素のHTMLテーブルで十分

## R3: パラメータ補正値

**Decision**: ポケモンスリープのゲーム内仕様に基づき以下の補正値を採用:
- おてつだいスピード: ±2%（上昇=時間短縮、下降=時間延長）
- 食材お手伝い確率: ±18%
- メインスキル発動確率: ±18%
- EXP獲得量: ±18%
- げんき回復量: ±18%

**Rationale**: ゲーム内で広く知られている仕様値。JSONデータに含めることで、将来の仕様変更時にもデータ修正のみで対応可能。

**Alternatives considered**:
- ハードコーディング → データ変更時にコード修正が必要

## R4: ナビゲーションアイコン

**Decision**: lucide-react の `Sparkles` アイコンを使用。

**Rationale**: せいかく（性格特性）を表すアイコンとして「キラキラ」のイメージが適切。既存のナビゲーションが各リンクにlucide-reactアイコンを使用しているパターンに準拠。

**Alternatives considered**:
- `Brain` → 性格というより知能のイメージ
- `Star` → きのみの `Cherry` と視覚的に近い
- `Smile` → 表情のイメージが強すぎる
