import type { Section } from './types.js';
import type { GitHubData } from '../fetcher.js';
import type { Config } from '../config.js';

export const activitySection: Section = {
    id: 'activity',
    render(data: GitHubData, config: Config): string {
        const { limit } = config.sections.activity;
        const events = data.recentEvents.slice(0, limit);

        if (events.length === 0) {
            return '';
        }

        const lines = events.map(event => {
            const date = new Date(event.date);
            const formattedDate = date.toISOString().replace('T', ' ').slice(0, 16);
            return `${formattedDate} | ${event.type.padEnd(14)} | ${event.repo}`;
        });

        const maxLen = Math.max(...lines.map(l => l.length), 20);
        const border = '-'.repeat(maxLen);

        const now = new Date();
        const lastUpdated = now.toISOString().replace('T', ' ').slice(0, 19);

        return `#### Activity\n\n\`\`\`text\n${border}\n${lines.join('\n')}\n${border}\n\nLast updated: ${lastUpdated}\n\`\`\``;
    },
};





