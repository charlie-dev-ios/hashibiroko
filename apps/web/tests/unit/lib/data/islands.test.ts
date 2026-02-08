import { describe, expect, it } from "vitest";
import {
  getAllIslands,
  getIslandById,
  getIslandByName,
} from "@/lib/data/islands";

describe("getAllIslands", () => {
  it("should return all islands from the data file", async () => {
    const islands = await getAllIslands();

    expect(islands).toBeDefined();
    expect(Array.isArray(islands)).toBe(true);
    expect(islands.length).toBeGreaterThan(0);
  });

  it("should validate island data with Zod schema", async () => {
    const islands = await getAllIslands();

    expect(islands[0]).toHaveProperty("id");
    expect(islands[0]).toHaveProperty("name");
    expect(islands[0]).toHaveProperty("description");
    expect(islands[0]).toHaveProperty("specialtyBerry");
    expect(islands[0]).toHaveProperty("snorlaxRanks");
  });

  it("should return islands with exactly 6 snorlax ranks each", async () => {
    const islands = await getAllIslands();

    for (const island of islands) {
      expect(island.snorlaxRanks).toHaveLength(6);
    }
  });

  it("should return islands with valid rank names in order", async () => {
    const islands = await getAllIslands();
    const expectedRankOrder = [
      "ノーマル",
      "いいかんじ",
      "すごいぞ",
      "とてもすごい",
      "ハイパー",
      "マスター",
    ];

    for (const island of islands) {
      const rankNames = island.snorlaxRanks.map((r) => r.rank);
      expect(rankNames).toEqual(expectedRankOrder);
    }
  });
});

describe("getIslandById", () => {
  it("should return an island by id", async () => {
    const island = await getIslandById(1);

    expect(island).toBeDefined();
    expect(island?.id).toBe(1);
    expect(island?.name).toBe("ワカクサ本島");
  });

  it("should return undefined for non-existent id", async () => {
    const island = await getIslandById(99999);

    expect(island).toBeUndefined();
  });

  it("should return island with complete data structure", async () => {
    const island = await getIslandById(1);

    expect(island).toHaveProperty("specialtyBerry");
    expect(island?.snorlaxRanks).toHaveLength(6);
    expect(island?.snorlaxRanks[0]).toHaveProperty("rank");
    expect(island?.snorlaxRanks[0]).toHaveProperty("requiredEnergy");
    expect(island?.snorlaxRanks[0]).toHaveProperty("newPokemonIds");
  });
});

describe("getIslandByName", () => {
  it("should return an island by name", async () => {
    const island = await getIslandByName("ワカクサ本島");

    expect(island).toBeDefined();
    expect(island?.name).toBe("ワカクサ本島");
    expect(island?.id).toBe(1);
  });

  it("should return undefined for non-existent name", async () => {
    const island = await getIslandByName("存在しないフィールド");

    expect(island).toBeUndefined();
  });
});
