import { CodeBlockCommand } from "@/components/code-block-command";
import { convertNpmCommand } from "@/lib/convert-npm-command";

export function AddBrailleComponent({ command }: { command: string }) {
  const commands = convertNpmCommand(command);

  return (
    <div className="not-prose my-6">
      <CodeBlockCommand {...commands} />
    </div>
  );
}
