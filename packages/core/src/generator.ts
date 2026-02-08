import { fetchGitHubData } from './fetcher.js';
import { asciiSection } from './sections/asci.js';
import { statsSection } from './sections/stats.js';
import { languagesSection } from './sections/languages.js';
import { activitySection } from './sections/activity.js';
import type { Section } from './sections/types.js';
import type { Config } from './config.js';
import type { GitHubData } from './fetcher.js';

const sections: Section[] = [asciiSection, statsSection, languagesSection, activitySection];

export function renderReadmeFromData(data: GitHubData, config: Config): string {
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

