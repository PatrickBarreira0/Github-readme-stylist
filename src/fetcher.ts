import { GraphQLClient, gql } from 'graphql-request';
import dotenv from 'dotenv';
dotenv.config();

const endpoint = 'https://api.github.com/graphql';

export interface LanguageStat {
    name: string;
    size: number;
    percentage: number;
}

export interface GitHubEvent {
    type: string;
    repo: string;
    date: string;
}

export interface GitHubData {
    name: string;
    totalCommits: number;
    totalStars: number;
    followers: number;
    topLanguages: LanguageStat[];
    recentEvents: GitHubEvent[];
}

interface LanguageEdge {
    size: number;
    node: { name: string };
}

interface RepoNode {
    stargazerCount: number;
    languages: { edges: LanguageEdge[] };
}

interface GraphQLResponse {
    user: {
        name: string;
        followers: { totalCount: number };
        contributionsCollection: { totalCommitContributions: number };
        repositories: { nodes: RepoNode[] };
    };
}

export async function fetchGitHubData(username: string): Promise<GitHubData> {
    const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
            authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
    });

    const query = gql`
    query userInfo($login: String!) {
      user(login: $login) {
        name
        followers {
          totalCount
        }
        contributionsCollection {
          totalCommitContributions
        }
        repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: PUSHED_AT, direction: DESC}) {
          nodes {
            stargazerCount
            languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
              edges {
                size
                node {
                  name
                }
              }
            }
          }
        }
      }
    }
    `;

    const data = await graphQLClient.request<GraphQLResponse>(query, { login: username });

    const totalStars = data.user.repositories.nodes.reduce((sum, repo) => sum + repo.stargazerCount, 0);

    const languageMap = new Map<string, number>();
    for (const repo of data.user.repositories.nodes) {
        for (const edge of repo.languages.edges) {
            const current = languageMap.get(edge.node.name) ?? 0;
            languageMap.set(edge.node.name, current + edge.size);
        }
    }

    const totalSize = Array.from(languageMap.values()).reduce((a, b) => a + b, 0);
    const topLanguages: LanguageStat[] = Array.from(languageMap.entries())
        .sort((a, b) => b[1] - a[1])
        .map(([name, size]) => ({
            name,
            size,
            percentage: totalSize > 0 ? (size / totalSize) * 100 : 0,
        }));

    const eventsResponse = await fetch(`https://api.github.com/users/${username}/events/public`, {
        headers: {
            authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
    });

    const eventsData = await eventsResponse.json() as any[];
    const recentEvents: GitHubEvent[] = (eventsData || [])
        .slice(0, 10)
        .map(event => ({
            type: event.type.replace('Event', ''),
            repo: event.repo.name,
            date: event.created_at,
        }));

    return {
        name: data.user.name,
        totalCommits: data.user.contributionsCollection.totalCommitContributions,
        totalStars,
        followers: data.user.followers.totalCount,
        topLanguages,
        recentEvents,
    };
}
