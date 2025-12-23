import figlet from 'figlet';
import type { Section } from './types.js';
import type { GitHubData } from '../fetcher.js';
import type { Config } from '../config.js';

export function renderAscii(text: string, font: string = 'Standard'): string {
    const trimmed = text.trim();
    if (!trimmed) {
        throw new Error('ASCII text cannot be empty');
    }
    return figlet.textSync(trimmed, { font });
}

export const asciiSection: Section = {
    id: 'ascii',
    render(_data: GitHubData, config: Config): string {
        const { text, font } = config.sections.ascii;
        const art = renderAscii(text, font);
        return `\`\`\`text\n${art}\n\`\`\``;
    },
};

