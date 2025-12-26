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
const REVALIDATE_SECONDS = 86_400; // 24 hours

export async function getSponsors(): Promise<{
  sponsors: Sponsor[];
  totalCount: number;
  error: string | null;
}> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return {
      sponsors: [],
      totalCount: 0,
      error: "GitHub token not configured",
    };
  }

  try {
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
      next: {
        revalidate: REVALIDATE_SECONDS,
        tags: ["sponsors"],
      },
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
      return { sponsors: [], totalCount: 0, error: null };
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
      error: null,
    };
  } catch (err) {
    console.error("Error fetching sponsors:", err);
    return {
      sponsors: [],
      totalCount: 0,
      error: err instanceof Error ? err.message : "Failed to fetch sponsors",
    };
  }
}
