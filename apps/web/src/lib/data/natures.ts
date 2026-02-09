import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import {
  type Nature,
  NatureSchema,
  type NatureStat,
  type StatEffect,
  StatEffectSchema,
} from "@/lib/schemas/nature";

const NATURES_FILE = path.join(
  process.cwd(),
  "src/content/natures/natures.json",
);

/**
 * すべてのせいかくを取得
 */
export async function getAllNatures(): Promise<Nature[]> {
  const data = await fs.readFile(NATURES_FILE, "utf-8");
  const parsed = JSON.parse(data);

  const result = z.array(NatureSchema).safeParse(parsed.natures);

  if (!result.success) {
    throw new Error(`Nature data validation failed: ${result.error.message}`);
  }

  return result.data;
}

/**
 * すべてのパラメータ補正効果を取得
 */
export async function getAllStatEffects(): Promise<StatEffect[]> {
  const data = await fs.readFile(NATURES_FILE, "utf-8");
  const parsed = JSON.parse(data);

  const result = z.array(StatEffectSchema).safeParse(parsed.statEffects);

  if (!result.success) {
    throw new Error(
      `StatEffect data validation failed: ${result.error.message}`,
    );
  }

  return result.data;
}

/**
 * せいかくをマトリクス形式で取得
 * Map<increasedStat, Map<decreasedStat, natureName>>
 */
export async function getNaturesByMatrix(): Promise<
  Map<NatureStat, Map<NatureStat, string>>
> {
  const natures = await getAllNatures();
  const matrix = new Map<NatureStat, Map<NatureStat, string>>();

  for (const nature of natures) {
    if (!matrix.has(nature.increasedStat)) {
      matrix.set(nature.increasedStat, new Map());
    }
    matrix.get(nature.increasedStat)?.set(nature.decreasedStat, nature.name);
  }

  return matrix;
}
