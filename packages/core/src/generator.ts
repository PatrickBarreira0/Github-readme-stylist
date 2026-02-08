import { fetchGitHubData } from './fetcher.js';
import { asciiSection } from './sections/asci.js';
import { statsSection } from './sections/stats.js';
import { languagesSection } from './sections/languages.js';
import { activitySection } from './sections/activity.js';
import { addCatsToAscii } from './ascii/cats.js';
import type { Section } from './sections/types.js';
import type { Config } from './config.js';
import type { GitHubData } from './fetcher.js';

const sections: Section[] = [asciiSection, statsSection, languagesSection, activitySection];

function extractCodeBlock(content: string): string[] {
    if (!content) return [];
    const match = content.match(/```text\s*\n([\s\S]*?)\n```/);
    if (!match) return [];
    const block = match[1];
    if (!block) return [];
    return block.split('\n');
}

function mergeColumns(left: string[], right: string[], gap: number = 4): string[] {
    if (left.length === 0) return right;
    if (right.length === 0) return left;
    const leftWidth = left.reduce((max, line) => Math.max(max, line.length), 0);
    const rows = Math.max(left.length, right.length);
    const merged: string[] = [];
    for (let i = 0; i < rows; i += 1) {
        const leftLine = (left[i] ?? '').padEnd(leftWidth, ' ');
        const rightLine = right[i] ?? '';
        merged.push(`${leftLine}${' '.repeat(gap)}${rightLine}`.trimEnd());
    }
    return merged;
}

function stackBlocks(blocks: string[][]): string[] {
    const result: string[] = [];
    for (const block of blocks) {
        if (block.length === 0) continue;
        if (result.length > 0) result.push('');
        result.push(...block);
    }
    return result;
}

function trimEmptyLines(lines: string[]): string[] {
    const result = [...lines];
    while (result.length > 0) {
        const first = result[0];
        if (!first || first.trim() !== '') break;
        result.shift();
    }
    while (result.length > 0) {
        const last = result[result.length - 1];
        if (!last || last.trim() !== '') break;
        result.pop();
    }
    return result;
}

function centerText(text: string, width: number): string {
    if (text.length >= width) return text;
    const left = Math.floor((width - text.length) / 2);
    const right = width - text.length - left;
    return `${' '.repeat(left)}${text}${' '.repeat(right)}`;
}

function buildBox(title: string, lines: string[], minWidth: number = 0): string[] {
    if (lines.length === 0) return [];
    const maxLine = Math.max(...lines.map(line => line.length));
    const innerWidth = Math.max(minWidth, title.length, maxLine);
    const remaining = innerWidth - title.length;
    const filler = remaining > 0 ? ` ${'─'.repeat(Math.max(remaining - 1, 0))}` : '';
    const top = `┌ ${title}${filler} ┐`;
    const middle = lines.map(line => `│ ${line.padEnd(innerWidth)} │`);
    const bottom = `└${'─'.repeat(innerWidth + 2)}┘`;
    return [top, ...middle, bottom];
}

function buildValueBox(title: string, value: number): string[] {
    const text = String(value);
    const width = Math.max(title.length, text.length);
    return buildBox(title, [centerText(text, width)], width);
}

function buildLanguagesBox(data: GitHubData, config: Config): string[] {
    const { topN } = config.sections.languages;
    const langs = data.topLanguages.slice(0, topN);
    if (langs.length === 0) return [];
    const maxNameLen = Math.max(...langs.map(l => l.name.length));
    const barWidth = 12;
    const lines = langs.map(l => {
        const filled = Math.round((l.percentage / 100) * barWidth);
        const empty = barWidth - filled;
        const bar = '█'.repeat(filled) + '░'.repeat(empty);
        const pct = l.percentage.toFixed(1).padStart(5);
        return `${l.name.padEnd(maxNameLen)} ${bar} ${pct}%`;
    });
    return buildBox('Languages', lines);
}

function buildActivityBox(data: GitHubData, config: Config): string[] {
    const { limit } = config.sections.activity;
    const events = data.recentEvents.slice(0, limit);
    if (events.length === 0) return [];
    const typeWidth = Math.max(4, ...events.map(e => e.type.length));
    const lines = events.map(event => `${event.type.padEnd(typeWidth)} ${event.repo}`);
    return buildBox('Activity', lines);
}

function buildStatsBox(data: GitHubData, config: Config): string[] {
    const lines: string[] = [];
    if (config.sections.stats.showCommits) {
        lines.push(`Commits ${data.totalCommits}`);
    }
    if (lines.length === 0) return [];
    return buildBox('Stats', lines);
}

export function renderCompactLayout(data: GitHubData, config: Config): string {
    const asciiLines = config.sections.ascii.enabled
        ? extractCodeBlock(asciiSection.render(data, config))
        : [];
    const statsLines = config.sections.stats.enabled
        ? extractCodeBlock(statsSection.render(data, config))
        : [];
    const languageLines = config.sections.languages.enabled
        ? extractCodeBlock(languagesSection.render(data, config))
        : [];
    const activityLines = config.sections.activity.enabled
        ? extractCodeBlock(activitySection.render(data, config))
        : [];

    const left = stackBlocks([languageLines, activityLines]);
    const right = stackBlocks([statsLines]);
    const body: string[] = [];

    if (asciiLines.length > 0) {
        body.push(...asciiLines);
    }

    const bottom = mergeColumns(left, right);
    if (bottom.length > 0) {
        if (body.length > 0) body.push('');
        body.push(...bottom);
    }

    if (body.length === 0) return '';
    return `\`\`\`text\n${body.join('\n')}\n\`\`\``;
}

export function renderTerminalLayout(data: GitHubData, config: Config): string {
    const asciiConfig = {
        ...config,
        sections: {
            ...config.sections,
            ascii: { ...config.sections.ascii, showCats: false },
        },
    };
    const asciiLines = config.sections.ascii.enabled
        ? trimEmptyLines(extractCodeBlock(asciiSection.render(data, asciiConfig)))
        : [];

    const showStats = config.sections.stats.enabled;
    const followersBox = showStats && config.sections.stats.showFollowers
        ? buildValueBox('Followers', data.followers)
        : [];
    const starsBox = showStats && config.sections.stats.showStars
        ? buildValueBox('Stars', data.totalStars)
        : [];
    const topRow = mergeColumns(followersBox, starsBox, 2);

    const languagesBox = config.sections.languages.enabled ? buildLanguagesBox(data, config) : [];
    let middleBlock: string[] = [];
    if (topRow.length > 0) middleBlock = [...topRow];
    if (languagesBox.length > 0) middleBlock.push(...languagesBox);
    middleBlock = trimEmptyLines(middleBlock);
    if (config.sections.ascii.showCats && middleBlock.length > 0) {
        middleBlock = addCatsToAscii(middleBlock.join('\n')).split('\n');
    }

    const activityBox = config.sections.activity.enabled ? buildActivityBox(data, config) : [];
    const statsBox = showStats ? buildStatsBox(data, config) : [];
    const bottomRow = mergeColumns(activityBox, statsBox, 2);

    const body: string[] = [];
    if (asciiLines.length > 0) {
        body.push(...asciiLines, '');
        //body.push('Software may be potentially hazardous. Explore at your own risk.');
    }
    if (middleBlock.length > 0) {
        if (body.length > 0) body.push('');
        body.push(...middleBlock);
    }
    if (bottomRow.length > 0) {
        if (body.length > 0) body.push('');
        body.push(...bottomRow);
    }

    const finalBody = trimEmptyLines(body);
    if (finalBody.length === 0) return '';
    return `\`\`\`text\n${finalBody.join('\n')}\n\`\`\``;
}

export function renderReadmeFromData(data: GitHubData, config: Config): string {
    const style = config.style ?? 'terminal';
    if (style === 'terminal') {
        const rendered = renderTerminalLayout(data, config);
        return `<!-- START_SECTION:style -->\n${rendered}\n<!-- END_SECTION:style -->`;
    }
    if (style === 'compact') {
        const rendered = renderCompactLayout(data, config);
        return `<!-- START_SECTION:style -->\n${rendered}\n<!-- END_SECTION:style -->`;
    }

    let content = sections
        .filter(s => config.sections[s.id as keyof typeof config.sections]?.enabled)
        .map(s => `<!-- START_SECTION:${s.id} -->\n<!-- END_SECTION:${s.id} -->`)
        .join('\n\n');

    for (const section of sections) {
        const sectionConfig = config.sections[section.id as keyof typeof config.sections];
        if (!sectionConfig?.enabled) continue;

        try {
            const rendered = section.render(data, config);
            if (rendered) {
                const regex = new RegExp(
                    `<!-- START_SECTION:${section.id} -->[\\s\\S]*?<!-- END_SECTION:${section.id} -->`,
                    'g'
                );
                const replacement = `<!-- START_SECTION:${section.id} -->\n${rendered}\n<!-- END_SECTION:${section.id} -->`;
                content = content.replace(regex, replacement);
            }
        } catch (e) {
            console.error(`Error rendering section ${section.id}:`, e);
        }
    }

    return content;
}

export async function generateReadmeContent(config: Config, token?: string): Promise<string> {
    const data = await fetchGitHubData(config.username, token);
    return renderReadmeFromData(data, config);
}

