import { NextResponse } from "next/server";
import { getSongs } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") ?? undefined;
  const tag = searchParams.get("tag") ?? undefined;

  const songs = await getSongs({ search: query, tag });

  return NextResponse.json({ songs });
}
