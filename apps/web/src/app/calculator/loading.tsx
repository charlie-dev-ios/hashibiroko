import { Skeleton } from "@/components/ui/skeleton";

export default function CalculatorLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb skeleton */}
      <Skeleton className="h-4 w-32 mb-6" />

      {/* Title skeleton */}
      <Skeleton className="h-10 w-64 mb-4" />
      <Skeleton className="h-5 w-96 mb-8" />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left column */}
        <div className="space-y-6">
          {/* Recipe selector skeleton */}
          <div className="border rounded-lg p-4 space-y-3">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-10 w-full" />
            <div className="space-y-2">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>

          {/* Selected recipes skeleton */}
          <div className="border rounded-lg p-4 space-y-3">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>

        {/* Right column */}
        <div className="border rounded-lg p-4 space-y-3">
          <Skeleton className="h-6 w-24" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
