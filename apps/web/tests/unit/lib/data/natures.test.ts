import { describe, expect, it } from "vitest";
import {
  getAllNatures,
  getAllStatEffects,
  getNaturesByMatrix,
} from "@/lib/data/natures";

describe("getAllNatures", () => {
  it("should return an array of 25 natures", async () => {
    const natures = await getAllNatures();
    expect(Array.isArray(natures)).toBe(true);
    expect(natures).toHaveLength(25);
  });

  it("should return natures with required fields", async () => {
    const natures = await getAllNatures();
    for (const nature of natures) {
      expect(nature).toHaveProperty("name");
      expect(nature).toHaveProperty("increasedStat");
      expect(nature).toHaveProperty("decreasedStat");
      expect(typeof nature.name).toBe("string");
    }
  });

  it("should include known natures", async () => {
    const natures = await getAllNatures();
    const names = natures.map((n) => n.name);
    expect(names).toContain("さみしがり");
    expect(names).toContain("がんばりや");
    expect(names).toContain("まじめ");
  });

  it("should have exactly 5 neutral natures", async () => {
    const natures = await getAllNatures();
    const neutral = natures.filter((n) => n.increasedStat === n.decreasedStat);
    expect(neutral).toHaveLength(5);
  });
});

describe("getAllStatEffects", () => {
  it("should return an array of 5 stat effects", async () => {
    const effects = await getAllStatEffects();
    expect(Array.isArray(effects)).toBe(true);
    expect(effects).toHaveLength(5);
  });

  it("should return stat effects with required fields", async () => {
    const effects = await getAllStatEffects();
    for (const effect of effects) {
      expect(effect).toHaveProperty("stat");
      expect(effect).toHaveProperty("label");
      expect(effect).toHaveProperty("increasedEffect");
      expect(effect).toHaveProperty("decreasedEffect");
    }
  });

  it("should cover all 5 stats", async () => {
    const effects = await getAllStatEffects();
    const stats = effects.map((e) => e.stat);
    expect(stats).toContain("helpingSpeed");
    expect(stats).toContain("ingredientRate");
    expect(stats).toContain("mainSkillRate");
    expect(stats).toContain("expGain");
    expect(stats).toContain("energyRecovery");
  });
});

describe("getNaturesByMatrix", () => {
  it("should return a map with 5 rows (increased stats)", async () => {
    const matrix = await getNaturesByMatrix();
    expect(matrix.size).toBe(5);
  });

  it("should have 5 columns per row (decreased stats)", async () => {
    const matrix = await getNaturesByMatrix();
    for (const [, row] of matrix) {
      expect(row.size).toBe(5);
    }
  });

  it("should map さみしがり to helpingSpeed/ingredientRate", async () => {
    const matrix = await getNaturesByMatrix();
    const name = matrix.get("helpingSpeed")?.get("ingredientRate");
    expect(name).toBe("さみしがり");
  });

  it("should map がんばりや to helpingSpeed/helpingSpeed (neutral)", async () => {
    const matrix = await getNaturesByMatrix();
    const name = matrix.get("helpingSpeed")?.get("helpingSpeed");
    expect(name).toBe("がんばりや");
  });
});
