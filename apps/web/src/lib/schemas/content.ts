import { z } from "zod";

export const ContentSchema = z.object({
  slug: z.string().min(1), // URL用スラッグ（例: "sleep-types-guide"）
  title: z.string().min(1),
  category: z.enum(["mechanics", "strategies", "teams", "guides"]),
  description: z.string().optional(),
  publishedAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  tags: z.array(z.string()).optional(),
  content: z.string(), // Markdown本文
});

export type Content = z.infer<typeof ContentSchema>;
