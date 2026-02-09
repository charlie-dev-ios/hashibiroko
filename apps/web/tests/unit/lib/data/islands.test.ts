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

	it("should return islands with exactly 35 snorlax ranks each", async () => {
		const islands = await getAllIslands();

		for (const island of islands) {
			expect(island.snorlaxRanks).toHaveLength(35);
		}
	});

	it("should return islands with valid rank tiers in order", async () => {
		const islands = await getAllIslands();

		for (const island of islands) {
			const tiers = island.snorlaxRanks.map((r) => r.rankTier);
			// First 5 should be ノーマル
			expect(tiers.slice(0, 5).every((t) => t === "ノーマル")).toBe(true);
			// Next 5 should be スーパー
			expect(tiers.slice(5, 10).every((t) => t === "スーパー")).toBe(true);
			// Next 5 should be ハイパー
			expect(tiers.slice(10, 15).every((t) => t === "ハイパー")).toBe(true);
			// Last 20 should be マスター
			expect(tiers.slice(15, 35).every((t) => t === "マスター")).toBe(true);
		}
	});

	it("should return ranks with dreamShards field", async () => {
		const islands = await getAllIslands();

		for (const island of islands) {
			for (const rank of island.snorlaxRanks) {
				expect(rank).toHaveProperty("dreamShards");
				expect(typeof rank.dreamShards).toBe("number");
			}
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
		expect(island?.snorlaxRanks).toHaveLength(35);
		expect(island?.snorlaxRanks[0]).toHaveProperty("rankTier");
		expect(island?.snorlaxRanks[0]).toHaveProperty("rankNumber");
		expect(island?.snorlaxRanks[0]).toHaveProperty("requiredEnergy");
		expect(island?.snorlaxRanks[0]).toHaveProperty("dreamShards");
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
