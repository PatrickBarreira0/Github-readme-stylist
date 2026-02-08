import type { Section } from './types.js';
import type { GitHubData } from '../fetcher.js';
import type { Config } from '../config.js';

function createBar(percentage: number, width: number = 20): string {
    const filled = Math.round((percentage / 100) * width);
    const empty = width - filled;
    return '█'.repeat(filled) + '─'.repeat(empty);
}

export const languagesSection: Section = {
    id: 'languages',
    render(data: GitHubData, config: Config): string {
        const { topN } = config.sections.languages;
        const langs = data.topLanguages.slice(0, topN);

        if (langs.length === 0) {
            return '';
        }

        const maxNameLen = Math.max(...langs.map(l => l.name.length));
        const lines = langs.map(l => {
            const bar = createBar(l.percentage);
            const pct = l.percentage.toFixed(1).padStart(5);
            return `${l.name.padEnd(maxNameLen)} [${bar}] ${pct}%`;
        });

        const maxLen = Math.max(...lines.map(l => l.length));
        const border = '+' + '-'.repeat(maxLen + 2) + '+';
        const formatted = lines.map(l => `| ${l.padEnd(maxLen)} |`).join('\n');

        return `#### Languages\n\n\`\`\`text\n${border}\n${formatted}\n${border}\n\`\`\``;
    },
};





