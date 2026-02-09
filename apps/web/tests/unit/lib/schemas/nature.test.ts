import { describe, expect, it } from "vitest";
import {
  type Nature,
  NatureSchema,
  type NatureStat,
  NatureStatSchema,
  type StatEffect,
  StatEffectSchema,
} from "@/lib/schemas/nature";

describe("NatureStatSchema", () => {
  it("should accept valid stat values", () => {
    const validStats: NatureStat[] = [
      "helpingSpeed",
      "ingredientRate",
      "mainSkillRate",
      "expGain",
      "energyRecovery",
    ];
    for (const stat of validStats) {
      expect(NatureStatSchema.parse(stat)).toBe(stat);
    }
  });

  it("should reject invalid stat values", () => {
    expect(() => NatureStatSchema.parse("invalid")).toThrow();
    expect(() => NatureStatSchema.parse("")).toThrow();
    expect(() => NatureStatSchema.parse(123)).toThrow();
  });
});

describe("NatureSchema", () => {
  it("should accept a valid nature", () => {
    const nature: Nature = {
      name: "さみしがり",
      increasedStat: "helpingSpeed",
      decreasedStat: "ingredientRate",
    };
    expect(NatureSchema.parse(nature)).toEqual(nature);
  });

  it("should accept a neutral nature (same increased and decreased)", () => {
    const nature: Nature = {
      name: "がんばりや",
      increasedStat: "helpingSpeed",
      decreasedStat: "helpingSpeed",
    };
    expect(NatureSchema.parse(nature)).toEqual(nature);
  });

  it("should reject nature with empty name", () => {
    expect(() =>
      NatureSchema.parse({
        name: "",
        increasedStat: "helpingSpeed",
        decreasedStat: "ingredientRate",
      }),
    ).toThrow();
  });

  it("should reject nature with invalid stat", () => {
    expect(() =>
      NatureSchema.parse({
        name: "テスト",
        increasedStat: "invalid",
        decreasedStat: "helpingSpeed",
      }),
    ).toThrow();
  });
});

describe("StatEffectSchema", () => {
  it("should accept a valid stat effect", () => {
    const effect: StatEffect = {
      stat: "helpingSpeed",
      label: "おてつだいスピード",
      increasedEffect: "おてつだい時間が約2%短縮",
      decreasedEffect: "おてつだい時間が約2%延長",
    };
    expect(StatEffectSchema.parse(effect)).toEqual(effect);
  });

  it("should reject stat effect with missing fields", () => {
    expect(() =>
      StatEffectSchema.parse({
        stat: "helpingSpeed",
        label: "おてつだいスピード",
      }),
    ).toThrow();
  });
});
