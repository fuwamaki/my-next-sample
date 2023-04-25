import { zSettings } from "@/app/type";
import { prisma } from "@/globals/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const parcedData = zSettings.parse(data);
  // トランザクションを使って、複数のデータを一度に更新する
  await prisma.$transaction([
    prisma.metadata.update({
      where: { key: "version" },
      data: { value: parcedData.version },
    }),
    prisma.metadata.update({
      where: { key: "faq" },
      data: { value: parcedData.faq },
    }),
    prisma.metadata.update({
      where: { key: "tos" },
      data: { value: parcedData.tos },
    }),
  ]);
  return new NextResponse(null, { status: 204 });
}
