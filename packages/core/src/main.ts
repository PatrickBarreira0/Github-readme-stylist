import fs from 'fs';
import { loadConfig } from './config.js';
import { fetchGitHubData } from './fetcher.js';
import { asciiSection } from './sections/asci.js';
import { statsSection } from './sections/stats.js';
import { languagesSection } from './sections/languages.js';
import { activitySection } from './sections/activity.js';
import type { Section } from './sections/types.js';

const sections: Section[] = [asciiSection, statsSection, languagesSection, activitySection];

function injectSection(content: string, sectionId: string, rendered: string): string {
    const regex = new RegExp(
        `<!-- START_SECTION:${sectionId} -->[\\s\\S]*?<!-- END_SECTION:${sectionId} -->`,
        'g'
    );
    const replacement = `<!-- START_SECTION:${sectionId} -->\n${rendered}\n<!-- END_SECTION:${sectionId} -->`;

    if (!regex.test(content)) {
        throw new Error(`Missing marker for section: ${sectionId}`);
    }

    regex.lastIndex = 0;
    return content.replace(regex, replacement);
}

async function main() {
    const config = loadConfig();
    const data = await fetchGitHubData(config.username);

    const readmePath = 'README.md';
    let readmeContent: string;
    
    if (!fs.existsSync(readmePath)) {
        readmeContent = sections
            .filter(s => config.sections[s.id as keyof typeof config.sections]?.enabled)
            .map(s => `<!-- START_SECTION:${s.id} --><!-- END_SECTION:${s.id} -->`)
            .join('\n\n');
        fs.writeFileSync(readmePath, readmeContent);
    } else {
        readmeContent = fs.readFileSync(readmePath, 'utf8');
    }

    for (const section of sections) {
        const sectionConfig = config.sections[section.id as keyof typeof config.sections];
        if (!sectionConfig?.enabled) continue;

        const rendered = section.render(data, config);
        if (rendered) {
            readmeContent = injectSection(readmeContent, section.id, rendered);
        }
    }

    fs.writeFileSync(readmePath, readmeContent);
}

main().catch((error) => {
    console.error('Error:', error);
    process.exit(1);
});





