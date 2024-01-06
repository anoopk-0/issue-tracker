import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

const IssueDetails = ({
  issue: { title, status, createdAt, description },
}: {
  issue: Issue;
}) => {
  return (
    <>
      <Heading>{title}</Heading>
      <Flex className="space-x-3" my="2">
        <IssueStatusBadge status={status} />
        <Text>{createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="4">
        <ReactMarkdown>{description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
