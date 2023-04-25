import { prisma } from "@/globals/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // 動的レンダリングを強制

export async function GET() {
  const notes = await prisma.note.findMany();
  return NextResponse.json(notes);
}
