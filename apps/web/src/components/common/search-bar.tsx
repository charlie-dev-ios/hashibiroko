"use client";

import { Input } from "@/components/ui/input";

export interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  placeholder = "検索...",
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className="w-full">
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full"
      />
    </div>
  );
}
