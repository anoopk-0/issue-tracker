"use client";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React from "react";

const AssigneeSelect = ({
  defaultValue,
  options,
}: {
  defaultValue: string;
  options: User[];
}) => {
  return (
    <Select.Root defaultValue={defaultValue || "Assignee"}>
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestion</Select.Label>
          {options.map((option) => (
            <Select.Item key={option.id} value={option.name!}>
              {option.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
