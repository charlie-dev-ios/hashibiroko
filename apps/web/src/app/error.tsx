"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-4xl font-bold">エラーが発生しました</h1>
      <p className="mb-8 text-muted-foreground">
        申し訳ございません。問題が発生しました。
      </p>
      <Button onClick={reset}>もう一度試す</Button>
    </div>
  );
}
