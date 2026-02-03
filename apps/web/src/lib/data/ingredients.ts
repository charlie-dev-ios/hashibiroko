import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { type Ingredient, IngredientSchema } from "@/lib/schemas/ingredient";

const INGREDIENTS_FILE = path.join(
  process.cwd(),
  "src/content/ingredients/ingredients.json",
);

/**
 * すべての食材を取得
 */
export async function getAllIngredients(): Promise<Ingredient[]> {
  const data = await fs.readFile(INGREDIENTS_FILE, "utf-8");
  const parsed = JSON.parse(data);

  const result = z.array(IngredientSchema).safeParse(parsed.ingredients);

  if (!result.success) {
    throw new Error(
      `Ingredient data validation failed: ${result.error.message}`,
    );
  }

  return result.data;
}

/**
 * 名前で食材を取得
 */
export async function getIngredientByName(
  name: string,
): Promise<Ingredient | null> {
  const allIngredients = await getAllIngredients();
  const ingredient = allIngredients.find((i) => i.name === name);

  return ingredient || null;
}

/**
 * IDで食材を取得
 */
export async function getIngredientById(
  id: number,
): Promise<Ingredient | null> {
  const allIngredients = await getAllIngredients();
  const ingredient = allIngredients.find((i) => i.id === id);

  return ingredient || null;
}
