import { NextResponse } from "next/server";
import { getAllPokemon } from "@/lib/data/pokemon";

export async function GET() {
  try {
    const pokemon = await getAllPokemon();
    return NextResponse.json(pokemon);
  } catch (error) {
    console.error("Error fetching pokemon:", error);
    return NextResponse.json(
      { error: "Failed to fetch pokemon" },
      { status: 500 },
    );
  }
}
