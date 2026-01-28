import Breadcrumb from "@/components/navigation/breadcrumb";

export default function RecipesLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "料理情報" }]} />

      <h1 className="text-4xl font-bold mb-8">料理一覧</h1>

      <div className="mb-6">
        <div className="h-10 w-64 bg-gray-200 animate-pulse rounded" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: Static skeleton items never change order
          <div key={i} className="border rounded-lg p-4 animate-pulse">
            <div className="h-48 bg-gray-200 rounded mb-4" />
            <div className="h-6 bg-gray-200 rounded mb-2" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
