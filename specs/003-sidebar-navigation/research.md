# Research: サイドバーナビゲーション

**Date**: 2026-01-25
**Feature**: 003-sidebar-navigation

## Research Summary

本機能はUI実装のみでAPIやデータベースを含まないため、技術的な不明点は少ない。既存コードベースの分析と、Next.js App Routerでのレイアウト実装パターンを確認。

---

## 1. 既存コードベース分析

### Decision: 既存のnavigationLinksを共通モジュールに抽出

**Rationale**:
- `mobile-nav.tsx`と`top-nav.tsx`で同じリンク定義が重複
- 新規サイドバーでも同じリンクを使用
- DRY原則に従い、単一の真実源を作成

**Alternatives considered**:
- 各コンポーネントで個別定義を維持 → メンテナンス性低下のため却下
- グローバルストアで管理 → 静的データには過剰のため却下

---

## 2. Next.js App Routerでのレイアウト実装

### Decision: layout.tsxを直接変更してサイドバーを追加

**Rationale**:
- App Routerでは`layout.tsx`がネストされたルート全体に適用される
- 全ページ共通のサイドバーは`app/layout.tsx`に配置が適切
- Server ComponentとClient Componentの境界を明確に保つ

**Implementation Pattern**:
```tsx
// layout.tsx (Server Component)
<div className="flex">
  <Sidebar />  {/* Client Component - usePathname使用 */}
  <main>{children}</main>
</div>
```

**Alternatives considered**:
- 各ページでサイドバーをインポート → 重複・一貫性欠如のため却下
- 別のlayout階層を作成 → 過剰設計のため却下

---

## 3. アクティブ状態の検出

### Decision: `usePathname()` フックを使用

**Rationale**:
- Next.js App Router標準のナビゲーションフック
- 追加ライブラリ不要
- パスの部分一致で子ルートもハイライト可能（例: `/pokemon/1`で`/pokemon`をアクティブに）

**Implementation**:
```tsx
const pathname = usePathname();
const isActive = pathname === href || pathname.startsWith(`${href}/`);
```

**Alternatives considered**:
- `useRouter()` → pathname取得には`usePathname()`が推奨
- URL手動パース → 不要な複雑化のため却下

---

## 4. レスポンシブ対応戦略

### Decision: デスクトップは新規Sidebar、モバイルは既存MobileNavを継続使用

**Rationale**:
- 既存の`MobileNav`はSheet（shadcn/ui）で適切に実装済み
- デスクトップ用の常時表示サイドバーを新規追加
- Tailwind CSSの`hidden md:block`で表示切り替え

**Layout Structure**:
```
Desktop (≥768px):
+--------+------------------+
| Sidebar|    Content       |
| (fixed)|                  |
+--------+------------------+

Mobile (<768px):
+------------------------+
| Header [☰]             |
+------------------------+
|       Content          |
+------------------------+
(☰ opens Sheet sidebar)
```

**Alternatives considered**:
- 両デバイスで同一コンポーネント → UX要件が異なるため却下
- 新規モバイルナビ作成 → 既存が適切に機能しているため不要

---

## 5. サイドバー幅の決定

### Decision: デスクトップ240px、モバイル80%

**Rationale**:
- 240pxは一般的なサイドバー幅（Material Design推奨）
- コンテンツ領域を圧迫しすぎない
- モバイル80%は既存Sheetのデフォルト動作

**Alternatives considered**:
- 折りたたみ可能なサイドバー → 初期要件になし、YAGNI適用
- 可変幅 → 複雑化するため却下

---

## 6. アクセシビリティ要件

### Decision: WAI-ARIA nav landmarkとキーボードナビゲーション

**Rationale**:
- `<nav>`要素でセマンティックなランドマーク提供
- `aria-current="page"`でスクリーンリーダー対応
- フォーカス可能なリンク要素でキーボード操作対応

**Implementation**:
```tsx
<nav aria-label="メインナビゲーション">
  <Link aria-current={isActive ? "page" : undefined}>...</Link>
</nav>
```

---

## Conclusions

| 項目 | 決定 |
|------|------|
| リンク定義 | `navigation-links.ts`に共通化 |
| レイアウト | `layout.tsx`直接変更 |
| アクティブ検出 | `usePathname()` |
| レスポンシブ | Desktop: Sidebar, Mobile: MobileNav |
| サイドバー幅 | 240px (desktop) |
| アクセシビリティ | nav landmark + aria-current |

**NEEDS CLARIFICATION**: なし - 全項目解決済み
