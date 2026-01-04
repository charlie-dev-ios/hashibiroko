# Implementation Plan: 料理コンテンツページ実装

**Branch**: `002-recipe-content` | **Date**: 2026-01-04 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/002-recipe-content/spec.md`

## Summary

ポケモンスリープ攻略サイトに料理コンテンツページを追加します。デフォルトですべての料理をカード形式で一覧表示し、種別（カレー・シチュー、サラダ、デザート）と食材による絞り込み機能を提供します。各料理カードには料理画像、名前、エナジー、必要食材、必要食材の総数を表示します。既存のRecipeスキーマとデータモデルを活用し、既存のポケモンサイトアーキテクチャに統合します。

## Technical Context

**Language/Version**: TypeScript (最新安定版)
**Primary Dependencies**:
- **フレームワーク**: Next.js 16.0.8 (App Router) - 既存サイトと同じ
- **UIコンポーネント**: shadcn/ui - 既存のCard, Button, Select, Checkboxを活用
- **スタイリング**: Tailwind CSS
- **バリデーション**: Zod - 既存のRecipeSchemaを拡張
- **ランタイム/パッケージマネージャー**: Bun 1.1.40

**Storage**: ファイルベース（JSON） - `apps/web/src/content/recipes/recipes.json`
**Testing**: Vitest + React Testing Library - 既存テストインフラを活用
**Target Platform**: Webブラウザ（デスクトップ、タブレット、モバイル対応）
**Project Type**: Web（Next.js SSG）

**Performance Goals**:
- 初期表示 < 3秒（Success Criteria SC-001）
- フィルター適用 < 1秒（Success Criteria SC-002, SC-003）
- 100件以上の料理データでスムーズ動作（Success Criteria SC-005）

**Constraints**:
- 既存のポケモンサイトUIと一貫性を保つ
- モバイルファースト設計（320px〜対応）
- 料理種別は3種類に限定（カレー・シチュー、サラダ、デザート）
- フィルターなしでデフォルト全表示（P1最優先）

**Scale/Scope**:
- 初期料理データ: 30-50レシピ想定
- 食材種類: 20-30種類想定
- 同時フィルター条件: 種別1つ + 食材複数

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### ✅ I. Test-Driven Development (NON-NEGOTIABLE)
- **Status**: COMPLIANT
- **Plan**: Vitest + React Testing Libraryを既存テストインフラで使用
- **Test Strategy**:
  - ユニットテスト: 料理データ取得、フィルター関数（`filterRecipes`, `searchRecipes`）
  - コンポーネントテスト: RecipeCard, RecipeList, RecipeFilter
  - 統合テスト: 料理ページ全体のフィルター動作検証
  - **TDDサイクル**: Red-Green-Refactor（既存パターンに準拠）

### ✅ II. AI-First Development
- **Status**: COMPLIANT
- **Alignment**:
  - `specs/002-recipe-content/` で仕様管理中
  - spec.md, plan.md, data-model.md で明確にドキュメント化
  - 既存の001フィーチャーと同じ構造

### ✅ III. Simplicity (YAGNI)
- **Status**: COMPLIANT
- **Simple Choices**:
  - 既存のRecipeSchemaを活用（新規定義不要）
  - ファイルベース（JSON）のまま（DBレイヤー追加なし）
  - クライアントサイドフィルタリング（APIエンドポイント不要）
  - shadcn/ui既存コンポーネント活用（カスタムUI最小限）
  - 既存のポケモンページパターンを踏襲

### ✅ Technology Stack Alignment
- **Status**: COMPLIANT
- **Alignment**:
  - TypeScript全レイヤーで統一 ✓
  - Bun 1.1.40 継続使用 ✓
  - Zodスキーマでバリデーション統一 ✓
  - 既存アーキテクチャに統合 ✓

### ✅ Git Commit規約
- **Status**: COMPLIANT
- **Plan**: Conventional Commits（日本語説明文）を使用

**Overall Gate Status**: ✅ PASS - 全チェック項目準拠、実装開始可能

## Project Structure

### Documentation (this feature)

```text
specs/002-recipe-content/
├── plan.md              # This file
├── data-model.md        # Recipe/Ingredient データモデル詳細
├── quickstart.md        # 開発環境セットアップ手順
├── contracts/           # APIコントラクト（今回は不要）
├── checklists/
│   └── requirements.md  # 仕様品質チェックリスト
└── tasks.md             # 実装タスク（/speckit.tasks で生成）
```

### Source Code (repository root)

```text
apps/web/
├── src/
│   ├── app/
│   │   └── recipes/
│   │       └── page.tsx              # 料理一覧ページ（NEW）
│   ├── components/
│   │   └── recipes/                  # 料理関連コンポーネント（NEW）
│   │       ├── recipe-card.tsx       # 料理カード
│   │       ├── recipe-list.tsx       # 料理一覧
│   │       └── recipe-filter.tsx     # フィルターUI
│   ├── lib/
│   │   ├── schemas/
│   │   │   └── recipe.ts             # RecipeSchema（既存・拡張）
│   │   └── data/
│   │       └── recipes.ts            # 料理データアクセス（NEW）
│   └── content/
│       └── recipes/
│           └── recipes.json          # 料理データ（NEW）
└── tests/
    ├── unit/
    │   ├── lib/data/recipes.test.ts  # データ層テスト（NEW）
    │   └── components/recipes/       # コンポーネントテスト（NEW）
    └── integration/
        └── recipes-page.test.tsx     # ページ統合テスト（NEW）
```

**Structure Decision**: 既存のポケモンサイト（apps/web）に統合。ポケモンページと同じパターン（page.tsx + components + lib/data）を踏襲し、一貫性を保つ。

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

N/A - Constitution違反なし
## Implementation Phases

### Phase 1: データ層実装（P1 - MVP）

**Goal**: すべての料理データを読み込み、表示可能な状態にする

**Tasks**:
1. サンプル料理データ作成（`apps/web/src/content/recipes/recipes.json`）
   - 10-15レシピのサンプルデータ
   - 各種別（カレー、サラダ、デザート）を含む
2. データアクセス関数実装（`apps/web/src/lib/data/recipes.ts`）
   - `getAllRecipes()`: すべての料理取得
   - `getRecipeById()`: ID指定取得
   - `getTotalIngredientCount()`: 必要食材総数計算
3. ユニットテスト作成（`tests/unit/lib/data/recipes.test.ts`）
   - データ取得のバリデーションテスト
   - エッジケース（空データ、不正データ）のテスト

**Acceptance Criteria**:
- ✅ `getAllRecipes()` がサンプルデータを正しく返す
- ✅ すべてのテストがパス
- ✅ Zodバリデーションが機能

---

### Phase 2: 基本UI実装（P1 - MVP）

**Goal**: デフォルト状態ですべての料理をカード形式で表示

**Tasks**:
1. RecipeCardコンポーネント実装（`components/recipes/recipe-card.tsx`）
   - 料理画像（プレースホルダー対応）
   - 料理名
   - エナジー表示
   - 必要食材リスト
   - 必要食材総数
2. RecipeListコンポーネント実装（`components/recipes/recipe-list.tsx`）
   - グリッドレイアウト（responsive）
   - 空状態表示
3. 料理ページ実装（`app/recipes/page.tsx`）
   - `getAllRecipes()` でデータ取得
   - RecipeListに渡して表示
4. コンポーネントテスト作成
   - RecipeCardのレンダリングテスト
   - RecipeListのレンダリングテスト

**Acceptance Criteria**:
- ✅ 料理ページにアクセスするとすべての料理が表示される（US1）
- ✅ 各料理カードに必要な情報が正しく表示される
- ✅ レスポンシブデザインが機能（モバイル・デスクトップ）
- ✅ コンポーネントテストがパス

---

### Phase 3: 種別フィルター実装（P2）

**Goal**: 種別選択による絞り込み機能を追加

**Tasks**:
1. フィルター関数実装（`lib/data/recipes.ts`）
   - `filterRecipesByType(recipes, type)`: 種別フィルター
2. RecipeFilterコンポーネント実装（`components/recipes/recipe-filter.tsx`）
   - 種別選択UI（ボタングループまたはタブ）
   - フィルター解除ボタン
3. 料理ページにフィルター統合（`app/recipes/page.tsx`）
   - useState でフィルター状態管理
   - フィルター適用ロジック
4. ユニットテスト追加
   - `filterRecipesByType()` のテスト
5. 統合テスト作成（`tests/integration/recipes-page.test.tsx`）
   - 種別選択 → 絞り込み表示検証
   - フィルター解除 → 全表示検証

**Acceptance Criteria**:
- ✅ 種別選択で該当料理のみ表示される（US2）
- ✅ フィルター解除ですべての料理が再表示される
- ✅ フィルター適用が1秒以内（SC-002）
- ✅ 統合テストがパス

---

### Phase 4: 食材フィルター実装（P3）

**Goal**: 食材による絞り込み機能を追加

**Tasks**:
1. 食材抽出関数実装（`lib/data/recipes.ts`）
   - `extractIngredients(recipes)`: 全食材リスト抽出
2. 食材フィルター関数実装
   - `filterRecipesByIngredients(recipes, ingredients)`: 食材フィルター（AND条件）
3. RecipeFilterコンポーネント拡張
   - 食材選択UI（CheckboxまたはMulti-select）
   - 選択した食材の表示
4. ユニットテスト追加
   - `extractIngredients()` のテスト
   - `filterRecipesByIngredients()` のテスト
5. 統合テスト拡張
   - 食材選択 → 絞り込み表示検証

**Acceptance Criteria**:
- ✅ 食材選択で該当料理のみ表示される（US3）
- ✅ 複数食材選択でAND条件の絞り込みが機能
- ✅ フィルター適用が1秒以内（SC-003）
- ✅ 統合テストがパス

---

### Phase 5: 複合フィルター実装（P4）

**Goal**: 種別と食材を組み合わせた絞り込み機能

**Tasks**:
1. 複合フィルター関数実装（`lib/data/recipes.ts`）
   - `filterRecipes(recipes, { type?, ingredients? })`: 統合フィルター
2. RecipeFilterコンポーネント最終調整
   - 種別と食材を同時選択可能
   - フィルター状態の表示
3. 統合テスト拡張
   - 種別 + 食材の複合条件検証
   - 片方のフィルター解除検証

**Acceptance Criteria**:
- ✅ 種別と食材の組み合わせで絞り込みが機能（US4）
- ✅ 片方のフィルターのみ解除可能
- ✅ 統合テストがパス

---

### Phase 6: エッジケースとポリッシュ

**Goal**: エッジケース対応とUX向上

**Tasks**:
1. エッジケース実装
   - 該当料理0件時の空状態メッセージ
   - 料理画像未設定時のプレースホルダー表示
   - 必要食材総数0の場合の表示
2. パフォーマンス最適化
   - 100件データでの動作確認（SC-005）
   - メモ化（useMemo）の適用
3. アクセシビリティ対応
   - ARIA属性追加
   - キーボードナビゲーション確認
4. ドキュメント作成
   - quickstart.md作成（開発環境セットアップ手順）
   - コード内コメント追加

**Acceptance Criteria**:
- ✅ すべてのエッジケースが適切に処理される
- ✅ 100件以上のデータでスムーズ動作
- ✅ アクセシビリティチェックパス
- ✅ ドキュメント完成

---

## Test Strategy

### ユニットテスト（Vitest）

**対象**: データアクセス関数、フィルター関数

**ファイル**: `tests/unit/lib/data/recipes.test.ts`

**テストケース**:
- `getAllRecipes()`: すべてのレシピを取得
- `getRecipeById()`: 特定IDのレシピ取得、存在しないID
- `extractIngredients()`: ユニークな食材リスト抽出
- `filterRecipesByType()`: 種別フィルター（各種別）
- `filterRecipesByIngredients()`: 食材フィルター（単一・複数）
- `filterRecipes()`: 複合フィルター（種別のみ、食材のみ、両方、なし）
- `getTotalIngredientCount()`: 必要食材総数計算

### コンポーネントテスト（React Testing Library）

**対象**: RecipeCard, RecipeList, RecipeFilter

**ファイル**: `tests/unit/components/recipes/*.test.tsx`

**テストケース**:
- RecipeCard: 料理情報の正しい表示、画像プレースホルダー
- RecipeList: 複数カードの表示、空状態表示、グリッドレイアウト
- RecipeFilter: 種別選択UI、食材選択UI、フィルター解除

### 統合テスト（React Testing Library）

**対象**: 料理ページ全体

**ファイル**: `tests/integration/recipes-page.test.tsx`

**テストケース**:
- 初期表示: すべての料理が表示される
- 種別フィルター: 選択した種別のみ表示
- 食材フィルター: 選択した食材を含む料理のみ表示
- 複合フィルター: 種別 + 食材の組み合わせ
- フィルター解除: すべての料理が再表示
- 空状態: 該当料理0件時のメッセージ表示

### テストカバレッジ目標

- **データ層**: 100%（クリティカルロジック）
- **コンポーネント**: 80%以上
- **統合**: 主要ユーザーフロー100%

---

## Risk Management

### 既知のリスク

| リスク | 影響 | 対策 |
|--------|------|------|
| 既存RecipeSchemaの`type`がドリンクを含む | 低 | UIで3種別のみ表示、データは4種別対応維持 |
| 100件以上でパフォーマンス低下 | 中 | useMemo/useCallback活用、仮想スクロール検討 |
| 食材数が多すぎてUI overcrowded | 低 | 検索機能付きselect使用、shadcn/ui Command利用 |
| モバイルでフィルターUIが使いづらい | 中 | Sheet/Dialogでフィルターモーダル化 |

### 技術的負債

- **食材マスターデータ未作成**: 将来的に食材詳細ページが必要になった場合、別途作成が必要
- **ソート機能未実装**: ユーザーからの要望があれば Phase 7 として追加検討

---

## Success Metrics (from Spec)

- **SC-001**: ユーザーは料理ページにアクセスしてから3秒以内に料理一覧を閲覧できる
  - **測定方法**: Lighthouse Performance audit、実機テスト
- **SC-002**: ユーザーは種別選択後、1秒以内に絞り込まれた料理一覧を確認できる
  - **測定方法**: Performance API、React DevTools Profiler
- **SC-003**: ユーザーは食材フィルター適用後、1秒以内に絞り込まれた料理一覧を確認できる
  - **測定方法**: Performance API、React DevTools Profiler
- **SC-004**: ユーザーの90%以上が、料理カードから料理の基本情報（名前、エナジー、必要食材）を正しく理解できる
  - **測定方法**: ユーザーテスト、アクセシビリティ監査
- **SC-005**: ユーザーは100件以上の料理データに対してもスムーズに絞り込みを実行できる
  - **測定方法**: 100件データでのパフォーマンステスト

---

## Next Steps

1. **Phase 1開始**: データ層実装（`/speckit.tasks` でタスク詳細生成）
2. **サンプルデータ作成**: 10-15レシピのサンプルJSON作成
3. **TDDサイクル開始**: テスト → 実装 → リファクタリング

**Ready to implement**: ✅ 全フェーズ計画完了、実装開始可能
