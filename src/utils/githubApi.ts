
import { GitHubUser, Repository } from '@/types/github';

const GITHUB_API_BASE = 'https://api.github.com';

export const fetchGitHubUser = async (username: string): Promise<GitHubUser> => {
  const response = await fetch(`${GITHUB_API_BASE}/users/${username}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`User "${username}" not found`);
    }
    if (response.status === 403) {
      throw new Error('GitHub API rate limit exceeded. Please try again later.');
    }
    throw new Error(`Failed to fetch user data: ${response.statusText}`);
  }
  
  return response.json();
};

export const fetchUserRepositories = async (username: string): Promise<Repository[]> => {
  const response = await fetch(
    `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=100`
  );
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Repositories for "${username}" not found`);
    }
    if (response.status === 403) {
      throw new Error('GitHub API rate limit exceeded. Please try again later.');
    }
    throw new Error(`Failed to fetch repositories: ${response.statusText}`);
  }
  
  const repos = await response.json();
  
  // Sort by stargazers_count in descending order
  return repos.sort((a: Repository, b: Repository) => b.stargazers_count - a.stargazers_count);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};
