import { describe, expect, it } from "vitest";
import { getAllContent, getContentBySlug } from "@/lib/data/content";

describe("getAllContent", () => {
  it("should return all markdown content files", async () => {
    const content = await getAllContent();

    expect(content).toBeDefined();
    expect(Array.isArray(content)).toBe(true);
    expect(content.length).toBeGreaterThan(0);
  });

  it("should parse frontmatter correctly", async () => {
    const content = await getAllContent();
    const sleepTypesGuide = content.find((c) => c.slug === "sleep-types-guide");

    expect(sleepTypesGuide).toBeDefined();
    expect(sleepTypesGuide?.title).toBe("睡眠タイプの仕組みと活用法");
    expect(sleepTypesGuide?.category).toBe("mechanics");
  });

  it("should include markdown content", async () => {
    const content = await getAllContent();

    content.forEach((c) => {
      expect(c.content).toBeDefined();
      expect(c.content.length).toBeGreaterThan(0);
    });
  });

  it("should validate content with Zod schema", async () => {
    const content = await getAllContent();

    content.forEach((c) => {
      expect(c).toHaveProperty("slug");
      expect(c).toHaveProperty("title");
      expect(c).toHaveProperty("category");
      expect(c).toHaveProperty("content");
    });
  });
});

describe("getContentBySlug", () => {
  it("should return content by slug", async () => {
    const content = await getContentBySlug("sleep-types-guide");

    expect(content).toBeDefined();
    expect(content?.slug).toBe("sleep-types-guide");
    expect(content?.title).toBe("睡眠タイプの仕組みと活用法");
  });

  it("should return null for non-existent slug", async () => {
    const content = await getContentBySlug("non-existent-slug");

    expect(content).toBeNull();
  });
});
