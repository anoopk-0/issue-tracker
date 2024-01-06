import authOption from "@/app/auth/authOption";
import { issueSchema } from "@/app/utils/createIssueSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
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

  const issue = await prisma.issue.findUnique({ where: { id: +id } });

  if (!issue)
    return NextResponse.json({ message: "Not Found" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: +id },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const session = await getServerSession(authOption);

  if (!session)
    return NextResponse.json(
      { message: "session expired, re login" },
      { status: 401 }
    );
  const issue = await prisma.issue.findUnique({ where: { id: +id } });

  if (!issue)
    return NextResponse.json({ message: "Not Found" }, { status: 404 });

  await prisma.issue.delete({
    where: { id: issue.id },
  });

  return NextResponse.json({ message: "success" }, { status: 200 });
}
