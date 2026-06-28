"use client";

import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  PermissionOption,
  PermissionRow,
  PermissionSelector,
} from "@/components/ui/permission-selector";

type PermissionLevel = "none" | "read" | "write";

interface PermissionFormValues {
  balance: PermissionLevel;
  customers: PermissionLevel;
  charges: PermissionLevel;
}

const DEFAULT_VALUES: PermissionFormValues = {
  balance: "read",
  customers: "none",
  charges: "write",
};

export function PermissionFormDemo() {
  const [submitted, setSubmitted] = useState<PermissionFormValues | null>(null);

  const form = useForm({
    defaultValues: DEFAULT_VALUES,
    onSubmit: ({ value }) => setSubmitted(value),
  });

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        form.handleSubmit();
      }}
    >
      <PermissionSelector label="API key permissions">
        <form.Field name="balance">
          {(field) => (
            <PermissionRow
              description="View the account balance"
              label="Balance"
              onValueChange={(value) =>
                field.handleChange(value as PermissionLevel)
              }
              value={field.state.value}
            >
              <PermissionOption value="none">None</PermissionOption>
              <PermissionOption value="read">Read</PermissionOption>
            </PermissionRow>
          )}
        </form.Field>

        <form.Field name="customers">
          {(field) => (
            <PermissionRow
              description="Manage customer records"
              label="Customers"
              onValueChange={(value) =>
                field.handleChange(value as PermissionLevel)
              }
              value={field.state.value}
            >
              <PermissionOption value="none">None</PermissionOption>
              <PermissionOption value="read">Read</PermissionOption>
              <PermissionOption value="write">Write</PermissionOption>
            </PermissionRow>
          )}
        </form.Field>

        <form.Field name="charges">
          {(field) => (
            <PermissionRow
              description="Create and refund charges"
              label="Charges and Refunds"
              onValueChange={(value) =>
                field.handleChange(value as PermissionLevel)
              }
              value={field.state.value}
            >
              <PermissionOption value="none">None</PermissionOption>
              <PermissionOption value="read">Read</PermissionOption>
              <PermissionOption tone="warning" value="write">
                Write
              </PermissionOption>
            </PermissionRow>
          )}
        </form.Field>
      </PermissionSelector>

      <div className="flex items-center gap-3">
        <Button type="submit">Save permissions</Button>
        <Button onClick={() => form.reset()} type="button" variant="outline">
          Reset
        </Button>
      </div>

      {submitted && (
        <pre className="overflow-x-auto rounded-lg border bg-muted/40 p-3 text-muted-foreground text-xs">
          {JSON.stringify(submitted, null, 2)}
        </pre>
      )}
    </form>
  );
}
