import fs from 'fs';
import { loadConfig } from './config.js';
import { fetchGitHubData } from './fetcher.js';
import { renderCompactLayout, renderTerminalLayout } from './generator.js';
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

function removeSection(content: string, sectionId: string): string {
    const regex = new RegExp(
        `\\n?<!-- START_SECTION:${sectionId} -->[\\s\\S]*?<!-- END_SECTION:${sectionId} -->\\n?`,
        'g'
    );
    return content.replace(regex, '\n').replace(/\n{3,}/g, '\n\n');
}

function ensureSection(content: string, sectionId: string): string {
    const start = `<!-- START_SECTION:${sectionId} -->`;
    if (content.includes(start)) return content;
    const end = `<!-- END_SECTION:${sectionId} -->`;
    const suffix = content.endsWith('\n') ? '' : '\n';
    return `${content}${suffix}\n${start}\n${end}\n`;
}

async function main() {
    const config = loadConfig();
    const data = await fetchGitHubData(config.username);
    const style = config.style ?? 'terminal';

    const readmePath = 'README.md';
    let readmeContent: string;
    
    if (!fs.existsSync(readmePath)) {
        if (style !== 'classic') {
            readmeContent = `<!-- START_SECTION:style --><!-- END_SECTION:style -->`;
        } else {
            readmeContent = sections
                .filter(s => config.sections[s.id as keyof typeof config.sections]?.enabled)
                .map(s => `<!-- START_SECTION:${s.id} --><!-- END_SECTION:${s.id} -->`)
                .join('\n\n');
        }
        fs.writeFileSync(readmePath, readmeContent);
    } else {
        readmeContent = fs.readFileSync(readmePath, 'utf8');
    }

    if (style !== 'classic') {
        const styleMarker = '';

        if (!readmeContent.includes(styleMarker)) {
            readmeContent = `${styleMarker}\n`;
        }

        for (const section of sections) {
            readmeContent = removeSection(readmeContent, section.id);
        }
        const rendered = style === 'compact'
            ? renderCompactLayout(data, config)
            : renderTerminalLayout(data, config);
        if (rendered) {
            readmeContent = injectSection(readmeContent, 'style', rendered);
        }
        fs.writeFileSync(readmePath, readmeContent);
        return;
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