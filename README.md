# Dominik Koch's Portfolio

Personal portfolio website built with Astro and Tailwind CSS, featuring GitHub Sponsors integration.

## Setup

1. Install dependencies:
```sh
bun install
```

2. Set up environment variables:
Create a `.env` file and add your GitHub Personal Access Token:
```sh
GITHUB_TOKEN=your_github_token_here
```

**Important**: Use `GITHUB_TOKEN` (without `PUBLIC_` prefix) to keep your token secure on the server-side.

To create a GitHub token:
1. Go to [GitHub Settings > Personal Access Tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a name like "Portfolio Sponsors"
4. Select the `read:user` scope (and `read:org` if you want to see organization sponsors)
5. Generate the token and copy it to your `.env` file

3. Start the development server:
```sh
bun dev
```

## Features

- **GitHub Sponsors Integration**: Automatically displays sponsors from the GitHub Sponsors API
- **Dark/Light Mode**: Theme toggle with system preference detection
- **Responsive Design**: Mobile-first responsive layout
- **Interactive Elements**: Hover effects and smooth animations

## GitHub Sponsors

The sponsors section is built as an Astro component that fetches your GitHub sponsors at build time using the GraphQL API. This provides:

- **Server-side rendering**: No client-side JavaScript needed
- **Better performance**: Pre-rendered at build time
- **Security**: GitHub token stays secure on the server
- **Better SEO**: Sponsors are indexed by search engines

If no token is configured, it will show a fallback message with a link to become a sponsor.
