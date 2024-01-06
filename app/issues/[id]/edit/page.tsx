import prisma from "@/prisma/client";
import { IssueForm } from "../../_components";
import { notFound } from "next/navigation";

const IssueEditPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const issue = await prisma.issue.findUnique({
    where: { id: +id },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export default IssueEditPage;
