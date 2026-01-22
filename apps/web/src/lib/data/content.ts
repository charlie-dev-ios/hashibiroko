import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { type Content, ContentSchema } from "@/lib/schemas/content";

const CONTENT_DIRECTORY = path.join(process.cwd(), "src", "content");

/**
 * Get all markdown content files from the content directory
 * @returns Promise<Content[]> - Array of all content
 */
export async function getAllContent(): Promise<Content[]> {
  const categories = ["mechanics", "strategies", "teams", "guides"];
  const allContent: Content[] = [];

  for (const category of categories) {
    const categoryPath = path.join(CONTENT_DIRECTORY, category);

    // Check if category directory exists
    if (!fs.existsSync(categoryPath)) {
      continue;
    }

    const files = fs.readdirSync(categoryPath);

    for (const file of files) {
      if (!file.endsWith(".md")) {
        continue;
      }

      const filePath = path.join(categoryPath, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");

      // Parse frontmatter
      const { data, content } = matter(fileContent);

      // Validate and create content object
      const contentData = ContentSchema.parse({
        slug: data.slug || file.replace(".md", ""),
        title: data.title,
        category: data.category || category,
        description: data.description,
        publishedAt: data.publishedAt,
        updatedAt: data.updatedAt,
        tags: data.tags,
        content,
      });

      allContent.push(contentData);
    }
  }

  return allContent;
}

/**
 * Get content by slug
 * @param slug - Content slug
 * @returns Promise<Content | null> - Content if found, null otherwise
 */
export async function getContentBySlug(slug: string): Promise<Content | null> {
  const allContent = await getAllContent();
  const content = allContent.find((c) => c.slug === slug);
  return content || null;
}

/**
 * Get all content by category
 * @param category - Content category
 * @returns Promise<Content[]> - Array of content in category
 */
export async function getContentByCategory(
  category: string,
): Promise<Content[]> {
  const allContent = await getAllContent();
  return allContent.filter((c) => c.category === category);
}
