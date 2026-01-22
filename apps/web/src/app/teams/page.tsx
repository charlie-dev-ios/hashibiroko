import { Suspense } from "react";
import LoadingIndicator from "@/components/common/loading-indicator";
import MarkdownContent from "@/components/common/markdown-content";
import Breadcrumb from "@/components/navigation/breadcrumb";
import { getContentByCategory } from "@/lib/data/content";

export default async function TeamsPage() {
  const content = await getContentByCategory("teams");

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "チーム編成" }]} />

      <h1 className="text-4xl font-bold mb-8">チーム編成</h1>

      <Suspense fallback={<LoadingIndicator />}>
        <div className="space-y-12">
          {content.length > 0 ? (
            content.map((item) => (
              <article key={item.slug} className="space-y-4">
                <h2 className="text-3xl font-semibold">{item.title}</h2>
                {item.description && (
                  <p className="text-lg text-muted-foreground">
                    {item.description}
                  </p>
                )}
                <MarkdownContent content={item.content} />
              </article>
            ))
          ) : (
            <p className="text-muted-foreground">コンテンツを準備中です。</p>
          )}
        </div>
      </Suspense>
    </div>
  );
}
