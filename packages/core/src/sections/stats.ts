import type { Section } from './types.js';
import type { GitHubData } from '../fetcher.js';
import type { Config } from '../config.js';

export const statsSection: Section = {
    id: 'stats',
    render(data: GitHubData, config: Config): string {
        const { showCommits, showStars, showFollowers } = config.sections.stats;
        const lines: string[] = [];

        if (showCommits) {
            lines.push(`Commits | ${data.totalCommits}`);
        }
        if (showStars) {
            lines.push(`Stars   | ${data.totalStars}`);
        }
        if (showFollowers) {
            lines.push(`Followers | ${data.followers}`);
        }

        if (lines.length === 0) {
            return '';
        }

        const maxLen = Math.max(...lines.map(l => l.length));
        const border = '+' + '-'.repeat(maxLen + 2) + '+';
        const formatted = lines.map(l => `| ${l.padEnd(maxLen)} |`).join('\n');

        return `#### Stats\n\n\`\`\`text\n${border}\n${formatted}\n${border}\n\`\`\``;
    },
};