interface PackageManagerCommands {
  pnpm: string;
  yarn: string;
  npm: string;
  bun: string;
  shadcn?: string;
}

const SHADCN_NPX_RE = /^npx\s+shadcn(?:@\S+)?\s+(.+)$/;
const CREATE_NPX_RE = /^npx\s+create-(.+)$/;
const NPX_PREFIX_RE = /^npx\s+/;
const NPM_CREATE_PREFIX_RE = /^npm create\s+/;
const NPM_RUN_PREFIX_RE = /^npm run\s+/;
const NPM_INSTALL_PREFIX_RE = /^npm (?:install|i)\s+/;
const NPM_PREFIX_RE = /^npm\s+/;

export function convertNpmCommand(npmCommand: string): PackageManagerCommands {
  const trimmed = npmCommand.trim();

  // npx shadcn[@version] <subcommand> [args...] → shadcn <subcommand> [args...]
  const shadcnMatch = trimmed.match(SHADCN_NPX_RE);
  if (shadcnMatch) {
    const subcommand = shadcnMatch[1];
    const npxArgs = trimmed.replace(NPX_PREFIX_RE, "");
    return {
      npm: trimmed,
      pnpm: `pnpm dlx ${npxArgs}`,
      yarn: `yarn dlx ${npxArgs}`,
      bun: `bunx --bun ${npxArgs}`,
      shadcn: `shadcn ${subcommand}`,
    };
  }

  // npx create-<name> → pnpm create <name> / yarn create <name> / bunx --bun create-<name>
  const createMatch = trimmed.match(CREATE_NPX_RE);
  if (createMatch) {
    const rest = createMatch[1];
    return {
      npm: trimmed,
      pnpm: `pnpm create ${rest}`,
      yarn: `yarn create ${rest}`,
      bun: `bunx --bun create-${rest}`,
    };
  }

  // npm create → pnpm create / yarn create / bun create
  if (trimmed.startsWith("npm create ")) {
    const rest = trimmed.replace(NPM_CREATE_PREFIX_RE, "");
    return {
      npm: trimmed,
      pnpm: `pnpm create ${rest}`,
      yarn: `yarn create ${rest}`,
      bun: `bun create ${rest}`,
    };
  }

  // npx → pnpm dlx / yarn / bunx --bun
  if (trimmed.startsWith("npx ")) {
    const rest = trimmed.replace(NPX_PREFIX_RE, "");
    return {
      npm: trimmed,
      pnpm: `pnpm dlx ${rest}`,
      yarn: `yarn ${rest}`,
      bun: `bunx --bun ${rest}`,
    };
  }

  // npm run → pnpm / yarn / bun
  if (trimmed.startsWith("npm run ")) {
    const rest = trimmed.replace(NPM_RUN_PREFIX_RE, "");
    return {
      npm: trimmed,
      pnpm: `pnpm ${rest}`,
      yarn: `yarn ${rest}`,
      bun: `bun ${rest}`,
    };
  }

  // npm install → pnpm add / yarn add / bun add
  if (trimmed.startsWith("npm install ") || trimmed.startsWith("npm i ")) {
    const rest = trimmed.replace(NPM_INSTALL_PREFIX_RE, "");
    return {
      npm: trimmed,
      pnpm: `pnpm add ${rest}`,
      yarn: `yarn add ${rest}`,
      bun: `bun add ${rest}`,
    };
  }

  // Fallback
  return {
    npm: trimmed,
    pnpm: trimmed.replace(NPM_PREFIX_RE, "pnpm "),
    yarn: trimmed.replace(NPM_PREFIX_RE, "yarn "),
    bun: trimmed.replace(NPM_PREFIX_RE, "bun "),
  };
}
