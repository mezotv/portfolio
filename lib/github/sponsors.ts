import { cacheLife, cacheTag } from "next/cache";

export interface Sponsor {
  type: "User" | "Organization";
  login: string;
  name: string | null;
  avatarUrl: string;
  url: string;
  websiteUrl: string | null;
}

interface SponsorsResponse {
  data?: {
    user?: {
      sponsors?: {
        totalCount: number;
        nodes: Array<{
          __typename: "User" | "Organization";
          login: string;
          name?: string;
          avatarUrl: string;
          url: string;
          websiteUrl?: string;
        }>;
      };
    };
  };
  errors?: Array<{ message: string }>;
}

const SPONSORS_QUERY = `
  query($username: String!) {
    user(login: $username) {
      sponsors(first: 100, orderBy: {field: RELEVANCE, direction: DESC}) {
        totalCount
        nodes {
          __typename
          ... on User {
            login
            name
            avatarUrl
            url
            websiteUrl
          }
          ... on Organization {
            login
            name
            avatarUrl
            url
            websiteUrl
          }
        }
      }
    }
  }
`;

const GITHUB_USERNAME = "mezotv";

async function fetchSponsorsData(): Promise<{
  sponsors: Sponsor[];
  totalCount: number;
}> {
  "use cache";
  cacheLife("days");
  cacheTag("sponsors");

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error("GitHub token not configured");
  }

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: SPONSORS_QUERY,
      variables: { username: GITHUB_USERNAME },
    }),
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const data: SponsorsResponse = await response.json();

  if (data.errors) {
    throw new Error(data.errors[0]?.message ?? "GraphQL error");
  }

  const sponsorsData = data.data?.user?.sponsors;

  if (!sponsorsData) {
    return { sponsors: [], totalCount: 0 };
  }

  const sponsors: Sponsor[] = sponsorsData.nodes.map((node) => ({
    type: node.__typename,
    login: node.login,
    name: node.name ?? null,
    avatarUrl: node.avatarUrl,
    url: node.url,
    websiteUrl: node.websiteUrl ?? null,
  }));

  return {
    sponsors,
    totalCount: sponsorsData.totalCount,
  };
}

export async function getSponsors(): Promise<{
  sponsors: Sponsor[];
  totalCount: number;
  error: string | null;
}> {
  if (!process.env.GITHUB_TOKEN) {
    return {
      sponsors: [],
      totalCount: 0,
      error: "GitHub token not configured",
    };
  }

  try {
    const { sponsors, totalCount } = await fetchSponsorsData();
    return { sponsors, totalCount, error: null };
  } catch (err) {
    console.error("Error fetching sponsors:", err);
    return {
      sponsors: [],
      totalCount: 0,
      error: err instanceof Error ? err.message : "Failed to fetch sponsors",
    };
  }
}
