import { describe, expect, it } from "vitest";
import {
  IslandSchema,
  SnorlaxRankNameSchema,
  SnorlaxRankSchema,
} from "@/lib/schemas/island";

const validSnorlaxRanks = [
  { rank: "ノーマル", requiredEnergy: 0, newPokemonIds: [1, 4, 7] },
  { rank: "いいかんじ", requiredEnergy: 16089, newPokemonIds: [50, 52] },
  { rank: "すごいぞ", requiredEnergy: 33526, newPokemonIds: [58] },
  { rank: "とてもすごい", requiredEnergy: 65764, newPokemonIds: [92] },
  { rank: "ハイパー", requiredEnergy: 117524, newPokemonIds: [132] },
  { rank: "マスター", requiredEnergy: 206474, newPokemonIds: [149] },
];

const validIsland = {
  id: 1,
  name: "ワカクサ本島",
  description: "最初に訪れるフィールド。",
  specialtyBerry: "ランダム",
  snorlaxRanks: validSnorlaxRanks,
};

describe("SnorlaxRankNameSchema", () => {
  it("should accept all valid rank names", () => {
    const rankNames = [
      "ノーマル",
      "いいかんじ",
      "すごいぞ",
      "とてもすごい",
      "ハイパー",
      "マスター",
    ];
    for (const name of rankNames) {
      expect(SnorlaxRankNameSchema.parse(name)).toBe(name);
    }
  });

  it("should reject invalid rank name", () => {
    expect(() => SnorlaxRankNameSchema.parse("不明")).toThrow();
  });
});

describe("SnorlaxRankSchema", () => {
  it("should validate a valid snorlax rank", () => {
    const validRank = {
      rank: "ノーマル",
      requiredEnergy: 0,
      newPokemonIds: [1, 4, 7],
    };

    const result = SnorlaxRankSchema.parse(validRank);
    expect(result).toEqual(validRank);
  });

  it("should accept zero required energy", () => {
    const rank = {
      rank: "ノーマル",
      requiredEnergy: 0,
      newPokemonIds: [],
    };

    const result = SnorlaxRankSchema.parse(rank);
    expect(result.requiredEnergy).toBe(0);
  });

  it("should accept empty newPokemonIds array", () => {
    const rank = {
      rank: "いいかんじ",
      requiredEnergy: 16089,
      newPokemonIds: [],
    };

    const result = SnorlaxRankSchema.parse(rank);
    expect(result.newPokemonIds).toEqual([]);
  });

  it("should reject negative required energy", () => {
    const invalidRank = {
      rank: "ノーマル",
      requiredEnergy: -1,
      newPokemonIds: [],
    };

    expect(() => SnorlaxRankSchema.parse(invalidRank)).toThrow();
  });

  it("should reject non-positive pokemon IDs", () => {
    const invalidRank = {
      rank: "ノーマル",
      requiredEnergy: 0,
      newPokemonIds: [0],
    };

    expect(() => SnorlaxRankSchema.parse(invalidRank)).toThrow();
  });

  it("should reject invalid rank name", () => {
    const invalidRank = {
      rank: "不明",
      requiredEnergy: 0,
      newPokemonIds: [],
    };

    expect(() => SnorlaxRankSchema.parse(invalidRank)).toThrow();
  });
});

describe("IslandSchema", () => {
  it("should validate a valid island", () => {
    const result = IslandSchema.parse(validIsland);
    expect(result).toEqual(validIsland);
  });

  it("should validate an island with optional imageUrl", () => {
    const islandWithImage = {
      ...validIsland,
      imageUrl: "https://example.com/island.png",
    };

    const result = IslandSchema.parse(islandWithImage);
    expect(result.imageUrl).toBe("https://example.com/island.png");
  });

  it("should reject an island with negative id", () => {
    const invalid = { ...validIsland, id: -1 };
    expect(() => IslandSchema.parse(invalid)).toThrow();
  });

  it("should reject an island with empty name", () => {
    const invalid = { ...validIsland, name: "" };
    expect(() => IslandSchema.parse(invalid)).toThrow();
  });

  it("should reject an island with empty specialtyBerry", () => {
    const invalid = { ...validIsland, specialtyBerry: "" };
    expect(() => IslandSchema.parse(invalid)).toThrow();
  });

  it("should reject snorlaxRanks array with wrong length", () => {
    const invalid = {
      ...validIsland,
      snorlaxRanks: validSnorlaxRanks.slice(0, 5),
    };
    expect(() => IslandSchema.parse(invalid)).toThrow();
  });

  it("should require exactly 6 snorlax ranks", () => {
    const sevenRanks = [
      ...validSnorlaxRanks,
      { rank: "ノーマル", requiredEnergy: 300000, newPokemonIds: [] },
    ];
    const invalid = { ...validIsland, snorlaxRanks: sevenRanks };
    expect(() => IslandSchema.parse(invalid)).toThrow();
  });
});
