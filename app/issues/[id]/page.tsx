import authOption from "@/app/auth/authOption";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { cache } from "react";
import AssigneeSelect from "./AssigneeSelect";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
interface Props {
  params: {
    id: string;
  };
}

const fetchIssue = cache((id: string) =>
  prisma.issue.findUnique({ where: { id: +id } })
);

const IssueDetailPage = async ({ params: { id } }: Props) => {
  const session = await getServerSession(authOption);

  const issue = await fetchIssue(id);

  const users = await prisma.user.findMany();

  if (!issue) notFound();
  return (
    <Grid columns={{ initial: "1", md: "5" }} gap="5">
      <Box className="col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex gap="4" direction="column">
            <AssigneeSelect
              options={users}
              defaultValue={session!.user!.name!}
            />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params: { id } }: Props) {
  const issue = await fetchIssue(id);

  return {
    title: issue?.title,
    description: "Details of issue " + issue?.id,
  };
}

export default IssueDetailPage;
