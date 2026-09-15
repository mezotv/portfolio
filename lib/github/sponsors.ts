import { cacheLife, cacheTag } from "next/cache";

export interface Sponsor {
  avatarUrl: string;
  login: string;
  name: string | null;
  type: "User" | "Organization";
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
    body: JSON.stringify({
      query: SPONSORS_QUERY,
      variables: { username: GITHUB_USERNAME },
    }),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
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
    avatarUrl: node.avatarUrl,
    login: node.login,
    name: node.name ?? null,
    type: node.__typename,
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
      error: "GitHub token not configured",
      sponsors: [],
      totalCount: 0,
    };
  }

  try {
    const { sponsors, totalCount } = await fetchSponsorsData();
    return { error: null, sponsors, totalCount };
  } catch (err) {
    console.error("Error fetching sponsors:", err);
    return {
      error: err instanceof Error ? err.message : "Failed to fetch sponsors",
      sponsors: [],
      totalCount: 0,
    };
  }
}
