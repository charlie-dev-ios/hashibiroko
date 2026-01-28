import { readFile } from "node:fs/promises";
import { z } from "zod";

const RecipeTypeSchema = z.enum(["カレー", "サラダ", "デザート", "ドリンク"]);

const RecipeSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  type: RecipeTypeSchema.optional(),
  ingredientCount: z.number().int().nonnegative(),
  energy: z.number().nonnegative(),
  ingredients: z.array(
    z.object({
      name: z.string(),
      quantity: z.number().int().positive(),
    }),
  ),
  imageUrl: z.string().optional(),
});

async function validateRecipes() {
  try {
    const data = await readFile("./src/content/recipes/recipes.json", "utf-8");
    const parsed = JSON.parse(data);

    console.log(`📊 Total recipes: ${parsed.recipes.length}`);

    const result = z.array(RecipeSchema).safeParse(parsed.recipes);

    if (!result.success) {
      console.error("❌ Validation failed:");
      console.error(result.error.message);
      process.exit(1);
    }

    console.log("✅ All recipes are valid!");

    // 統計情報
    const recipes = result.data;
    const typeCount = recipes.reduce((acc, recipe) => {
      acc[recipe.type] = (acc[recipe.type] || 0) + 1;
      return acc;
    }, {});

    console.log("\n📈 Statistics:");
    Object.entries(typeCount).forEach(([type, count]) => {
      console.log(`  ${type}: ${count} recipes`);
    });

    // ID重複チェック
    const ids = recipes.map((r) => r.id);
    const uniqueIds = new Set(ids);
    if (ids.length !== uniqueIds.size) {
      console.error("❌ Duplicate IDs found!");
      process.exit(1);
    }
    console.log("✅ No duplicate IDs");

    // 食材のユニークリスト
    const ingredients = new Set();
    for (const recipe of recipes) {
      for (const ing of recipe.ingredients) {
        ingredients.add(ing.name);
      }
    }
    console.log(`\n🥘 Unique ingredients: ${ingredients.size}`);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

void validateRecipes();
