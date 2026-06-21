import { CodeBlockCommand } from "@/components/code-block-command";
import { convertNpmCommand } from "@/lib/convert-npm-command";
import { REGISTRY_NAMESPACE } from "@/lib/registry/constants";

export function InstallCommand({ component }: { component: string }) {
  const commands = convertNpmCommand(
    `npx shadcn@latest add ${REGISTRY_NAMESPACE}/${component}`
  );

  return <CodeBlockCommand {...commands} />;
}
