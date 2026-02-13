"use client";

import { ChevronRight } from "lucide-react";
import { type ReactNode, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export interface CollapsibleSectionProps {
  title: string;
  children: ReactNode;
}

export default function CollapsibleSection({
  title,
  children,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 text-2xl font-semibold cursor-pointer hover:opacity-80 transition-opacity"
        >
          <ChevronRight
            className={`h-6 w-6 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
          />
          {title}
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-4">{children}</CollapsibleContent>
    </Collapsible>
  );
}
