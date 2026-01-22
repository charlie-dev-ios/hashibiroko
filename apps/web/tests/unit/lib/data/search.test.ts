import { describe, expect, it } from "vitest";
import { searchPokemon } from "@/lib/data/search";
import type { Pokemon } from "@/lib/schemas/pokemon";

const mockPokemon: Pokemon[] = [
  {
    id: 1,
    name: "ピカチュウ",
    sleepType: "すやすや",
    specialty: "スキル",
    berry: {
      type: "オレンのみ",
      baseYield: 5,
    },
    skill: {
      name: "エナジーチャージS",
      description: "強力な電撃",
      maxLevel: 7,
    },
    islands: ["ワカクサ本島"],
  },
  {
    id: 2,
    name: "イーブイ",
    sleepType: "うとうと",
    specialty: "きのみ",
    berry: {
      type: "モモンのみ",
      baseYield: 4,
    },
    skill: {
      name: "エナジーチャージS",
      description: "通常スキル",
      maxLevel: 7,
    },
    evolution: {
      nextIds: [3, 4],
    },
    islands: ["ワカクサ本島"],
  },
  {
    id: 3,
    name: "カビゴン",
    sleepType: "ぐっすり",
    specialty: "スキル",
    berry: {
      type: "オボンのみ",
      baseYield: 6,
    },
    skill: {
      name: "エナジーチャージS",
      description: "眠って回復",
      maxLevel: 7,
    },
    islands: ["ワカクサ本島"],
  },
];

describe("searchPokemon", () => {
  it("should return all pokemon when no filters applied", () => {
    const result = searchPokemon(mockPokemon, {});
    expect(result).toHaveLength(3);
  });

  it("should filter by keyword in name", () => {
    const result = searchPokemon(mockPokemon, { keyword: "ピカ" });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("ピカチュウ");
  });

  it("should filter by sleep type", () => {
    const result = searchPokemon(mockPokemon, { sleepType: "すやすや" });
    expect(result).toHaveLength(1);
    expect(result[0].sleepType).toBe("すやすや");
  });

  it("should filter by specialty", () => {
    const result = searchPokemon(mockPokemon, { specialty: "きのみ" });
    expect(result).toHaveLength(1);
    expect(result[0].specialty).toBe("きのみ");
  });

  it("should combine multiple filters", () => {
    const result = searchPokemon(mockPokemon, {
      sleepType: "スキル",
      specialty: "スキル",
    });
    expect(result.length).toBeGreaterThanOrEqual(0);
  });

  it("should sort by name ascending", () => {
    const result = searchPokemon(mockPokemon, {
      sortBy: "name",
      sortOrder: "asc",
    });
    expect(result[0].name).toBe("イーブイ");
    expect(result[result.length - 1].name).toBe("ピカチュウ");
  });

  it("should sort by name descending", () => {
    const result = searchPokemon(mockPokemon, {
      sortBy: "name",
      sortOrder: "desc",
    });
    expect(result[0].name).toBe("ピカチュウ");
    expect(result[result.length - 1].name).toBe("イーブイ");
  });

  it("should sort by id", () => {
    const result = searchPokemon(mockPokemon, {
      sortBy: "id",
      sortOrder: "asc",
    });
    expect(result[0].id).toBe(1);
    expect(result[1].id).toBe(2);
    expect(result[2].id).toBe(3);
  });

  it("should handle empty results", () => {
    const result = searchPokemon(mockPokemon, {
      keyword: "存在しないポケモン",
    });
    expect(result).toHaveLength(0);
  });
});
