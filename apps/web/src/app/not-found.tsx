import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-6xl font-bold">404</h1>
      <h2 className="mb-4 text-2xl font-semibold">ページが見つかりません</h2>
      <p className="mb-8 text-muted-foreground">
        お探しのページは存在しないか、移動した可能性があります。
      </p>
      <Link href="/">
        <Button>ホームに戻る</Button>
      </Link>
    </div>
  );
}
