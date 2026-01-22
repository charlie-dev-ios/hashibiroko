import Breadcrumb from "@/components/navigation/breadcrumb";

export default function IslandsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "島ガイド" }]} />

      <h1 className="text-4xl font-bold mb-8">島ガイド</h1>

      <p className="text-muted-foreground">
        島ガイドのコンテンツは準備中です。後ほど追加されます。
      </p>
    </div>
  );
}
