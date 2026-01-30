# Data Model: デフォルト食材フィルター選択

**Feature**: 004-default-ingredient-filters
**Date**: 2026-01-30

## Overview

この機能はデータモデルの変更を伴わない。既存のエンティティをそのまま使用し、UI状態の初期値のみを変更する。

## Existing Entities (No Changes)

### Recipe

```typescript
interface Recipe {
  id: string;
  name: string;
  type: RecipeType;      // "カレー" | "サラダ" | "デザート"
  ingredients: string[]; // 必要な食材のリスト
  // ... その他のフィールド
}
```

### Ingredient (Derived)

食材は独立したエンティティではなく、Recipe.ingredientsから動的に抽出される。

```typescript
// 全レシピから食材リストを抽出
function extractIngredients(recipes: Recipe[]): string[]
```

## State Model

### Current State

```typescript
// RecipesPageContent component state
selectedType: RecipeType | null        // 選択中の料理種別
selectedIngredients: string[]          // 選択中の食材（初期値: []）
```

### New State

```typescript
// RecipesPageContent component state
selectedType: RecipeType | null        // 選択中の料理種別（変更なし）
selectedIngredients: string[]          // 選択中の食材（初期値: 全食材）
```

## State Transitions

```
┌─────────────────────────────────────────────────────────┐
│                    Page Load                             │
│  selectedIngredients = extractIngredients(initialRecipes)│
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│              Initial State (All Selected)               │
│  selectedIngredients = [全食材]                          │
│  → 全料理を表示                                          │
└─────────────────────────────────────────────────────────┘
                          │
          ┌───────────────┴───────────────┐
          ▼                               ▼
┌──────────────────────┐     ┌──────────────────────────┐
│  Uncheck Ingredient  │     │   Clear All Selection    │
│  handleIngredientToggle()│  │   clearIngredients()    │
└──────────────────────┘     └──────────────────────────┘
          │                               │
          ▼                               ▼
┌──────────────────────┐     ┌──────────────────────────┐
│   Partial Selection  │     │    Empty Selection       │
│  selectedIngredients │     │  selectedIngredients=[]  │
│  = [一部の食材]       │     │  → 全料理を表示          │
│  → フィルタリング適用 │     └──────────────────────────┘
└──────────────────────┘
```

## API Contracts

**None** - この機能はフロントエンドのみの変更のため、APIコントラクトは不要。

## Validation Rules

- `selectedIngredients`は有効な食材名の配列であること
- 空配列も許容（全選択解除状態）
- 重複した食材名は含まないこと
