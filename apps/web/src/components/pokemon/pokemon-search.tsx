"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface PokemonSearchProps {
  onSearch: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  keyword: string;
  sleepType: string;
  specialty: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

export default function PokemonSearch({ onSearch }: PokemonSearchProps) {
  const [keyword, setKeyword] = useState("");
  const [sleepType, setSleepType] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSearch = () => {
    onSearch({
      keyword,
      sleepType,
      specialty,
      sortBy,
      sortOrder,
    });
  };

  const handleReset = () => {
    setKeyword("");
    setSleepType("");
    setSpecialty("");
    setSortBy("id");
    setSortOrder("asc");
    onSearch({
      keyword: "",
      sleepType: "",
      specialty: "",
      sortBy: "id",
      sortOrder: "asc",
    });
  };

  return (
    <div className="space-y-4 rounded-lg border p-3 sm:p-4">
      <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Keyword Search */}
        <div>
          <label htmlFor="keyword" className="block text-sm font-medium mb-2">
            名前で検索
          </label>
          <Input
            id="keyword"
            type="text"
            placeholder="ポケモン名を入力"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        {/* Sleep Type Filter */}
        <div>
          <label htmlFor="sleepType" className="block text-sm font-medium mb-2">
            睡眠タイプ
          </label>
          <Select value={sleepType || undefined} onValueChange={setSleepType}>
            <SelectTrigger id="sleepType">
              <SelectValue placeholder="全て" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="うとうと">うとうと</SelectItem>
              <SelectItem value="すやすや">すやすや</SelectItem>
              <SelectItem value="ぐっすり">ぐっすり</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Specialty Filter */}
        <div>
          <label htmlFor="specialty" className="block text-sm font-medium mb-2">
            とくい
          </label>
          <Select value={specialty || undefined} onValueChange={setSpecialty}>
            <SelectTrigger id="specialty">
              <SelectValue placeholder="全て" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="きのみ">きのみ</SelectItem>
              <SelectItem value="食材">食材</SelectItem>
              <SelectItem value="スキル">スキル</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort By */}
        <div>
          <label htmlFor="sortBy" className="block text-sm font-medium mb-2">
            並び替え
          </label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger id="sortBy">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="id">図鑑番号</SelectItem>
              <SelectItem value="name">名前</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort Order */}
        <div>
          <label htmlFor="sortOrder" className="block text-sm font-medium mb-2">
            順序
          </label>
          <Select
            value={sortOrder}
            onValueChange={(v) => setSortOrder(v as "asc" | "desc")}
          >
            <SelectTrigger id="sortOrder">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">昇順</SelectItem>
              <SelectItem value="desc">降順</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button onClick={handleSearch}>検索</Button>
        <Button variant="outline" onClick={handleReset}>
          リセット
        </Button>
      </div>
    </div>
  );
}
