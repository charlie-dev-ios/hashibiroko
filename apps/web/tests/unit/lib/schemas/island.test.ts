import { describe, expect, it } from "vitest";
import {
	IslandSchema,
	SnorlaxRankSchema,
	SnorlaxRankTierSchema,
} from "@/lib/schemas/island";

function generateValidSnorlaxRanks() {
	const tiers = [
		{ tier: "ノーマル" as const, count: 5 },
		{ tier: "スーパー" as const, count: 5 },
		{ tier: "ハイパー" as const, count: 5 },
		{ tier: "マスター" as const, count: 20 },
	];
	const ranks = [];
	let energy = 0;
	let shards = 0;
	for (const { tier, count } of tiers) {
		for (let i = 1; i <= count; i++) {
			ranks.push({
				rankTier: tier,
				rankNumber: i,
				requiredEnergy: energy,
				dreamShards: shards,
				newPokemonIds: [],
			});
			energy += 10000;
			shards += 50;
		}
	}
	return ranks;
}

const validSnorlaxRanks = generateValidSnorlaxRanks();

const validIsland = {
	id: 1,
	name: "ワカクサ本島",
	description: "最初に訪れるフィールド。",
	specialtyBerry: "ランダム",
	snorlaxRanks: validSnorlaxRanks,
};

describe("SnorlaxRankTierSchema", () => {
	it("should accept all valid tier names", () => {
		const tierNames = ["ノーマル", "スーパー", "ハイパー", "マスター"];
		for (const name of tierNames) {
			expect(SnorlaxRankTierSchema.parse(name)).toBe(name);
		}
	});

	it("should reject old rank names", () => {
		const oldNames = ["いいかんじ", "すごいぞ", "とてもすごい"];
		for (const name of oldNames) {
			expect(() => SnorlaxRankTierSchema.parse(name)).toThrow();
		}
	});

	it("should reject invalid tier name", () => {
		expect(() => SnorlaxRankTierSchema.parse("不明")).toThrow();
	});
});

describe("SnorlaxRankSchema", () => {
	it("should validate a valid snorlax rank", () => {
		const validRank = {
			rankTier: "ノーマル",
			rankNumber: 1,
			requiredEnergy: 0,
			dreamShards: 0,
			newPokemonIds: [],
		};

		const result = SnorlaxRankSchema.parse(validRank);
		expect(result).toEqual(validRank);
	});

	it("should accept rank with newPokemonIds", () => {
		const rank = {
			rankTier: "ノーマル",
			rankNumber: 2,
			requiredEnergy: 3118,
			dreamShards: 35,
			newPokemonIds: [1, 4, 7],
		};

		const result = SnorlaxRankSchema.parse(rank);
		expect(result.newPokemonIds).toEqual([1, 4, 7]);
	});

	it("should accept zero required energy and zero dreamShards", () => {
		const rank = {
			rankTier: "ノーマル",
			rankNumber: 1,
			requiredEnergy: 0,
			dreamShards: 0,
			newPokemonIds: [],
		};

		const result = SnorlaxRankSchema.parse(rank);
		expect(result.requiredEnergy).toBe(0);
		expect(result.dreamShards).toBe(0);
	});

	it("should accept empty newPokemonIds array", () => {
		const rank = {
			rankTier: "スーパー",
			rankNumber: 3,
			requiredEnergy: 41314,
			dreamShards: 109,
			newPokemonIds: [],
		};

		const result = SnorlaxRankSchema.parse(rank);
		expect(result.newPokemonIds).toEqual([]);
	});

	it("should reject negative required energy", () => {
		const invalidRank = {
			rankTier: "ノーマル",
			rankNumber: 1,
			requiredEnergy: -1,
			dreamShards: 0,
			newPokemonIds: [],
		};

		expect(() => SnorlaxRankSchema.parse(invalidRank)).toThrow();
	});

	it("should reject negative dreamShards", () => {
		const invalidRank = {
			rankTier: "ノーマル",
			rankNumber: 1,
			requiredEnergy: 0,
			dreamShards: -1,
			newPokemonIds: [],
		};

		expect(() => SnorlaxRankSchema.parse(invalidRank)).toThrow();
	});

	it("should reject non-positive pokemon IDs", () => {
		const invalidRank = {
			rankTier: "ノーマル",
			rankNumber: 1,
			requiredEnergy: 0,
			dreamShards: 0,
			newPokemonIds: [0],
		};

		expect(() => SnorlaxRankSchema.parse(invalidRank)).toThrow();
	});

	it("should reject invalid tier name in rank", () => {
		const invalidRank = {
			rankTier: "不明",
			rankNumber: 1,
			requiredEnergy: 0,
			dreamShards: 0,
			newPokemonIds: [],
		};

		expect(() => SnorlaxRankSchema.parse(invalidRank)).toThrow();
	});

	it("should reject non-positive rankNumber", () => {
		const invalidRank = {
			rankTier: "ノーマル",
			rankNumber: 0,
			requiredEnergy: 0,
			dreamShards: 0,
			newPokemonIds: [],
		};

		expect(() => SnorlaxRankSchema.parse(invalidRank)).toThrow();
	});
});

describe("IslandSchema", () => {
	it("should validate a valid island with 35 ranks", () => {
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
			snorlaxRanks: validSnorlaxRanks.slice(0, 10),
		};
		expect(() => IslandSchema.parse(invalid)).toThrow();
	});

	it("should require exactly 35 snorlax ranks", () => {
		const extraRank = {
			rankTier: "ノーマル" as const,
			rankNumber: 1,
			requiredEnergy: 999999,
			dreamShards: 0,
			newPokemonIds: [],
		};
		const tooMany = [...validSnorlaxRanks, extraRank];
		const invalid = { ...validIsland, snorlaxRanks: tooMany };
		expect(() => IslandSchema.parse(invalid)).toThrow();
	});
});
