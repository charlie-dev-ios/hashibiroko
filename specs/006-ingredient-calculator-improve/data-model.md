# Data Model: 必要食材数計算機の改善

## 既存エンティティ（変更なし）

### Recipe（料理）

既存のレシピスキーマ。`apps/web/src/lib/schemas/recipe.ts`で定義。

```typescript
interface Recipe {
  id: number;           // 一意のID
  name: string;         // レシピ名（例: "マメバーグカレー"）
  type: RecipeType;     // 料理種別（カレー, サラダ, デザート, ドリンク）
  ingredientCount: number;  // 食材の総数（鍋容量フィルターで使用）
  energy: number;       // 料理パワー（エナジー）
  power: number;        // energyのエイリアス
  ingredients: Array<{
    name: string;       // 食材名
    quantity: number;   // 必要数
  }>;
  imageUrl?: string;    // 画像URL（任意）
  effect?: string;      // 料理の効果（任意）
}

type RecipeType = "カレー" | "サラダ" | "デザート" | "ドリンク";
```

### SelectedRecipe（選択されたレシピ）

既存のスキーマ。`apps/web/src/lib/schemas/calculator.ts`で定義。

```typescript
interface SelectedRecipe {
  recipeId: number;  // レシピID
  quantity: number;  // 作成数量（1〜99）
}
```

### IngredientTotal（食材合計）

既存のスキーマ。

```typescript
interface IngredientTotal {
  name: string;         // 食材名
  totalQuantity: number; // 必要合計数
}
```

## 新規追加

### PotCapacity（鍋容量）

鍋容量フィルター用の型定義。

```typescript
// プリセット値
const POT_CAPACITY_PRESETS = [
  { label: "Lv.1", value: 15 },
  { label: "Lv.2", value: 21 },
  { label: "Lv.3", value: 27 },
  { label: "Lv.4", value: 33 },
  { label: "Lv.5", value: 39 },
  { label: "Lv.6", value: 45 },
  { label: "Lv.7", value: 51 },
  { label: "Lv.8", value: 57 },
] as const;

type PotCapacityPreset = typeof POT_CAPACITY_PRESETS[number];

// フィルター状態
type PotCapacityFilter = number | null;  // nullは「すべて」を意味
```

## 計算ロジック

### 合計エナジー計算

```typescript
function calculateTotalEnergy(
  selectedRecipes: SelectedRecipe[],
  recipes: Recipe[]
): number {
  return selectedRecipes.reduce((total, selected) => {
    const recipe = recipes.find(r => r.id === selected.recipeId);
    if (!recipe) return total;
    return total + (recipe.energy * selected.quantity);
  }, 0);
}
```

### 鍋容量フィルタリング

```typescript
function filterByPotCapacity(
  recipes: Recipe[],
  capacity: number | null
): Recipe[] {
  if (capacity === null) return recipes;
  return recipes.filter(recipe => recipe.ingredientCount <= capacity);
}
```

## 状態管理

IngredientCalculatorコンポーネントでの状態：

```typescript
// 既存
const [selectedRecipes, setSelectedRecipes] = useState<SelectedRecipe[]>([]);

// 新規追加
const [potCapacity, setPotCapacity] = useState<number | null>(null);
```
