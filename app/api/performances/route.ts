import { NextResponse } from "next/server";
import { getPerformanceById } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing performance id" }, { status: 400 });
  }

  const performance = await getPerformanceById(id);

  if (!performance) {
    return NextResponse.json({ error: "Performance not found" }, { status: 404 });
  }

  return NextResponse.json({ performance });
}
