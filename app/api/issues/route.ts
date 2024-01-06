import authOption from "@/app/auth/authOption";
import { issueSchema } from "@/app/utils/createIssueSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOption);

  if (!session)
    return NextResponse.json(
      { message: "session expired, re login" },
      { status: 401 }
    );

  const body = await request.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(
      { message: validation.error.errors },
      { status: 400 }
    );

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
