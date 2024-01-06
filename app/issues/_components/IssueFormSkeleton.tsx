import { Box, Flex, Card } from "@radix-ui/themes";
import React from "react";
import { Skeleton } from "../../components";

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex className="space-x-3" my="2">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton height="20rem" />
      </Card>
    </Box>
  );
};

export default IssueFormSkeleton;
